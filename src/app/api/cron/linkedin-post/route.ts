import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Deployment trigger: 2026-03-19 19:16

// Vercel Cron Secret for security
const CRON_SECRET = process.env.CRON_SECRET;

// Gemini API Configuration
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// LinkedIn Configuration
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

export const maxDuration = 300; // Extend timeout for AI generation and PDF processing

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const authHeader = request.headers.get('authorization');

  // Verify security
  if (secret !== CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  if (!process.env.GOOGLE_GEMINI_API_KEY || !LINKEDIN_ACCESS_TOKEN || !LINKEDIN_AUTHOR_URN) {
    return new NextResponse(JSON.stringify({ message: "Missing environment variables (Gemini, LinkedIn Token, or URN)." }), { status: 500 });
  }

  try {
    // 1. Generate LinkedIn Post Data using Gemini
    const prompt = `
      You are a world-class LinkedIn marketing expert for a utility tools website called calculator-all.com.
      Generate a brand new, unique, high-engagement LinkedIn post including:
      1. A "Personal Storytelling" style post copy (hooks, insights, and call to action to https://calculator-all.com).
      2. 100 relevant hashtags for reach.
      3. Content for a 10-page educational PDF carousel.
      
      The topic should be randomly chosen from: Math secrets, Finance tips (Mortgage/Investment), Next.js 15 technical deep dives, or the journey of building a 100+ tool platform.
      
      RESPONSE TEMPLATE (JSON ONLY, NO MARKDOWN):
      {
        "post_copy": "...",
        "hashtags": "...",
        "pdf_title": "...",
        "slides": [
          {"header": "Slide 1 Header", "content": "Slide 1 Bullet points..."},
          ... (10 slides)
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    const aiData = JSON.parse(responseText);

    // 2. Generate PDF Carousel using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (const slide of aiData.slides) {
      // 1080x1080 square format for LinkedIn
      const page = pdfDoc.addPage([1080, 1080]);

      // Page Background (Brand Navy)
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        color: rgb(0.05, 0.15, 0.3), // Dark Blue
      });

      // Header Text (Brand Orange)
      page.drawText(slide.header, {
        x: 100,
        y: 900,
        size: 60,
        font: boldFont,
        color: rgb(1, 0.5, 0), // Orange
      });

      // Body Content
      const bodyLines = slide.content.split('\n');
      let yOffset = 800;
      for (const line of bodyLines) {
        page.drawText(line, {
          x: 100,
          y: yOffset,
          size: 35,
          font: font,
          color: rgb(1, 1, 1), // White
        });
        yOffset -= 50;
      }

      // Branding Footer
      page.drawText("calculator-all.com", {
        x: 100,
        y: 100,
        size: 30,
        font: boldFont,
        color: rgb(0.8, 0.8, 0.8),
      });
    }

    const pdfBuffer = await pdfDoc.save();

    // 3. Register Assets with LinkedIn
    const registerResponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-document'],
          owner: LINKEDIN_AUTHOR_URN,
          serviceRelationships: [{
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent'
          }]
        }
      })
    });

    const registerData = await registerResponse.json();
    const uploadUrl = registerData.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const assetUrn = registerData.value.asset;

    // 4. Upload PDF Buffer to LinkedIn
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/pdf'
      },
      body: Buffer.from(pdfBuffer)
    });

    // 5. Final Post to LinkedIn
    const shareText = `${aiData.post_copy}\n\n${aiData.hashtags}`;
    const postResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        author: LINKEDIN_AUTHOR_URN,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: shareText },
            shareMediaCategory: 'DOCUMENT',
            media: [
              {
                status: 'READY',
                media: assetUrn,
                title: { text: aiData.pdf_title }
              }
            ]
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    const postResponseData = await postResponse.json();

    return NextResponse.json({
      success: true,
      message: `AI generated and posted: ${aiData.pdf_title}`,
      id: postResponseData.id
    });

  } catch (error: any) {
    console.error("LinkedIn AI Cron Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
