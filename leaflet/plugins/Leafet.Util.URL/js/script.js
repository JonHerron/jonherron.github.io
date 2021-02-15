
let mapOptions = {};

let mymap = L.map('map', mapOptions);

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

let paramOptions = {
    showParameters: {
        zoom: true,
        lat: true,
        lng: true,
        lon: false,
        mapID: true
    },
    parameterOptions: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 14, // max 16,
        showInURL: true,
        showInAttribution: true
    }
}

L.Util.URL.changeDefaults(paramOptions);

stamenLayer.addTo(mymap);

let lat = L.Util.URL.parameters.lat ? L.Util.URL.parameters.lat : 54.91418099296834;
let lng = L.Util.URL.parameters.lng ? L.Util.URL.parameters.lng : -1.3817024230957031;
let zm = L.Util.URL.parameters.zm ? L.Util.URL.parameters.zm : 15;

mymap.setView([lat, lng], zm);