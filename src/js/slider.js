
const CONTAINER_BACKGROUNDS_LOC = `../img/ice-background--`;
const INDEX_BACKGROUND_COLOR = `index--bg-`;

let index = document.querySelector(`.index`);
let container = index.querySelector(`.container`);
let slides = container.querySelector(`.slider__list`);
let sliderControl = container.querySelector(`.slider__control-list`);


let onSliderControlClick = function (evt) {
  if ((evt.target.classList.contains(`slider__control-btn--active`)) ||
      (evt.target.tagName !== `BUTTON`)) {
    return;
  }

  let broker = evt.currentTarget;

  let activeButton = broker.querySelector(`.slider__control-btn--active`);
  let activeSlide = slides.querySelector(`.slider__item--active`);

  let target = evt.target;
  let targetSliderId = target.dataset.sliderId;
  let targetSlide = slides.querySelector(`[data-slider-id="${targetSliderId}"]`);

  activeButton.classList.toggle(`slider__control-btn--active`);
  activeSlide.classList.toggle(`slider__item--active`);

  target.classList.toggle(`slider__control-btn--active`);
  targetSlide.classList.toggle(`slider__item--active`);

  index.classList.remove(``);
}

sliderControl.addEventListener(`click`, onSliderControlClick)
