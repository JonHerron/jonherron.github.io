console.clear();

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
    timeout: 5000
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



let myControlCarousel = L.control.enhanced.carousel({
        position: 'bottomleft',
        styles: {
            padding: '0px',
            width: '640px',
            height: '480px'
        },
        carousel: {
            items: [{
                title: 'item1',
                innerHTML: '<img alt="" src="https://placeimg.com/640/480/any"/>'
            }, {
                title: 'item2',
                innerHTML: '<img alt="" src="https://placeimg.com/640/480/animals"/>'
            }, {
                title: 'item3',
                innerHTML: '<img alt="" src="https://placeimg.com/640/480/arch"/>'
            }, {
                title: 'item4',
                innerHTML: '<img alt="" src="https://placeimg.com/640/480/nature"/>'
            }, {
                title: 'item5',
                innerHTML: '<img alt="" src="https://placeimg.com/640/480/people"/>'
            }],
            icons: {
                previous: '',
                next: '',
                navigation: ''
            }
        }
    })
    .addTo(mymap);

let carouselCSS = `
    .leaflet-control-enhanced-carousel-container {
        width: 100%;
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
        background: #eee;
        border: 0;
        border-radius: 0.25em;
        color: #aaa;
        padding: 0.5em 1em;
    }
    
    .controls button:hover,
    .controls button:focus {
        background: #aaa;
        border: 0;
        border-radius: 0.25em;
        color: #eee;
        padding: 0.5em 1em;
    }
  `;

myControlCarousel.injectCSS(carouselCSS);







var delayInMilliseconds = 2000; //2 second

setTimeout(function () {
    myMessageBox.alert('This is an automated Alert with a timeout of 5000ms', 5000);
}, delayInMilliseconds);