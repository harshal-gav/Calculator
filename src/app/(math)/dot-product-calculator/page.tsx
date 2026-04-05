import CalculatorSEO from "@/components/CalculatorSEO";
import DotProductTool from "@/components/calculators/DotProductTool";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dot Product Calculator | Vector Scalar Product Analysis',
  description: 'Calculate the dot (scalar) product of two vectors, their magnitude, and the exact angle between them. Supporting both 2D and 3D vector spaces with expert analysis.',
};

export default function DotProductCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">·</span> Dot Product Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the dot (scalar) product of two vectors, their magnitude,
          and the exact angle between them.
        </p>
      </div>

      <DotProductTool />

      <CalculatorSEO
        title="Dot Product Calculator (Scalar Product)"
        whatIsIt={
          <>
            <p>Our <strong>Dot Product Calculator</strong> instantly multiplies two mathematical vectors (in either 2D or 3D space) to output their scalar dot product relative to each other.</p>
            <p>Unlike the Cross Product (which results in a completely new vector), the Dot Product always results in a single, scalar integer. In addition to the dot product, this tool simultaneously calculates the exact magnitude (length) of both inputted vectors, the geometric angle (θ) separating them, and automatically determines if the two vectors are perfectly orthogonal (perpendicular).</p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              u · v = |u| |v| cos(θ)
            </div>
            <p className="text-sm text-slate-500 text-center">This tool utilize standardized mathematical formulas and logic to calculate precise Dot Product results.</p>
          </>
        }
        example={
          <>
            <p>Let's calculate the dot product of two 3D vectors: <strong>u</strong> = [2, -5, 4] and <strong>v</strong> = [3, 1, -2]:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Step 1: Multiply corresponding X components:</strong> 2 × 3 = 6</li>
              <li><strong>Step 2: Multiply corresponding Y components:</strong> -5 × 1 = -5</li>
              <li><strong>Step 3: Multiply corresponding Z components:</strong> 4 × -2 = -8</li>
              <li><strong>Step 4: Add the three products together:</strong> 6 + (-5) + (-8) = -7</li>
              <li><strong>Result:</strong> The final scalar dot product is exactly <strong>-7</strong>.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Physics (Calculating Work):</strong> In classical mechanics, 'Work' is mathematically defined as the dot product of the Force vector applied to an object and the Displacement vector (W = F · d).</li>
            <li><strong>Computer Graphics & Video Games:</strong> Game engines use dot products thousands of times per second to calculate lighting based on surface normals and light vectors.</li>
            <li><strong>Proving Orthogonality:</strong> If the dot product is exactly zero, the vectors are guaranteed to be perfectly perpendicular.</li>
          </ul>
        }
        faqs={[
          {
            question: "What does a Dot Product of zero mean?",
            answer: "A dot product of exactly 0 means the two vectors are 'orthogonal', which is the multi-dimensional geometric term for 'perpendicular'. They intersect at exactly a 90-degree right angle."
          },
          {
            question: "Is the Dot Product commutative?",
            answer: "Yes. The order does not matter. The mathematical result of (u · v) will always be exactly identical to the result of (v · u)."
          }
        ]}
        relatedCalculators={[
          { name: "Cross Product Calculator", path: "/cross-product-calculator/", desc: "Calculate the perpendicular 3D resultant vector." },
          { name: "Vector Addition Calculator", path: "/vector-addition-calculator/", desc: "Add multiple vectors together find their resultant." }
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Dot Product Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />
    </div>
  );
}
