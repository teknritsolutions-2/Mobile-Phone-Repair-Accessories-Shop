"""Check the buildless site's local references using only the Python standard library."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / 'index.html', *[ROOT / 'pages' / (name + '.html') for name in ['home2', 'about', 'services', 'accessories', 'pricing', 'contact']]]
errors = []
checked = 0

class References(HTMLParser):
    def __init__(self, file):
        super().__init__()
        self.file = file
        self.h1s = 0
        self.ids = set()

    def handle_starttag(self, tag, attributes):
        global checked
        attrs = dict(attributes)
        if tag == 'h1':
            self.h1s += 1
        if attrs.get('id'):
            if attrs['id'] in self.ids:
                errors.append(f'{self.file.name}: duplicate id {attrs["id"]}')
            self.ids.add(attrs['id'])
        for key in ['href', 'src']:
            value = attrs.get(key, '')
            url = urlsplit(value)
            if not value or url.scheme or url.netloc or not url.path:
                continue
            checked += 1
            target = (self.file.parent / unquote(url.path)).resolve()
            if not target.is_file():
                errors.append(f'{self.file.relative_to(ROOT)}: missing {value}')

for file in PAGES:
    if not file.exists():
        errors.append(f'Missing page: {file}')
        continue
    parser = References(file)
    parser.feed(file.read_text())
    if parser.h1s != 1:
        errors.append(f'{file.name}: expected one h1, found {parser.h1s}')

for file in (ROOT / 'assets/js').glob('*.js'):
    content = file.read_text()
    for path in re.findall(r'from\s+[\'"]([^\'"]+)[\'"]', content):
        checked += 1
        if not (file.parent / unquote(urlsplit(path).path)).resolve().is_file():
            errors.append(f'{file.name}: missing import {path}')
    result = subprocess.run(['node', '--check', str(file)], capture_output=True, text=True)
    if result.returncode:
        errors.append(result.stderr)

for file in (ROOT / 'assets/css').glob('*.css'):
    for path in re.findall(r'url\([\'"]?([^\)\'"\s]+)', file.read_text()):
        if urlsplit(path).scheme:
            errors.append(f'{file.name}: unexpected remote asset {path}')
        elif not (file.parent / path).resolve().is_file():
            errors.append(f'{file.name}: missing CSS asset {path}')
        checked += 1

for obsolete in ['src', 'dist', 'node_modules', 'package.json', 'package-lock.json', 'vite.config.js', 'server.mjs', 'services', 'contact', 'accessories', 'pricing', 'home-2', 'home2']:
    if (ROOT / obsolete).exists():
        errors.append(f'Obsolete architecture remains: {obsolete}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(PAGES)} physical pages, {checked} local references, all JS syntax, local fonts, and architecture cleanup.')
