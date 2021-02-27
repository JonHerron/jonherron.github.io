const _CARD = document.querySelector('.card');

let rect;

function setRect() { rect = _CARD.getBoundingClientRect() }

setRect();

addEventListener('input', e => {
	_CARD.style.setProperty('--k', +e.target.value)
}, false);

addEventListener('resize', e => setRect, false);

_CARD.addEventListener('mousemove', e => {
	_CARD.style.setProperty('--i', +((e.clientX - rect.left)/rect.width - .5).toFixed(2));
	_CARD.style.setProperty('--j', +((e.clientY - rect.top)/rect.height - .5).toFixed(2));
}, false);