'use strict';

const services = JSON.parse(document.querySelector('#care-data').textContent);
const serviceById = new Map(services.map(service => [service.id, service]));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width: 700px)');
const serviceTabs = [...document.querySelectorAll('[data-service]')];
const servicePanel = document.querySelector('#service-panel');
const form = document.querySelector('#care-form');
const careType = document.querySelector('#care-type');
const careTiming = document.querySelector('#care-timing');
const careResult = document.querySelector('#care-result');
const status = document.querySelector('.copy-status');
let serviceAnimation;
let careNote = '';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const icon = name => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;

function renderService(service) {
  return `<h3>${escapeHtml(service.heading)}</h3><p>${escapeHtml(service.description)}</p><p class="discussion-label">Useful to discuss</p><ul class="care-points">${service.points.map(point => `<li>${icon('check')}<span>${escapeHtml(point)}</span></li>`).join('')}</ul><div class="service-actions"><a class="button button-primary" href="#care-plan" data-plan="${service.id}">Plan this care ${icon('arrow-right')}</a><a class="text-link" href="/services/${service.slug}/">Explore this service ${icon('arrow-right')}</a></div>`;
}

function selectService(id, focus = false) {
  const service = serviceById.get(id);
  if (!service || !servicePanel) return;
  const selected = serviceTabs.find(tab => tab.dataset.service === id);
  serviceTabs.forEach(tab => {
    tab.setAttribute('aria-selected', String(tab === selected));
    tab.tabIndex = tab === selected ? 0 : -1;
  });
  servicePanel.setAttribute('aria-labelledby', selected.id);
  servicePanel.innerHTML = renderService(service);
  serviceAnimation?.cancel();
  if (!mobile.matches) {
    serviceAnimation = servicePanel.animate(
      [{ opacity: reducedMotion.matches ? .85 : .55 }, { opacity: 1 }],
      { duration: reducedMotion.matches ? 80 : 180, easing: 'ease-out' }
    );
  }
  if (focus) selected.focus({ preventScroll: true });
}

serviceTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectService(tab.dataset.service));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % serviceTabs.length;
    if (event.key === 'ArrowUp') next = (index + serviceTabs.length - 1) % serviceTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = serviceTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectService(serviceTabs[next].dataset.service, true);
    }
  });
});

document.querySelectorAll('[data-mobile-service]').forEach(disclosure => {
  disclosure.addEventListener('toggle', () => {
    if (!disclosure.open) return;
    document.querySelectorAll('[data-mobile-service]').forEach(other => {
      if (other !== disclosure) other.open = false;
    });
    selectService(disclosure.dataset.mobileService);
  });
});
reducedMotion.addEventListener('change', () => serviceAnimation?.cancel());

function updateQuestions() {
  const selected = serviceById.get(careType.value);
  const questions = [
    ...(selected?.questions || [
      'What type of support matches the person’s daily needs?',
      'Is a clinical assessment needed before deciding on care?'
    ]),
    'Is support available in my area and preferred timeframe?',
    'What is included in the quote and the care routine?',
    'How will the family receive updates and raise concerns?'
  ];
  document.querySelector('#care-questions').innerHTML = questions.map(question => `<li>${escapeHtml(question)}</li>`).join('');
  return questions;
}

function returnToForm() {
  form.hidden = false;
  careResult.hidden = true;
  status.textContent = '';
}
document.addEventListener('click', event => {
  const link = event.target.closest('[data-plan]');
  if (!link) return;
  const id = link.dataset.plan;
  if (!serviceById.has(id)) return;
  returnToForm();
  careType.value = id;
  updateQuestions();
});
careType.addEventListener('change', updateQuestions);
const requestedCare = new URLSearchParams(location.search).get('care');
if (serviceById.has(requestedCare)) careType.value = requestedCare;
updateQuestions();

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const serviceName = serviceById.get(data.service)?.name || 'Help choosing care';
  const questions = updateQuestions();
  document.querySelector('#care-summary').innerHTML = `<div><dt>Support to discuss</dt><dd>${escapeHtml(serviceName)}</dd></div><div><dt>Preferred timing</dt><dd>${escapeHtml(data.timing)}</dd></div>`;
  careNote = `Gentle Hands Home Care — Care planning note\n\nSupport to discuss: ${serviceName}\nPreferred timing: ${data.timing}\n\nQuestions for the conversation:\n${questions.map((question, i) => `${i + 1}. ${question}`).join('\n')}\n\nConfirm service scope, suitability, availability and terms directly before arranging care. This note has not been submitted as an enquiry.`;
  form.hidden = true;
  careResult.hidden = false;
  status.textContent = '';
  document.querySelector('#result-title').focus({ preventScroll: true });
});
document.querySelector('#edit-note').addEventListener('click', () => {
  returnToForm();
  careType.focus({ preventScroll: true });
});
document.querySelector('#copy-note').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(careNote);
    status.textContent = 'Care note copied. No enquiry has been sent.';
  } catch {
    status.textContent = 'Copy isn’t available here. You can download the note instead.';
  }
});
document.querySelector('#download-note').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([careNote], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gentle-hands-care-note.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Care note ready to save. No enquiry has been sent.';
});
