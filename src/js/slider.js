
const INDEX_BACKGROUND_COLOR_PREFIX = `index--bg`;
const CONTAINER_BACKGROUND_PREFIX = `index__container--bg`;

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
  let activeId = activeButton.dataset.sliderId;
  let activeSlide = slides.querySelector(`.slider__item--active`);

  let target = evt.target;
  let targetId = target.dataset.sliderId;
  let targetSlide = slides.querySelector(`[data-slider-id="${targetId}"]`);

  activeButton.classList.toggle(`slider__control-btn--active`);
  activeSlide.classList.toggle(`slider__item--active`);
  index.classList.remove(`${INDEX_BACKGROUND_COLOR_PREFIX}-${activeId}`);
  container.classList.remove(`${CONTAINER_BACKGROUND_PREFIX}-${activeId}`);

  target.classList.toggle(`slider__control-btn--active`);
  targetSlide.classList.toggle(`slider__item--active`);
  index.classList.add(`${INDEX_BACKGROUND_COLOR_PREFIX}-${targetId}`);
  container.classList.add(`${CONTAINER_BACKGROUND_PREFIX}-${targetId}`);
}

sliderControl.addEventListener(`click`, onSliderControlClick);
