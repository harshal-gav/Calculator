import { calculateSIP } from '../calculations/sip';
import { sipIntros, sipResults, defaultFAQs } from '@/data/templates/sip-templates';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function getRandom<T>(arr: T[], seed: string): T {
  // A simple deterministic hash based on slug string so it's consistent for ISR
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % arr.length;
  return arr[index];
}

export function generateSipContent(amount: number, durationYears: number, expectedRate: number = 12) {
  const result = calculateSIP(amount, durationYears, expectedRate);
  
  const templateVars = {
    amount: formatCurrency(amount),
    duration: durationYears > 1 ? `${durationYears} years` : `${durationYears} year`,
    invested: formatCurrency(result.totalInvested),
    futureValue: formatCurrency(result.futureValue),
    returns: formatCurrency(result.estimatedReturns),
    defaultRate: `${expectedRate}%`
  };

  const seed = `${amount}-${durationYears}`;
  
  let intro = getRandom(sipIntros, seed);
  let resultContent = getRandom(sipResults, seed);
  
  // Replace tokens
  Object.entries(templateVars).forEach(([key, val]) => {
    intro = intro.replaceAll(`{${key}}`, val);
    resultContent = resultContent.replaceAll(`{${key}}`, val);
  });

  const faqs = defaultFAQs.map(faq => {
    let q = faq.question;
    let a = faq.answer;
    Object.entries(templateVars).forEach(([key, val]) => {
      q = q.replaceAll(`{${key}}`, val);
      a = a.replaceAll(`{${key}}`, val);
    });
    return { question: q, answer: a };
  });

  return {
    intro,
    resultContent,
    faqs,
    resultData: result
  };
}
