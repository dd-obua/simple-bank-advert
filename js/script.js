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
const header = select('header');
const sections = selectAll('section');
const imageTargets = selectAll('img[data-src]');
const slider = select('.slider');
const slides = selectAll('.slide');
const btnLeft = select('.slider__btn--left');
const btnRight = select('.slider__btn--right');
const dotsContainer = select('.dots');

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

    const opcityValue = event.type === 'mouseover' ? 0.3 : 1;
    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = opcityValue;
    });
    logo.style.opacity = opcityValue;
  }
};

nav.addEventListener('mouseover', handleEvent);
nav.addEventListener('mouseout', handleEvent);

// Sticky navigation using IntersectionObserver API
const stickNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const options = { root: null, threshold: 0, rootMargin: `-${navHeight}px` };
const headerObserver = new IntersectionObserver(stickNav, options);
headerObserver.observe(header);

// Reveal section
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  const observedSection = entry.target;
  observedSection.classList.remove('section--hidden');
  observer.unobserve(observedSection);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const loadImage = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  const targetImg = entry.target;
  targetImg.src = targetImg.dataset.src;

  targetImg.addEventListener('load', () => {
    targetImg.classList.remove('lazy-img');
  });

  observer.unobserve(targetImg);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
});

imageTargets.forEach((img) => imageObserver.observe(img));

// Slider
const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDot = (slide) => {
  selectAll('.dots__dot').forEach((dot) => {
    dot.classList.remove('dots__dot--active');
  });
  select(`.dots__dot[data-slide='${slide}'`).classList.add('dots__dot--active');
};

let position = 0;

const goToSlide = (position) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - position) * 100}%)`)
  );
};

const next = () => {
  if (position === slides.length - 1) position = 0;
  else position++;
  goToSlide(position);
  activeDot(position);
};

const previous = () => {
  if (position === 0) position = slides.length - 1;
  else position--;
  goToSlide(position);
  activeDot(position);
};

const init = () => {
  createDots();
  goToSlide(0); // Initial slide arrangement
  activeDot(0); // Initial active dot
};

init();

btnRight.addEventListener('click', next);
btnLeft.addEventListener('click', previous);

document.addEventListener('keydown', (event) => {
  event.key === 'ArrowRight' && next();
  event.key === 'ArrowLeft' && previous();
});

dotsContainer.addEventListener('click', (event) => {
  const clickedDot = event.target;
  if (!clickedDot.classList.contains('dots__dot')) return;
  const { slide } = clickedDot.dataset;
  goToSlide(slide);
  activeDot(slide);
});
