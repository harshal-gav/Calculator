import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import sharp from 'sharp';

const CRON_SECRET = process.env.CRON_SECRET;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

export const maxDuration = 300;

// Generate a branded image with catchy text using Sharp + SVG
async function generateBrandedImage(headline: string, techStack: string[]): Promise<Buffer> {
  const width = 1200;
  const height = 630;

  // Pick a random gradient combo for variety
  const gradients = [
    { bg1: '#0f0c29', bg2: '#302b63', bg3: '#24243e', accent: '#00d4ff' },
    { bg1: '#0a0a2e', bg2: '#1a1a4e', bg3: '#0d0d3b', accent: '#7c3aed' },
    { bg1: '#0c1220', bg2: '#1a2332', bg3: '#0f1923', accent: '#f59e0b' },
    { bg1: '#111827', bg2: '#1f2937', bg3: '#0f172a', accent: '#10b981' },
    { bg1: '#18181b', bg2: '#27272a', bg3: '#1c1c1f', accent: '#f43f5e' },
    { bg1: '#0a192f', bg2: '#172a45', bg3: '#0d1f3c', accent: '#64ffda' },
  ];
  const g = gradients[Math.floor(Math.random() * gradients.length)];

  // Wrap headline text to fit the image
  const maxCharsPerLine = 28;
  const words = headline.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = (currentLine + ' ' + word).trim();
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  // Max 4 lines
  const displayLines = lines.slice(0, 4);
  if (lines.length > 4) {
    displayLines[3] = displayLines[3].substring(0, 25) + '...';
  }

  // Build headline SVG text elements
  const lineHeight = 62;
  const startY = 200;
  const headlineText = displayLines.map((line, i) => 
    `<text x="80" y="${startY + i * lineHeight}" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="48" fill="white" letter-spacing="0.5">${escapeXml(line)}</text>`
  ).join('\n    ');

  // Tech stack badges
  const techBadges = techStack.slice(0, 3).map((tech, i) => {
    const badgeX = 80 + i * 180;
    const textLen = tech.length * 10 + 24;
    return `
      <rect x="${badgeX}" y="${startY + displayLines.length * lineHeight + 30}" width="${textLen}" height="36" rx="18" fill="${g.accent}" opacity="0.2"/>
      <text x="${badgeX + textLen/2}" y="${startY + displayLines.length * lineHeight + 54}" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${g.accent}" text-anchor="middle" font-weight="600">${escapeXml(tech)}</text>
    `;
  }).join('');

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${g.bg1}"/>
          <stop offset="50%" style="stop-color:${g.bg2}"/>
          <stop offset="100%" style="stop-color:${g.bg3}"/>
        </linearGradient>
        <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${g.accent}"/>
          <stop offset="100%" style="stop-color:${g.accent};stop-opacity:0"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)"/>

      <!-- Decorative grid dots -->
      ${Array.from({length: 15}, (_, i) => 
        Array.from({length: 8}, (_, j) => 
          `<circle cx="${80 + i * 80}" cy="${40 + j * 80}" r="1.5" fill="white" opacity="0.08"/>`
        ).join('')
      ).join('')}

      <!-- Accent line at top -->
      <rect x="0" y="0" width="${width}" height="4" fill="url(#accentLine)"/>

      <!-- Decorative accent circle -->
      <circle cx="${width - 120}" cy="120" r="80" fill="${g.accent}" opacity="0.08"/>
      <circle cx="${width - 120}" cy="120" r="50" fill="${g.accent}" opacity="0.05"/>

      <!-- Code bracket decoration -->
      <text x="${width - 160}" y="300" font-family="Courier New, monospace" font-size="120" fill="${g.accent}" opacity="0.1">&lt;/&gt;</text>

      <!-- Headline -->
      ${headlineText}

      <!-- Tech stack badges -->
      ${techBadges}

      <!-- Divider line -->
      <rect x="80" y="${height - 120}" width="200" height="2" fill="${g.accent}" opacity="0.6"/>

      <!-- Branding -->
      <text x="80" y="${height - 70}" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="white" font-weight="bold">calculator-all.com</text>
      <text x="80" y="${height - 42}" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="white" opacity="0.6">100+ Free Calculators &amp; Tools</text>

      <!-- Author badge -->
      <rect x="${width - 280}" y="${height - 85}" width="240" height="45" rx="22" fill="${g.accent}" opacity="0.15"/>
      <text x="${width - 160}" y="${height - 56}" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="${g.accent}" text-anchor="middle" font-weight="600">by Harshal · Frontend Eng</text>
    </svg>
  `;

  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return buffer;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
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
You are ghostwriting a LinkedIn post for a senior frontend engineer named Harshal who builds calculator-all.com — a platform with 100+ free calculators.

YOUR TASK:
1. Randomly pick ONE post style from these 4 categories:
   - "Code-to-Value Breakdown" — A project showcase explaining WHY a specific tech was chosen, with measurable results. Show the thought process.
   - "Modern Baseline" — A lesson learned using AI tools or modern dev practices. Show where the AI/tool FAILED and how human judgment fixed it.
   - "Deep Dive Carousel" — A mini-tutorial or breakdown of a concept. Use numbered points. Teach something specific.
   - "Culture & Workflow" — A post about work discipline, PR review checklists, deep work setup. Target the "trust factor" for hiring managers.

2. Randomly pick 1-3 technologies from this list to weave naturally into your story:
   HTML5, CSS3, JavaScript ES6+, TypeScript, WebAssembly, React 19, Next.js 15, Vue.js 4, Nuxt.js, Angular 18, Svelte 5, SvelteKit, Remix, Astro, Qwik, SolidJS, Alpine.js, HTMX, Tailwind CSS, Radix UI, shadcn/ui, DaisyUI, Styled Components, Framer Motion, Material UI, Zustand, TanStack Query, Redux Toolkit, Pinia, Jotai, XState, Apollo Client, SWR, tRPC, Vite, TurboPack, Bun, Node.js, Biome, esbuild, Nx, Turborepo, Vitest, Playwright, Cypress, Testing Library, ESLint, Storybook, Cursor, GitHub Copilot, Claude Code, Vercel v0, Windsurf, Vercel, Netlify, Cloudflare Pages, Firebase, Supabase, AWS Amplify, Clerk, Auth0

WRITING RULES (CRITICAL):
- Write in FIRST PERSON as Harshal. Sound like a real human, not a marketing bot.
- Start with a strong hook in the first line that makes people stop scrolling.
- Use short paragraphs (1-2 sentences max).
- Include a personal anecdote or "aha moment".
- Add 1-2 moments of vulnerability or humor.
- End with a genuine question to spark comments.
- Naturally mention calculator-all.com ONCE in the middle.
- Include "Frontend Engineer" or "TypeScript" or "Next.js" in the first 2 lines for LinkedIn SEO.
- NEVER use the phrase "Remote Frontend Engineer". Use "Frontend Engineer" instead.
- Keep the total post under 1800 characters.
- Use line breaks liberally. No walls of text.
- Use 1-2 emojis maximum.

3. Generate a SHORT, catchy one-liner (max 8 words) that captures the essence of your post. This will be displayed as a headline on the image.

RESPOND IN THIS EXACT JSON FORMAT (NO MARKDOWN, NO CODE FENCES):
{
  "post_type": "one of: code-to-value | modern-baseline | deep-dive | culture-workflow",
  "tech_stack": ["the 1-3 technologies you picked"],
  "post_text": "the full LinkedIn post text ready to publish",
  "hashtags": "#FrontendEngineer #TypeScript #NextJS #tag4 #tag5 #tag6 #tag7 #tag8 #tag9 #tag10 #tag11 #tag12 #tag13 #tag14 #tag15",
  "image_headline": "A catchy 5-8 word headline for the image"
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

    // === STEP 3: Generate branded image with Sharp ===
    const headline = aiData.image_headline || aiData.post_text.split('\n')[0].substring(0, 50);
    const techStack = Array.isArray(aiData.tech_stack) ? aiData.tech_stack : [];
    const imageBuffer = await generateBrandedImage(headline, techStack);
    const imageBlob = new Blob([new Uint8Array(imageBuffer)], { type: 'image/png' });
    console.log(`Generated branded image (${imageBuffer.length} bytes) with headline: "${headline}"`);

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

    // === STEP 5: Upload branded image to LinkedIn ===
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
