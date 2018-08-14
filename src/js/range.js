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

let rangeBar = document.querySelector(`.filter-price__range-bar`);
let rangeScale = rangeBar.querySelector(`.filter-price__range-scale`);
let rangeToggleMin = rangeBar.querySelector(`.filter-price__range-toggle--min`);
let rangeToggleMax = rangeBar.querySelector(`.filter-price__range-toggle--max`);

const RANGE_BORDER_LEFT = 0 - Math.round(rangeToggleMin.clientWidth / 2);
const RANGE_BORDER_RIGHT = rangeBar.clientWidth - Math.round(rangeToggleMin.clientWidth / 2);

console.log(RANGE_BORDER_LEFT);
console.log(RANGE_BORDER_RIGHT)

let onRangeToggleMouseDown = function (evt) {
  evt.preventDefault();

  let target = event.target;
  let targetCoordX = getOffsetRect(target).left;
  let mouseStartCoordX = evt.clientX;
  let mouseTargetPositionX = mouseStartCoordX - targetCoordX;

  let onThisMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let mouseMoveCoordX = moveEvt.clientX;
    let newTargetCoordX = target.offsetLeft + mouseMoveCoordX - mouseTargetPositionX - targetCoordX;

    if ((newTargetCoordX >= RANGE_BORDER_LEFT) && (newTargetCoordX <= RANGE_BORDER_RIGHT)) {
      target.style.left = target.offsetLeft + mouseMoveCoordX - mouseTargetPositionX - targetCoordX + `px`;
      targetCoordX = getOffsetRect(target).left;
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

rangeToggleMin.addEventListener(`mousedown`, onRangeToggleMouseDown);
rangeToggleMax.addEventListener(`mousedown`, onRangeToggleMouseDown);


