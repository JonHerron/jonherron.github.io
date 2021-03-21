L.Control.Enhanced = L.Control.extend({
	version: '0.0.1',
	defaultLeafletClass: 'leaflet-control-enhanced-container',
	displayType: 'grid',
	container: null,
	options: {
		position: 'bottomright',
		id: '',
		title: '',
		content: '',
		classes: '',
		styles: {},
		attributes: {},
		datas: {},
		events: {},
		autoSetPaddingStyle: true,
		autoSetLeafletClasses: true,
		containerElement: 'div',
		containerParent: 'default'
	},



	onAdd: function (map) {
		this._createContainer(map);
		return this.container;
	},

	onRemove: function (map) {
		for (var event in this.options.events) {
			L.DomEvent.off(this.container, event, this.options.events[event], this.container);
		}
		this.container = null;
	},

	injectCSS: function (css) {
		let styleTag = document.createElement("style");
		styleTag.innerText = css;
		document.head.appendChild(styleTag);

		return styleTag;
	},




	_createContainer: function (map) {

		this.container = L.DomUtil.create(this.options.containerElement);

		this.container.id = this.options.id;
		this.container.title = this.options.title;

		this.container.innerHTML = this.options.content;
		this._initAdditional();
		this._initClasses();
		this._initStyles();
		this._initData();
		this._initEventHandling();

		// if (this.options.autoSetPaddingStyle) this.container.style['padding'] = '0.5em 0.5em 0.5em 0.5em';

	},
	_initAdditional: function () {},
	_initClasses: function () {
		//		this.container.className = this.options.classes;
		L.DomUtil.addClass(this.container, this.defaultLeafletClass);
		if (this.options.autoSetLeafletClasses) {
			this.options.containerParent == 'zoomControl' ? L.DomUtil.addClass(this.container, 'leaflet-bar-part') : L.DomUtil.addClass(this.container, 'leaflet-bar');
			L.DomUtil.addClass(this.container, 'leaflet-interactive');
		}
		if (Array.isArray(this.options.classes)) this.options.classes.forEach(controlClass => L.DomUtil.addClass(this.container, controlClass));
	},
	_initStyles: function () {
		this.container.style['backgroundColor'] = '#FFF';
		this.container.style['display'] = this.options.displayType || 'block';
		console.log("this._initStyles");
		for (let option in this.options.styles) {
			this.container.style[option] = this.options.styles[option];
		}
	},
	_initData: function () {
		for (let data in this.options.datas) {
			this.container.dataset[data] = this.options.datas[data];
		}
	},
	_initEventHandling: function () {
		/* Prevent click events propagation to map */
		L.DomEvent.disableClickPropagation(this.container);
		/* Prevent right click event propagation to map */
		L.DomEvent.on(this.container, 'contextmenu', function (ev) {
			L.DomEvent.stopPropagation(ev);
		});
		/* Prevent scroll events propagation to map when cursor on the div */
		L.DomEvent.disableScrollPropagation(this.container);
		for (var event in this.options.events) {
			L.DomEvent.on(this.container, event, this.options.events[event], this.container);
		}
	}


});

L.control.enhanced = function (options) {
	return new L.Control.Enhanced(options);
};











L.Control.Enhanced.Button = L.Control.Enhanced.extend({
	version: '0.0.1',
	defaultLeafletClass: 'leaflet-control-enhanced-button-container',
	options: {
		autoSetCursorStyle: true,
		containerElement: 'button',
		containerParent: 'default'
	},
	states: {

	},

	_initStyles: function () {
		this.container.style['backgroundColor'] = '#FFF';
		this.container.style['display'] = this.options.displayType || 'block';
		// this.container.style['margin'] = '0 auto';
		this.container.style['verticalAlign'] = 'middle';
		this.container.style['border'] = '1px outset';
		this.container.style['height'] = '33px';
		this.container.style['width'] = '33px';
		if (this.options.autoSetCursorStyle) this.container.style['cursor'] = 'pointer';

		console.log("this._initStyles");
		for (let option in this.options.style) {
			this.container.style[option] = this.options.style[option];
		}
	},

	onAdd: function (map) {
		console.log(this.options.containerParent);
		L.Control.Enhanced.prototype.onAdd.call(this, map);
		if (this.options.autoSetLeafletClasses) L.DomUtil.addClass(this.container, this.defaultLeafletClass);
		// if (this.options.autoSetPaddingStyle) this.container.style['padding'] = '0.2em 0.5em 0.3em 0.5em';


		return this.container;
	},

	onRemove: function (map) {
		L.Control.Enhanced.prototype.onRemove.call(this, map);

	}

});

L.control.enhanced.button = function (options) {
	return new L.Control.Enhanced.Button(options);
};








L.Control.Enhanced.Carousel = L.Control.Enhanced.extend({
	version: '0.0.1',
	defaultLeafletClass: 'leaflet-control-enhanced-carousel',
	options: {
		position: 'bottomleft',
		containerElement: 'div',
		containerParent: 'default'
	},

	onAdd: function (map) {
		L.Control.Enhanced.prototype.onAdd.call(this, map);
		if (this.options.autoSetLeafletClasses) L.DomUtil.addClass(this.container, this.defaultLeafletClass);

		return this.container;
	},

	onRemove: function (map) {
		L.Control.Enhanced.prototype.onRemove.call(this, map);

	},

	_initAdditional: function () {

		let carouselContent = this.options.carousel;

		let carouselContainer = L.DomUtil.create('div', 'leaflet-control-enhanced-carousel-container', this.container);
		let carousel = L.DomUtil.create('ul', 'leaflet-control-enhanced-carousel is-set', carouselContainer);

		for (var i = 0; i < carouselContent.items.length; i++) {
			// console.log(carouselContent.items[i]);

			let liItem = L.DomUtil.create('li', 'leaflet-control-enhanced-carousel-seat', carousel);
			liItem.innerHTML = carouselContent.items[i].innerHTML;

		}

		let controlsContainer = L.DomUtil.create('div', 'controls', this.container);
		let prevButton = L.DomUtil.create('button', 'toggle', controlsContainer);
		prevButton.setAttribute('data-toggle', 'prev');
		prevButton.innerHTML = 'PREV';

		let nextButton = L.DomUtil.create('button', 'toggle', controlsContainer);
		nextButton.setAttribute('data-toggle', 'next');
		nextButton.innerHTML = 'NEXT';



		const css = `.leaflet-control-enhanced-carousel-container {
			width: 80%;
			margin: 0 auto;
			overflow: hidden;
		  }
		  
		  .leaflet-control-enhanced-carousel {
			display: flex;
			left: -100%;
			list-style: none;
			margin: 0;
			padding: 0;
			position: relative;
			transform: translateX(100%);
		  }
		  
		  @media (min-width: 30em) {
			.leaflet-control-enhanced-carousel {
			  left: -50%;
			  transform: translateX(50%);
			}
		  }
		  
		  @media (min-width: 40em) {
			.leaflet-control-enhanced-carousel {
			  left: -33.33333%;
			  transform: translateX(33.33333%);
			}
		  }
		  
		  .leaflet-control-enhanced-carousel.is-reversing {
			transform: translateX(-100%);
		  }
		  
		  @media (min-width: 30em) {
			.leaflet-control-enhanced-carousel.is-reversing {
			  transform: translateX(-50%);
			}
		  }
		  
		  @media (min-width: 40em) {
			.leaflet-control-enhanced-carousel.is-reversing {
			  transform: translateX(-33.33333%);
			}
		  }
		  
		  .leaflet-control-enhanced-carousel.is-set {
			transform: none;
			transition: transform 0.5s ease-in-out;
		  }
		  
		  .leaflet-control-enhanced-carousel-seat {
			background: #ddd;
			flex: 1 0 100%;
			order: 2;
		  }
		  
		  .leaflet-control-enhanced-carousel-seat:nth-child(even) {
			background: #d5d5d5;
		  }
		  
		  @media (min-width: 30em) {
			.leaflet-control-enhanced-carousel-seat {
			  flex-basis: 50%;
			}
		  }
		  
		  @media (min-width: 40em) {
			.leaflet-control-enhanced-carousel-seat {
			  flex-basis: 33.33333%;
			}
		  }
		  
		  .leaflet-control-enhanced-carousel-seat.is-ref {
			order: 1;
		  }
		  

		  
		  .controls {
			padding: 1em;
			text-align: center;
		  }
		  
		  .controls button {
			background: #aaa;
			border: 0;
			border-radius: 0.25em;
			color: #eee;
			padding: 0.5em 1em;
		  }
		  
		  .controls button:hover,
		  .controls button:focus {
			background: orange;
		  }
		  `;

		  this.injectCSS(css);
		  document.addEventListener("click", this.delegate(this.toggleFilter, this.toggleHandler));

	},

	delegate: function (criteria, listener) {
		return function (e) {
			const el = e.target;
			do {
				if (!criteria(el)) {
					continue;
				}
				e.delegateTarget = el;
				listener.call(this, e);
				return;
			} while ((el = el.parentNode));
		};
	},

	toggleFilter: function (elem) {
		return (elem instanceof HTMLElement) && elem.matches(".toggle");
		// OR
		// For < IE9
		// return elem.classList && elem.classList.contains('btn');
	},

	toggleHandler: function (e) {

				// http://madewithenvy.com/ecosystem/articles/2015/exploring-order-flexbox-carousel/
				const $carousel = document.querySelector('.leaflet-control-enhanced-carousel');
				const $seats = document.querySelectorAll('.leaflet-control-enhanced-carousel-seat');
				const $toggle = document.querySelectorAll('.toggle');
		
				
		var $newSeat;
		const $el = document.querySelector('.is-ref');
		const $currSliderControl = e.delegateTarget;
		// Info: e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.

		$el.classList.remove('is-ref');
		if ($currSliderControl.getAttribute('data-toggle') === 'next') {
			$newSeat = next($el);
			$carousel.classList.remove('is-reversing');
		} else {
			$newSeat = prev($el);
			$carousel.classList.add('is-reversing');
		}

		$newSeat.classList.add('is-ref');
		$newSeat.style.order = 1;
		for (var i = 2; i <= $seats.length; i++) {
			$newSeat = next($newSeat);
			$newSeat.style.order = i;
		}

		$carousel.classList.remove('is-set');
		return setTimeout(function () {
			return $carousel.classList.add('is-set');
		}, 50);

		function next($el) {
			if ($el.nextElementSibling) {
				return $el.nextElementSibling;
			} else {
				return $carousel.firstElementChild;
			}
		}

		function prev($el) {
			if ($el.previousElementSibling) {
				return $el.previousElementSibling;
			} else {
				return $carousel.lastElementChild;
			}
		}
	},

	next: function (slide) {

	},

	previous: function (slide) {

	},

	moveTo: function (slide) {

	},

	_reset: function () {

	},

	_updateNavigationItems: function (event) {

	}

});

L.control.enhanced.carousel = function (options) {
	return new L.Control.Enhanced.Carousel(options);
};







L.Control.Enhanced.ContextMenu = L.Control.Enhanced.extend({
	version: '0.0.1',
	defaultLeafletClass: 'leaflet-control-enhanced-context-menu',
	options: {
		position: 'none',
		containerElement: 'div',
		containerParent: 'default'
	},

	onAdd: function (map) {
		L.Control.Enhanced.prototype.onAdd.call(this, map);
		if (this.options.autoSetLeafletClasses) L.DomUtil.addClass(this.container, this.defaultLeafletClass);

		return this.container;
	},

	onRemove: function (map) {
		L.Control.Enhanced.prototype.onRemove.call(this, map);

	}

});

L.control.enhanced.contextMenu = function (options) {
	return new L.Control.Enhanced.ContextMenu(options);
};










L.Control.Enhanced.Controls = L.Control.Enhanced.extend({

	initialise: function () {

	},

	range: function () {

	},

	dropdown: function () {

	},

	colorPicker: function () {

	},

	progressBar: function () {

	},

	radioButton: function () {

	},

	checkbox: function () {

	}

});

L.control.enhanced.controls = function (options) {
	return new L.Control.Enhanced.Controls(options);
};






L.Control.Enhanced.Messagebox = L.Control.Enhanced.extend({
	version: '0.0.1',
	displayType: 'flex',
	defaultLeafletClass: 'leaflet-control-enhanced-messagebox-container',
	autoSetLeafletClasses: false,
	timeouts: [],
	options: {
		autoSetCursorStyle: true,
		timeout: 3000,
		addInitHook: true,
		containerElement: 'div',
		icons: {
			alert: '<i class="bi bi-exclamation-square-fill"></i>',
			message: '<i class="bi bi-chat-square-text-fill"></i>',
			success: '<i class="bi bi-check-circle-fill"></i>',
			warning: '<i class="bi bi-exclamation-diamond-fill"></i>',
			close: '<i class="bi bi-x-circle-fill"></i>'
		},
		colors: {
			alert: '#dc3545',
			message: '#17a2b8',
			success: '#28a745!important',
			warning: '#ffc107',
			close: '#343a40'
		}
	},
	_initAdditional: function () {
		// if (this.options.containerParent == 'zoomControl' && map.zoomControl) {
		// 	console.log("Attempting to add to ZoomControl");
		// 	this.container = L.DomUtil.create(this.options.containerElement, '', map.zoomControl._container);
		// 	console.log("...ZoomControl", this.container, map.zoomControl._container);
		// } else {
		// 	this.container = L.DomUtil.create(this.options.containerElement);
		// }

		console.log("Overwritten _initAdditional for L.Control.Enhanced.Messagebox");
		this._initMessagebox();
	},
	_initMessagebox: function () {
		console.log("_initMessagebox");
	},
	_initClasses: function () {
		//		this.container.className = this.options.classes;
		L.DomUtil.addClass(this.container, this.defaultLeafletClass);
		L.DomUtil.addClass(this.container, 'leaflet-interactive');

		if (Array.isArray(this.options.classes)) this.options.classes.forEach(controlClass => L.DomUtil.addClass(this.container, controlClass));
	},
	_initStyles: function () {
		this.container.style['backgroundColor'] = 'transparent';
		this.container.style['display'] = this.options.displayType || 'flex';
		this.container.style['flex-direction'] = 'column';
		this.container.style['align-items'] = 'left';
		this.container.style['padding'] = '0px 10px';
		for (let option in this.options.style) {
			this.container.style[option] = this.options.style[option];
		}
	},
	onAdd: function (map) {
		L.Control.Enhanced.prototype.onAdd.call(this, map);
		if (this.options.autoSetLeafletClasses) L.DomUtil.addClass(this.container, this.defaultLeafletClass);

		return this.container;
	},
	setTimeout: function (elem, timeout) {
		let currentTimeout = timeout || this.options.timeout;

		if (typeof this.timeoutID == 'number') {
			clearTimeout(this.timeoutID);
		}
		this.timeoutID = this.timeouts.push(setTimeout(function () {
			elem.style.display = 'none';
			console.log("callback this", this);
		}, currentTimeout));

		console.log("this.timeoutID", this.timeoutID);
		console.log("this.timeouts", this.timeouts);
		// this.timeoutID = setTimeout(function () {
		// 	elem.style.display = 'none';
		// }, currentTimeout);
	},
	onCleeek: function () {
		this.style.display = "none";
	},
	alert: function (message, timeout) {
		var elem = L.DomUtil.create(this.options.containerElement, 'leaflet-bar', this.container);
		elem.innerHTML = (this.options.icons.alert && this.options.icons.close) ? this.options.icons.alert + message + this.options.icons.close : message;
		elem.style.flex = 1;
		elem.style.backgroundColor = '#FF0000';
		elem.style.color = '#FFFFFF';
		elem.style.marginBottom = '5px';
		elem.style.padding = '5px';
		elem.setAttribute("onClick", "this.onCleeek");

		this.setTimeout(elem, timeout);
	},

	message: function (message, timeout) {
		var elem = L.DomUtil.create(this.options.containerElement, 'leaflet-bar', this.container);
		elem.innerHTML = (this.options.icons.message && this.options.icons.close) ? this.options.icons.message + message + this.options.icons.close : message;
		elem.style.flex = 1;
		elem.style.backgroundColor = '#FFFFFF';
		elem.style.color = '#000000';
		elem.style.marginBottom = '5px';
		elem.style.padding = '5px';

		this.setTimeout(elem, timeout);

	},

	success: function (message, timeout) {
		var elem = L.DomUtil.create(this.options.containerElement, 'leaflet-bar', this.container);
		elem.innerHTML = (this.options.icons.success && this.options.icons.close) ? this.options.icons.success + message + this.options.icons.close : message;
		elem.style.flex = 1;
		elem.style.backgroundColor = 'rgb(95, 199, 104)';
		elem.style.color = 'rgb(245, 245, 245)';
		elem.style.marginBottom = '5px';
		elem.style.padding = '5px';

		this.setTimeout(elem, timeout);

	},

	warning: function (message, timeout) {
		var elem = L.DomUtil.create(this.options.containerElement, 'leaflet-bar', this.container);
		elem.innerHTML = (this.options.icons.warning && this.options.icons.close) ? this.options.icons.warning + message + this.options.icons.close : message;
		elem.style.flex = 1;
		elem.style.backgroundColor = '#FF0000';
		elem.style.color = '#FFFFFF';
		elem.style.marginBottom = '5px';
		elem.style.padding = '5px';

		this.setTimeout(elem, timeout);
	}
});



L.control.enhanced.messagebox = function (options) {
	return new L.Control.Enhanced.Messagebox(options);
};






L.Control.Enhanced.Modal = L.Control.Enhanced.extend({

	onAdd: function (map) {
		L.Control.Enhanced.prototype.onAdd.call(this, map);
		if (this.options.autoSetLeafletClasses) L.DomUtil.addClass(this.container, this.defaultLeafletClass);

		return this.container;
	},

	onRemove: function (map) {
		L.Control.Enhanced.prototype.onRemove.call(this, map);

	}

});

L.control.enhanced.modal = function (options) {
	return new L.Control.Enhanced.Modal(options);
};






L.Map.addInitHook(function () {
	// L.Control.Enhanced.Messagebox.prototype.alert('Aaaaaaaaaaaaaaaaaaaaargh!!');
	console.log(this);
	if (this.options.addInitHook) {
		console.log("this.options.addInitHook");
		this.messageBox = L.control.enhanced.messagebox(this.options);
		this.addControl(this.messagebox);
	}
});