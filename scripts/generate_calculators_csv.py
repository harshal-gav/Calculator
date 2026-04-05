import json
import csv
import re

def extract_calculators(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # The file is a TS/JS file exporting a constant 'categories'
    # We can try to extract the array using regex or simple parsing
    # Since it's a known structure, we'll look for name, path, desc
    
    calculators = []
    
    # Regex to find name, path, and desc blocks
    # Example: { name: "...", path: "...", desc: "..." }
    pattern = re.compile(r'\{\s*name:\s*"(.*?)",\s*path:\s*"(.*?)",\s*desc:\s*"(.*?)",?\s*\}', re.DOTALL)
    
    matches = pattern.findall(content)
    
    for match in matches:
        calculators.append({
            'Name': match[0].strip(),
            'Path': match[1].strip(),
            'Description': match[2].strip().replace('\n', ' ')
        })
        
    return calculators

def main():
    input_file = '/Users/harshalgavali/Calculator/src/data/homepage/categories.ts'
    output_file = '/Users/harshalgavali/Calculator/all_calculators.csv'
    
    calculators = extract_calculators(input_file)
    
    if not calculators:
        print("No calculators found. Checking for alternative export style...")
        # Fallback to even simpler regex if needed
        return

    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Name', 'Path', 'Description']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for calc in calculators:
            writer.writerow(calc)
            
    print(f"Successfully created {output_file} with {len(calculators)} calculators.")

if __name__ == "__main__":
    main()
