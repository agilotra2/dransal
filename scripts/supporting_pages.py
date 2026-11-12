"""Shared static page renderer. No runtime routing or dependencies required."""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/pages.json').read_text())
NAV = [('services', 'Services'), ('about', 'About us'), ('guides', 'Care guides'), ('faqs', 'FAQs')]
e = html.escape


def icon(name):
    return f'<svg aria-hidden="true"><use href="#{name}"/></svg>'


def header(active):
    navigation = ''.join(f'<a href="/{path}/"' + (' aria-current="page"' if path == active else '') + f'>{label}</a>' for path, label in NAV)
    return (ROOT / 'src/header.html').read_text().replace('{{navigation}}', navigation)


def link(url, text, secondary=False):
    cls = 'text-link' if secondary else 'button button-primary'
    return f'<a class="{cls}" href="{e(url, quote=True)}">{e(text)} {icon("arrow-right")}</a>'


def crumbs(items):
    links = '<a href="/">Home</a>'
    for label, url in items:
        links += '<span aria-hidden="true">/</span>' + (f'<a href="{url}">{e(label)}</a>' if url else f'<span aria-current="page">{e(label)}</span>')
    return f'<nav class="breadcrumbs" aria-label="Breadcrumb">{links}</nav>'


def hero(title, description, items, extra='', dark=False):
    return f'<section class="page-hero{" page-hero-dark" if dark else ""}"><div class="container">{crumbs(items)}<div class="page-hero-layout"><div><h1>{title}</h1><p class="page-lead">{e(description)}</p></div>{extra}</div></div></section>'


def cta(title='Let’s make the next step clearer.', description='Prepare a short care note to guide your conversation about support at home.', care=None):
    url = '/contact/' + (f'?care={care}' if care else '') + '#care-plan'
    return f'<section class="section next-step"><div class="container next-step-inner"><div><h2>{e(title)}</h2><p>{e(description)}</p></div>{link(url,"Plan home care")}</div></section>'


def faq_rows(items):
    return ''.join(f'<details data-faq-item><summary>{e(item["question"])}<span class="disclosure-sign" aria-hidden="true"></span></summary><p>{e(item["answer"])}</p></details>' for item in items)


def guide_link(guide):
    return f'<a class="guide-row" href="/guides/{guide["slug"]}/"><div class="guide-symbol">{icon(guide["icon"])}</div><div><p class="guide-category">{e(guide["category"])}</p><h3>{e(guide["title"])}</h3><p>{e(guide["summary"])}</p><span class="reading-time">{e(guide["read"])}</span></div>{icon("arrow-right")}</a>'


def build(services, homepage):
    pages = []
    template = (ROOT / 'src/page.template.html').read_text()
    icons = (ROOT / 'src/icons.html').read_text()
    footer = (ROOT / 'src/footer.html').read_text()

    def write(path, title, description, content, active='', care=False):
        values = {
            '{{title}}': e(title), '{{description}}': e(description, quote=True),
            '{{header}}': header(active), '{{footer}}': footer, '{{content}}': content,
            '{{icons}}': icons, '{{page_scripts}}': '<script src="/app.js" defer></script>' if care else '',
            '{{care_data}}': '<script type="application/json" id="care-data">' + json.dumps(services, ensure_ascii=False).replace('<', r'\u003c') + '</script>' if care else '',
        }
        page = template
        for key, value in values.items():
            page = page.replace(key, value)
        if '{{' in page:
            raise ValueError(f'Unresolved token in {path}')
        target = ROOT / 'dist' / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(page)
        pages.append(path)

    # A directory of substantial, directly linked service pages.
    rows = ''.join(f'<article class="directory-row"><div class="directory-icon">{icon(s["icon"])}</div><div><h2><a href="/services/{s["slug"]}/">{e(s["name"])}</a></h2><p>{e(s["description"])}</p><ul class="inline-topics">' + ''.join(f'<li>{e(p)}</li>' for p in s['points'][:2]) + f'</ul></div>{link("/services/"+s["slug"]+"/", "Explore care", True)}</article>' for s in services)
    content = hero('Find the support<br><span>that fits your day.</span>', 'Explore care around the person’s needs, routines and preferences. Start with a service, then make the next conversation specific.', [('Services', None)], '<div class="hero-note">'+icon('home-heart')+'<p>A little help with everyday life.<br>Specialist support when it’s needed.<br>A plan shaped around the person.</p></div>')
    content += f'<section class="section"><div class="container"><div class="directory-list">{rows}</div><p class="service-note">These care categories are for exploration. Confirm the service scope, appropriate qualifications and local availability directly before arranging support.</p></div></section>'
    content += cta('Not sure where to start?', 'Choose “Help choosing care” in the care-note form and prepare the questions that matter to your family.')
    write('services/index.html', 'Home care services', 'Explore nursing, companion care, recovery, physiotherapy and personal care with Gentle Hands.', content, 'services')

    detail_content = {
        'nursing': ('Make clinical responsibilities clear.', 'Begin with the treating clinician’s recommendations and the support required at home. Discuss which tasks need a qualified nurse, how the routine will work and who coordinates the plan.', ['The tasks recommended by the treating clinician', 'Any professional assessment needed before care is agreed', 'A clear family contact and arrangements for updates']),
        'elder': ('Build support around a familiar routine.', 'Companionship starts with understanding the person’s day. Discuss where a helping hand would be welcome, what they enjoy and how support can respect their independence.', ['The person’s interests and preferred daily routines', 'When company or practical assistance would be useful', 'Family involvement and the right level of support']),
        'recovery': ('Bring the discharge conversation home.', 'Use the discharge team’s recommendations as the starting point. Discuss the practical arrangements, responsibilities and follow-up plan before deciding on support.', ['The written discharge plan and questions for the team', 'Who will arrange the recommended support', 'Follow-up appointments and the main contact for changes']),
        'physio': ('Start with an individual assessment.', 'Movement and rehabilitation needs vary. Ask an appropriately qualified professional to explain suitability, goals and the support that fits the individual plan.', ['Who will assess the person and explain the plan', 'The goals and precautions identified by the professional', 'How the person and family can discuss progress']),
        'daily': ('Protect comfort, privacy and choice.', 'Personal routines deserve a thoughtful conversation. Discuss which activities need assistance, how the person prefers to be supported and where they want to remain independent.', ['The routines where help would be welcome', 'Personal preferences and privacy boundaries', 'The timing, tasks and limits of the agreed assistance']),
    }
    for s in services:
        title, body, before = detail_content[s['id']]
        planning = '/contact/?care=' + s['id'] + '#care-plan'
        aside = f'<aside class="service-hero-aside"><div class="large-service-icon">{icon(s["icon"])}</div><p>{e(s["short"])}</p>{link(planning,"Plan this care")}</aside>'
        content = hero(e(s['name']) + '<span class="hero-title-dot">.</span>', s['description'], [('Services','/services/'),(s['name'],None)], aside)
        content += f'<section class="section"><div class="container detail-grid"><div class="detail-story"><h2>{e(title)}</h2><p>{e(body)}</p><h3>Before the conversation</h3><ul class="care-points">' + ''.join(f'<li>{icon("check")}<span>{e(p)}</span></li>' for p in before) + '</ul></div><aside class="discussion-panel"><h2>Useful to discuss</h2><ol class="discussion-list">' + ''.join(f'<li>{e(p)}</li>' for p in s['points']) + '</ol><p class="small-note">Confirm the service scope, professional qualifications, timing and local availability before making arrangements.</p></aside></div></section>'
        content += '<section class="section soft-section"><div class="container detail-grid"><div><h2>Questions worth asking.</h2><p class="section-intro">Take a short list into the conversation so the details are clear.</p></div><ul class="question-list">' + ''.join(f'<li>{icon("chat")}<span>{e(q)}</span></li>' for q in s['questions']) + '</ul></div></section>'
        others = [x for x in services if x['id'] != s['id']][:2]
        content += '<section class="section"><div class="container"><div class="section-heading"><h2>Explore other support.</h2></div><div class="related-links">' + ''.join(f'<a href="/services/{o["slug"]}/">{icon(o["icon"])}<span>{e(o["name"])}<small>{e(o["short"])}</small></span>{icon("arrow-right")}</a>' for o in others) + '</div></div></section>' + cta(care=s['id'])
        write(f'services/{s["slug"]}/index.html', s['name']+' at home', s['description'], content, 'services')

    # About: a brand-led page, without invented founders, history or credentials.
    brand = '<div class="about-brand-panel"><img src="/assets/gentle-hands-logo.png" width="210" height="210" alt="Gentle Hands Home Care Services logo"><p>Care with compassion.<br>Support with dignity.</p></div>'
    content = hero('Good care begins<br>with <span>the person.</span>', 'A familiar routine. A voice in the decisions. The comfort of being at home. These are the ideas at the heart of Gentle Hands.', [('About us',None)], brand, True)
    content += '<section class="section"><div class="container about-intro"><h2>A helping hand.<br>A human approach.</h2><div><p class="large-copy">Home is more than a place to receive support. It is where everyday habits, relationships and personal choices belong.</p><p>Our approach puts those details into the care conversation: what matters to the person, where help is needed and how the family can stay involved. The aim is a clear, respectful plan for support at home.</p></div></div></section>'
    content += '<section class="section soft-section"><div class="container"><div class="section-heading"><h2>What matters in a care conversation.</h2></div><div class="values-grid">' + ''.join(f'<article>{icon(i)}<h3>{h}</h3><p>{p}</p></article>' for i,h,p in [('heart','Dignity in the everyday.','Personal routines, privacy and individual preferences should shape the way support is discussed.'),('chat','Clarity for the family.','Agree responsibilities, updates and the main contact so everyone understands the proposed plan.'),('home-heart','Room for independence.','Discuss where assistance would help and which familiar activities the person wants to continue themselves.')]) + '</div></div></section>'
    content += '<section class="section"><div class="container detail-grid"><div><h2>Care is a conversation.</h2><p class="section-intro">Start with the person. Bring the family’s questions. Make the practical details clear.</p>'+link('/guides/planning-home-care/','Read the planning guide',True)+'</div><div class="about-conversations"><p><strong>For the person receiving care</strong>What feels comfortable? What matters most in the daily routine?</p><p><strong>For the family</strong>Where would support help? How should updates be shared?</p><p><strong>For the care professional</strong>What is appropriate? Which responsibilities and qualifications are needed?</p></div></div></section>' + cta()
    write('about/index.html','About Gentle Hands','A person-first approach to planning home care, with dignity, clarity and family involvement.',content,'about')

    content = hero('A little clarity.<br><span>A more confident next step.</span>', 'Practical questions and planning guides for families exploring support at home.', [('Care guides',None)])
    content += '<section class="section"><div class="container guide-directory"><aside><h2>Start where you are.</h2><p>Choosing care can bring unfamiliar decisions. Use these guides to organise your questions and prepare for a conversation.</p><p class="small-note">General planning information. Follow the advice of the professionals responsible for the person’s care.</p></aside><div class="guide-list">' + ''.join(guide_link(g) for g in DATA['guides']) + '</div></div></section>' + cta()
    write('guides/index.html','Family care guides','Practical guides to planning home care, preparing for hospital discharge and asking useful questions.',content,'guides')

    for g in DATA['guides']:
        toc = ''.join(f'<a href="#part-{i}">{e(s["title"])}</a>' for i,s in enumerate(g['sections'],1))
        content = '<section class="article-hero"><div class="container">' + crumbs([('Care guides','/guides/'),(g['category'],None)]) + f'<div class="article-heading"><p class="article-meta">{e(g["category"])}<span aria-hidden="true">·</span>{e(g["read"])}</p><h1>{e(g["title"])}</h1><p class="page-lead">{e(g["summary"])}</p></div></div></section>'
        content += f'<div class="container article-layout section"><aside class="article-toc"><p>In this guide</p><nav aria-label="In this guide">{toc}</nav>{link("/contact/", "Prepare a care note", True)}</aside><article class="article-body"><p class="article-intro">{e(g["intro"])}</p>'
        for i,s in enumerate(g['sections'],1):
            content += f'<section id="part-{i}"><h2>{e(s["title"])}</h2><p>{e(s["text"])}</p><ul>' + ''.join(f'<li>{e(p)}</li>' for p in s['points']) + '</ul></section>'
        content += f'<aside class="takeaway"><h2>Something to take with you.</h2><p>{e(g["takeaway"])}</p></aside><p class="article-caveat">This guide helps organise a conversation. It does not replace an individual assessment or advice from the treating team.</p></article></div>'
        others=[x for x in DATA['guides'] if x['slug'] != g['slug']]
        content += '<section class="section soft-section"><div class="container"><div class="section-heading"><h2>Keep exploring.</h2></div><div class="guide-related">' + ''.join(guide_link(x) for x in others) + '</div></div></section>' + cta(care=g['service'])
        write(f'guides/{g["slug"]}/index.html',g['title'].rstrip('.'),g['summary'],content,'guides')

    groups = list(dict.fromkeys(q['group'] for q in DATA['faqs']))
    content = hero('Your questions.<br><span>A clearer starting point.</span>', 'Find practical answers about choosing care, planning support and using this website.', [('FAQs',None)])
    content += '<section class="section"><div class="container faq-page-layout"><aside class="faq-topics"><h2>Find an answer.</h2><nav aria-label="FAQ topics">' + ''.join(f'<a href="#topic-{i}">{e(g)}</a>' for i,g in enumerate(groups)) + '</nav>'+link('/contact/','Plan your next step',True)+'</aside><div class="faq-content"><div class="faq-search"><label for="faq-search">Search questions and answers</label><div class="search-control"><input id="faq-search" type="search" placeholder="Try “timing” or “care note”" autocomplete="off"><button id="clear-faq" class="text-button" hidden>Clear search</button></div><p id="faq-status" role="status" aria-live="polite"></p></div>'
    for i,g in enumerate(groups):
        content += f'<section id="topic-{i}" class="faq-topic" data-faq-group><h2>{e(g)}</h2><div class="faq-list">{faq_rows([q for q in DATA["faqs"] if q["group"] == g])}</div></section>'
    content += '<div class="empty-state" id="faq-empty" hidden><h2>No matching answers.</h2><p>Try a shorter search, or use “Clear search” to see all questions.</p></div></div></div></section>' + cta()
    write('faqs/index.html','Frequently asked questions','Answers to common questions about home-care planning, availability and the Gentle Hands website.',content,'faqs')

    # Reuse the functioning care-note form rather than simulate an enquiry endpoint.
    plan = re.search(r'(<section class="care-plan-section.*?</section>)', homepage, re.S).group(1)
    plan = plan.replace('Plan the next step.','Prepare your care conversation.')
    plan = re.sub(r'<div class="contact-state">.*?</div>', '', plan, flags=re.S)
    content = hero('Let’s talk about<br><span>what matters to you.</span>', 'Start with the support you’re considering. A short care note can help you bring the right questions to the conversation.', [('Contact',None)], '<aside class="contact-availability">'+icon('chat')+'<h2>Direct contact details</h2><p>Phone, email and service-area details are being confirmed for this preview.</p><p class="small-note">The form below prepares a note for you. It does not send an enquiry or request a callback.</p></aside>')
    content += plan + '<section class="section"><div class="container contact-next"><div><h2>Before care is arranged.</h2><p class="section-intro">A few details to confirm directly with a care provider.</p></div><dl class="arrangement-list"><div><dt>Where & when</dt><dd>Service area, local availability and preferred timing.</dd></div><div><dt>People & responsibilities</dt><dd>Who will provide support, relevant qualifications and the agreed tasks.</dd></div><div><dt>Practical terms</dt><dd>A clear quote, payment arrangements and rescheduling or cancellation terms.</dd></div></dl></div></section>'
    write('contact/index.html','Contact & care planning','Prepare a care conversation with Gentle Hands. Direct contact details are pending for this private preview.',content,care=True)

    content = hero('Privacy, simply explained.', 'What this website does with your choices, and what stays in your browser.', [('Privacy & this website',None)])
    content += '<section class="section"><div class="container policy-body"><h2>The care-note form</h2><p>The form asks for a care category and a timeframe. It does not request names, contact information, addresses, medical records or other personal details. The choices and generated note stay in page memory. This website does not save them to a database or browser storage, and they are not sent to Gentle Hands.</p><h2>Copying or downloading a note</h2><p>Copying places the generated note on your device’s clipboard. Downloading creates a text file on your device. You decide whether to keep or share it. Neither action sends an enquiry or makes a booking.</p><h2>Search and site features</h2><p>FAQ search filters the questions already loaded in the page. There are no analytics scripts, advertising trackers or application cookies added by this website. Access to the private preview is managed by the Sites hosting platform, which has its own authentication and service policies.</p><h2>Fonts and hosting</h2><p>The website loads Figtree from Google Fonts. Loading external fonts and hosted pages involves normal network requests to those providers. The website does not control their infrastructure or policies.</p><h2>Before public launch</h2><p>The business contact details and any policies for future enquiries or bookings have not yet been supplied. This page describes the current website features. It does not set terms for a care service or describe a future patient-record system.</p>'+link('/contact/','Back to care planning',True)+'</div></section>'
    write('privacy/index.html','Privacy & this website','How the care-note form, FAQ search and current private website handle your choices.',content)

    content = hero('Let’s find your way back.', 'This page could not be found. Explore care options or return to the homepage.', [('Page not found',None)])
    content += '<section class="section"><div class="container error-actions">'+link('/','Return home')+link('/services/','Explore services',True)+'</div></section>'
    write('404.html','Page not found','Find your way back to Gentle Hands Home Care.',content)
    print(f'Built {len(pages)} supporting pages')
