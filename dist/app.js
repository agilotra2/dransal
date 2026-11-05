'use strict';

const services = {
  'ICU at Home': { icon:'activity', category:'CRITICAL & CLINICAL CARE', description:'Explore a clinically guided care environment at home, with equipment and support arranged around the person who needs it.', points:['Assessment with the treating doctor','Equipment selected for the patient’s care plan','Critical care nursing and family guidance'], note:'Home ICU care requires clinical assessment and is not suitable for every patient.' },
  'Nursing & Attendant Care': { icon:'nurse', category:'EVERYDAY SUPPORT', description:'From professional nursing to assistance with everyday routines, find support that fits your family’s needs.', points:['Nursing support based on clinical requirements','Help with mobility and everyday routines','Shift options to discuss with the care team'], note:'A nurse and an attendant have different training and responsibilities. Ask the team which is appropriate.' },
  'Physiotherapy': { icon:'movement', category:'RECOVERY & REHABILITATION', description:'Explore rehabilitation support at home with a plan shaped around individual goals, comfort, and clinical recommendations.', points:['Assessment of mobility and rehabilitation needs','Personalised exercises and progress reviews','Guidance for safe movement at home'], note:'The physiotherapist should assess suitability and explain the plan before treatment.' },
  'Lab Tests at Home': { icon:'flask', category:'DIAGNOSTICS', description:'Ask about arranging sample collection at home, with clear instructions for the tests your doctor has recommended.', points:['Test and location availability confirmation','Preparation instructions before the visit','Guidance on the process for receiving results'], note:'Confirm the tests, collection charges, and reporting times directly with the team.' },
  'Family & Emotional Support': { icon:'heart', category:'FAMILY WELLBEING', description:'Caring for someone can bring difficult decisions and emotions. Explore space to talk, ask questions, and find practical guidance.', points:['A conversation about your family’s concerns','Support in understanding care decisions','Guidance on the appropriate professional to consult'], note:'Ask the team about available counsellors, their qualifications, and the scope of support.' }
};
const dialog = document.querySelector('#care-dialog');
const content = document.querySelector('#dialog-content');
let previousFocus;
let enquiryDraft = {};
let finderState = {step:0, need:'', location:''};
const icon = id => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function showDialog(markup) {
  if (!dialog.open) { previousFocus = document.activeElement; dialog.showModal(); }
  content.innerHTML = markup;
  dialog.scrollTop = 0;
  const firstField = content.querySelector('input,select');
  if (firstField) firstField.focus({preventScroll:true});
  else document.querySelector('.dialog-close').focus({preventScroll:true});
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close(); } });
dialog.addEventListener('close', () => { if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true}); });

function showService(name) {
  const service = services[name];
  showDialog(`<div class="dialog-eyebrow">${service.category}</div><h2 class="dialog-title" id="dialog-title">${escapeHtml(name)}</h2><p class="dialog-description">${service.description}</p><ul class="dialog-points">${service.points.map(p=>`<li>${icon('check')}<span>${p}</span></li>`).join('')}</ul><button class="button dialog-button" id="service-enquire">Talk about this care ${icon('arrow-up-right')}</button><p class="dialog-note">${service.note}</p>`);
  content.querySelector('#service-enquire').addEventListener('click',()=>showEnquiry(name));
}

function showEnquiry(serviceName='') {
  if(serviceName)enquiryDraft.service=serviceName;
  showDialog(`<div class="dialog-eyebrow">ONE CONVERSATION IS A GOOD START.</div><h2 class="dialog-title" id="dialog-title">Let’s talk about care.</h2><p class="dialog-description">Prepare a short enquiry for the Kokoro team. You’ll review it before choosing to send it on WhatsApp.</p><form id="enquiry-form"><div class="field-row"><div class="form-field"><label for="enquiry-name">Your name</label><input id="enquiry-name" name="name" autocomplete="name" placeholder="How should we call you?" required maxlength="70" value="${escapeHtml(enquiryDraft.name||'')}"></div><div class="form-field"><label for="enquiry-city">City</label><input id="enquiry-city" name="city" autocomplete="address-level2" placeholder="e.g. Gurugram" required maxlength="70" value="${escapeHtml(enquiryDraft.city||'')}"></div></div><div class="form-field"><label for="enquiry-phone">Phone number</label><input id="enquiry-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="[+0-9 ()\\-]{10,20}" title="Enter a phone number with 10 to 15 digits." placeholder="+91 98765 43210" required maxlength="20" value="${escapeHtml(enquiryDraft.phone||'')}"></div><div class="form-field"><label for="enquiry-service">What can we help with?</label><select id="enquiry-service" name="service" required><option value="">Choose care</option>${[...Object.keys(services),'Help choosing care','Kokoro Force membership'].map(name=>`<option${name===enquiryDraft.service?' selected':''}>${escapeHtml(name)}</option>`).join('')}</select></div><p class="form-hint">Please leave medical records and detailed health information out of this enquiry. Nothing is sent or stored by this website.</p><button class="button dialog-button" type="submit">Review my enquiry ${icon('arrow-up-right')}</button></form><p class="dialog-note">This independent redesign uses Kokoro’s official WhatsApp contact. Availability and pricing must be confirmed by their team.</p>`);
  const form=content.querySelector('form');
  const phone=form.elements.phone;
  phone.addEventListener('input',()=>phone.setCustomValidity(''));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const digits=phone.value.replace(/\D/g,'');
    if(digits.length<10||digits.length>15){phone.setCustomValidity('Enter a valid phone number with 10 to 15 digits.');phone.reportValidity();return;}
    for(const name of ['name','city']){if(!form.elements[name].value.trim()){form.elements[name].setCustomValidity('Please enter a value.');form.elements[name].reportValidity();form.elements[name].addEventListener('input',()=>form.elements[name].setCustomValidity(''),{once:true});return;}}
    enquiryDraft=Object.fromEntries(new FormData(form));
    showReview();
  });
}

function showReview(){
  const draft=enquiryDraft;
  const message=`Hello Kokoro, I’d like to enquire about care.\nName: ${draft.name.trim()}\nCity: ${draft.city.trim()}\nPhone: ${draft.phone.trim()}\nInterested in: ${draft.service}\nPlease help me understand availability and next steps.`;
  const url=`https://wa.me/919220288870?text=${encodeURIComponent(message)}`;
  showDialog(`<div class="dialog-eyebrow">YOUR ENQUIRY, READY TO REVIEW.</div><h2 class="dialog-title" id="dialog-title">A little closer to care.</h2><p class="dialog-description">Check your details below. Continue to WhatsApp to review and send this enquiry to Kokoro at +91 92202 88870.</p><dl class="review-list">${[['Name',draft.name],['City',draft.city],['Phone',draft.phone],['Care',draft.service]].map(([label,value])=>`<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl><div class="form-status">Your enquiry has not been sent. WhatsApp will open with a prepared message; you decide when to send it.</div><div class="review-actions"><button class="button button-outline" id="edit-enquiry">Edit details</button><a class="button" href="${escapeHtml(url)}" target="_blank" rel="noopener">Continue on WhatsApp ${icon('arrow-up-right')}</a></div><p class="dialog-note">Your name, city, phone number, and selected care service will be included in the message to Kokoro.</p>`);
  content.querySelector('#edit-enquiry').addEventListener('click',()=>showEnquiry());
}

document.querySelectorAll('[data-enquire]').forEach(button=>button.addEventListener('click',()=>showEnquiry()));
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>showService(button.dataset.service)));
document.querySelectorAll('[data-quick]').forEach(button=>button.addEventListener('click',()=>showService(button.dataset.quick)));

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(filter=>{const selected=filter===button;filter.classList.toggle('active',selected);filter.setAttribute('aria-pressed',String(selected));});
  document.querySelectorAll('.service-card[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));

const equipment={
  monitoring:{icon:'activity',title:'A clearer picture, at the bedside.',description:'Monitoring devices help the clinical team track vital signs. Your doctor determines what is needed and how it should be monitored.',points:['Multiparameter monitoring','Respiratory support, when prescribed','Infusion and syringe pumps, as required']},
  comfort:{icon:'home-heart',title:'A room arranged around their needs.',description:'A suitable bedside setup can help the team provide care while keeping the space practical for your family.',points:['An adjustable care bed, when needed','Space for equipment and safe movement','A home environment assessment']},
  support:{icon:'nurse',title:'The people make the difference.',description:'Equipment is only part of the picture. Clinical guidance and trained support help your family understand the care routine.',points:['Nursing arranged around the care plan','Coordination with the treating doctor','Guidance for the patient’s family']}
};
function selectEquipment(button){
  document.querySelectorAll('[data-equipment]').forEach(tab=>{tab.setAttribute('aria-selected',String(tab===button));tab.tabIndex=tab===button?0:-1;});
  const item=equipment[button.dataset.equipment];
  const panel=document.querySelector('#equipment-panel');
  panel.setAttribute('aria-labelledby',button.id);
  panel.innerHTML=`<svg class="equipment-icon" aria-hidden="true"><use href="#${item.icon}"/></svg><h3>${item.title}</h3><p>${item.description}</p><ul>${item.points.map(point=>`<li>${point}</li>`).join('')}</ul>`;
}
const equipmentTabs=[...document.querySelectorAll('[data-equipment]')];
equipmentTabs.forEach((button,index)=>{button.addEventListener('click',()=>selectEquipment(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%equipmentTabs.length;if(event.key==='ArrowLeft')next=(index+equipmentTabs.length-1)%equipmentTabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=equipmentTabs.length-1;if(next!==undefined){event.preventDefault();selectEquipment(equipmentTabs[next]);equipmentTabs[next].focus();}});});

const finderNeeds=[['critical','Critical care or a hospital-to-home transition'],['daily','Nursing or help with everyday routines'],['recovery','Movement and recovery support'],['unsure','I’m not sure yet']];
function openFinder(){finderState={step:0,need:'',location:''};renderFinder();}
document.querySelector('#finder-open').addEventListener('click',openFinder);
document.querySelector('#finder-card').addEventListener('click',openFinder);
function renderFinder(){
  const progress=`<div class="finder-progress" aria-label="Step ${finderState.step+1} of 3">${[0,1,2].map(i=>`<span class="${i<=finderState.step?'done':''}"></span>`).join('')}</div>`;
  if(finderState.step===0){
    showDialog(`${progress}<div class="dialog-eyebrow">LET’S FIND YOUR STARTING POINT</div><h2 class="dialog-title" id="dialog-title">What kind of support<br>are you looking for?</h2><p class="dialog-description">A couple of simple questions can help you start the conversation. This is not a clinical assessment.</p><div class="finder-options">${finderNeeds.map(([value,label])=>`<button class="finder-option" data-need="${value}">${label}${icon('arrow-up-right')}</button>`).join('')}</div>`);
    content.querySelectorAll('[data-need]').forEach(button=>button.addEventListener('click',()=>{finderState.need=button.dataset.need;finderState.step=1;renderFinder();}));
  }else if(finderState.step===1){
    showDialog(`${progress}<div class="dialog-eyebrow">A LITTLE CONTEXT HELPS</div><h2 class="dialog-title" id="dialog-title">Where are you<br>in your care journey?</h2><div class="finder-options">${[['hospital','Planning a hospital discharge'],['home','Already caring for someone at home'],['planning','Exploring options for the future']].map(([value,label])=>`<button class="finder-option" data-location="${value}">${label}${icon('arrow-up-right')}</button>`).join('')}</div><button class="finder-back" id="finder-back">← Back</button>`);
    content.querySelectorAll('[data-location]').forEach(button=>button.addEventListener('click',()=>{finderState.location=button.dataset.location;finderState.step=2;renderFinder();}));
    content.querySelector('#finder-back').addEventListener('click',()=>{finderState.step=0;renderFinder();});
  }else{
    const name={critical:'ICU at Home',daily:'Nursing & Attendant Care',recovery:'Physiotherapy',unsure:'Help choosing care'}[finderState.need];
    const description=finderState.need==='unsure'?'A conversation with the care team is a useful first step. You don’t need to decide on a service before you get in touch.':`You can start by asking the team about ${name.toLowerCase()}. They’ll need to assess your family’s circumstances before recommending a plan.`;
    const context={hospital:'Ask about assessment and care coordination before discharge.',home:'Ask how the care plan can fit your current home routine.',planning:'Ask about the options, availability, and the steps to arrange care.'}[finderState.location];
    showDialog(`${progress}<div class="dialog-eyebrow">A STARTING POINT FOR YOUR CONVERSATION</div><h2 class="dialog-title" id="dialog-title">Let’s take it<br>one step at a time.</h2><div class="recommendation">${icon(services[name]?.icon||'chat')}<h3>${name}</h3><p>${description}</p><p style="margin-top:12px">${context}</p></div><button class="button dialog-button" id="finder-enquire">Prepare an enquiry ${icon('arrow-up-right')}</button><button class="finder-restart" id="finder-restart">Start again</button><p class="dialog-note">This guide is for service navigation only. The treating doctor and care team determine the appropriate care.</p>`);
    content.querySelector('#finder-enquire').addEventListener('click',()=>showEnquiry(name));
    content.querySelector('#finder-restart').addEventListener('click',openFinder);
  }
}

const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');}
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';mobileNav.hidden=expanded;menuToggle.setAttribute('aria-expanded',String(!expanded));menuToggle.setAttribute('aria-label',expanded?'Open navigation':'Close navigation');});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menuToggle.focus();}});
window.matchMedia('(min-width: 851px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
