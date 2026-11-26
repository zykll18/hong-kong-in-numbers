// main.js — tiny hash router. Reads the hash, renders the matching
// view into #view, marks the active nav link and sets the page title.
// No network, no framework: the whole site is these files.

import { SITE } from './data.js';
import { ROUTES } from './views.js';

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('[data-route]')];

function currentRoute() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1).split('?')[0] || '/';
  return ROUTES[path] ? path : '/';
}

function render() {
  const path = currentRoute();
  const route = ROUTES[path];
  try {
    view.innerHTML = route.render();
  } catch (err) {
    // Never leave a blank page: show what went wrong instead.
    view.innerHTML = '<section class="card"><h1>Something went wrong</h1>'
      + '<p>This page could not be rendered. Please try another section from the menu above.</p></section>';
    console.error('render failed for', path, err);
  }
  document.title = `${route.title} · ${SITE.name}`;
  for (const link of navLinks) {
    const on = link.getAttribute('href') === `#${path}`;
    link.classList.toggle('active', on);
    if (on) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
