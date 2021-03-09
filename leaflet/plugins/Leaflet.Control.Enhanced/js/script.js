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

let stamenTonerAdjustableLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
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




stamenLayer.addTo(mymap);




let lat = 54.91418099296834;
let lng = -1.3817024230957031;
let zm = 15;

mymap.setView([lat, lng], zm);





let myMessageBoxOptions = {
    position: 'topright',
    timeout: 5000,
}
let myMessageBox = L.control.enhanced.messagebox(myMessageBoxOptions).addTo(mymap);


let HTMLContent = '<em><i class="bi bi-check-square-fill"></i>Something</em>';
let HTMLContent2 = '<i id="myButton" class="bi bi-table"></i>';




let myRandomControl = L.control.enhanced({
        position: 'bottomleft',
        content: HTMLContent,
        classes: [],
        events: {
            input: function (event) {
                console.log("some input is happening", event);
            },
            click: function (event) {
                console.log("I clicked it", event);
                myMessageBox.warning('This is an Warning, "Something" was clicked');
            }
        }
    })
    .addTo(mymap);



let myControlCarousel = L.control.enhanced.carousel({
        position: 'bottomright',
        styles: {
            padding: '5px 10px',
            width: '300px',
            height: '200px'
        },
        carousel: {
            items: [{
                title: 'item1',
                innerHTML: '<h2>1</h2>'
            }, {
                title: 'item2',
                innerHTML: '<h2>2</h2>'
            }, {
                title: 'item3',
                innerHTML: '<h2>3</h2>'
            }, {
                title: 'item4',
                innerHTML: '<h2>4</h2>'
            }, {
                title: 'item5',
                innerHTML: '<h2>5</h2>'
            }, {
                title: 'item6',
                innerHTML: '<h2>6</h2>'
            }],
            icons: {
                previous: '',
                next: '',
                navigation: ''
            }
        }
    })
    .addTo(mymap);



let myButton = L.control.enhanced.button({
        id: 'myButtonContainer',
        position: 'topleft',
        content: HTMLContent2,
        classes: [],
        events: {
            input: function (event) {

            },
            click: function (event) {
                console.log("I clicked it", event);
                myMessageBox.message('This is a message to confirm ' + event.target.id + ' was clicked');
            },
            active: function (event) {
                console.log("I clicked it", event);
                myMessageBox.alert('This is an Alert to confirm ' + event.target.id + ' is now active');
            },
            mouseout: function (event) {
                console.log("I hovered it", event);
                myMessageBox.success('You successfully hovered over "Something"');
            }
        }
    })
    .addTo(mymap);



var delayInMilliseconds = 2000; //2 second

setTimeout(function () {
    myMessageBox.alert('This is an automated Alert with a timeout of 5000ms', 5000);
}, delayInMilliseconds);