/*
  Leaflet.TileLayer.ColorFilter
  (c) 2018, Claudio T. Kawakani
  A simple and lightweight Leaflet plugin to apply CSS filters on map tiles.
  https://github.com/xtk93x/Leaflet.TileLayer.ColorFilter
*/
L.TileLayer.FilterLayer = L.TileLayer.extend({

	limitNumber: function (num, min, max) {
		const MIN = min || 0;
		const MAX = max || 100; //assume it's a percentage
		const parsed = parseInt(num)
		return Math.min(Math.max(parsed, MIN), MAX)
	},

	_blur: {
		filter: undefined,
		elements: {
			container: undefined,
			label: undefined,
			value: undefined,
			slider: undefined
		},
		value: {
			validated: undefined,
			number: NaN,
			unit: undefined
		},
		validate: function (value, unit) {

			value = L.TileLayer.FilterLayer.prototype.limitNumber(value);
			if (unit != "px" || unit != "rem")
			{
				//default to "px"
				unit = "px";
			}
			
			return `blur(${value}${unit})`
		}

	},

	toggleFilterSettingsButton: undefined,
	currentFilterSettingsContainer: undefined,
	currentMap: undefined,
	currentContainer: undefined,
	currentColorFilter: undefined,
	currentFilter: ["some filter"],
	showFilterSettings: false,
	elements: {
		containers: {
			brightness: undefined,
			contrast: undefined,
			grayscale: undefined,
			hue: undefined,
			invert: undefined,
			saturation: undefined,
			sepia: undefined,
			blur: undefined,
			opacity: undefined
		},
		sliders: {
			brightness: undefined,
			contrast: undefined,
			grayscale: undefined,
			hue: undefined,
			invert: undefined,
			saturation: undefined,
			sepia: undefined,
			blur: undefined,
			opacity: undefined
		}
	},

	filter: {
		values: {
			brightness: undefined,
			contrast: undefined,
			grayscale: undefined,
			hue: undefined,
			invert: undefined,
			saturation: undefined,
			sepia: undefined,
			blur: undefined,
			opacity: undefined
		},
		validatedValues: {
			brightness: undefined,
			contrast: undefined,
			grayscale: undefined,
			hue: undefined,
			invert: undefined,
			saturation: undefined,
			sepia: undefined,
			blur: undefined,
			opacity: undefined
		}
	},

	validateFilter: {
		brightness: function (value) {
			return `brightness(${value}%)`
		},
		contrast: function (value) {
			return `contrast(${value}%)`
		},
		grayscale: function (value) {
			return `grayscale(${value}%)`
		},
		hue: function (value) {
			return `hue-rotate(${value}deg)`
		},
		invert: function (value) {
			return `invert(${value}%)`
		},
		saturation: function (value) {
			return `saturate(${value}%)`
		},
		sepia: function (value) {
			return `sepia(${value}%)`
		},
		blur: function (value) {
			return `blur(${value}px)`
		},
		opacity: function (value) {
			return `opacity(${value}%)`
		},
	},


	colourFilters: {
		brightness: undefined,
		contrast: undefined,
		grayscale: undefined,
		hue: undefined,
		invert: undefined,
		saturation: undefined,
		sepia: undefined,
		blur: undefined,
		opacity: undefined
	},
	colourFiltersValidated: {
		brightness: undefined,
		contrast: undefined,
		grayscale: undefined,
		hue: undefined,
		invert: undefined,
		saturation: undefined,
		sepia: undefined,
		blur: undefined,
		opacity: undefined
	},

	intialize: function (url, options) {
		L.TileLayer.prototype.initialize.call(this, url, options);
	},

	onAdd: function onAdd(map) {
		L.TileLayer.prototype.onAdd.call(this, map);
		L.TileLayer.FilterLayer.prototype.currentMap = map;
		map.filterLayer = L.TileLayer.FilterLayer.prototype;
		this.addButton(map);
		if (this.showFilterSettings) this.updateFilterDisplay();
	},

	onRemove: function onRemove(map) {
		L.TileLayer.prototype.onRemove.call(this, map);
		L.TileLayer.FilterLayer.prototype.currentMap = undefined;
		this.removeButton(this.toggleFilterSettingsButton);
		// if(this.showFilterSettings) this.removeFilterDisplay();
	},





	toggleFilterSettings: function () {
		let _this = L.TileLayer.FilterLayer.prototype;
		console.log("....currentFilter >> ", _this.currentFilter);
		if (!_this.showFilterSettings) {
			_this.showFilterSettings = true;
			_this.createFilterDisplay(_this.getMap());
			// console.log("_this.currentMap.filterLayer", _this.currentMap.filterLayer);
		} else {
			_this.showFilterSettings = false;
			_this.removeFilterDisplay();
		}
		// console.log("_this.showFilterSettings", _this.showFilterSettings);
	},



	brightness: function (value) {
		// brightness(%)
		// Adjusts the brightness of the image.

		// 0% will make the image completely black.
		// 100% (1) is default and represents the original image.
		// Values over 100% will provide brighter results.


		//check if brightness is 'set' in currentFilters and modify if it is.

		return `brightness(${value}%)`
	},
	contrast: function (value) {
		// contrast(%)	
		// Adjusts the contrast of the image.

		// 0% will make the image completely black.
		// 100% (1) is default and represents the original image.
		// Values over 100% will provide results with less contrast.
		return `contrast(${value}%)`
	},
	grayscale: function (value) {
		// grayscale(%)	
		// Converts the image to grayscale.

		// 0% (0) is default and represents the original image.
		// 100% will make the image completely gray (used for black and white images).

		// Note: Negative values are not allowed.
		return `grayscale(${value}%)`
	},
	hue: function (value) {
		// hue-rotate(deg)	
		// Applies a hue rotation on the image. 
		// The value defines the number of degrees around the color circle the image samples will be adjusted. 
		// 0deg is default, and represents the original image.

		// Note: Maximum value is 360deg.
		return `hue-rotate(${value}deg)`
	},
	invert: function (value) {
		// invert(%)
		// Inverts the samples in the image.

		// 0% (0) is default and represents the original image.
		// 100% will make the image completely inverted.

		// Note: Negative values are not allowed.
		return `invert(${value}%)`
	},
	saturation: function (value) {
		// saturate(%)	
		// Saturates the image.

		// 0% (0) will make the image completely un-saturated.
		// 100% is default and represents the original image.
		// Values over 100% provides super-saturated results.

		// Note: Negative values are not allowed.
		return `saturate(${value}%)`
	},
	sepia: function (value) {
		// sepia(%)	
		// Converts the image to sepia.

		// 0% (0) is default and represents the original image.
		// 100% will make the image completely sepia.

		// Note: Negative values are not allowed.
		return `sepia(${value}%)`
	},

	blur: function (value) {
		return `blur(${value}px)`
	},
	opacity: function (value) {
		return `opacity(${value}%)`
	},












	colorFilter: function () {

		let VALIDFILTERS = [
			'blur:px',
			'brightness:%', 'bright:brightness:%', 'bri:brightness:%',
			'contrast:%', 'con:contrast:%',
			'grayscale:%', 'gray:grayscale:%',
			'hue-rotate:deg', 'hue:hue-rotate:deg', 'hue-rotation:hue-rotate:deg',
			'invert:%', 'inv:invert:%',
			'opacity:%', 'op:opacity:%',
			'saturate:%', 'saturation:saturate:%', 'sat:saturate:%',
			'sepia:%', 'sep:sepia:%',
		]

		let colorFilterOptions = this.options.filter ? this.options.filter : [];
		let filterSettings = colorFilterOptions.map((opt) => {
			let filter = opt.toLowerCase().split(':');
			if (filter.length === 2) {
				let match = VALIDFILTERS.find(vf => {
					return (vf.split(':')[0] === filter[0]);
				});
				if (match) {
					match = match.split(':');
					filter[1] += /^\d+$/.test(filter[1]) ? match[match.length - 1] : ''
					return (`${match[match.length - 2]}(${filter[1]})`);
				}
			}
			return ('');
		}).join(' ');
		// console.log('filterSettings', filterSettings);

		return (filterSettings);

	},

	_initContainer: function () {
		let tile = L.TileLayer.prototype._initContainer.call(this);

		L.TileLayer.prototype._initContainer.call(this);

		L.TileLayer.FilterLayer.prototype.currentContainer = this._container;

		L.TileLayer.FilterLayer.prototype.currentColorFilter = this._container.style.filter = this.colorFilter();

		// L.TileLayerFilterLayer.prototype.currentFilter = 

		console.log("_initContainer - this", this);
		// console.log("_initContainer - L.TileLayer.FilterLayer.prototype.currentContainer", L.TileLayer.FilterLayer.prototype.currentContainer);
		// console.log("_initContainer - this.colorFilter()", this.colorFilter());
	},

	updateFilter: function (newFilter) {

		this.options.filter = newFilter;
		if (this._container) {
			L.TileLayer.FilterLayer.prototype.currentColorFilter = this._container.style.filter = this.colorFilter();
		}

	},










	updateFilterDisplay: function () {
		// console.log("updateFilterDisplay");
		let filterString = "";
		let filterArray = [];
		for (let [key, value] of Object.entries(L.TileLayer.FilterLayer.prototype.colourFilters)) {
			filterString += L.TileLayer.FilterLayer.prototype.validateFilter[key](value) + " ";
			filterArray.push(`${key}:${value}`);
		}

		L.TileLayer.FilterLayer.prototype.currentContainer.style.filter = filterString;

	},










	createButton: function (title, className, content, container, fn, context) {

		let button = L.DomUtil.create('a', className, container);
		button.settings = {
			title,
			className,
			content,
			container,
			fn,
			context
		};
		button.href = '#';
		button.title = title;
		button.innerHTML = this.showFilterSettings ? content[1] : content[0];
		button.callback = function () {
			if (button.innerHTML == content[0]) {
				button.innerHTML = content[1];
			} else {
				button.innerHTML = content[0];
			}
			fn();
		};

		button.setAttribute('role', 'button');
		button.setAttribute('aria-label', title);

		L.DomEvent
			.on(button, 'click', L.DomEvent.stopPropagation)
			.on(button, 'dblclick', L.DomEvent.stopPropagation)
			.on(button, 'click', L.DomEvent.preventDefault)
			.on(button, 'dblclick', L.DomEvent.preventDefault)
			.on(button, 'click', button.callback, context);

		return button;
	},

	addButton: function (map) {

		let title, className, content, container, fn, context;

		context = this;

		if (map.zoomControl) {
			container = map.zoomControl._container;
		} else {
			container = L.DomUtil.create('div', 'leaflet-bar');
		}

		title = 'Filter Settings';
		className = 'leaflet-control-filter-settings-button';
		content = ['<i class="bi bi-filter-square-fill"></i>', '<i class="bi bi-filter-square"></i>'];
		fn = this.toggleFilterSettings;

		L.TileLayer.FilterLayer.prototype.toggleFilterSettingsButton = this.createButton(title, className, content, container, fn, context);
	},

	removeButton: function (button) {
		L.DomEvent
			.off(button, 'click', L.DomEvent.stopPropagation)
			.off(button, 'dblclick', L.DomEvent.stopPropagation)
			.off(button, 'click', L.DomEvent.preventDefault)
			.off(button, 'dblclick', L.DomEvent.preventDefault)
			.off(button, 'click', button.callback, button.settings.context);

		L.DomUtil.remove(button);
	},

	createFilterDisplay: function (map) {
		// console.log("createFilterDisplay");
		// console.log("L.TileLayer.FilterLayer.prototype.currentFilter", L.TileLayer.FilterLayer.prototype.currentFilter);
		// console.log("this", this);
		// console.log("map", map);
		// console.log("this.currentFilter", this.currentFilter);

		let title, className, content, container, fn, context;
		title = "Filter Options";
		className = 'leaflet-control-filter-settings-container';
		content = "Wow content";
		fn = '';
		context = this;
		// getlb = document.getElementsByClassName('leaflet-control-container');
		// container = L.DomUtil.create('div', 'leaflet-bar leaflet-control-filter-settings', getlb);

		if (map.zoomControl) {
			container = map.zoomControl._container;
		} else {
			container = L.DomUtil.create('div', 'leaflet-bar');
		}
		this.currentFilterSettingsContainer = L.DomUtil.create('div', className, container);

		L.DomEvent.disableClickPropagation(this.currentFilterSettingsContainer);

		// this.currentFilterSettingsContainer.innerHTML = title;
		let h1 = L.DomUtil.create('h1', 'leaflet-control-filter-settings-container-title', this.currentFilterSettingsContainer);
		h1.innerHTML = title;

		let brV, coV, grV, huV, inV, saV, seV, blV, opV;
		let _this = L.TileLayer.FilterLayer.prototype.colourFilters;
		brV = _this.brightness ? _this.brightness : 0;
		coV = _this.contrast ? _this.contrast : 100;
		grV = _this.grayscale ? _this.grayscale : 0;
		huV = _this.hue ? _this.hue : 0;
		inV = _this.invert ? _this.invert : 0;
		saV = _this.saturation ? _this.saturation : 100;
		seV = _this.sepia ? _this.sepia : 0;
		blV = _this.blur ? _this.blur : 0;
		opV = _this.opacity ? _this.opacity : 100;

		console.log(brV);
		console.log(coV);
		console.log(grV);
		console.log(huV);
		console.log(inV);
		console.log(saV);
		console.log(seV);
		console.log(blV);
		console.log(opV);

		this.createSliderElement('brightness', 0, 200, brV, '%');
		this.createSliderElement('contrast', 0, 200, coV, '%');
		this.createSliderElement('grayscale', 0, 100, grV, '%');
		this.createSliderElement('hue', 0, 359, huV, '\u00B0');
		this.createSliderElement('invert', 0, 100, inV, '%');
		this.createSliderElement('saturation', 0, 1000, saV, '%');
		this.createSliderElement('sepia', 0, 100, seV, '%');
		this.createSliderElement('blur', 0, 10, blV, 'px');
		this.createSliderElement('opacity', 0, 100, opV, '%');


	},

	createSliderElement: function (slider, min, max, value, unit) {
		let _this = L.TileLayer.FilterLayer.prototype;
		_this.elements.containers[slider] = L.DomUtil.create('div', 'leaflet-control-filter-settings-slider leaflet-control-filter-settings-' + slider + '-slider', this.currentFilterSettingsContainer);
		let cst = L.DomUtil.create('span', 'leaflet-control-filter-settings-title leaflet-control-filter-settings-' + slider + '-title', this.elements.containers[slider]);
		cst.innerHTML = slider.charAt(0).toUpperCase() + slider.slice(1) + ' : ';
		let csv = L.DomUtil.create('span', 'leaflet-control-filter-settings-value leaflet-control-filter-settings-' + slider + '-value', this.elements.containers[slider]);
		csv.setAttribute('id', slider + '-value');
		csv.innerHTML = '0% </br>';
		let ci = this.elements.sliders[slider] = L.DomUtil.create('input', 'leaflet-control-filter-settings-input leaflet-control-filter-settings-' + slider + '-input', this.elements.containers[slider]);
		ci.setAttribute('type', 'range');
		ci.setAttribute('min', min);
		ci.setAttribute('max', max);
		ci.setAttribute('value', value);
		ci.setAttribute('id', slider + '-slider');
		ci.addEventListener('input', function (e) {
			L.DomUtil.get(slider + '-value').innerHTML = e.target.value + unit;
			_this.colourFilters[slider] = e.target.value;
			_this.colourFiltersValidated[slider] = _this[slider](e.target.value);
			_this.updateFilterDisplay();
		});
		// set initial value on display span
		ci.dispatchEvent(new Event('input', {
			bubbles: false
		}));
	},

	updateSliderValues: function (target, value, unit) {

	},

	removeFilterDisplay: function () {
		console.log("removeFilterDisplay");

		L.DomUtil.remove(this.currentFilterSettingsContainer);
	},














	getMap: function () {
		return this.currentMap;
	}
})

L.tileLayer.filterLayer = function (url, options) {
	return new L.TileLayer.FilterLayer(url, options);
}

/* 

*/
L.Map.addInitHook(function () {
	// L.TileLayer.FilterLayer.prototype.currentMap = this;
});