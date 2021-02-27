
let mapOptions = {};

let mymap = L.map('map', mapOptions);

let stamenLayer = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let stamenAdjustableLayer = L.tileLayer.adjustableFilterLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let stamenTonerLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let stamenTonerAdjustableLayer = L.tileLayer.adjustableFilterLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    filter: ["invert:100%"],
    settings: {
        addButton: false
    },
    maxZoom: 20,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let darkmatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

let baseLayers = {
    "Stamen Default": stamenLayer,
    "Stamen Default (<i class='bi bi-filter-square'></i>Adjustable)": stamenAdjustableLayer,
    "Stamen Toner": stamenTonerLayer,
    "Stamen Toner (<i class='bi bi-filter-square'></i>Adjustable)": stamenTonerAdjustableLayer,
    "Fake Img": L.tileLayer.imageplaceholder('fakeImg'),
    "Dark Matter": darkmatterLayer,
    "Stadia Alidade Smooth Dark": Stadia_AlidadeSmoothDark
};

L.control.layers(baseLayers).addTo(mymap);



let stamenFilter = [
    "invert:100", 
    "grayscale:86", 
    "brightness:149", 
    "contrast:100", 
    "hue:222", 
    "saturation:609", 
    "sepia:0", 
    "blur:0", 
    "opacity:100"
];

stamenAdjustableLayer.updateFilter(stamenFilter);

stamenLayer.addTo(mymap);


let stamenTonerFilter = [
    "invert:100%", 
    "grayscale:86%", 
    "sepia:0%"
];

stamenTonerAdjustableLayer.updateFilter(stamenTonerFilter);





let lat = 54.91418099296834;
let lng = -1.3817024230957031;
let zm = 15;

mymap.setView([lat, lng], zm);