

let nmenu = {
    path: 'menu-ajax.htm',

    menuConfig: {
        parentTrigger: 'li',
        triggerElement: 'a',
        subMenu: 'ul',
        toggleItems: false,
        location: 'left',
        banner: 'fixed',
        footer: 'fixed'

    },
    toggleButton: {
        showMenuOnLoad: true,
        openToggleContent: '<i class="bi bi-alarm-fill"></i>',
        closeToggleContent: '<i class="bi bi-alarm-fill"></i>'
    },
    menuItems: {
        ParentMenuItem1: {
            SubItem1_1: '<a href="#SubItem1_1Hash"><i class="bi bi-alarm-fill"></i>Link 1_1</a>',
            SubItem1_2: '<a href="#SubItem1_2Hash"><i class="bi bi-envelope-fill"></i>Link 1_2</a>'
        },
        ParentMenuItem2: {
            SubItem2_1: '<a href="#SubItem2_1Hash"><i class="bi bi-alarm-fill"></i>Link 2_1</a>',
            SubItem2_2: '<a href="#SubItem2_2Hash"><i class="bi bi-envelope-fill"></i>Link 2_2</a>'
        },
        ParentMenuItem3: {
            ParentMenuItem3_ChildMenuItem1: {
                ChildMenuItem1_SubItem1_1: '<a href="#ChildMenuItem1_SubItem1_1Hash"><i class="bi bi-alarm-fill"></i>ChildMenuItem1_Link 1_1</a>',
                ChildMenuItem1_SubItem1_2: '<a href="#ChildMenuItem1_SubItem1_2Hash"><i class="bi bi-envelope-fill"></i>ChildMenuItem1_Link 1_2</a>'
            },
            SubItem3_2: '<a href="#SubItem3_2Hash"><i class="bi bi-envelope-fill"></i>Link 3_2</a>'
        }
    }

};

let mapOptions = {
    nmenu: nmenu,
    zoomControl: true
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

let darkmatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true
});

let baseLayers = {
    "Stamen Default": stamenLayer,
    "Stamen Toner": stamenTonerLayer,
    "CartoDB Darkmatter" : darkmatterLayer
};

L.control.layers(baseLayers).addTo(mymap);

darkmatterLayer.addTo(mymap);