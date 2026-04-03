import os
import re

# Mapping of subdirectory slugs to their formulas
FORMULA_MAP = {
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
    "trigonometry-calculator": ("sin, cos, tan, csc, sec, cot", "Ratios and properties of right-angled triangles."),
    "root-calculator": ("ⁿ√x = y ⇔ yⁿ = x", "Calculating the n-th root of a given value."),
    "square-root-calculator": ("√x = y ⇔ y² = x", "Determining the number that, squared, equals x."),
    "percent-error-calculator": ("% Error = [|Actual - Ideal| / Ideal] × 100", "Measuring experimental accuracy."),
    "proportion-calculator": ("a / b = c / d", "Solving for a missing value in equal ratios."),
    "rounding-calculator": ("Round(x, n)", "Adjusting a number to n decimal places."),
    "sig-fig-calculator": ("Significant Figures", "Counting non-zero digits and specific zero placements."),
    "prime-number-calculator": ("IsPrime(n)", "Checking primality using trial division up to √n."),
    "random-number-generator": ("R = [min, max]", "Generating a pseudo-random integer within a range."),

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
    "parallelogram-calculator": ("A = b × h", "Area equals base times perpendicular height."),
    "trapezoid-calculator": ("A = [(a + b) / 2] × h", "Area equals the average of the bases times the height."),
    "ellipse-calculator": ("A = π × a × b", "Where a and b are the semi-axes (major and minor)."),
    "sector-calculator": ("A = (θ / 360) × πr²", "Where θ is the central angle in degrees."),
    "octagon-calculator": ("A = 2(1 + √2)s²", "Where s is the length of one side of a regular octagon."),
    "hexagon-calculator": ("A = (3√3 / 2)s²", "Where s is the length of one side of a regular hexagon."),
    "pentagon-calculator": ("A = ¼√(5(5+2√5))s²", "Where s is the length of one side of a regular pentagon."),

    # Financial - Advanced
    "annuity-calculator": ("Payout = P * [r(1+r)^n] / [(1+r)^n - 1]", "Amortization formula for fixed income payouts."),
    "compound-interest-calculator": ("A = P(1 + r/n)^(nt)", "Future value with compounding frequency n."),
    "investment-calculator": ("FV = P(1 + r)^n + PMT[((1 + r)^n - 1) / r]", "Future value of investment with regular contributions."),
    "loan-calculator": ("M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]", "Monthly payment on a standard installment loan."),
    "mortgage-calculator": ("M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]", "Total monthly mortgage payment calculation."),
    "apr-calculator": ("APR = [((Fees + Interest)/Principal) / n] × 365 × 100", "Annualized cost of credit."),
    "apy-calculator": ("APY = (1 + r/nⁿ) - 1", "Annualized yield of a compounding interest account."),
    "roi-calculator": ("ROI = [(Gain - Cost) / Cost] × 100", "Net return expressed as a percentage of initial cost."),
    "saving-calculator": ("FV = PV(1 + r)^n", "Calculating target savings growth over time."),
    "tax-calculator": ("Tax = Price × Rate", "Calculating total sales or income tax liability."),
    "tip-calculator": ("Tip = Total × %", "Standard service gratuity calculation."),
    "discount-calculator": ("Savings = Original × %", "Calculating final price after percentage reduction."),
    "sales-calculator": ("Total = Subtotal + Tax", "Final retail price including applicable taxes."),
    "commission-calculator": ("Commission = Sale × Rate", "Earnings based on a percentage of successful sales."),
    "paycheck-calculator": ("Net = Gross - Deductions", "Estimating take-home pay after tax withholding."),
    "margin-calculator": ("Margin % = [(Revenue-Cost)/Revenue]×100", "Profitability ratio of sales price minus cost."),
    "inflation-calculator": ("Pᵥ = P₀(1 + i)ⁿ", "Projecting future purchasing power over time."),
    "va-mortgage-calculator": ("M = [(P-D)+F] * [r(1+r)^n] / [(1+r)^n - 1]", "Where F is the VA Funding Fee and P is Price."),
    "amortization-calculator": ("M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]", "Detailed periodic repayment schedule."),
    "401k-calculator": ("FV = Σ contributions × (1+r)^n", "Future Value of retirement savings contributions."),
    "fha-mortgage-calculator": ("M = loan * [r(1+r)^n]/[(1+r)^n-1] + MIP", "Including Mortgage Insurance Premium."),
    "debt-to-income-calculator": ("DTI = Total Debt / Gross Income", "Assessing eligibility based on monthly debt obligation."),
    "simple-interest-calculator": ("I = P × r × t", "Interest on a fixed principal over duration."),

    # Health - Comprehensive
    "bmi-calculator": ("BMI = weight (kg) / [height (m)]²", "Standard Body Mass Index calculation."),
    "bmr-calculator": ("BMR = 10W + 6.25H - 5A + s", "Mifflin-St Jeor Equation for Basal Metabolic Rate."),
    "body-fat-calculator": ("BF% = 495 / (1.032 - 0.19log(W-N) + 0.15log(H)) - 450", "U.S. Navy Method for body fat estimation."),
    "calorie-calculator": ("Daily Calories = BMR × Activity Multiplier", "Estimating total daily energy expenditure."),
    "macro-calculator": ("Protein: 4 kcal/g | Fat: 9 kcal/g | Carbs: 4 kcal/g", "Macronutrient breakdown based on daily caloric goals."),
    "protein-calculator": ("Protein = 0.8g - 2.2g per kg of body weight", "Daily protein requirements based on muscle goals."),
    "ideal-weight-calculator": ("W = 50kg + 2.3kg per inch over 5ft", "Devine Formula for healthy body mass projection."),
    "waist-to-hip-ratio-calculator": ("WHR = Waist / Hip", "Assessing fat distribution and health risk."),
    "tdee-calculator": ("TDEE = BMR × Activity Factor", "Total Daily Energy Expenditure."),
    "target-heart-rate-calculator": ("THR = (MHR-RHR) × % + RHR", "Karvonen Formula for optimal workout intensity."),
    "ovulation-calculator": ("Ovulation = Last Date + Cycle Length - 14", "Estimating the fertile window."),
    "period-calculator": ("Next Period = Last Date + Cycle Length", "Predicting menstrual cycle timing."),

    # Science & Physics
    "acceleration-calculator": ("a = (vᵪ - v₀) / t", "Rate of change of velocity over duration."),
    "force-calculator": ("F = m × a", "Newton's Second Law: Force equals mass times acceleration."),
    "work-calculator": ("W = F × d", "Transfer of energy when force moves an object."),
    "power-calculator": ("P = W / t", "Work done per unit of time."),
    "ohms-law-calculator": ("V = I × R", "Voltage equals current multiplied by resistance."),
    "density-calculator": ("ρ = m / V", "Where ρ is density, m is mass, and V is volume."),
    "kinetic-energy-calculator": ("KE = ½mv²", "Possessed energy due to an object's motion."),
    "molar-mass-calculator": ("M = Σ (nᵢ × mᵢ)", "The mass of one mole of a specific chemical substance."),
    "half-life-calculator": ("N(t) = N₀(½)^(t/T)", "Radioactive decay model for chemical isotopes."),
    "projectile-motion-calculator": ("y = x tan(θ) - gx² / (2v₀² cos²θ)", "Predicting flight paths in physics simulations."),
}

def find_balanced_braces(content, start_pos):
    brace_start = content.find('{', start_pos)
    if brace_start == -1: return None, None
    count = 1
    i = brace_start + 1
    while count > 0 and i < len(content):
        if content[i] == '{': count += 1
        elif content[i] == '}': count -= 1
        i += 1
    if count == 0: return brace_start, i
    return None, None

def get_formula_and_explanation(slug):
    # 1. Exact matches
    if slug in FORMULA_MAP:
        return FORMULA_MAP[slug]
    
    # 2. Automated Converter Logic (Unified)
    if "converter" in slug or "to-" in slug:
        name = slug.replace("-", " ").title()
        return (f"Result = Input × Conversion_Factor", 
                f"Precise unit translation for {name} using industry-standard conversion constants.")
    
    # 3. Smart Category Fallback (Scientific/Professional)
    name = slug.replace("-calculator", "").replace("-", " ").title()
    if any(k in slug for k in ["loan", "mortgage", "tax", "finance", "interest"]):
        return (f"M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1 ]", 
                f"Standard financial analysis and amortization model for precise {name} results.")
    
    if any(k in slug for k in ["body", "fat", "weight", "calorie", "health"]):
        return (f"Result = f(Metric, Age, Sex)", 
                f"Biometric calculation utilizing standardized biological and physiological models for {name}.")
    
    # 4. Final Scientific Fallback
    return (f"{name} Analysis Model", 
            f"This tool utilize standardized mathematical formulas and logic to calculate precise {name} results.")

def update_file_robust(filepath, slug):
    formula_text, explanation = get_formula_and_explanation(slug)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    formula_prop_start = content.find('formula={')
    if formula_prop_start == -1: return False
    
    brace_start, brace_end = find_balanced_braces(content, formula_prop_start)
    if brace_start is None: return False

    new_formula_jsx = f"""{{
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              {formula_text}
            </div>
            <p className="text-sm text-slate-500 text-center">
              {explanation}
            </p>
          </>
        }}"""

    updated_content = content[:brace_start] + new_formula_jsx + content[brace_end:]
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
            if update_file_robust(os.path.join(root, "page.tsx"), slug):
                print(f"Updated: {slug}")
                updated_count += 1
    print(f"\nFinal Formula Injection Complete. {updated_count} calculators updated.")

if __name__ == "__main__":
    main()
