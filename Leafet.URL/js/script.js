
let urlOptions = {
    showInURL: true,
    showInAttribution: true
};

let mapOptions = {
    urlOptions : urlOptions
};

let mymap = L.map('map', mapOptions).setView([54.91418099296834, -1.3817024230957031], 15);





let stamenLayer = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
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

let baseLayers = {
    "Stamen Default": stamenLayer,
    "Stamen Toner": stamenTonerLayer
};

L.control.layers(baseLayers).addTo(mymap);

stamenLayer.addTo(mymap);