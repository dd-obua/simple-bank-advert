'use strict';

// Select elements
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const btnScrollTo = select('.btn--scroll-to');
const section1 = select('#section--1');
const modal = select('.modal');
const overlay = select('.overlay');
const btnCloseModal = select('.btn--close-modal');
const btnsOpenModal = selectAll('.btn--show-modal');
const navLinks = select('.nav__links');
const tabs = selectAll('.operations__tab');
const tabsContainer = select('.operations__tab-container');
const tabsContents = selectAll('.operations__content');
const nav = select('.nav');

// Modal window
const openModal = (event) => {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  event.key === 'Escape' && !modal.classList.contains('hidden') && closeModal();
});

btnScrollTo.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

navLinks.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    id.includes('section') && select(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', (event) => {
  const clicked = event.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  tabsContents.forEach((content) =>
    content.classList.remove('operations__content--active')
  );

  // Active tabs and content area
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleEvent = (event) => {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    const value = event.type === 'mouseover' ? 0.3 : 1;
    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = value;
    });
    logo.style.opacity = value;
  }
};

nav.addEventListener('mouseover', handleEvent);
nav.addEventListener('mouseout', handleEvent);
