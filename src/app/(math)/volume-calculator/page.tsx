"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function VolumeCalculator() {
  const [shape, setShape] = useState("cube"); // cube, cylinder, sphere, cone, rectangular

  // Inputs
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [height, setHeight] = useState("10");
  const [radius, setRadius] = useState("5");

  const [result, setResult] = useState<number | null>(null);

  const calculateVolume = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const r = parseFloat(radius) || 0;

    let vol = 0;

    switch (shape) {
      case "cube":
        vol = Math.pow(l, 3);
        break;
      case "rectangular":
        vol = l * w * h;
        break;
      case "cylinder":
        vol = Math.PI * Math.pow(r, 2) * h;
        break;
      case "sphere":
        vol = (4 / 3) * Math.PI * Math.pow(r, 3);
        break;
      case "cone":
        vol = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        break;
    }

    setResult(vol);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-pink-900 border-b pb-4">
        Volume Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the internal space (volume) of common 3D geometric shapes
        instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Shape
              </label>
              <select
                value={shape}
                onChange={(e) => {
                  setShape(e.target.value);
                  setResult(null);
                }}
                className="w-full text-lg rounded-lg border-gray-300 p-3 shadow-sm focus:border-pink-500 cursor-pointer"
              >
                <option value="cube">Cube</option>
                <option value="rectangular">Rectangular Prism</option>
                <option value="cylinder">Cylinder</option>
                <option value="sphere">Sphere</option>
                <option value="cone">Cone</option>
              </select>
            </div>

            {/* Conditional Inputs based on Shape */}
            {shape === "cube" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Edge Length
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 focus:border-pink-500"
                />
              </div>
            )}

            {shape === "rectangular" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Length
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500"
                  />
                </div>
              </div>
            )}

            {(shape === "cylinder" || shape === "cone") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Radius (r)
                  </label>
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Height (h)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full rounded-lg border-gray-300 p-2 focus:border-pink-500"
                  />
                </div>
              </div>
            )}

            {shape === "sphere" && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Radius (r)
                </label>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 focus:border-pink-500"
                />
              </div>
            )}

            <button
              onClick={calculateVolume}
              className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition shadow-lg uppercase tracking-wide mt-4"
            >
              Calculate Volume
            </button>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-pink-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm min-h-[300px]">
          {result !== null ? (
            <div className="w-full text-center space-y-4 text-pink-900">
              <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs">
                Total Volume
              </h3>
              <div className="text-5xl md:text-6xl font-black break-all">
                {Number.isInteger(result)
                  ? result
                  : parseFloat(result.toFixed(4))}
              </div>
              <p className="text-gray-500 font-medium">cubic units</p>
            </div>
          ) : (
            <div className="text-pink-200 text-6xl font-black opacity-30 text-center animate-pulse">
              V = ?
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Volume Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Volume Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Volume Calculator</strong> is an essential geometry
              tool that instantly computes the three-dimensional space enclosed
              by common shapes like cubes, cylinders, cones, spheres, and
              rectangular prisms.
            </p>
            <p>
              While "area" measures the flat, 2D surface of an object, "volume"
              measures its true 3D capacity. Think of volume as exactly how much
              water it would take to completely fill up the shape.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Cubic Meter Calculator, Cubic
              Equation Solver, Ml To L Conversion
            </p>
          </>
        }
        formula={
          <>
            <p>
              Every three-dimensional shape requires a unique mathematical
              formula to determine its exact volume. Here are the core formulas
              this calculator uses natively:
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-lg shadow-sm my-4 overflow-x-auto space-y-4 text-pink-900 border border-pink-100">
              <p>
                <strong>Cube:</strong> Volume = edge³
              </p>
              <p>
                <strong>Rectangular Prism:</strong> Volume = length × width ×
                height
              </p>
              <p>
                <strong>Cylinder:</strong> Volume = πr²h
              </p>
              <p>
                <strong>Sphere:</strong> Volume = ⁴⁄₃πr³
              </p>
              <p>
                <strong>Cone:</strong> Volume = ¹⁄₃πr²h
              </p>
            </div>
            <p className="mt-4">
              Where <strong>r</strong> represents the radius (half the diameter)
              and <strong>h</strong> represents the total height of the object.
            </p>
          </>
        }
        example={
          <>
            <p>
              Let's calculate the volume of a standard cylindrical soda can to
              see how much liquid it can hold.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Step 1 (Identify Measurements):</strong> The radius of
                the base is roughly <strong>1.2 inches</strong> and the height
                is <strong>4.8 inches</strong>.
              </li>
              <li>
                <strong>Step 2 (The Formula):</strong> V = π * r² * h
              </li>
              <li>
                <strong>Step 3 (Square the radius):</strong> 1.2² = 1.44
              </li>
              <li>
                <strong>Step 4 (Multiply):</strong> 3.14159 * 1.44 * 4.8 ={" "}
                <strong>21.71 cubic inches</strong>.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Shipping & Packaging:</strong> Calculating the total cubic
              volume of a rectangular box to determine the exact shipping tier
              or cargo space required on a freight truck.
            </li>
            <li>
              <strong>Construction & Landscaping:</strong> Determining exactly
              how many cubic yards of concrete or soil you need to order to fill
              a cylindrical hole or a rectangular garden bed.
            </li>
            <li>
              <strong>Aquariums:</strong> Finding the absolute water capacity of
              a fish tank to ensure you purchase the correct size filtration
              system and the right number of fish.
            </li>
            <li>
              <strong>Baking:</strong> Comparing the volume of a 9-inch round
              cake pan to a rectangular pan to see if the same amount of batter
              will fit without overflowing.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is the difference between Area and Volume?",
            answer:
              "Area measures the two-dimensional surface space of a flat object (like the floor of a room), measured in square units (like square feet). Volume measures the total three-dimensional space an object occupies (the entire room from floor to ceiling), measured in cubic units.",
          },
          {
            question: "Why does the cone formula have a 1/3 in it?",
            answer:
              "Geometrically, if you have a cylinder and a cone that both share the exact same base radius and the exact same height, the cone will always hold exactly one-third (1/3) of the volume of the cylinder. It's a mathematically perfect relationship.",
          },
          {
            question: "What unit of measurement should I use?",
            answer:
              "You can use any unit—inches, centimeters, feet, or meters. As long as you use the exact same unit for every single input (don't mix feet and inches), the resulting volume will simply be measured in that unit 'cubed' (e.g., cubic inches, cubic meters).",
          },
        ]}
        relatedCalculators={[
          {
            name: "Fraction Calculator",
            path: "/fraction-calculator",
            desc: "Add, subtract, multiply, and divide standard fractions.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator",
            desc: "Easily compute advanced percentage problems in one click.",
          },
          {
            name: "Standard Deviation Calculator",
            path: "/standard-deviation-calculator",
            desc: "Compute population and sample standard deviation.",
          },
        ]}
      />
    </div>
  );
}
