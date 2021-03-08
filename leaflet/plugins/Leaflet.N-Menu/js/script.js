function menuHandler(e) {
    console.log('Event - ', e.type, e);
};







let menuItems = [{ //parentItem1
        name: 'Menu 1',
        id: 'P1',
        open: true,
        classes: '',
        element: {
            type: 'div',
            attributes: {
                'data-type': 'accordian-content'
            },
            styles: {
                padding: '5px 5px 0px 5px'
            },
            innerHTML: '<h5>Lorem ipsum.</h5>' +
                '<p class="menuP">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium minima dolores assumenda id. Porro consequuntur at dolor eum, neque labore!</p>' +
                '<h5>Dolor sit amet.</h5>' +
                '<p class="menuP">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur non sint sequi ipsa laudantium, aiure rem vel nemo soluta temporibus, consectetur at corrupti aspernatur maxime, iusto neque blanditiis deleniti.</p>'
        }
    },
    { //parentItem2
        name: 'Menu 2',
        id: 'P2',
        items: [{
                name: 'Menu 2.1',
                id: 'P2C1',
                classes: '',
                element: {
                    type: 'div',
                    attributes: undefined,
                    styles: {
                        backgroundColor: 'lightcoral'
                    },
                    innerHTML: undefined
                }
            },
            {
                name: 'Menu 2.2',
                id: 'P2C2',
                open: true,
                items: [{
                        name: 'Menu 2.2.1',
                        id: 'P2C2GC1',
                        classes: '',
                        element: {
                            type: 'div',
                            attributes: undefined,
                            styles: {
                                backgroundColor: 'orange'
                            },
                            innerHTML: undefined
                        }
                    },
                    {
                        name: 'Menu 2.2.2',
                        id: 'P2C2GC2',
                        classes: '',
                        items: [{
                            name: 'Menu 2.2.2.1',
                            id: 'P2C2GC2GGC1',
                            classes: '',
                            element: {
                                type: 'div',
                                attributes: undefined,
                                styles: {
                                    backgroundColor: 'grey'
                                },
                                innerHTML: undefined
                            }
                        }],
                        element: {
                            type: 'div',
                            attributes: undefined,
                            styles: {
                                backgroundColor: 'orange'
                            },
                            innerHTML: undefined
                        }
                    }
                ],
                itemsOpenByDefault: false,
                classes: '',
                element: {
                    type: 'div',
                    attributes: undefined,
                    styles: {
                        backgroundColor: 'lightpurple'
                    },
                    innerHTML: undefined
                }
            },
            {
                name: 'Menu 2.3',
                id: 'P2C3',
                classes: '',
                element: {
                    type: 'div',
                    attributes: undefined,
                    styles: {
                        backgroundColor: 'lightcoral'
                    },
                    innerHTML: undefined
                }
            }
        ],
        classes: '',
        element: {
            type: 'div',
            attributes: undefined,
            styles: {
                backgroundColor: 'lightblue'
            },
            innerHTML: undefined
        }
    },
    { //parentItem3
        name: 'Menu 3',
        id: 'P3',
        classes: '',
        element: {
            type: 'div',
            attributes: undefined,
            styles: {
                backgroundColor: 'lime'
            },
            innerHTML: undefined
        }
    },
    { //parentItem4
        name: 'Menu 4',
        id: 'P4',
        items: [{
            name: 'Menu 4.1',
            id: 'P4C1',
            classes: '',
            element: {
                type: 'div',
                attributes: undefined,
                styles: {
                    backgroundColor: 'lightcoral'
                },
                innerHTML: undefined
            }
        }],
        classes: '',
        element: {
            type: 'div',
            attributes: undefined,
            styles: {
                backgroundColor: 'lightblue'
            },
            innerHTML: undefined
        }
    },
    { //parentItem5
        name: 'Menu 5',
        id: 'P5',
        classes: '',
        element: {
            type: 'div',
            attributes: undefined,
            styles: {
                backgroundColor: 'lime'
            },
            innerHTML: undefined
        }
    }

];















let stamenLayer = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
            <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; 
            Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
    useCache: true
});

let stamenTonerLayer = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
            <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; 
            Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
    useCache: true
});

let darkmatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, 
            <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; 
            Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
    useCache: true
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: `&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, 
            &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> 
            &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors`
});

let baseLayers = {
    "Stamen Default": stamenLayer,
    "Stamen Toner": stamenTonerLayer,
    "CartoDB Darkmatter": darkmatterLayer,
    "Stadia AlidadeSmoothDark": Stadia_AlidadeSmoothDark
};



let mapOptions = {
    // nmenu: nmenu,
    zoomControl: true,
    nmenu: {
        items: menuItems,
        ajax: {
            onLoad: 'menu-ajax.htm',
            position: 'bottom'
        },
        onLoad: {
            show: true
        },
        config: {
            position: 'offMapLeft',
            width: '250px',
            height: '100%',
            header: 'sticky',
            footer: 'fixed',
            icons: {
                class: 'bi',
                menuShow: 'bi-arrow-right-circle-fill',
                menuHide: 'bi-arrow-left-circle-fill',
                fullScreenEnter: 'bi-fullscreen',
                fullScreenExit: 'bi-fullscreen-exit'
            }
        }
    }
};


let mymap = L.map('map', mapOptions);



L.control.layers(baseLayers).addTo(mymap);

darkmatterLayer.addTo(mymap);



mymap.setView([54.91418099296834, -1.3817024230957031], 15);