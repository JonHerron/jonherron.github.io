
let mapOptions = {};

let mymap = L.map('map', mapOptions);

let stamenLayer = L.tileLayer.adjustableFilterLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    control: {
        title: 'My Filters',
        display: {
            blur: false,
            brightness:true,
            contrast: true
        }
    },
    button: {
        title: 'Toggle Filter Settings',
        icon: {
            show: '<i class="bi bi-filter-square-fill"></i>',
            hide: '<i class="bi bi-filter-square"></i>' 
        },
        on: {
            click: function(){},
            hover: function(){}
        }
    },
    maxZoom: 18,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let stamenTonerLayer = L.tileLayer.filterLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    filter: ["invert:100%"],
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
    display: {
        blur: false,
        brightness:true,
        contrast: true
    },
    maxZoom: 20,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let baseLayers = {
    "Stamen Default": stamenLayer,
    "Stamen Toner": stamenTonerLayer,
    "Stamen Toner Adjustable": stamenTonerAdjustableLayer
};

L.control.layers(baseLayers).addTo(mymap);



let stamenFilter = {
    invert:"100", 
    grayscale:"86", 
    brightness:"149", 
    contrast:"100", 
    hue:"222", 
    saturation:"609", 
    sepia:"0", 
    blur:"0", 
    opacity:"100"
};

stamenLayer.updateFilter(stamenFilter);

stamenLayer.addTo(mymap);


let stamenTonerFilter = {
    invert:"100%", 
    grayscale:"86%", 
    sepia:"0%"
};

stamenTonerLayer.updateFilter(stamenTonerFilter);





let lat = 54.91418099296834;
let lng = -1.3817024230957031;
let zm = 15;

mymap.setView([lat, lng], zm);