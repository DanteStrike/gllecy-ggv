//  ---- Polyfill focusWithin

import focusWithin from 'focus-within';
focusWithin(document);

//  ------------------------------------------------\\

if (document.querySelector(`.index`)) {
  require(`../js/slider.js`);
}

if (document.querySelector(`.catalog`)) {
  require(`../js/range.js`);
}
