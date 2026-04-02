import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

const CRON_SECRET = process.env.CRON_SECRET;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

export const maxDuration = 300;

function getRandomCalculatorUrl(): { url: string; name: string } {
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urls = [...sitemapContent.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
    
    // Filter out the homepage and any non-calculator pages if necessary
    const calculatorUrls = urls.filter(url => 
      url !== 'https://www.calculator-all.com/' && 
      url !== 'https://www.calculator-all.com' &&
      !url.endsWith('.xml')
    );

    if (calculatorUrls.length === 0) {
      return { url: 'https://www.calculator-all.com/', name: 'Calculator-All' };
    }

    const randomUrl = calculatorUrls[Math.floor(Math.random() * calculatorUrls.length)];
    // Extract name from URL (e.g., https://.../age-calculator/ -> age-calculator)
    const name = randomUrl.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Calculator';
    // Capitalize each word
    const formattedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return { url: randomUrl, name: formattedName };
  } catch (error) {
    console.error("Error reading sitemap:", error);
    return { url: 'https://www.calculator-all.com/', name: 'Calculator-All' };
  }
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
    // === STEP 1: Select a random calculator to promote ===
    const promotedCalc = getRandomCalculatorUrl();
    console.log(`Promoting calculator: ${promotedCalc.name} (${promotedCalc.url})`);

    // === STEP 2: Generate human-like LinkedIn post with Gemini ===
    const prompt = `
You are ghostwriting a LinkedIn post for a senior frontend engineer named Harshal who builds calculator-all.com — a platform with 300+ free calculators.

YOUR TASK:
1. Promote this specific calculator/tool: "${promotedCalc.name}" available at: ${promotedCalc.url}
2. Randomly pick ONE post style from these 5 categories:
   - "Code-to-Value Breakdown" — Explain why this calculator was built, the tech behind it (e.g., specific algorithms or React optimization), and the value it provides.
   - "Modern Baseline" — A lesson learned while building ${promotedCalc.name}. Maybe a edge case handled or how AI helped/failed in generating the logic.
   - "Deep Dive" — A mini-tutorial on the math or logic behind ${promotedCalc.name}. Use numbered points.
   - "Culture & Workflow" — How adding ${promotedCalc.name} fits into your goal of building the ultimate toolset.
   - "Programmatic SEO Journey" — Explain how you engineered a programmatic SEO architecture to scale to 300+ calculators automatically, and how ${promotedCalc.name} is a key piece of this ecosystem.

3. Randomly pick 5-8 technologies from this list to weave naturally into your story:
   HTML5, CSS3, JavaScript ES6+, TypeScript, WebAssembly, React 19, Next.js 15, Vue.js 4, Nuxt.js, Angular 18, Svelte 5, SvelteKit, Remix, Astro, Qwik, SolidJS, Alpine.js, HTMX, Tailwind CSS, Radix UI, shadcn/ui, DaisyUI, Styled Components, Framer Motion, Material UI, Zustand, TanStack Query, Redux Toolkit, Pinia, Jotai, XState, Apollo Client, SWR, tRPC, Vite, TurboPack, Bun, Node.js, Biome, esbuild, Nx, Turborepo, Vitest, Playwright, Cypress, Testing Library, ESLint, Storybook, Cursor, GitHub Copilot, Claude Code, Vercel v0, Windsurf, Vercel, Netlify, Cloudflare Pages, Firebase, Supabase, AWS Amplify, Clerk, Auth0

WRITING RULES (CRITICAL):
- Write in FIRST PERSON as Harshal. Sound like a real human, not a marketing bot.
- START THE POST by mentioning the URL: ${promotedCalc.url}
- The first line must include the URL and a strong hook that makes people stop scrolling.
- Include "Frontend Engineer" or "TypeScript" or "Next.js" or "React.js" in the first 2 lines for LinkedIn SEO.
- Use short paragraphs (1-2 sentences max).
- Include a personal anecdote related to building tools like "${promotedCalc.name}".
- End with a genuine question to spark comments.
- Keep the total post under 1800 characters.
- Use line breaks liberally. No walls of text.
- Use 8-10 emojis maximum.
- Generate EXACTLY 75 relevant, SEO-optimized hashtags to maximize reach.

RESPOND IN THIS EXACT JSON FORMAT (NO MARKDOWN, NO CODE FENCES):
{
  "post_type": "one of: code-to-value | modern-baseline | deep-dive | culture-workflow | programmatic-seo",
  "tech_stack": ["the 5-8 technologies you picked"],
  "post_text": "the full LinkedIn post text ready to publish",
  "hashtags": "#${promotedCalc.name.replace(/\\s+/g, '')} #FrontendEngineer #TypeScript #ReactJS (and 71 more for a total of 75)"
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

    // === STEP 3: Create the LinkedIn post ===
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
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    const postData = await postResponse.json();
    if (!postResponse.ok) throw new Error(`LinkedIn Post Failed: ${JSON.stringify(postData)}`);

    return NextResponse.json({
      success: true,
      postType: aiData.post_type,
      techStack: aiData.tech_stack,
      postId: postData.id
    });

  } catch (error: any) {
    console.error("LinkedIn AI Cron Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
