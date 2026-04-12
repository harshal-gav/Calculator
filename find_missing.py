import json
import os

with open('src/data/programmable-registry.json', 'r') as f:
    registry = json.load(f)

# Find all categories used in registry
cats = set()
for k, v in registry.items():
    cats.add(v.get('category', 'unknown'))
print(f"Categories in registry: {cats}")

# Mapping check
missing = []
for calc_id, data in registry.items():
    found = False
    # Check all possible category folders
    for cat_folder in ['(financial)', '(math)', '(health)', '(science)', '(everyday)', '(converters)', '(coding)']:
        path = os.path.join('src/app', cat_folder, calc_id)
        if os.path.exists(path):
            found = True
            break
    if not found:
        missing.append(calc_id)

print(f"Total missing: {len(missing)}")
print("Missing IDs:")
print(json.dumps(missing[:100], indent=2))
