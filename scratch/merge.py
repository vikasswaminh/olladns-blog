import re

with open('src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_rest_of_file = False
merged_box_started = False

i = 0
while i < len(lines):
    line = lines[i]
    
    if "KEY TAKEAWAYS" in line:
        in_rest_of_file = False
        
    # We want to start merging after the Key Takeaways box ends.
    # The Key Takeaways box ends around line 43.
    # Line 46 is: <div class="content-card table-card">
    
    if i == 45: # Line 46 (0-indexed 45)
        new_lines.append('<div class="content-card">\n')
        in_rest_of_file = True
    
    if in_rest_of_file:
        # Ignore all standalone `<div class="content-card">` or `<div class="content-card table-card">`
        if line.strip() == '<div class="content-card">' or line.strip() == '<div class="content-card table-card">':
            i += 1
            continue
            
        # Ignore the closing `</div>` if it is immediately followed by empty lines and then a new `<div class="content-card">`
        if line.strip() == '</div>':
            # lookahead
            lookahead = i + 1
            while lookahead < len(lines) and lines[lookahead].strip() == '':
                lookahead += 1
            
            if lookahead < len(lines) and (lines[lookahead].strip() == '<div class="content-card">' or lines[lookahead].strip() == '<div class="content-card table-card">'):
                i += 1
                continue
                
            # If it's the very last </div> in the file, we keep it to close our merged box
            if lookahead == len(lines) or (lookahead == len(lines)-1 and lines[lookahead].strip() == ''):
                new_lines.append(line)
                i += 1
                continue
                
        new_lines.append(line)
    else:
        new_lines.append(line)
        
    i += 1

with open('src/content/blog/dnssec-explained-what-it-is-how-it-works-and-why-it-matters.md', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
