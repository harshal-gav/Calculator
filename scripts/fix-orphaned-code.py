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

def repair_orphaned_jsx(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the formula={ prop
    f_start = content.find('formula={')
    if f_start == -1: return False

    # Find where the formula prop ends
    brace_start, brace_end = find_balanced_braces(content, f_start)
    if brace_end is None: return False

    # Look for the next valid prop or the end of the component
    next_props = ['example={', 'useCases={', 'faqs={', 'relatedCalculators={', '/>']
    next_pos = len(content)
    for prop in next_props:
        p_pos = content.find(prop, brace_end)
        if p_pos != -1 and p_pos < next_pos:
            next_pos = p_pos

    # Content between brace_end and next_pos is potentially "garbage" if it's not just whitespace
    garbage = content[brace_end:next_pos]
    
    # We define garbage as anything that contains JSX tags or content that isn't just whitespace/comments
    if garbage.strip() and ('<' in garbage or '}' in garbage or 'text' in garbage.lower()):
        print(f"Cleaning garbage in {filepath}...")
        # Replace the garbage with just a newline/whitespace
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
            if repair_orphaned_jsx(os.path.join(root, "page.tsx")):
                fixed_count += 1
    print(f"\nRepaired {fixed_count} files.")

if __name__ == "__main__":
    main()
