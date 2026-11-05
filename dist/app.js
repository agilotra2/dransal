'use strict';

const serviceData = {
  nursing: {
    name: 'Nursing care', label: 'Personal attention', icon: 'nurse',
    title: 'Skilled support.<br>A gentler everyday.',
    description: 'Explore nursing support around individual care needs and the treating clinician’s recommendations.',
    points: ['Understand the nursing assistance needed', 'Discuss visits, shifts and daily routines', 'Agree responsibilities before care begins'],
    questions: ['What clinical tasks are needed, and who is qualified to provide them?', 'How will the nurse coordinate with the treating clinician?', 'What observations or concerns should be reported, and to whom?']
  },
  elder: {
    name: 'Elder & companion care', label: 'Company & reassurance', icon: 'heart',
    title: 'A familiar face.<br>A helping hand.',
    description: 'Explore companionship and everyday assistance that respect an older person’s preferences and independence.',
    points: ['Consider company and everyday activities', 'Talk through mobility and supervision needs', 'Fit support around familiar routines'],
    questions: ['Which everyday activities would benefit from assistance?', 'What routines, interests and preferences matter most?', 'Is help with mobility or supervision needed?']
  },
  recovery: {
    name: 'Post-hospital recovery', label: 'A supported return home', icon: 'clipboard',
    title: 'Coming home.<br>With a little support.',
    description: 'Plan the practical support that may be helpful after a hospital stay, guided by the discharge team’s advice.',
    points: ['Review the discharge recommendations', 'Discuss equipment and the home environment', 'Confirm support before the return home'],
    questions: ['What support does the discharge team recommend?', 'Does the home need equipment or a safety assessment?', 'How will follow-up appointments and changing needs be coordinated?']
  },
  physio: {
    name: 'Physiotherapy support', label: 'Movement & rehabilitation', icon: 'movement',
    title: 'Small steps.<br>Meaningful progress.',
    description: 'Explore rehabilitation support shaped around mobility, comfort and individual recovery goals.',
    points: ['Arrange a professional assessment', 'Discuss appropriate exercises and goals', 'Understand how progress will be reviewed'],
    questions: ['Who will assess suitability for physiotherapy?', 'What mobility goals and precautions should guide the plan?', 'How will exercises and progress be reviewed?']
  },
  daily: {
    name: 'Personal & daily care', label: 'Comfort & independence', icon: 'home-heart',
    title: 'Everyday help.<br>With dignity, always.',
    description: 'Explore respectful assistance with personal routines while keeping privacy and individual choice at the centre.',
    points: ['Clarify the tasks where help is needed', 'Respect personal preferences and privacy', 'Agree the level of assistance and schedule'],
    questions: ['Which personal care tasks need assistance?', 'What preferences and privacy boundaries should be respected?', 'How can support encourage independence where possible?']
  }
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen = window.matchMedia('(max-width: 650px)');
const tabs = [...document.querySelectorAll('[data-service]')];
const tablist = document.querySelector('.service-list');
const panel = document.querySelector('#service-panel');
let selectedService = 'nursing';
let panelAnimation;

function selectService(button, focus = false) {
  selectedService = button.dataset.service;
  const data = serviceData[selectedService];
  tabs.forEach(tab => {
    tab.setAttribute('aria-selected', String(tab === button));
    tab.tabIndex = tab === button ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', button.id);
  panel.querySelector('.panel-label').textContent = data.label;
  panel.querySelector('.panel-top use').setAttribute('href', `#${data.icon}`);
  document.querySelector('#panel-content').innerHTML = `<h3>${data.title}</h3><p>${data.description}</p><ul class="check-list">${data.points.map(point => `<li>${point}</li>`).join('')}</ul>`;
  panel.querySelector('[data-checklist]').dataset.checklist = selectedService;
  document.querySelector('#service-count').textContent = `${String(tabs.indexOf(button) + 1).padStart(2, '0')} / 05`;
  if (!reducedMotion.matches) {
    panelAnimation?.cancel();
    panelAnimation = document.querySelector('#panel-content').animate(
      [{ opacity: 0, transform: 'translateY(9px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 350, easing: 'cubic-bezier(.22,1,.36,1)' }
    );
  }
  if (focus) button.focus({ preventScroll: true });
}
function updateTabOrientation() {
  tablist.setAttribute('aria-orientation', smallScreen.matches ? 'horizontal' : 'vertical');
}
updateTabOrientation();
smallScreen.addEventListener('change', updateTabOrientation);
tabs.forEach((button, index) => {
  button.addEventListener('click', () => selectService(button));
  button.addEventListener('keydown', event => {
    const nextKey = smallScreen.matches ? 'ArrowRight' : 'ArrowDown';
    const previousKey = smallScreen.matches ? 'ArrowLeft' : 'ArrowUp';
    let next;
    if (event.key === nextKey) next = (index + 1) % tabs.length;
    if (event.key === previousKey) next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectService(tabs[next], true);
      if (smallScreen.matches) tabs[next].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
});

/* Reveal once, with all content visible when motion is reduced or JS is absent. */
const revealElements = [...document.querySelectorAll('[data-reveal]')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.03, rootMargin: '0px 0px 96px 0px' });
  document.querySelectorAll('.steps-grid, .approach-principles').forEach(group => {
    group.querySelectorAll('[data-reveal]').forEach((element, i) => { element.style.transitionDelay = `${i * 75}ms`; });
  });
  document.documentElement.classList.add('motion-ready');
  revealElements.forEach(element => revealObserver.observe(element));
}
reducedMotion.addEventListener('change', event => {
  if (event.matches) {
    document.documentElement.classList.remove('motion-ready');
    panelAnimation?.cancel();
  }
});

/* Navigation states match the section actually being read. */
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = expanded;
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus({ preventScroll: true });
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const header = document.querySelector('#header');
let scrollQueued = false;
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { header.classList.toggle('scrolled', window.scrollY > 12); scrollQueued = false; });
}, { passive: true });
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll('[data-nav]').forEach(link => {
        if (link.dataset.nav === entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
}

/* A useful local checklist. No contact details or medical records are collected. */
const dialog = document.querySelector('#care-dialog');
const dialogContent = document.querySelector('#dialog-content');
let previousFocus;
let checklistDraft = { service: '', timing: '' };
const icon = id => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
function showDialog(markup) {
  if (!dialog.open) previousFocus = document.activeElement;
  dialogContent.innerHTML = markup;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  const heading = dialogContent.querySelector('#dialog-title');
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => { if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true }); });
function showChecklist(service = '') {
  if (service) checklistDraft.service = service;
  showDialog(`<p class="eyebrow">Prepare for the conversation</p><h2 class="dialog-title" id="dialog-title">Your care checklist.</h2><p class="dialog-description">Choose what you’re exploring. Get a short list of practical questions to keep, copy or download.</p><form id="checklist-form"><div class="form-field"><label for="checklist-service">What support are you considering?</label><select id="checklist-service" name="service" required><option value="">Choose a care option</option>${Object.entries(serviceData).map(([key, item]) => `<option value="${key}"${key === checklistDraft.service ? ' selected' : ''}>${item.name}</option>`).join('')}<option value="unsure"${checklistDraft.service === 'unsure' ? ' selected' : ''}>I’m not sure yet</option></select></div><div class="form-field"><label for="checklist-timing">When are you planning for?</label><select id="checklist-timing" name="timing" required><option value="">Choose a timeframe</option>${['As soon as available', 'Within the next week', 'Planning ahead', 'Not sure yet'].map(timing => `<option${timing === checklistDraft.timing ? ' selected' : ''}>${timing}</option>`).join('')}</select></div><button class="button button-navy dialog-full" type="submit">Create my checklist ${icon('arrow-up-right')}</button><p class="form-hint">This tool prepares questions only. It doesn’t send an enquiry, arrange care or save personal information.</p></form>`);
  dialogContent.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    checklistDraft = Object.fromEntries(new FormData(event.currentTarget));
    showChecklistResult();
  });
}
function showChecklistResult() {
  const data = serviceData[checklistDraft.service];
  const name = data?.name || 'Choosing the right support';
  const questions = [
    ...(data?.questions || ['What type of support matches the person’s daily needs?', 'Is a clinical assessment needed before deciding on care?', 'Which tasks need a nurse, a therapist or an attendant?']),
    'Is the service available in my area and preferred timeframe?',
    'What is included in the quote, and are there additional charges?',
    'How will the family receive updates and raise concerns?'
  ];
  const text = `Gentle Hands Home Care — Care conversation checklist\n\nExploring: ${name}\nTiming: ${checklistDraft.timing}\n\n${questions.map((question, index) => `${index + 1}. ${question}`).join('\n')}\n\nDiscuss suitability with the treating clinician. Confirm service availability and terms directly before arranging care.`;
  showDialog(`<p class="eyebrow">A clearer next step</p><h2 class="dialog-title" id="dialog-title">Ready with the<br>right questions.</h2><p class="result-context">${name} · ${checklistDraft.timing}</p><div class="checklist-result"><p class="eyebrow">Ask about</p><ul>${questions.map(question => `<li>${question}</li>`).join('')}</ul></div><div class="dialog-actions"><button class="button button-outline" id="edit-checklist">Change choices</button><button class="button button-navy" id="copy-checklist">Copy checklist ${icon('clipboard')}</button></div><button class="secondary-action" id="download-checklist">Download as a text file</button><p class="copy-status" role="status" aria-live="polite"></p><p class="form-hint">Keep this for your conversation. No enquiry or booking has been sent.</p>`);
  dialogContent.querySelector('#edit-checklist').addEventListener('click', () => showChecklist());
  dialogContent.querySelector('#copy-checklist').addEventListener('click', async () => {
    const status = dialogContent.querySelector('.copy-status');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Checklist copied.'; }
    catch { status.textContent = 'Copy isn’t available here. Please use the download option.'; }
  });
  dialogContent.querySelector('#download-checklist').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gentle-hands-care-checklist.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    dialogContent.querySelector('.copy-status').textContent = 'Your checklist is ready to save.';
  });
}
document.querySelectorAll('[data-checklist]').forEach(button => button.addEventListener('click', () => showChecklist(button.dataset.checklist)));
document.querySelector('#preview-info').addEventListener('click', () => showDialog(`<p class="eyebrow">Gentle Hands Home Care</p><h2 class="dialog-title" id="dialog-title">About this preview.</h2><p class="dialog-description">This is a single-page design preview. Business contact details, confirmed service scope, service area and policies are still to be supplied before a public launch.</p><ul class="preview-list"><li>${icon('clipboard')}<span>The checklist runs in your browser. It does not request a callback or make a booking.</span></li><li>${icon('heart')}<span>The caregiver photograph is AI-generated illustrative imagery, not a real patient or testimonial.</span></li><li>${icon('shield')}<span>No personal information is collected. The page uses Google Fonts and has no analytics scripts.</span></li></ul>`));
