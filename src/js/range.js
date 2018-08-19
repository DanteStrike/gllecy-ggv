//  Service

function getOffsetRect(elem) {

  let box = elem.getBoundingClientRect()

  let body = document.body
  let docElem = document.documentElement

  let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

  let clientTop = docElem.clientTop || body.clientTop || 0
  let clientLeft = docElem.clientLeft || body.clientLeft || 0

  let top  = box.top +  scrollTop - clientTop
  let left = box.left + scrollLeft - clientLeft

  let elemCoords = {
    top: Math.round(top),
    left: Math.round(left)
  }

  return elemCoords;
}

//  --------------------------------------------------------------------------------------

let filterPrice = document.querySelector(`.filter-price`);
let rangeBar = filterPrice.querySelector(`.filter-price__range-bar`);
let rangeScale = rangeBar.querySelector(`.filter-price__range-scale`);
let rangeToggleMin = rangeBar.querySelector(`.filter-price__range-toggle--min`);
let rangeToggleMax = rangeBar.querySelector(`.filter-price__range-toggle--max`);

let priceMin = filterPrice.querySelector(`.filter-price__min`);
let priceMax = filterPrice.querySelector(`.filter-price__max`);

const MIN_VALUE = 0;
const MAX_VALUE = 999;

let rangeToggleDelta = Math.round(rangeToggleMin.clientWidth / 2);
let pxStep = (MAX_VALUE - MIN_VALUE) / rangeBar.clientWidth;

let onRangeToggleMouseDown = function (evt) {
  evt.preventDefault();

  let target = event.target;
  let targetCoordX = getOffsetRect(target).left;
  let mouseStartCoordX = evt.clientX;
  let mouseTargetPositionX = mouseStartCoordX - targetCoordX;

  let rangeBorderLeft;
  let rangeBorderRight;

  switch (target) {
    case rangeToggleMin:
      rangeBorderLeft = 0 - rangeToggleDelta;
      rangeBorderRight = parseInt(getComputedStyle(rangeToggleMax).left);
      break;

    case rangeToggleMax:
      rangeBorderLeft = parseInt(getComputedStyle(rangeToggleMin).left);
      rangeBorderRight = rangeBar.clientWidth - rangeToggleDelta;
      break;

    default:
      rangeBorderLeft = 0 - rangeToggleDelta;
      rangeBorderRight = rangeBar.clientWidth - rangeToggleDelta;
      break;
  }

  let onThisMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let mouseMoveCoordX = moveEvt.clientX;
    let newTargetCoordX = target.offsetLeft + mouseMoveCoordX - mouseTargetPositionX - targetCoordX;

    if ((newTargetCoordX >= rangeBorderLeft) && (newTargetCoordX <= rangeBorderRight)) {
      target.style.left = newTargetCoordX + `px`;
      targetCoordX = getOffsetRect(target).left;

      switch (target) {
        case rangeToggleMin:
          rangeScale.style.marginLeft = parseInt(getComputedStyle(rangeToggleMin).left) + rangeToggleDelta + `px`;
          priceMin.value = Math.round(MIN_VALUE + parseInt(rangeScale.style.marginLeft) * pxStep);
          break;

        case rangeToggleMax:
          rangeScale.style.marginRight = Math.abs(rangeBar.clientWidth - parseInt(getComputedStyle(rangeToggleMax).left)) - rangeToggleDelta + `px`;
          priceMax.value = Math.round(MAX_VALUE - parseInt(rangeScale.style.marginRight) * pxStep);
          break;
      }
    }

    return;
  }

  let onThisMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onThisMouseMove);
    document.removeEventListener(`mouseup`, onThisMouseUp);

    return;
  }

  document.addEventListener(`mousemove`, onThisMouseMove)
  document.addEventListener(`mouseup`, onThisMouseUp);

  return;
}

let onPriceInputKeyDown = function (evt) {
  let target = evt.target;
  let oldValue = +target.value;

  let onThisKeyUp = function (upEvt) {
    let target = upEvt.target;
    let newValue = +target.value;

    if ((newValue < MIN_VALUE) || (newValue > MAX_VALUE)) {
      evt.preventDefault();

      alert(`${MIN_VALUE} <= Price Value <= ${MAX_VALUE}`);
      target.value = `${oldValue}`;
    }

    target.removeEventListener(`keyup`, onThisKeyUp);

    return;
  }

  target.addEventListener(`keyup`, onThisKeyUp);

  return;
}

let onPriceInputChange = function (evt) {
  let target = evt.target;
  let currentValue = +target.value;

  switch (target) {
    case priceMin:
      if (currentValue > +priceMax.value) {
        alert(`Min Value cant be > ${priceMax.value}`);
        currentValue = MIN_VALUE;
        priceMin.value = `${MIN_VALUE}`;
      }

      rangeToggleMin.style.left = currentValue / pxStep - rangeToggleDelta + `px`;
      rangeScale.style.marginLeft = parseInt(getComputedStyle(rangeToggleMin).left) + rangeToggleDelta + `px`;
      break;

    case priceMax:
      if (currentValue < +priceMin.value) {
        alert(`Max Value cant be < ${priceMin.value}`);
        currentValue = MAX_VALUE;
        priceMax.value = `${MAX_VALUE}`;
      }

      rangeToggleMax.style.left = currentValue / pxStep - rangeToggleDelta + `px`;
      rangeScale.style.marginRight = Math.abs(rangeBar.clientWidth - parseInt(getComputedStyle(rangeToggleMax).left)) - rangeToggleDelta + `px`;
      break;
  }

  return;
}

let onDocumentLoad = function (evt) {
  rangeScale.style.width = `auto`;
  rangeScale.style.marginLeft = parseInt(getComputedStyle(rangeToggleMin).left) + rangeToggleDelta + `px`;
  rangeScale.style.marginRight = Math.abs(rangeBar.clientWidth - parseInt(getComputedStyle(rangeToggleMax).left)) - rangeToggleDelta + `px`;

  priceMin.value = Math.round(MIN_VALUE + parseInt(rangeScale.style.marginLeft) * pxStep);
  priceMax.value = Math.round(MAX_VALUE - parseInt(rangeScale.style.marginRight) * pxStep);

  rangeToggleMin.addEventListener(`mousedown`, onRangeToggleMouseDown);
  rangeToggleMax.addEventListener(`mousedown`, onRangeToggleMouseDown);

  priceMin.addEventListener(`keydown`, onPriceInputKeyDown);
  priceMax.addEventListener(`keydown`, onPriceInputKeyDown);

  priceMin.addEventListener(`change`, onPriceInputChange);
  priceMax.addEventListener(`change`, onPriceInputChange);
  return;
}

document.addEventListener(`DOMContentLoaded`, onDocumentLoad);
