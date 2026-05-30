#!/usr/bin/env python3
"""
wiki_build.py — builds a Wikipedia-style static site from the vault.
Run from the vault root: python scripts/wiki_build.py
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

try:
    import markdown
except ImportError:
    os.system("pip install markdown --quiet")
    import markdown

try:
    from jinja2 import Template
except ImportError:
    os.system("pip install jinja2 --quiet")
    from jinja2 import Template

# --- Configuration ---

VAULT_ROOT = Path(__file__).parent.parent
SITE_DIR = VAULT_ROOT / "site"
TEMPLATE_FILE = VAULT_ROOT / "scripts" / "wiki_template.html"

EXCLUDED_DIRS = {
    ".inbox", "Vault", "scripts", "site", ".obsidian", ".git",
    ".agents", "Archive", "Excalidraw"
}

EXCLUDED_FILES = {
    "SOUL.md", "DECISION MAKING PRINCIPLES.md", "INTELLECTUAL BLUEPRINT.md",
    "EMOTIONS_LOG.md", "DECISIONS_LOG.md", "REFLECTIONS_LOG.md",
    "CLAUDE.md", "AGENTS.md"
}

EXCLUDED_DIRS_FULL = {"0 - Identity", "Vault"}

CATEGORY_ORDER = [
    "1 - Aspirations", "2 - Live Logs", "3 - Daily Journal",
    "4 - Meetings", "5 - Projects", "6 - Areas",
    "7 - Resources", "8 - North Star", "9 - Operations",
    "People", "Onboarding"
]

CATEGORY_LABELS = {
    "1 - Aspirations": "Aspirations",
    "2 - Live Logs": "Live Logs",
    "3 - Daily Journal": "Daily Journal",
    "4 - Meetings": "Meetings",
    "5 - Projects": "Projects",
    "6 - Areas": "Areas",
    "7 - Resources": "Resources",
    "8 - North Star": "North Star",
    "9 - Operations": "Operations",
    "People": "People",
    "Onboarding": "Onboarding",
}


def slugify(name):
    name = re.sub(r'[^\w\s-]', '', name).strip()
    name = re.sub(r'[\s]+', '-', name)
    return name.lower()


def resolve_wikilinks(text, all_slugs):
    def replace(m):
        target = m.group(1).strip()
        # Handle [[People/Samin]] style
        parts = target.split("/")
        title = parts[-1]
        slug = slugify(title)
        if slug in all_slugs:
            return f'<a href="{all_slugs[slug]}">{title}</a>'
        return f'<span title="Not yet in wiki">{title}</span>'
    return re.sub(r'\[\[([^\]]+)\]\]', replace, text)


def get_frontmatter_and_body(text):
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            return text[end + 3:].strip()
    # Strip HTML comments (onboarding generation notes)
    text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL).strip()
    return text


def collect_pages():
    pages = []
    for root, dirs, files in os.walk(VAULT_ROOT):
        root_path = Path(root)
        rel = root_path.relative_to(VAULT_ROOT)
        parts = rel.parts

        # Skip excluded top-level dirs
        if parts and parts[0] in EXCLUDED_DIRS:
            dirs.clear()
            continue
        if parts and parts[0] in EXCLUDED_DIRS_FULL:
            dirs.clear()
            continue

        top_cat = parts[0] if parts else ""

        for f in files:
            if not f.endswith(".md"):
                continue
            if f in EXCLUDED_FILES:
                continue
            if f == "README.md":
                continue

            filepath = root_path / f
            title = filepath.stem
            # Clean up title from filename conventions
            title = re.sub(r'^\d{4}-\d{2}-\d{2}\s*[-—]\s*', '', title)  # strip date prefix

            category = CATEGORY_LABELS.get(top_cat, top_cat) if top_cat else "Misc"

            try:
                text = filepath.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue

            body = get_frontmatter_and_body(text)
            mtime = filepath.stat().st_mtime

            slug = slugify(filepath.stem)
            url_path = f"{slugify(top_cat)}/{slug}.html" if top_cat else f"{slug}.html"

            pages.append({
                "title": title,
                "slug": slug,
                "category": category,
                "top_cat": top_cat,
                "url": url_path,
                "body_raw": body,
                "mtime": mtime,
                "filepath": filepath,
            })

    return pages


def build_backlinks(pages):
    backlink_map = {}  # slug -> list of pages that link to it
    for page in pages:
        matches = re.findall(r'\[\[([^\]]+)\]\]', page["body_raw"])
        for m in matches:
            target_slug = slugify(m.strip().split("/")[-1])
            if target_slug not in backlink_map:
                backlink_map[target_slug] = []
            backlink_map[target_slug].append({"title": page["title"], "url": page["url"]})
    return backlink_map


def render_pages(pages, template_str, generated_date):
    md = markdown.Markdown(extensions=["tables", "fenced_code"])

    all_slugs = {p["slug"]: p["url"] for p in pages}

    # Category index
    cat_counts = {}
    for p in pages:
        cat_counts[p["category"]] = cat_counts.get(p["category"], 0) + 1

    categories = []
    for key in CATEGORY_ORDER:
        label = CATEGORY_LABELS.get(key, key)
        if label in cat_counts:
            categories.append({
                "name": label,
                "url": f"{slugify(key)}/index.html",
                "count": cat_counts[label],
            })

    recent = sorted(pages, key=lambda p: p["mtime"], reverse=True)[:10]
    recent_nav = [{"title": p["title"], "url": p["url"]} for p in recent]

    backlink_map = build_backlinks(pages)

    template = Template(template_str)

    for page in pages:
        body_md = resolve_wikilinks(page["body_raw"], all_slugs)
        md.reset()
        body_html = md.convert(body_md)

        backlinks = backlink_map.get(page["slug"], [])

        out_path = SITE_DIR / page["url"]
        out_path.parent.mkdir(parents=True, exist_ok=True)

        html = template.render(
            title=page["title"],
            category=page["category"],
            body=body_html,
            categories=categories,
            recent=recent_nav,
            backlinks=backlinks,
            generated_date=generated_date,
        )
        out_path.write_text(html, encoding="utf-8")

    return categories, recent_nav


def build_index(pages, categories, recent_nav, template_str, generated_date):
    template = Template(template_str)

    # Group pages by category
    cat_pages = {}
    for p in pages:
        cat = p["category"]
        if cat not in cat_pages:
            cat_pages[cat] = []
        cat_pages[cat].append(p)

    body_parts = ["<p>Welcome to the High Power Brain wiki. Generated from the vault.</p>"]

    for key in CATEGORY_ORDER:
        label = CATEGORY_LABELS.get(key, key)
        if label not in cat_pages:
            continue
        body_parts.append(f'<h2>{label}</h2><ul>')
        for p in sorted(cat_pages[label], key=lambda x: x["title"]):
            body_parts.append(f'<li><a href="{p["url"]}">{p["title"]}</a></li>')
        body_parts.append("</ul>")

    # Root-level files (no top_cat) land in "Misc" — include them on the home page
    if "Misc" in cat_pages:
        body_parts.append("<h2>Misc</h2><ul>")
        for p in sorted(cat_pages["Misc"], key=lambda x: x["title"]):
            body_parts.append(f'<li><a href="{p["url"]}">{p["title"]}</a></li>')
        body_parts.append("</ul>")

    body_html = "\n".join(body_parts)

    html = template.render(
        title="High Power Brain",
        category="",
        body=body_html,
        categories=categories,
        recent=recent_nav,
        backlinks=[],
        generated_date=generated_date,
    )
    (SITE_DIR / "index.html").write_text(html, encoding="utf-8")


def build_category_indexes(pages, categories, recent_nav, template_str, generated_date):
    template = Template(template_str)

    cat_pages = {}
    for p in pages:
        cat = p["category"]
        top = p["top_cat"]
        key = (cat, top)
        if key not in cat_pages:
            cat_pages[key] = []
        cat_pages[key].append(p)

    for (cat, top), ps in cat_pages.items():
        if not top:
            continue  # root-level files have no top_cat; skip or they overwrite site/index.html
        body_parts = [f"<h2>{cat}</h2><ul>"]
        for p in sorted(ps, key=lambda x: x["title"]):
            body_parts.append(f'<li><a href="../{p["url"]}">{p["title"]}</a></li>')
        body_parts.append("</ul>")
        body_html = "\n".join(body_parts)

        # Fix category URLs for relative paths in sub-indexes
        cats_relative = [{"name": c["name"], "url": f"../{c['url']}", "count": c["count"]} for c in categories]
        recent_relative = [{"title": r["title"], "url": f"../{r['url']}"} for r in recent_nav]

        html = template.render(
            title=cat,
            category="",
            body=body_html,
            categories=cats_relative,
            recent=recent_relative,
            backlinks=[],
            generated_date=generated_date,
        )
        idx_path = SITE_DIR / slugify(top) / "index.html"
        idx_path.parent.mkdir(parents=True, exist_ok=True)
        idx_path.write_text(html, encoding="utf-8")


def main():
    print("Building wiki...")

    if SITE_DIR.exists():
        shutil.rmtree(SITE_DIR)
    SITE_DIR.mkdir()

    template_str = TEMPLATE_FILE.read_text(encoding="utf-8")
    generated_date = datetime.now().strftime("%Y-%m-%d")

    pages = collect_pages()
    print(f"  Found {len(pages)} pages")

    categories, recent_nav = render_pages(pages, template_str, generated_date)
    build_index(pages, categories, recent_nav, template_str, generated_date)
    build_category_indexes(pages, categories, recent_nav, template_str, generated_date)

    print(f"  Built {len(pages)} pages in {SITE_DIR}")
    print(f"\nDone. Open: {SITE_DIR / 'index.html'}")

    # Update the workflow's last_run
    workflow_file = VAULT_ROOT / "9 - Operations" / "workflows" / "generate wiki.md"
    if workflow_file.exists():
        content = workflow_file.read_text(encoding="utf-8")
        content = re.sub(r'last_run: .*', f'last_run: {generated_date}', content)
        workflow_file.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
