"""Verify generated routes, fragments, assets and basic document semantics."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import argparse

PROJECT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--directory', type=Path, default=PROJECT / 'dist')
parser.add_argument('--base-path', default='')
args = parser.parse_args()
ROOT = args.directory.resolve()
BASE = '/' + args.base_path.strip('/') if args.base_path.strip('/') else ''


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = []
        self.references = []
        self.h1 = 0
        self.title = ''
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'h1':
            self.h1 += 1
        if tag == 'title':
            self.in_title = True
        for name in ('href', 'src'):
            if attrs.get(name):
                self.references.append(attrs[name])

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


pages = {}
errors = []
for path in ROOT.rglob('*.html'):
    page = Page(path)
    source = path.read_text()
    page.feed(source)
    pages[path] = page
    if '{{' in source:
        errors.append(f'{path.relative_to(ROOT)} has unresolved template content')
    if page.h1 != 1:
        errors.append(f'{path.relative_to(ROOT)} has {page.h1} h1 elements')
    duplicates = [key for key, count in Counter(page.ids).items() if count > 1]
    if duplicates:
        errors.append(f'{path.relative_to(ROOT)} duplicates IDs: {duplicates}')
    if not page.title.strip():
        errors.append(f'{path.relative_to(ROOT)} has no title')

for path, page in pages.items():
    for reference in page.references:
        url = urlsplit(reference)
        if url.scheme or url.netloc:
            continue
        local_path = unquote(url.path)
        if local_path.startswith('/') and BASE:
            if not local_path.startswith(BASE + '/'):
                errors.append(f'{path.relative_to(ROOT)} → link escapes deployment base: {reference}')
                continue
            local_path = local_path[len(BASE):]
        target = (ROOT / local_path.lstrip('/')) if local_path.startswith('/') else (path.parent / local_path)
        if not url.path:
            target = path
        if target.is_dir():
            target /= 'index.html'
        target = target.resolve()
        if not target.is_relative_to(ROOT.resolve()) or not target.is_file():
            errors.append(f'{path.relative_to(ROOT)} → missing {reference}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path.relative_to(ROOT)} → missing fragment {reference}')

titles = Counter(page.title for page in pages.values())
if any(count > 1 for count in titles.values()):
    errors.append('Page titles are not unique')
services = json.loads((PROJECT / 'content/services.json').read_text())
for service in services:
    if not (ROOT / 'services' / service['slug'] / 'index.html').is_file():
        errors.append(f'Missing service route for {service["id"]}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages; all local links, fragments and assets resolve; unique titles and IDs; one h1 per page.')
