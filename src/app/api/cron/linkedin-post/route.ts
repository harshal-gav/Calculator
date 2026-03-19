import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const CRON_SECRET = process.env.CRON_SECRET;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

export const maxDuration = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const authHeader = request.headers.get('authorization');

  if (secret !== CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  if (!process.env.GOOGLE_GEMINI_API_KEY || !LINKEDIN_ACCESS_TOKEN || !LINKEDIN_AUTHOR_URN) {
    return new NextResponse(JSON.stringify({ message: "Missing environment variables." }), { status: 500 });
  }

  try {
    // 1. Generate content with Gemini
    const prompt = `
      You are a LinkedIn marketing expert for calculator-all.com.
      Generate a unique, high-engagement LinkedIn post including:
      1. A storytelling style post copy with hooks and call to action to https://calculator-all.com
      2. 15 relevant hashtags as a single string
      3. A catchy title for an image post

      Topic: randomly choose from Math secrets, Finance tips, Next.js deep dives, or building a 100+ tool platform.

      RESPONSE FORMAT (JSON ONLY, NO MARKDOWN):
      {
        "post_copy": "the full post text...",
        "hashtags": "#tag1 #tag2 #tag3...",
        "image_title": "A catchy title for the post image"
      }
    `;

    const geminiModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    const aiData = JSON.parse(responseText);

    // 2. Build share text (LinkedIn max 3000 chars)
    let shareText = `${aiData.post_copy}\n\n${aiData.hashtags}`;
    if (shareText.length > 2990) {
      shareText = shareText.substring(0, 2980) + "...";
    }

    // 3. Register image asset with LinkedIn
    const registerResponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: LINKEDIN_AUTHOR_URN,
          serviceRelationships: [{
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent'
          }]
        }
      })
    });

    const registerData = await registerResponse.json();
    if (!registerResponse.ok) throw new Error(`Register Failed: ${JSON.stringify(registerData)}`);

    const uploadUrl = registerData.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const assetUrn = registerData.value.asset;

    // 4. Fetch and upload image
    const imageResponse = await fetch('https://picsum.photos/1200/630');
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'image/jpeg'
      },
      body: imageBuffer
    });

    if (!uploadResponse.ok) throw new Error("Image Upload Failed");

    // 5. Poll until asset is READY
    console.log("Waiting for LinkedIn to process image...");
    let assetReady = false;
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 3000));
      try {
        const statusCheck = await fetch(`https://api.linkedin.com/v2/assets/${encodeURIComponent(assetUrn)}`, {
          headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}` }
        });
        if (statusCheck.ok) {
          const statusData = await statusCheck.json();
          const recipe = statusData?.recipes?.[0];
          if (recipe?.status === 'AVAILABLE' || recipe?.status === 'READY') {
            assetReady = true;
            console.log(`Asset ready after ${i + 1} attempts`);
            break;
          }
        }
      } catch {
        // ignore polling errors, keep retrying
      }
    }

    // Even if polling didn't confirm, try posting (LinkedIn often accepts it)
    if (!assetReady) console.log("Polling didn't confirm READY, attempting post anyway...");

    // 6. Create the LinkedIn post with image
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
            shareMediaCategory: 'IMAGE',
            media: [{
              status: 'READY',
              description: { text: aiData.image_title || "Calculator-All.com" },
              media: assetUrn,
              title: { text: aiData.image_title || "Calculator-All.com" }
            }]
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    const postData = await postResponse.json();
    if (!postResponse.ok) throw new Error(`Post Failed: ${JSON.stringify(postData)}`);

    return NextResponse.json({
      success: true,
      message: `AI generated and posted with image: ${aiData.image_title}`,
      postId: postData.id
    });

  } catch (error: any) {
    console.error("LinkedIn AI Cron Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
