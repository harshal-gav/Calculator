import os
import re

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

def repair_orphaned_jsx_v2(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the formula={ prop
    f_start = content.find('formula={')
    if f_start == -1: return False

    # Find where the formula prop ends
    brace_start, brace_end = find_balanced_braces(content, f_start)
    if brace_end is None: return False

    # CRITICAL: We look for the NEXT prop name. 
    # Valid next props in CalculatorSEO are:
    next_props = ['example={', 'useCases={', 'faqs={', 'relatedCalculators={', 'deepDive={', 'glossary={', 'comparisonTable={']
    
    next_pos = -1
    for prop in next_props:
        p_pos = content.find(prop, brace_end)
        if p_pos != -1:
            if next_pos == -1 or p_pos < next_pos:
                next_pos = p_pos

    # If we didn't find any more props, we look for the FINAL closing of CalculatorSEO
    if next_pos == -1:
        # Find the very last /> in the file that comes after brace_end
        next_pos = content.rfind('/>', brace_end)
        if next_pos == -1: return False

    # The garbage is EVERYTHING between brace_end and next_pos
    garbage = content[brace_end:next_pos]
    
    if garbage.strip():
        print(f"Cleaning garbage in {filepath}...")
        # Replace garbage with clean spacing
        updated_content = content[:brace_end] + "\n          " + content[next_pos:]
        with open(filepath, 'w') as f:
            f.write(updated_content)
        return True
    return False

def main():
    base_dir = "src/app"
    fixed_count = 0
    for root, dirs, files in os.walk(base_dir):
        if "page.tsx" in files:
            if repair_orphaned_jsx_v2(os.path.join(root, "page.tsx")):
                fixed_count += 1
    print(f"\nRepaired {fixed_count} files correctly.")

if __name__ == "__main__":
    main()
