'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = open;
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus({ preventScroll: true });
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const faqSearch = document.querySelector('#faq-search');
if (faqSearch) {
  const groups = [...document.querySelectorAll('[data-faq-group]')];
  const items = [...document.querySelectorAll('[data-faq-item]')];
  faqSearch.addEventListener('input', () => {
    const query = faqSearch.value.trim().toLocaleLowerCase();
    let count = 0;
    items.forEach(item => {
      const matches = item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) count++;
    });
    groups.forEach(group => {
      group.hidden = ![...group.querySelectorAll('[data-faq-item]')].some(item => !item.hidden);
    });
    document.querySelector('#faq-empty').hidden = count > 0;
    document.querySelector('#faq-status').textContent = query ? `${count} ${count === 1 ? 'answer' : 'answers'} found` : '';
    document.querySelector('#clear-faq').hidden = !query;
  });
  document.querySelector('#clear-faq').addEventListener('click', () => {
    faqSearch.value = '';
    faqSearch.dispatchEvent(new Event('input'));
    faqSearch.focus();
  });
  document.querySelectorAll('.faq-topics nav a').forEach(link => link.addEventListener('click', () => {
    if (!faqSearch.value) return;
    faqSearch.value = '';
    faqSearch.dispatchEvent(new Event('input'));
  }));
}
