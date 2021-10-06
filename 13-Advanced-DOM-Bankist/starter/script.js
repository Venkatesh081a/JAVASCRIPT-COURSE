'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Selecting , Creating and Deleting Elements

// 1. Selecting Elements
// ------------------------------
// to select the entire html
console.log(document.documentElement);

console.log(document.head);
console.log(document.body);

document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('features__header'));
console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we use cookies for improved functionality and analytics.<button class = "btn btn-close-cookie"> Got it! </button>';
const header = document.querySelector('.header');

header.prepend(message);
header.append(message);

header.before(message);
header.after(message);

// Deleting elements
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = 'blue';
message.style.width = '120%';

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'pink');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

logo.alt = 'Beautiful logo';

// Non-standard property
console.log(logo.designer);

console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Mindtree');

console.log(logo.src);
console.log(logo.getAttribute('src'));

// Data Attributes
console.log(logo.dataset.versionNumber);

// Implementing Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1Coord = section1.getBoundingClientRect();
  console.log(s1Coord);

  console.log(e.target.getBoundingClientRect());

  console.log(
    'Current Scroll position (x/y)',
    window.pageXOffset,
    window.pageYOffset
  );

  console.log(
    'height/width  viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling
  // window.scrollTo(
  //   s1Coord.left + window.pageXOffset,
  //   s1Coord.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1Coord.left + window.pageXOffset,
  //   top: s1Coord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // placewhereyouwanttoscrollto.scrollIntoView({ behavior: 'smooth' });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Types of Events and EventHandlers
const h1 = document.querySelector('h1');

const alertH1 = function () {
  alert('you are reading the heading');
};

h1.addEventListener('mouseover', alertH1);

// removing an event listener
setTimeout(() => h1.removeEventListener('mouseover', alertH1), 3000);

// h1.onmouseover = function () {
//   alert('you are reading the heading2');
// };

// EVENT PROPAGATION : BUBBLING and CAPTURING
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
//console.log(randomInt(1, 10));
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // target refers to the element on which actual click happened
  // currentTarget refers to the element to which the Event listener is attached
  //console.log('LINK', e.target, e.currentTarget);
  //console.log(e.currentTarget === this);

  // stop propagation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('NAV', e.target, e.currentTarget);
});

// Implementing Page Navigation : without EVENT DELIGATION

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();
//     const hrefId = this.getAttribute('href');
//     //console.log(hrefId);
//     document.querySelector(hrefId).scrollIntoView({ behavior: 'smooth' });
//   });
// });

/* Implementing Page Navigation : Using EVENT DELIGATION 
------------------------------------------------------------------------------
steps :
1) Add Event Listener to Common Parent Element
2) In that Event Listener Determine which element originated the event
*/

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //target refers to the element on which the actual click happened
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const hrefId = e.target.getAttribute('href');
    document.querySelector(hrefId).scrollIntoView({ behavior: 'smooth' });
  }
});

/* DOM Traversing 
----------------------------------------------
DOM Traversing is basically walking through the DOM , which means 
we can select One element based on Other element.
*/

const h1Element = document.querySelector('h1');

// Going Downwards : Selecting Child Elements
console.log(h1.querySelectorAll('.highlight'));
// TO get all directchild elements of h1
console.log(h1.children);

console.log(h1.childNodes);

h1.firstElementChild.style.backgroundColor = 'blue';
h1.lastElementChild.style.backgroundColor = 'pink';

// Going Upwards : Selecting Parent Elements
console.log(h1.parentElement);
console.log(h1.parentNode);
// finds the closest parent , no matter how far it is in the DOM tree
h1.closest('.header').style.background = 'var( --gradient-secondary)';
h1.closest('h1').style.background = 'var( --gradient-primary)';

// Going SideWays : Selecting Sibling Elements
// In JS we can access only Direct Siblings(next and previous)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// To get all the siblings
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (i) {
  if (i != h1) i.style.transform = 'scale(0.5)';
});

// Building a TABBED COMPONENT

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  //console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return;

  // Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active Content area
  console.log(clicked.dataset.tab);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/* Passing Arguments to Event Handlers 
-----------------------------------------------------------------
Menu Fade Animation
-----------------------
*/
const HandleHover = function (e) {
  //console.log(this);
  //console.log(e.target);
  if (e.target.classList.contains('.nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(element => {
      if (element !== link) {
        element.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function (e) {
//   HandleHover(e, 0.5);
// });
nav.addEventListener('mouseover', HandleHover.bind(0.5));
nav.addEventListener('mouseout', HandleHover.bind(1));

// Sticky Navigation bar : using scroll Event
// const initialCoord = section1.getBoundingClientRect();
// console.log(initialCoord);
// window.addEventListener('scroll', function () {
//   console.log(this.window.scrollY);

//   if (this.window.scrollY > initialCoord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/* Sticky Navigation bar : using The Intersection Observer API 
--------------------------------------------------------------------------
Intersection Observer API : This API allows our code to basically observe changes to the way
that a certain target element intersects another element or viewport
*/
// const observeCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observeCallBack, observerOptions);
// observer.observe(section1);

const headerElement = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headerElement);

/*  Revealing Elements on Scroll 
--------------------------------------------
Reveal Sections 
*/
const allSections1 = document.querySelectorAll('.section');
//console.log(allSections1);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections1.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading of Images

const ImageTargets = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // If intersection replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0.1,
  rootMargin: '-200px',
});

ImageTargets.forEach(function (image) {
  imageObserver.observe(image);
});

// Building Slider Component
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const maxSlides = slides.length;

// Handling Dot events to move slides
const dotContainer = document.querySelector('.dots');

// Creating and Adding dots to each slide
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}">`
    );
  });
};
createDots();

const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDots(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  // going back to first slide again when we reaches the last slide
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const previousSlide = function () {
  // going back to last slide again when we are the first slide
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// Go to Next Slide
// currentslide =1 then translate % is -100 , 0 , 100 , 200
btnRight.addEventListener('click', nextSlide);

// Go to Previous Slide
btnLeft.addEventListener('click', previousSlide);

// handling keyboard events to move slides
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
  if (e.key === 'ArrowLeft') {
    previousSlide();
  }
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log('DOT clicked');
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});
// to see all slides that are side by side
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-700px)';
// slider.style.overflow = 'visible';

// slides.forEach(
//   (slide, index) => (slide.style.transform = `translateX(${100 * index}%)`)
// );
// 0% 100% 200% 300%

// LifeCycle of DOM EVENTS

// 1 : this will not wait for Images and other stuff to load , just Html and js are enough
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parse and DOM Tree is built !', e);
});

// 2 : This will be triggered when the webpage is fully loaded
window.addEventListener('load', function (e) {
  console.log('Page fully Loaded', e);
});

// 3 . This will be triggered before a user tries to close the webpage
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  // To show a prompt , if user really wants to close page or not
  e.returnValue = '';
});
