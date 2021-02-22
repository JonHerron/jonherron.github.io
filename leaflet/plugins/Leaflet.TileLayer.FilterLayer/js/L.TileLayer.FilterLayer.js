/*
  Leaflet.TileLayer.ColorFilter
  (c) 2018, Claudio T. Kawakani
  A simple and lightweight Leaflet plugin to apply CSS filters on map tiles.
  https://github.com/xtk93x/Leaflet.TileLayer.ColorFilter
*/
L.TileLayer.FilterLayer = L.TileLayer.extend({

	currentButton: undefined,
	currentFilterSettingsContainer: undefined,
	filterSettingsContainers: {
		brightness: 'brightness',
		contrast: 'contrast',
		grayscale: 'grayscale',
		hueRotation: 'hueRotation',
		invert: 'invert',
		saturation: 'saturation',
		sepia: 'sepia',
		blur: 'blur',
		opacity: 'opacity'
	},
	filterSettingsSliders: {
		brightness: 'brightness',
		contrast: 'contrast',
		grayscale: 'grayscale',
		hueRotation: 'hueRotation',
		invert: 'invert',
		saturation: 'saturation',
		sepia: 'sepia',
		blur: 'blur',
		opacity: 'opacity'
	},
	currentMap: undefined,	
	currentFilter: ["some filter"],
	showFilterSettings: false,
	colourFilters: {
		brightness: 'brightness',
		contrast: 'contrast',
		grayscale: 'grayscale',
		hueRotation: 'hueRotation',
		invert: 'invert',
		saturation: 'saturation',
		sepia: 'sepia'
	},
	otherFilters: {
		blur: 'blur',
		opacity: 'opacity'
	},	

	intialize: function (url, options) {
		L.TileLayer.prototype.initialize.call(this, url, options);
	},

    onAdd: function onAdd(map) {
        L.TileLayer.prototype.onAdd.call(this, map);
		L.TileLayer.FilterLayer.prototype.currentMap = map;
		map.filterLayer = L.TileLayer.FilterLayer.prototype;
		this.addButton(map);
		if(this.showFilterSettings) this.updateFilterDisplay();
    },

    onRemove: function onRemove(map) {
        L.TileLayer.prototype.onRemove.call(this, map);
		L.TileLayer.FilterLayer.prototype.currentMap = undefined;
		this.removeButton(this.currentButton);
		// if(this.showFilterSettings) this.removeFilterDisplay();
    },





	toggleFilterSettings: function () {
		let _this = L.TileLayer.FilterLayer.prototype;
		console.log("....currentFilter >> ", _this.currentFilter);
		if(!_this.showFilterSettings) {
			_this.showFilterSettings = true;
			_this.createFilterDisplay(_this.getMap());
			console.log("_this.getMap()", _this.currentMap);
		}
		else{
			_this.showFilterSettings = false;
			_this.removeFilterDisplay();
		}
		console.log("_this.showFilterSettings", _this.showFilterSettings);
	},



	brightness: function (value) {
		// brightness(%)
		// Adjusts the brightness of the image.

		// 0% will make the image completely black.
		// 100% (1) is default and represents the original image.
		// Values over 100% will provide brighter results.


		//check if brightness is 'set' in currentFilters and modify if it is.
		
		return this
	},
	contrast: function (value) {
		// contrast(%)	
		// Adjusts the contrast of the image.

		// 0% will make the image completely black.
		// 100% (1) is default and represents the original image.
		// Values over 100% will provide results with less contrast.
		return this
	},
	grayscale: function (value) {
		// grayscale(%)	
		// Converts the image to grayscale.

		// 0% (0) is default and represents the original image.
		// 100% will make the image completely gray (used for black and white images).

		// Note: Negative values are not allowed.
		return this
	},
	hue: function (value) {
		// hue-rotate(deg)	
	    // Applies a hue rotation on the image. 
		// The value defines the number of degrees around the color circle the image samples will be adjusted. 
		// 0deg is default, and represents the original image.

		// Note: Maximum value is 360deg.
		return this
	},
	invert: function (value) {
		// invert(%)
		// Inverts the samples in the image.

		// 0% (0) is default and represents the original image.
		// 100% will make the image completely inverted.

		// Note: Negative values are not allowed.
		return this
	},
	saturation: function (value) {
		// saturate(%)	
		// Saturates the image.

		// 0% (0) will make the image completely un-saturated.
		// 100% is default and represents the original image.
		// Values over 100% provides super-saturated results.

		// Note: Negative values are not allowed.
		return this
	},
	sepia: function (value) {
		// sepia(%)	
		// Converts the image to sepia.

		// 0% (0) is default and represents the original image.
		// 100% will make the image completely sepia.

		// Note: Negative values are not allowed.
		return this
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

		L.TileLayer.prototype._initContainer.call(this);

		L.TileLayer.FilterLayer.prototype.currentFilter = this._container.style.filter = this.colorFilter();

		console.log("_initContainer - this.colorFilter()", this.colorFilter());
	},

	updateFilter: function (newFilter) {
	
		this.options.filter = newFilter;
		if (this._container) {
			L.TileLayer.FilterLayer.prototype.currentFilter = this._container.style.filter = this.colorFilter();
		}

	},

	updateFilterDisplay: function () {
		console.log("updateFilterDisplay");
	},










	createButton: function (title, className, content, container, fn, context) {

        let button = L.DomUtil.create('a', className, container);
		button.settings = {title, className, content, container, fn, context};
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

        L.TileLayer.FilterLayer.prototype.currentButton = this.createButton(title, className, content, container, fn, context);
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
		console.log("createFilterDisplay");
		let title, className, content, container, fn, context;
		title = "Filter Options";
		className = 'leaflet-control-filter-settings-container';
		content = "Wow content";
		fn = '';
		context = this;
		// getlb = document.getElementsByClassName('leaflet-bottom leaflet-left');
		// container = L.DomUtil.create('div', 'leaflet-bar', getlb);

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

		this.createSliderElement('brightness');
		this.createSliderElement('contrast');
		this.createSliderElement('grayscale');
		this.createSliderElement('hueRotation');
		this.createSliderElement('invert');
		this.createSliderElement('saturation');
		this.createSliderElement('sepia');
		this.createSliderElement('blur');
		this.createSliderElement('opacity');


	},

	createSliderElement: function (slider, min, max, value, unit) {
		let _this = L.TileLayer.FilterLayer.prototype;
		_this.filterSettingsContainers[slider] = L.DomUtil.create('div', 'leaflet-control-filter-settings-slider leaflet-control-filter-settings-'+slider+'-slider', this.currentFilterSettingsContainer);
		let cst = L.DomUtil.create('span', 'leaflet-control-filter-settings-title leaflet-control-filter-settings-'+slider+'-title', this.filterSettingsContainers[slider]);
		cst.innerHTML = slider.charAt(0).toUpperCase() + slider.slice(1) + ' : ';
		let csv = L.DomUtil.create('span', 'leaflet-control-filter-settings-value leaflet-control-filter-settings-'+slider+'-value', this.filterSettingsContainers[slider]);
		csv.setAttribute('id', slider+'-value');
		csv.innerHTML = '0% </br>';
		let ci = this.filterSettingsSliders[slider] = L.DomUtil.create('input', 'leaflet-control-filter-settings-input leaflet-control-filter-settings-'+slider+'-input', this.filterSettingsContainers[slider]);
		ci.setAttribute('type', 'range');
		ci.setAttribute('min', '0');
		ci.setAttribute('max', '100');
		ci.setAttribute('value', '0');
		ci.setAttribute('id', slider+'-slider');
		ci.addEventListener('input', function (e) {
			L.DomUtil.get(slider+'-value').innerHTML = e.target.value + '%';
		});
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