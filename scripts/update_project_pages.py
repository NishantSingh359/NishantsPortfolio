from pathlib import Path
import re

root = Path(r"c:\Users\TUF\OneDrive\Documents\Code\Vs Code\Portfolio\NishantsPortfolio\projects")
files = [
    'advanced-data-analysis.html',
    'exploratory-data-analysis.html',
    'food-delivery-data-warehouse.html',
    'hr-dashboard.html',
    'image-scraping.html',
    'online-sales-excel.html',
    'sales-customers-products-trends.html',
    'sales-data-warehouse.html',
    'tableau-sales-dashboard.html',
    'virat-kohli-performance.html',
]

code_section = '''<section class="detail-section code-section">
                <h2>Code notes</h2>
                <div class="code-content markdown-body">
## Key Techniques

- Add your key techniques or concepts here
- Use markdown formatting for bullets and structure

## Code Snippets

### Example 1
```python
# Your code example here
print("Hello")
```

## Learnings

- Document what you learned from this project
- Share useful patterns or best practices
                </div>
            </section>
'''

for name in files:
    path = root / name
    text = path.read_text(encoding='utf-8')

    if 'detail-section code-section' not in text:
        text = re.sub(r'(\s*<section class="detail-section"><h2>Gallery</h2>)', code_section + r'\1', text, count=1)

    def replace_card(match):
        src = match.group('src')
        alt = match.group('alt')
        return f'<div class="gallery-card">\n                        <a href="{src}" target="_blank" rel="noopener noreferrer"><img src="{src}" alt="{alt}"></a>\n                    </div>'

    text = re.sub(
        r'<div class="gallery-card">\s*<img src="(?P<src>[^"]+)" alt="(?P<alt>[^"]+)">\s*<p>.*?</p>\s*</div>',
        replace_card,
        text,
        flags=re.S,
    )

    # Add markdown rendering script if not already present
    if '<script src="render-markdown.js"' not in text:
        text = text.replace('</body>', '    <script src="render-markdown.js"></script>\n</body>')

    path.write_text(text, encoding='utf-8')

css_path = root / 'project-pages.css'
css = css_path.read_text(encoding='utf-8')

new_css = '''
.detail-section.code-section .code-content {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    padding: 28px;
    line-height: 1.8;
    overflow-x: auto;
}

.code-content h2 {
    font-size: 1.3rem;
    margin: 28px 0 16px 0;
    color: #e8ecff;
    font-weight: 600;
}

.code-content h2:first-child {
    margin-top: 0;
}

.code-content h3 {
    font-size: 1.05rem;
    margin: 20px 0 12px 0;
    color: #d0d8ff;
    font-weight: 500;
}

.code-content ul, .code-content ol {
    margin: 12px 0;
    padding-left: 24px;
}

.code-content li {
    margin: 8px 0;
    color: #c9d1ff;
}

.code-content code {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding: 2px 6px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.9rem;
    color: #ff9999;
}

.code-content pre {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 16px;
    margin: 12px 0;
    overflow-x: auto;
}

.code-content pre code {
    background: none;
    padding: 0;
    font-size: 0.85rem;
    color: #e8ecff;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
    max-width: 980px;
    margin: 0 auto;
}

.gallery-card {
    overflow: hidden;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.gallery-card a {
    display: block;
}

.gallery-card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    transition: transform 0.25s ease;
}

.gallery-card a:hover img {
    transform: scale(1.03);
}
'''

if 'detail-section.code-section .code-content' not in css:
    insertion = new_css + '\n'
    marker = '.gallery-grid {'
    if marker in css:
        css = css.replace(marker, insertion + marker)
    else:
        css += insertion
    css_path.write_text(css, encoding='utf-8')
