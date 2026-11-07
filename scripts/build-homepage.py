"""Build the static homepage from its template and shared care-service content."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
services = json.loads((ROOT / "content/services.json").read_text())


def icon(name):
    return f'<svg aria-hidden="true"><use href="#{name}"/></svg>'


def points(items):
    return '<ul class="care-points">' + ''.join(
        f'<li>{icon("check")}<span>{html.escape(item)}</span></li>' for item in items
    ) + '</ul>'


def service_body(item, mobile=False):
    heading = '' if mobile else f'<h3>{html.escape(item["heading"])}</h3>'
    return (
        heading + f'<p>{html.escape(item["description"])}</p>'
        + '<p class="discussion-label">Useful to discuss</p>' + points(item['points'])
        + f'<a class="button button-primary" href="#care-plan" data-plan="{item["id"]}">'
        f'Plan this care {icon("arrow-right")}</a>'
    )


menu = ''.join(
    f'<button class="service-choice" id="service-{item["id"]}" role="tab" '
    f'aria-selected="{str(i == 0).lower()}" aria-controls="service-panel" '
    f'tabindex="{0 if i == 0 else -1}" data-service="{item["id"]}">'
    f'{icon(item["icon"])}<span>{html.escape(item["name"])}'
    f'<small>{html.escape(item["short"])}</small></span>{icon("arrow-right")}</button>'
    for i, item in enumerate(services)
)
accordion = ''.join(
    f'<details class="care-disclosure" name="care-services" data-mobile-service="{item["id"]}">'
    f'<summary>{icon(item["icon"])}<span>{html.escape(item["name"])}</span>'
    '<span class="disclosure-sign" aria-hidden="true"></span></summary>'
    f'<div class="disclosure-content">{service_body(item, True)}</div></details>'
    for item in services
)
options = ''.join(
    f'<option value="{item["id"]}">{html.escape(item["name"])}</option>' for item in services
)

template = (ROOT / 'src/index.template.html').read_text()
replacements = {
    '{{service_menu}}': menu,
    '{{service_default}}': service_body(services[0]),
    '{{service_accordion}}': accordion,
    '{{service_options}}': options,
    '{{services_json}}': json.dumps(services, ensure_ascii=False).replace('<', r'\u003c'),
    '{{icons}}': (ROOT / 'src/icons.html').read_text(),
}
for token, value in replacements.items():
    template = template.replace(token, value)
if '{{' in template:
    raise ValueError('Unresolved homepage template token')
(ROOT / 'dist/index.html').write_text(template)
print('Built dist/index.html')
