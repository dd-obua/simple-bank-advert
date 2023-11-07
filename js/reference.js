'use strict';

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// console.log(header);

// const sections = document.querySelectorAll('.section');
// console.log(sections);

// console.log(document.getElementById('section--1'));

// const btns = document.getElementsByTagName('button');
// console.log(btns);

// const btnClasses = document.getElementsByClassName('btn');
// console.log(btnClasses);

// // insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML = `We use cookies for improved functionality and analytics.  <button class="btn btn--close-cookie">Got it!</button>`;

// const main = select('main');
// const footer = select('footer');

// header.prepend(message);
// // header.append(message.cloneNode(true));
// // header.append(message);
// // footer.before(message);
// // main.before(message.cloneNode(true));

// // Delete elements
// const closeCookie = select('.btn--close-cookie');
// console.log(closeCookie);

// // closeCookie.addEventListener('click', () => message.removeChild(message));
// closeCookie.addEventListener('click', () => message.remove());

// // main.insertAdjacentHTML(
// //   'afterbegin',
// //   `We use cookies for improved functionality and analytics.  <button class="btn btn--close-cookie">Got it!</button>`
// // );

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.width);
// console.log(message.style.height);
// console.log(message.style.color);

// const computedStyles = getComputedStyle(message);
// console.log(computedStyles);
// const computedColor = computedStyles.color;
// console.log(computedColor);
// const height = Number.parseFloat(computedStyles.height, 10) + 40 + 'px';
// console.log(height);

// // Custom properties (i.e. CSS Variables)
// document.documentElement.style.setProperty('--color-primary', 'yellowgreen');

// // Attributes
// // Standard attribute
// const logo = select('.nav__logo');
// console.log(logo);
// console.log('alt:', logo.alt);
// console.log('source:', logo.src);
// console.log('class:', logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log('alt:', logo.alt);

// // Non-standard attribute
// console.log('designer:', logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const twitterLink = select('.twitter-link');
// console.log(twitterLink.href);

// const navLink = select('.nav__link--btn');
// console.log('nav url:', navLink.href);
// console.log('nav url:', navLink.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset);
// console.log(logo.dataset.versionNumber);

// // Classes
// // logo.classList.add('');
// // logo.classList.remove('');
// // logo.classList.toggle('');
// logo.classList.contains('');

// // logo.className = 'dan';

////////////////////////////////////////
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const btnScrollTo = select('.btn--scroll-to');
const section1 = select('#section--1');

// btnScrollTo.addEventListener('click', (event) => {
//   const s1cords = section1.getBoundingClientRect();
//   console.log(s1cords);
//   console.log(event.target.getBoundingClientRect());
//   console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset);
//   console.log(
//     'Viewport width/height:',
//     document.documentElement.clientWidth,
//     document.documentElement.clientHeight
//   );

//   window.scrollTo({
//     left: s1cords.left + window.pageXOffset,
//     top: s1cords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// });

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = select('h1');
const alertH1 = () => alert('Reading the heading!');

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

// Event Capturing and Bubbling

// Random color
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () => {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
};

const navLinks = select('.nav__links');
const navItem = select('.nav__item');
const nav = select('.nav');

// nav.addEventListener('click', (event) => {
//   event.preventDefault();
//   event.currentTarget.style.background = randomColor();
//   console.log(event.target);

//   // event.stopPropagation();
// });

// navLinks.addEventListener('click', (event) => {
//   event.preventDefault();
//   event.currentTarget.style.background = randomColor();
//   console.log(event.target);
// });

// navItem.addEventListener('click', (event) => {
//   event.preventDefault();
//   event.currentTarget.style.background = randomColor();
//   console.log(event.target);
// });

const links = selectAll('.nav__link');

// links.forEach((link) =>
//   link.addEventListener('click', (event) => {
//     event.preventDefault();
//
//   })
// );

// nav.addEventListener('click', (event) => {
//   event.preventDefault();
//   const clicked = event.target;
//   if (clicked.classList.contains('nav__link')) {
//     const id = clicked.getAttribute('href');
//     select(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// DOM Traversing
// console.log(h1);

const highlighted = h1.querySelectorAll('.highlight');
// console.log(highlighted);
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

// h1.firstElementChild.style.color = '#fff';
// h1.lastElementChild.style.color = 'red';

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// console.log(h1.closest('.header'));
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.color = '#000';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach((el) => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

const tabs = selectAll('.operations__tab');
const tabContainer = select('.operations__tab-container');
const tabContent = selectAll('.operations__content');

tabContainer.addEventListener('click', (event) => {
  const clicked = event.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove active class
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  tabContent.forEach((content) =>
    content.classList.remove('operations__content--active')
  );

  // Active tab and content
  clicked.classList.add('operations__tab--active');
  select(`.operations__content--${clicked.dataset.tab}`).classList.add(
    'operations__content--active'
  );
});

// classList.add('operations__content--active');

// DOM Events

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log('HTML parsed and DOM tree built.');
//   console.log(event);
// });

// window.addEventListener('load', (event) => {
//   console.log('Page fully loaded');
//   console.log(event);
// });

// window.addEventListener('beforeunload', (event) => {
//   event.preventDefault();
//   console.log(event);
//   event.returnValue = '';
// });
