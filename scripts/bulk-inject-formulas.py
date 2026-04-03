import os
import re

# Mapping of subdirectory slugs to their formulas
FORMULA_MAP = {
    # Geometry
    "area-calculator": ("A = L × W (Rect) | A = πr² (Circle)", "Area formulas vary by shape geometry."),
    "circle-calculator": ("A = πr² | C = 2πr", "Where r is radius, A is area, and C is circumference."),
    "cone-calculator": ("V = (1/3)πr²h | SA = πr(r + √(h² + r²))", "Where r is radius and h is vertical height."),
    "cylinder-calculator": ("V = πr²h | SA = 2πrh + 2πr²", "Where r is radius and h is height."),
    "perimeter-calculator": ("P = 2(L + W) | C = 2πr", "Perimeter is the total length of the boundary."),
    "pythagorean-calculator": ("a² + b² = c²", "Used to find the hypotenuse (c) of a right triangle."),
    "rectangle-calculator": ("A = L × W | P = 2(L + W)", "Where L is length and W is width."),
    "sphere-calculator": ("V = (4/3)πr³ | SA = 4πr²", "Where r is the radius of the sphere."),
    "triangle-calculator": ("A = ½bh", "Where b is base and h is vertical height."),
    "volume-calculator": ("V = L × W × H", "Volume represents the 3D space occupied by an object."),
    "rhombus-calculator": ("A = (d₁ × d₂) / 2", "Where d₁ and d₂ are the lengths of the diagonals."),

    # Math
    "antilog-calculator": ("x = b^y", "Where x is the antilog, b is the base, and y is the log."),
    "average-calculator": ("x̄ = (Σ xᵢ) / n", "Arithmetic Mean: divide sum of values by the count."),
    "basic-calculator": ("a [+,-,×,÷] b", "Standard arithmetic following PEMDAS/BODMAS."),
    "binary-calculator": ("N = Σ (dᵢ × 2ⁱ)", "Converting binary digits to decimal base-10."),
    "combinations-calculator": ("nCr = n! / [r!(n-r)!]", "Selecting r items from n without regarding order."),
    "factorial-calculator": ("n! = n × (n-1) × ... × 1", "The product of all positive integers up to n."),
    "fraction-calculator": ("(a/b) [+,-,×,÷] (c/d)", "Arithmetic operations involving rational numbers."),
    "gcf-calculator": ("GCF(a, b)", "Greatest Common Factor using Euclidean Algorithm."),
    "lcm-calculator": ("LCM(a, b) = |a×b| / GCF(a, b)", "The smallest positive integer divisible by both a and b."),
    "logarithm-calculator": ("logᵦ(x) = y ⇔ bʸ = x", "The exponent to which a base must be raised to yield x."),
    "percentage-calculator": ("P = (V / Total) × 100", "Expressing a number as a fraction of 100."),
    "permutation-calculator": ("nPr = n! / (n-r)!", "Arranging r items from a set of n in a specific order."),
    "quadratic-formula-calculator": ("x = [-b ± √(b² - 4ac)] / 2a", "Solving for roots of ax² + bx + c = 0."),
    "slope-calculator": ("m = (y₂ - y₁) / (x₂ - x₁)", "The steepness or gradient of a line between two points."),
    "standard-deviation-calculator": ("σ = √[Σ(x - μ)² / N]", "Measuring the amount of variation or dispersion."),
    "variance-calculator": ("σ² = Σ(x - μ)² / N", "The average of the squared differences from the Mean."),

    # Science
    "density-calculator": ("ρ = m / V", "Where ρ is density, m is mass, and V is volume."),
    "force-calculator": ("F = m × a", "Newton's Second Law: Force equals mass times acceleration."),
    "kinetic-energy-calculator": ("KE = ½mv²", "The energy an object possesses due to its motion."),
    "ohms-law-calculator": ("V = I × R", "Voltage equals current times resistance."),
    "velocity-calculator": ("v = Δd / Δt", "Velocity is change in displacement over time."),
    "acceleration-calculator": ("a = (v_f - v_i) / t", "Rate of change of velocity over time."),
    "half-life-calculator": ("N(t) = N₀(½)^(t/T)", "Radiative decay over time (t) with half-period (T)."),
    "power-calculator": ("P = W / t", "Work done per unit of time."),

    # Financial
    "annuity-calculator": ("Payout = P * [r(1+r)^n] / [(1+r)^n - 1]", "Amortization formula for fixed income payouts."),
    "compound-interest-calculator": ("A = P(1 + r/n)^(nt)", "Future value with compounding frequency n."),
    "investment-calculator": ("FV = P(1 + r)^n + PMT[((1 + r)^n - 1) / r]", "Future value of investment with regular contributions."),
    "loan-calculator": ("M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]", "Monthly payment on a standard installment loan."),
    "mortgage-calculator": ("M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]", "Total monthly mortgage payment calculation."),
    "roi-calculator": ("ROI = [(Gain - Cost) / Cost] × 100", "Net return expressed as a percentage of initial cost."),
    "saving-calculator": ("FV = PV(1 + r)^n", "Calculating target savings growth over time."),

    # Health
    "bmi-calculator": ("BMI = weight (kg) / [height (m)]²", "Standard Body Mass Index calculation."),
    "bmr-calculator": ("BMR = 10W + 6.25H - 5A + s", "Mifflin-St Jeor Equation for Basal Metabolic Rate."),
    "body-fat-calculator": ("BF% = 495 / (1.032 - 0.19log(W-N) + 0.15log(H)) - 450", "U.S. Navy Method for body fat estimation."),
    "calorie-calculator": ("Daily Calories = BMR × Activity Multiplier", "Estimating total daily energy expenditure."),
    "macro-calculator": ("Protein: 4 kcal/g | Fat: 9 kcal/g | Carbs: 4 kcal/g", "Macronutrient breakdown based on daily caloric goals."),
    "protein-calculator": ("Protein = 0.8g - 2.2g per kg of body weight", "Daily protein requirements based on muscle goals."),
    
    # Technology
    "ip-subnet-calculator": ("Subnet ID = IP AND Mask", "Using bitwise AND to find the network identity."),
    "bandwidth-calculator": ("Time = Data Size / Speed", "Calculating data transmission duration."),

    # Miscellaneous & Everyday
    "age-calculator": ("Age = Current Date - Birth Date", "Precise duration calculation from birth until now."),
    "date-calculator": ("Duration = Date₂ - Date₁", "Counting exact days and months between two dates."),
    "days-calculator": ("Duration = t₂ - t₁", "Measuring time spans in total days."),
    "time-calculator": ("Σt = t₁ + t₂ + ...", "Adding and subtracting time durations (HH:MM:SS)."),
    "percentage-change-calculator": ("% Δ = [(New - Old) / Old] × 100", "Calculating growth or decay between two values."),
    "fraction-to-decimal-calculator": ("D = n / d", "Standard division of the numerator by the denominator."),
    "rounding-calculator": ("Round(x)", "Applying standard rounding rules to the nearest place value."),
    "prime-number-calculator": ("IsPrime(n)", "Checking primality using trial division up to √n."),
    "random-number-generator": ("R = [min, max]", "Generating a pseudo-random integer within a range."),

    # Geometry Expanded
    "parallelogram-calculator": ("A = b × h", "Area equals base times perpendicular height."),
    "trapezoid-calculator": ("A = [(a + b) / 2] × h", "Area equals the average of the bases times the height."),
    "ellipse-calculator": ("A = π × a × b", "Where a and b are the semi-axes (major and minor)."),
    "sector-calculator": ("A = (θ / 360) × πr²", "Where θ is the central angle in degrees."),
    "octagon-calculator": ("A = 2(1 + √2)s²", "Where s is the length of one side of a regular octagon."),
    "hexagon-calculator": ("A = (3√3 / 2)s²", "Where s is the length of one side of a regular hexagon."),
    "pentagon-calculator": ("A = ¼√(5(5+2√5))s²", "Where s is the length of one side of a regular pentagon."),

    # Math Expanded
    "root-calculator": ("ⁿ√x = y ⇔ yⁿ = x", "Calculating the n-th root of a given value."),
    "percent-error-calculator": ("% Error = [|Actual - Ideal| / Ideal] × 100", "Measuring experimental accuracy."),
    "proportion-calculator": ("a / b = c / d", "Solving for a missing value in equal ratios."),
    "rounding-calculator": ("Round(x, n)", "Adjusting a number to n decimal places."),
    "sig-fig-calculator": ("Significant Figures", "Counting non-zero digits and specific zero placements."),
    "trigonometry-calculator": ("sin, cos, tan, csc, sec, cot", "Ratios and properties of right-angled triangles."),
    "decimal-to-fraction-calculator": ("D = Numerator / Denominator", "Converting 0.X to a simplified a/b ratio."),
    "mixed-number-calculator": ("A b/c = (Ac+b)/c", "Converting mixed numbers to improper fractions."),
    "square-root-calculator": ("√x = y ⇔ y² = x", "Determining the number that, squared, equals x."),

    # Financial Expanded
    "tax-calculator": ("Tax = Price × Rate", "Calculating total sales or income tax liability."),
    "tip-calculator": ("Tip = Total × %", "Standard service gratuity calculation."),
    "discount-calculator": ("Savings = Original × %", "Calculating final price after percentage reduction."),
    "sales-calculator": ("Total = Subtotal + Tax", "Final retail price including applicable taxes."),
    "commission-calculator": ("Commission = Sale × Rate", "Earnings based on a percentage of successful sales."),
    "paycheck-calculator": ("Net = Gross - Deductions", "Estimating take-home pay after tax withholding."),
    "margin-calculator": ("Margin % = [(Revenue-Cost)/Revenue]×100", "Profitability ratio of sales price minus cost."),
    "inflation-calculator": ("Pᵥ = P₀(1 + i)ⁿ", "Projecting future purchasing power over time."),
    
    # Health Expanded
    "ideal-weight-calculator": ("W = 50kg + 2.3kg per inch over 5ft", "Devine Formula for healthy body mass projection."),
    "waist-to-hip-ratio-calculator": ("WHR = Waist / Hip", "Assessing fat distribution and health risk."),
    "body-mass-index-calculator": ("BMI = kg / m²", "Global metric for weight-to-height ratio."),
    "age-calculator": ("Age = Current Date - Birth Date", "Precise duration calculation from birth until now."),
    "fat-calculator": ("Total Fat %", "Estimating essential vs. storage fat levels."),
    "protein-calculator": ("Protein = 0.8g per kg", "Daily dietary protein intake requirement."),
    "calorie-calculator": ("Cal = BMR × Activity", "Estimating total daily energy expenditure."),

    # Science Expanded
    "acceleration-calculator": ("a = (vᵪ - v₀) / t", "Rate of change of velocity over duration."),
    "work-calculator": ("W = F × d", "Transfer of energy when force moves an object."),
    "molar-mass-calculator": ("M = Σ (nᵢ × mᵢ)", "The mass of one mole of a specific chemical substance."),
    "projectile-motion-calculator": ("y = x tan(θ) - gx² / (2v₀² cos²θ)", "Predicting flight paths in physics simulations."),
    "ohms-law-calculator": ("V = I × R", "Voltage equals current multiplied by resistance."),
    "half-life-calculator": ("N(t) = N₀(½)^(t/T)", "Radioactive decay model for chemical isotopes."),
    
    # Technology Expanded
    "px-rem-converter": ("REM = PX / Base", "Converting pixel values to root-document EM units."),
    "rgb-hex-converter": ("#RRGGBB", "Converting 0-255 RGB values to hexadecimal codes."),
    "resistor-calculator": ("R = R₁ + R₂ (Series)", "Calculating electrical resistance in circuits."),
    "capacitor-calculator": ("C = ε(A/d)", "Calculating stored charge capability."),
    "bandwidth-calculator": ("Time = File / Speed", "Estimating data transmission duration."),
}

def update_file(filepath, slug):
    if slug not in FORMULA_MAP:
        return False
    
    formula_text, explanation = FORMULA_MAP[slug]
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if formula is missing or placeholder
    placeholder_regex = r'formula=\{[\s\S]*?\}'
    
    new_formula_jsx = f"""formula={{
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              {formula_text}
            </div>
            <p className="text-sm text-slate-500 text-center">
              {explanation}
            </p>
          </>
        }}"""

    # We use a pattern that matches either an empty fragment or the common placeholder sentences
    target_placeholders = [
        "<p>The exact formula depends on the parameters provided.</p>",
        "<p>Enter your inputs to see the formula.</p>",
        "<></>",
        "{<></>}",
        "\"\""
    ]
    
    # Very aggressive replacement of the formula prop regardless of current content if it exists
    # but we only want to update if it looks like a placeholder
    is_placeholder = any(p in content for p in target_placeholders) or "formula depends on the parameters" in content
    
    if is_placeholder:
        updated_content = re.sub(placeholder_regex, new_formula_jsx, content)
        if updated_content != content:
            with open(filepath, 'w') as f:
                f.write(updated_content)
            return True
    return False

def main():
    base_dir = "src/app"
    updated_count = 0
    for root, dirs, files in os.walk(base_dir):
        if "page.tsx" in files:
            slug = os.path.basename(root)
            if update_file(os.path.join(root, "page.tsx"), slug):
                print(f"Updated: {slug}")
                updated_count += 1
    
    print(f"\nTotal calculators updated: {updated_count}")

if __name__ == "__main__":
    main()
