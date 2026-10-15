'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';navigation.classList.toggle('open',!expanded);toggle.setAttribute('aria-expanded',String(!expanded));});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
const tools=document.querySelector('.publication-tools');
const search=document.querySelector('#paper-search');
const count=document.querySelector('#paper-count');
const papers=[...document.querySelectorAll('.publication')];
const filters=[...document.querySelectorAll('.filter')];
let active='All topics';
let scope='all';
const scopes=[...document.querySelectorAll('.scope')];
function updatePapers(){const terms=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);let shown=0;papers.forEach(p=>{const matchesTopic=active==='All topics'||p.dataset.topics.split('|').includes(active);const matchesSearch=terms.every(term=>p.dataset.search.includes(term));const matchesScope=scope==='all'||p.dataset.selected==='true';p.hidden=!(matchesTopic&&matchesSearch&&matchesScope);if(!p.hidden)shown++;});count.textContent=shown+' '+(shown===1?'publication':'publications');document.querySelector('.empty').hidden=shown!==0;}
function setFilter(value){active=value;filters.forEach(b=>{const selected=b.dataset.filter===value;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});updatePapers();}
filters.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
scopes.forEach(b=>b.addEventListener('click',()=>{scope=b.dataset.scope;scopes.forEach(x=>{const selected=x===b;x.classList.toggle('active',selected);x.setAttribute('aria-pressed',String(selected));});updatePapers();}));
search.addEventListener('input',updatePapers);
document.querySelectorAll('[data-filter-link]').forEach(a=>a.addEventListener('click',()=>{search.value='';setFilter(a.dataset.filterLink);}));
tools.hidden=false;
