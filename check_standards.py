import os
import re

missing_count = 0
total_checked = 0

for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file == 'page.tsx' and '(' in root:
            total_checked += 1
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
                # Check for "official" JSON import
                has_official_json = 'from "@/data/seo-content/official/' in content
                # Check for CalculatorSEO usage
                has_seo_comp = '<CalculatorSEO' in content
                
                if not (has_official_json and has_seo_comp):
                    missing_count += 1
                    # print(f"MissingStandard: {path}")

print(f"Total checked: {total_checked}")
print(f"Total missing standard: {missing_count}")
