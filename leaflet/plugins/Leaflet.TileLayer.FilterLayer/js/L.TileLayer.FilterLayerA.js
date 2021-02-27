/*
  L.TileLayer.FilterLayer
*/

/*
  Leaflet.TileLayer.ColorFilter
  (c) 2018, Claudio T. Kawakani
  A simple and lightweight Leaflet plugin to apply CSS filters on map tiles.
  https://github.com/xtk93x/Leaflet.TileLayer.ColorFilter
*/
L.TileLayer.ColorFilter = L.TileLayer.extend({
	intialize: function (url, options) {
		L.TileLayer.prototype.initialize.call(this, url, options);
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
		console.log("updating colorFilter()", filterSettings);
		return (filterSettings);
	},
	_initContainer: function () {
		// let tile = L.TileLayer.prototype._initContainer.call(this);
		L.TileLayer.prototype._initContainer.call(this);
		this._container.style.filter = this.colorFilter();
	},
	updateFilter: function (newFilter) {
		this.options.filter = newFilter;
		if (this._container) {
			this._container.style.filter = this.colorFilter();
		}
	},
})

L.tileLayer.colorFilter = function (url, options) {
	return new L.TileLayer.ColorFilter(url, options);
}



































/*
  L.TileLayer.FilterLayer
*/

L.TileLayer.FilterLayer = L.TileLayer.ColorFilter.extend({

	currentContainer: undefined,
	currentMap: undefined,
	currentFilter: {
		array: undefined,
		string: undefined,
		object: undefined
	},
	intialize: function (url, options) {
		L.TileLayer.ColorFilter.prototype.initialize.call(this, url, options);
		console.log("L.TileLayer.FilterLayer.intialize --", this);
	},
	_initContainer: function () {
		L.TileLayer.ColorFilter.prototype._initContainer.call(this);
		this.currentContainer = this._container;
		this.updateCurrentFilterValues();
	},
	onAdd: function onAdd(map) {
		L.TileLayer.FilterLayer.prototype.currentMap = map;
		map.filterLayer = L.TileLayer.FilterLayer.prototype;
		console.log("map", map);
		L.TileLayer.prototype.onAdd.call(this, map);
	},
	onRemove: function onRemove(map) {
		L.TileLayer.prototype.onRemove.call(this, map);
	},
	setFilterFromOptions: function () {
		L.TileLayer.ColorFilter.prototype.colorFilter.call(this);
		console.log("setFilterFromOptions", this);
	},
	updateFilter: function (newFilter) {
		if (Array.isArray(newFilter)) {
			L.TileLayer.ColorFilter.prototype.updateFilter.call(this, newFilter);
		} else {
			// do objecty stuff
			let newFilterArray = this.convertObjectToArray(newFilter);
			L.TileLayer.ColorFilter.prototype.updateFilter.call(this, newFilterArray);
		}
	},
	updateCurrentFilterValues: function () {
		this.currentFilter.array = this.options.filter;
		this.currentFilter.string = this.colorFilter();
		this.currentFilter.object = this.convertFilterToObject(this.currentFilter.array);
		// console.log("L.TileLayer.FilterLayer.prototype.currentFilter", L.TileLayer.FilterLayer.prototype.currentFilter);
		console.log("this.currentFilter", this.currentFilter);
	},
	convertFilterToObject: function (array) {
		let filterObject = {};

		for (var i = 0; i < array.length; i++) {
			var split = array[i].split(':');
			filterObject[split[0].trim()] = split[1].trim();
		}

		return filterObject;
	},
	convertObjectToArray: function (object) {
		let filterArray = [];

		for (const [key, value] of Object.entries(object)) {
			filterArray.push(`${key}:${value}`);
		}

		// console.log(filterArray);
		return filterArray;
	},
	limitNumber: function (num, min, max) {
		const MIN = min || 0;
		const MAX = max || 100; //assume it's a percentage
		const parsed = parseInt(num)
		return Math.min(Math.max(parsed, MIN), MAX)
	}





});



L.tileLayer.filterLayer = function (url, options) {
	return new L.TileLayer.FilterLayer(url, options);
}














L.Control.Custom = L.Control.extend({
	version: '1.0.1',
	options: {
		position: 'bottomright',
		id: '',
		title: '',
		classes: '',
		content: '',
		style: {},
		datas: {},
		events: {},
	},
	container: null,
	onAdd: function (map) {
		this.container = L.DomUtil.create('div');
		this.container.id = this.options.id;
		this.container.title = this.options.title;
		this.container.className = this.options.classes;
		this.container.innerHTML = this.options.content;
		for (var option in this.options.style) {
			this.container.style[option] = this.options.style[option];
		}
		for (var data in this.options.datas) {
			this.container.dataset[data] = this.options.datas[data];
		}
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
		return this.container;
	},

	onRemove: function (map) {
		for (var event in this.options.events) {
			L.DomEvent.off(this.container, event, this.options.events[event], this.container);
		}
	},
});

L.control.custom = function (options) {
	return new L.Control.Custom(options);
};
































/* 

*/
L.TileLayer.AdjustableFilterLayer = L.TileLayer.FilterLayer.extend({


	showFilterSettings: false,
	filterSettingsButton: undefined,
	filterSettingsControl: undefined,

	options: {
		control: {
			title: 'My Filters',
			display: {
				blur: true,
				brightness: true,
				contrast: true
			}
		},
		button: {
			icon: {
				show: '<i class="bi bi-filter-square-fill"></i>',
				hide: '<i class="bi bi-filter-square"></i>'
			},
			on: {
				click: function () {},
				hover: function () {}
			}
		}
	},

	onAdd: function onAdd(map) {
		L.setOptions(this.options);
		L.TileLayer.FilterLayer.prototype.onAdd.call(this, map);

		map.adjustableFilterLayer = L.TileLayer.AdjustableFilterLayer.prototype;
		console.log("map", map);
		console.log("this", this);
		this.addFilterSettingsButton(map);
	},
	onRemove: function onRemove(map) {
		L.TileLayer.FilterLayer.prototype.onRemove.call(this, map);
		if (this.filterSettingsButton) {
			this.removeFilterSettingsButton(this.filterSettingsButton);
		}
		if (this.filterSettingsControl) {
			console.log("remove this shizz");
			// this.toggleFilterSettings();
			this.showFilterSettings = false;
			// this.removeFilterDisplay();
			this.removeFilterDisplay();
		}
	},
	_initContainer: function () {
		L.TileLayer.FilterLayer.prototype._initContainer.call(this);
		L.setOptions(this.options);
	},
	updateFilter: function (newFilter) {
		L.TileLayer.FilterLayer.prototype.updateFilter.call(this, newFilter);
	},
	toggleFilterSettings: function () {
		let _this = L.TileLayer.AdjustableFilterLayer.prototype;

		if (!this.showFilterSettings) {
			this.showFilterSettings = true;

			_this.createFilterDisplay(_this.currentMap);

		} else {
			this.showFilterSettings = false;
			_this.removeFilterDisplay();
		}
		console.log("this.showFilterSettings", this.showFilterSettings);
	},





	updateFilterSettings: function () {


	},

	updateInputFromSlider: function (target, value) {
		// console.log(`updateInputFromSlider(${target}, ${value})`);

		L.DomUtil.get(target + '-value').innerHTML = value;

		this.currentFilter.object[target] = value;
		console.log("this.currentFilter.object", this.currentFilter.object);
		// this.updateFilter(this.currentFilter.object);
		
		// this.updateFilter(this.convertObjectToArray(this.currentFilter.object));
		console.log("this.currentContainer.", this.currentContainer);
		// this.currentContainer.style.filter = this.updateFilter(this.currentFilter.object);
	},






	createFilterSettingsButton: function (title, className, content, container, fn, context) {

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

	addFilterSettingsButton: function (map) {

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

		this.filterSettingsButton = this.createFilterSettingsButton(title, className, content, container, fn, context);
	},

	removeFilterSettingsButton: function (button) {
		L.DomEvent
			.off(button, 'click', L.DomEvent.stopPropagation)
			.off(button, 'dblclick', L.DomEvent.stopPropagation)
			.off(button, 'click', L.DomEvent.preventDefault)
			.off(button, 'dblclick', L.DomEvent.preventDefault)
			.off(button, 'click', button.callback, button.settings.context);

		L.DomUtil.remove(button);
	},
















	createFilterDisplay: function (map) {
		console.log("createFilterDisplay");

		console.log("map", map);
		console.log("this", this);

		let defaults = this.currentFilter.object

		let HTMLcontent = '';

		if (defaults.blur) {
			HTMLcontent += this.createSliderElement('blur', 0, 10, defaults.blur, 'px');
		}
		if (defaults.brightness) {
			HTMLcontent += this.createSliderElement('brightness', 0, 200, defaults.brightness, '%');
		}
		if (defaults.contrast) {
			HTMLcontent += this.createSliderElement('contrast', 0, 200, defaults.contrast, '%');
		}
		if (defaults.grayscale) {
			HTMLcontent += this.createSliderElement('grayscale', 0, 100, defaults.grayscale, '%');
		}
		if (defaults.hue) {
			HTMLcontent += this.createSliderElement('hue', 0, 359, defaults.hue, '\u00B0');
		}
		if (defaults.invert) {
			HTMLcontent += this.createSliderElement('invert', 0, 100, defaults.invert, '%');
		}
		if (defaults.opacity) {
			HTMLcontent += this.createSliderElement('opacity', 0, 100, defaults.opacity, '%');
		}
		if (defaults.saturation) {
			HTMLcontent += this.createSliderElement('saturation', 0, 1000, defaults.saturation, '%');
		}
		if (defaults.sepia) {
			HTMLcontent += this.createSliderElement('sepia', 0, 100, defaults.sepia, '%');
		}

		// this.createSliderElement('contrast', 0, 200, 0, '%');
		// this.createSliderElement('grayscale', 0, 100, 0, '%');
		// this.createSliderElement('hue', 0, 359, 0, '\u00B0');
		// this.createSliderElement('invert', 0, 100, 0, '%');
		// this.createSliderElement('opacity', 0, 100, 0, '%');
		// this.createSliderElement('saturation', 0, 1000, 0, '%');
		// this.createSliderElement('sepia', 0, 100, 0, '%');
		// console.log(HTMLcontent);


		this.filterSettingsControl = L.control.custom({
				position: 'bottomleft',
				content: HTMLcontent,
				classes: 'leaflet-control-filter-settings-container',
				events: {
					input: function (data) {
						L.TileLayer.AdjustableFilterLayer.prototype.updateInputFromSlider(data.target.id.split('-')[0], data.target.value);
					}
				}
			})
			.addTo(map);


	},

	removeFilterDisplay: function () {
		console.log("removeFilterDisplay");
		if (this.filterSettingsControl) this.currentMap.removeControl(this.filterSettingsControl), this.filterSettingsControl = undefined;
		// L.DomUtil.remove(this.currentFilterSettingsContainer);
	},



	createSliderElement: function (name, min, max, value, unit) {

		let element;

		element = L.DomUtil.create('div', 'leaflet-control-filter-settings-slider leaflet-control-filter-settings-' + name + '-slider');

		let labelEl = L.DomUtil.create('span', 'leaflet-control-filter-settings-title leaflet-control-filter-settings-' + name + '-title', element);
		labelEl.innerHTML = name.charAt(0).toUpperCase() + name.slice(1) + ' : ';

		let valueEl = L.DomUtil.create('span', 'leaflet-control-filter-settings-value leaflet-control-filter-settings-' + name + '-value', element);
		valueEl.setAttribute('id', name + '-value');
		valueEl.innerHTML = value + unit + ' </br>';

		let sliderEl = L.DomUtil.create('input', 'leaflet-control-filter-settings-input leaflet-control-filter-settings-' + name + '-input', element);
		sliderEl.setAttribute('type', 'range');
		sliderEl.setAttribute('min', min);
		sliderEl.setAttribute('max', max);
		sliderEl.setAttribute('value', value);
		sliderEl.setAttribute('id', name + '-slider');

		return element.innerHTML;
	}







});


L.tileLayer.adjustableFilterLayer = function (url, options) {
	return new L.TileLayer.AdjustableFilterLayer(url, options);
}





/* 

*/
L.Map.addInitHook(function () {
	console.log("L.TileLayer.AdjustableFilterLayer.prototype", L.TileLayer.AdjustableFilterLayer.prototype);
});