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
    // === STEP 1: Generate human-like LinkedIn post with Gemini ===
    const prompt = `
You are ghostwriting a LinkedIn post for a senior frontend engineer named Harshal who builds calculator-all.com — a platform with 100+ free calculators.

YOUR TASK:
1. Randomly pick ONE post style from these 4 categories:
   - "Code-to-Value Breakdown" — A project showcase explaining WHY a specific tech was chosen, with measurable results (e.g., "reduced FID by 40%"). Show the thought process, not just code.
   - "Modern Baseline" — A lesson learned using AI tools or modern dev practices. Show where the AI/tool FAILED and how human judgment fixed it. Be honest and vulnerable.
   - "Deep Dive Carousel" — A mini-tutorial or breakdown of a concept (e.g., "5 things I wish I knew about React Server Components"). Use numbered points. Teach something specific.
   - "Culture & Workflow" — A post about remote work discipline, PR review checklists, deep work setup, or async communication. Target the "trust factor" for remote hiring managers.

2. Randomly pick 1-3 technologies from this list to weave naturally into your story:
   HTML5, CSS3, JavaScript ES6+, TypeScript, WebAssembly, React 19, Next.js 15, Vue.js 4, Nuxt.js, Angular 18, Svelte 5, SvelteKit, Remix, Astro, Qwik, SolidJS, Alpine.js, HTMX, Tailwind CSS, Radix UI, shadcn/ui, DaisyUI, Styled Components, Framer Motion, Material UI, Zustand, TanStack Query, Redux Toolkit, Pinia, Jotai, XState, Apollo Client, SWR, tRPC, Vite, TurboPack, Bun, Node.js, Biome, esbuild, Nx, Turborepo, Vitest, Playwright, Cypress, Testing Library, ESLint, Storybook, Cursor, GitHub Copilot, Claude Code, Vercel v0, Windsurf, Vercel, Netlify, Cloudflare Pages, Firebase, Supabase, AWS Amplify, Clerk, Auth0

WRITING RULES (CRITICAL):
- Write in FIRST PERSON as Harshal. Sound like a real human, not a marketing bot.
- Start with a strong hook in the first line that makes people stop scrolling.
- Use short paragraphs (1-2 sentences max per paragraph).
- Include a personal anecdote or "aha moment" — something that happened during actual development.
- Add 1-2 moments of vulnerability or humor (e.g., "I spent 3 hours debugging this before realizing...").
- End with a genuine question to spark comments (not generic "What do you think?").
- Naturally mention calculator-all.com ONCE in the middle as context, not as a sales pitch.
- Include "Remote Frontend Engineer" or "TypeScript" or "Next.js" in the first 2 lines for LinkedIn SEO.
- Keep the total post under 1800 characters.
- Use line breaks liberally. No walls of text.
- Use 1-2 emojis maximum. Don't overdo it.

3. Generate an image search query that would find a relevant, professional tech/coding image for this specific post.

RESPOND IN THIS EXACT JSON FORMAT (NO MARKDOWN, NO CODE FENCES):
{
  "post_type": "one of: code-to-value | modern-baseline | deep-dive | culture-workflow",
  "tech_stack": ["the 1-3 technologies you picked"],
  "post_text": "the full LinkedIn post text ready to publish",
  "hashtags": "#RemoteFrontendEngineer #TypeScript #NextJS #tag4 #tag5 #tag6 #tag7 #tag8 #tag9 #tag10 #tag11 #tag12 #tag13 #tag14 #tag15",
  "image_query": "a short descriptive query for finding a relevant stock photo, e.g. 'developer working on performance optimization dark mode code editor'"
}
`;

    const geminiModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    const aiData = JSON.parse(responseText);

    // === STEP 2: Build share text (LinkedIn max 3000 chars) ===
    let shareText = `${aiData.post_text}\n\n${aiData.hashtags}`;
    if (shareText.length > 2990) {
      // Trim the post text, keep hashtags
      const maxPostLen = 2990 - aiData.hashtags.length - 4;
      shareText = `${aiData.post_text.substring(0, maxPostLen)}...\n\n${aiData.hashtags}`;
    }

    // === STEP 3: Get a relevant image using the AI-generated query ===
    // Use Unsplash Source API for topic-relevant images (free, no API key needed)
    const imageQuery = encodeURIComponent(aiData.image_query || "coding technology");
    const imageSourceUrl = `https://source.unsplash.com/1200x630/?${imageQuery}`;

    let imageBuffer: Buffer;
    try {
      const imageResponse = await fetch(imageSourceUrl, { redirect: 'follow' });
      if (!imageResponse.ok) throw new Error("Unsplash failed");
      imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      // Verify we got an actual image (not an HTML error page)
      if (imageBuffer.length < 5000) throw new Error("Image too small, likely error page");
    } catch {
      // Fallback to picsum if Unsplash fails
      console.log("Unsplash failed, falling back to picsum...");
      const fallbackResponse = await fetch('https://picsum.photos/1200/630');
      imageBuffer = Buffer.from(await fallbackResponse.arrayBuffer());
    }

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
        'Content-Type': 'image/jpeg'
      },
      body: imageBuffer
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
      message: postTitle,
      postId: postData.id
    });

  } catch (error: any) {
    console.error("LinkedIn AI Cron Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
