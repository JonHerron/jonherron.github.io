
let mapOptions = {};

let mymap = L.map('map', mapOptions);

let stamenLayer = L.tileLayer.filterLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let stamenTonerLayer = L.tileLayer.filterLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    filter: ['invert:100%'],
    maxZoom: 20,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let baseLayers = {
    "Stamen Default": stamenLayer,
    "Stamen Toner": stamenTonerLayer
};

L.control.layers(baseLayers).addTo(mymap);






let stamenFilter = ['invert:100%','grayscale:86%','bright:147%','contrast:104%','hue:222deg','saturate:602%'];

stamenLayer.updateFilter(stamenFilter);

stamenLayer.addTo(mymap);

let lat = 54.91418099296834;
let lng = -1.3817024230957031;
let zm = 15;

mymap.setView([lat, lng], zm);