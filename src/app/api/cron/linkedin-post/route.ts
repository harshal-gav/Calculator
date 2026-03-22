import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import satori from 'satori';
import sharp from 'sharp';

const CRON_SECRET = process.env.CRON_SECRET;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

export const maxDuration = 300;

// Cache the font so we only fetch once per cold start
let cachedFont: ArrayBuffer | null = null;
async function loadFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;
  // Fetch Google Fonts CSS with older User-Agent to get woff (not woff2) — satori needs woff
  const cssResponse = await fetch(
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700',
    { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:27.0) Gecko/20100101 Firefox/27.0' } }
  );
  const css = await cssResponse.text();
  // Extract the first font URL from the CSS
  const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error('Could not extract font URL from Google Fonts CSS');
  const fontResponse = await fetch(fontUrl);
  cachedFont = await fontResponse.arrayBuffer();
  return cachedFont;
}

import React from 'react';

// Generate a branded image using Satori (text rendered as vector paths = no font issues)
async function generateBrandedImage(headline: string, techStack: string[]): Promise<Buffer> {
  const fontData = await loadFont();
  const e = React.createElement;

  // Pick a random theme
  const themes = [
    { bg: '#0f0c29', bg2: '#302b63', accent: '#00d4ff', accentLight: 'rgba(0,212,255,0.15)' },
    { bg: '#0a0a2e', bg2: '#1a1a4e', accent: '#a855f7', accentLight: 'rgba(168,85,247,0.15)' },
    { bg: '#0c1220', bg2: '#1a2332', accent: '#f59e0b', accentLight: 'rgba(245,158,11,0.15)' },
    { bg: '#111827', bg2: '#1f2937', accent: '#10b981', accentLight: 'rgba(16,185,129,0.15)' },
    { bg: '#18181b', bg2: '#27272a', accent: '#f43f5e', accentLight: 'rgba(244,63,94,0.15)' },
    { bg: '#0a192f', bg2: '#172a45', accent: '#64ffda', accentLight: 'rgba(100,255,218,0.15)' },
  ];
  const t = themes[Math.floor(Math.random() * themes.length)];

  const element = e('div', {
    style: {
      display: 'flex', flexDirection: 'column' as const, width: 1200, height: 630,
      background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bg2} 50%, ${t.bg} 100%)`,
      padding: '60px 80px', fontFamily: 'Inter', position: 'relative' as const, overflow: 'hidden' as const,
    },
  },
    // Top accent bar
    e('div', { style: { position: 'absolute' as const, top: 0, left: 0, width: 1200, height: 4, background: `linear-gradient(90deg, ${t.accent}, transparent)` } }),
    // Decorative circle
    e('div', { style: { position: 'absolute' as const, top: 40, right: 60, width: 160, height: 160, borderRadius: '50%', background: t.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      e('div', { style: { width: 100, height: 100, borderRadius: '50%', background: t.accentLight } })
    ),
    // Code decoration
    e('div', { style: { position: 'absolute' as const, bottom: 120, right: 80, fontSize: 100, color: t.accent, opacity: 0.08 } }, '</>'),
    // Main headline
    e('div', { style: { fontSize: 52, fontWeight: 700, color: 'white', lineHeight: 1.2, marginTop: 60, maxWidth: 900, letterSpacing: '-0.02em' } }, headline),
    // Tech stack badges
    e('div', { style: { display: 'flex', gap: 12, marginTop: 32 } },
      ...techStack.slice(0, 3).map((tech, i) =>
        e('div', { key: i, style: { background: t.accentLight, color: t.accent, padding: '8px 20px', borderRadius: 20, fontSize: 18, fontWeight: 600 } }, tech)
      )
    ),
    // Spacer
    e('div', { style: { flex: 1 } }),
    // Bottom branding section
    e('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
      // Left: brand
      e('div', { style: { display: 'flex', flexDirection: 'column' as const } },
        e('div', { style: { width: 200, height: 2, background: t.accent, opacity: 0.6, marginBottom: 16 } }),
        e('div', { style: { fontSize: 30, fontWeight: 700, color: 'white' } }, 'calculator-all.com'),
        e('div', { style: { fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 4 } }, '100+ Free Calculators & Tools'),
      ),
      // Right: author badge
      e('div', { style: { background: t.accentLight, color: t.accent, padding: '10px 24px', borderRadius: 24, fontSize: 16, fontWeight: 600 } }, 'by Harshal \u00B7 Frontend Engineer'),
    ),
  );

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' as const }],
  });

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return pngBuffer;
}


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
    // === STEP 1: Generate human-like LinkedIn post with Gemini ===
    const prompt = `
You are ghostwriting a LinkedIn post for a senior frontend engineer named Harshal who builds calculator-all.com — a platform with 300+ free calculators.

YOUR TASK:
1. Randomly pick ONE post style from these 4 categories:
   - "Code-to-Value Breakdown" — A project showcase explaining WHY a specific tech was chosen, with measurable results. Show the thought process.
   - "Modern Baseline" — A lesson learned using AI tools or modern dev practices. Show where the AI/tool FAILED and how human judgment fixed it.
   - "Deep Dive" — A mini-tutorial or breakdown of a concept. Use numbered points. Teach something specific.
   - "Culture & Workflow" — A post about work discipline, PR review checklists, deep work setup. Target the "trust factor" for hiring managers.

2. Randomly pick 5-8 technologies from this list to weave naturally into your story:
   HTML5, CSS3, JavaScript ES6+, TypeScript, WebAssembly, React 19, Next.js 15, Vue.js 4, Nuxt.js, Angular 18, Svelte 5, SvelteKit, Remix, Astro, Qwik, SolidJS, Alpine.js, HTMX, Tailwind CSS, Radix UI, shadcn/ui, DaisyUI, Styled Components, Framer Motion, Material UI, Zustand, TanStack Query, Redux Toolkit, Pinia, Jotai, XState, Apollo Client, SWR, tRPC, Vite, TurboPack, Bun, Node.js, Biome, esbuild, Nx, Turborepo, Vitest, Playwright, Cypress, Testing Library, ESLint, Storybook, Cursor, GitHub Copilot, Claude Code, Vercel v0, Windsurf, Vercel, Netlify, Cloudflare Pages, Firebase, Supabase, AWS Amplify, Clerk, Auth0

WRITING RULES (CRITICAL):
- Write in FIRST PERSON as Harshal. Sound like a real human, not a marketing bot.
- Start with a strong hook in the first line that makes people stop scrolling.
- Use short paragraphs (1-2 sentences max).
- Include a personal anecdote or "aha moment".
- Add 1-2 moments of vulnerability or humor.
- End with a genuine question to spark comments.
- Naturally mention calculator-all.com ONCE in the start.
- Include "Frontend Engineer" or "TypeScript" or "Next.js" or "React.js" in the first 2 lines for LinkedIn SEO.
- NEVER use "Remote Frontend Engineer". Use "Frontend Engineer" instead.
- Keep the total post under 1800 characters.
- Use line breaks liberally. No walls of text.
- Use 8-10 emojis maximum.

3. Generate a SHORT, catchy one-liner headline (5-8 words max) that captures the post's essence. This will be shown as large text on a branded image.

RESPOND IN THIS EXACT JSON FORMAT (NO MARKDOWN, NO CODE FENCES):
{
  "post_type": "one of: code-to-value | modern-baseline | deep-dive | culture-workflow",
  "tech_stack": ["the 5-8 technologies you picked"],
  "post_text": "the full LinkedIn post text ready to publish",
  "hashtags": "#FrontendEngineer #TypeScript #ReactJS #tag4 #tag5 #tag6 #tag7 #tag8 #tag9 #tag10 #tag11 #tag12 #tag13 #tag14 #tag15",
  "image_headline": "Catchy 5-8 Word Headline Here"
}
`;

    const geminiModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    const aiData = JSON.parse(responseText);

    // === STEP 2: Build share text (LinkedIn max 3000 chars) ===
    let shareText = `${aiData.post_text}\n\n${aiData.hashtags}`;
    if (shareText.length > 2990) {
      const maxPostLen = 2990 - aiData.hashtags.length - 4;
      shareText = `${aiData.post_text.substring(0, maxPostLen)}...\n\n${aiData.hashtags}`;
    }

    // === STEP 3: Generate branded image ===
    const headline = aiData.image_headline || aiData.post_text.split('\n')[0].substring(0, 50);
    const techStack = Array.isArray(aiData.tech_stack) ? aiData.tech_stack : [];
    console.log(`Generating branded image with headline: "${headline}"`);
    const imageBuffer = await generateBrandedImage(headline, techStack);
    const imageBlob = new Blob([new Uint8Array(imageBuffer)], { type: 'image/png' });
    console.log(`Image generated: ${imageBuffer.length} bytes`);

    // === STEP 4: Register image asset with LinkedIn ===
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

    // === STEP 5: Upload image to LinkedIn ===
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'image/png'
      },
      body: imageBlob
    });

    if (!uploadResponse.ok) throw new Error("Image Upload Failed");

    // === STEP 6: Poll until asset is processed ===
    console.log("Waiting for LinkedIn to process image...");
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 3000));
      try {
        const statusCheck = await fetch(`https://api.linkedin.com/v2/assets/${encodeURIComponent(assetUrn)}`, {
          headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}` }
        });
        if (statusCheck.ok) {
          const statusData = await statusCheck.json();
          const status = statusData?.recipes?.[0]?.status;
          if (status === 'AVAILABLE' || status === 'READY') {
            console.log(`Asset ready after ${i + 1} attempts`);
            break;
          }
        }
      } catch {
        // ignore polling errors
      }
    }

    // === STEP 7: Create the LinkedIn post ===
    const postTitle = aiData.post_text.split('\n')[0].substring(0, 100);
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
              description: { text: postTitle },
              media: assetUrn,
              title: { text: postTitle }
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
      postType: aiData.post_type,
      techStack: aiData.tech_stack,
      imageHeadline: headline,
      message: postTitle,
      postId: postData.id
    });

  } catch (error: any) {
    console.error("LinkedIn AI Cron Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
