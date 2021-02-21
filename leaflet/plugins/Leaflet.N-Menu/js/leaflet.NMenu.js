L.NMenu = L.Class.extend({

    version: "1.0.0",
    isMenuDisposed: false,
    isMenuTransitioning: false,
    isMenuVisible: false,
    isFullScreen: false,
    settings: {
        showMenuOnLoad: true,
        toggleItems: false,
        location: 'left',
        banner: 'fixed',
        footer: 'fixed'
    },
    configuration: {
        parentTrigger: 'li',
        triggerElement: 'a',
        subMenu: 'ul',
        stopEventsOn: {
            click: 'click',
            mousedown: 'mousedown',
            dblclick: 'dblclick'
        },
        toggleButton: {
            openToggleContent: '<i class="bi bi-door-open-fill"></i>',
            closeToggleContent: '<i class="bi bi-door-closed-fill"></i>'
        }
    },

    containers: {
        mainContainerElement: undefined,
        mapParentElement: '',
        menuParentElement: '',
        menuItemsElement: '',
        menuToggleButton: undefined,
        fullScreenToggleButton: undefined
    },
    items: {
        path: 'menu-ajax.htm',
        from: {
            theDOM: {},
            ajax: {},
            passedObjects: {},
            createdObjects: {}
        },
        template: {
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
    },

    events: {
        N_MENU_MAP_CREATED: 'leaflet-nmenu-event-map-created',
        N_MENU_MAP_LOADING: 'leaflet-nmenu-event-map-loading',
        N_MENU_MAP_LOADED: 'leaflet-nmenu-event-map-loaded',
        N_MENU_EVENT_MENU_OPEN: 'leaflet-nmenu-event-menu-open',
        N_MENU_EVENT_MENU_CLOSED: 'leaflet-nmenu-event-menu-closed'
    },

    styles: {
        N_MENU_CLASS: 'leaflet-nmenu',
        N_MENU_CLASS_ACTIVE: 'leaflet-nmenu-active',
        N_MENU_CLASS_MENU_ROOT: 'leaflet-nmenu-accordian',
        N_MENU_ITEM_CLASS: 'leaflet-nmenu-item',
        N_MENU_ITEM_CLASS_ACTIVE: 'leaflet-nmenu-item-active'
    },

    statics: {
        N_MENU_PARENT_ITEM_OPEN: 'leaflet-nmenu-parent-item-open',
        N_MENU_PARENT_ITEM_CLOSED: 'leaflet-nmenu-parent-item-closed',
        N_MENU_CHILD_ITEM_OPEN: 'leaflet-nmenu-child-item-open',
        N_MENU_CHILD_ITEM_CLOSED: 'leaflet-nmenu-child-item-closed',



        NMENU_MENU_TRIGGER: 'leaflet-nmenu-menu-trigger',
        NMENU_PARENT_TRIGGER: 'leaflet-nmenu-parent-trigger',
        NMENU_CHILD_TRIGGER: 'leaflet-nmenu-child-trigger',
        NMENU_GRANDCHILD_TRIGGER: 'leaflet-nmenu-grandchild-trigger',

        N_MENU_CONTAINER_MAP: 'leaflet-nmenu-map-container',
        N_MENU_CONTAINER_MENU: 'leaflet-nmenu-menu-container',
        N_MENU_CONTAINER_UL: 'leaflet-nmenu-ul-container',


        N_MENU_BANNER_CONTAINER: 'leaflet-nmenu-banner-container',
        N_MENU_MAIN_MENU_ACCORDIAN_ITEM: 'leafet-nmenu-accordian-item',
        N_MENU_ACCORDIAN_TRIGGER: 'leafet-nmenu-accordian-trigger'
    },

    /*
    
    ░▀█▀░█▀▀▄░░▀░░▀█▀░░▀░░█▀▀▄░█░░░▀░░▀▀█░█▀▀
    ░▒█░░█░▒█░░█▀░░█░░░█▀░█▄▄█░█░░░█▀░▄▀▒░█▀▀
    ░▄█▄░▀░░▀░▀▀▀░░▀░░▀▀▀░▀░░▀░▀▀░▀▀▀░▀▀▀░▀▀▀

    */

    initialize: function (map, options) {

        L.setOptions(this, options);
        this.setupDom();
        this.setupInitialMenuState();
        this.setupDisplayType();

       this.loadItems();

        console.log(this);
    },

    /* 

    ░▒█▀▀▄░▒█▀▀▀█░▒█▀▄▀█░░░▒█▀▄▀█░█▀▀▄░█▀▀▄░░▀░░▄▀▀▄░█░▒█░█░░█▀▀▄░▀█▀░░▀░░▄▀▀▄░█▀▀▄
    ░▒█░▒█░▒█░░▒█░▒█▒█▒█░░░▒█▒█▒█░█▄▄█░█░▒█░░█▀░█▄▄█░█░▒█░█░░█▄▄█░░█░░░█▀░█░░█░█░▒█
    ░▒█▄▄█░▒█▄▄▄█░▒█░░▒█░░░▒█░░▒█░▀░░▀░▀░░▀░▀▀▀░█░░░░░▀▀▀░▀▀░▀░░▀░░▀░░▀▀▀░░▀▀░░▀░░▀


    */

    setupDom: function () {
        // this.containers.menuItemsElement = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        this.containers.mainContainerElement = L.DomUtil.get('nmenu') ? L.DomUtil.get('nmenu') : document.createElement("div");
        this.containers.menuParentElement = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        this.containers.mapParentElement = L.DomUtil.get('map') ? L.DomUtil.get('map') : document.createElement("div");
        this.containers.menuItemsElement = L.DomUtil.get('accordian') ? L.DomUtil.get('accordian') : document.createElement("ul");

        this.containers.mainContainerElement.id = 'nmenu';
        this.containers.menuParentElement.id = 'menu';
        this.containers.menuItemsElement.id = 'accordian';
        // this.containers.mapParentElement.id = 'map';

        this.containers.mapParentElement.parentNode.insertBefore(this.containers.mainContainerElement, this.containers.mapParentElement);
        this.containers.mainContainerElement.appendChild(this.containers.menuParentElement);
        this.containers.mainContainerElement.appendChild(this.containers.mapParentElement);
        this.containers.menuParentElement.appendChild(this.containers.menuItemsElement);
    },

    setupInitialMenuState: function () {
        //choose or read the intial state
        L.DomUtil.addClass(L.NMenu.prototype.containers.menuParentElement, L.NMenu.prototype.styles.N_MENU_CLASS);
        L.DomUtil.addClass(L.NMenu.prototype.containers.mapParentElement, L.NMenu.prototype.styles.N_MENU_CLASS);
    },

    setupDisplayType: function () {

    },
    /*

    ░▒█▀▄▀█░█▀▀░█▀▀▄░█░▒█░░░▒█▀▀▀░█░▒█░█▀▀▄░█▀▄░▀█▀░░▀░░▄▀▀▄░█▀▀▄░█▀▀▄░█░░░▀░░▀█▀░█░░█
    ░▒█▒█▒█░█▀▀░█░▒█░█░▒█░░░▒█▀▀░░█░▒█░█░▒█░█░░░░█░░░█▀░█░░█░█░▒█░█▄▄█░█░░░█▀░░█░░█▄▄█
    ░▒█░░▒█░▀▀▀░▀░░▀░░▀▀▀░░░▒█░░░░░▀▀▀░▀░░▀░▀▀▀░░▀░░▀▀▀░░▀▀░░▀░░▀░▀░░▀░▀▀░▀▀▀░░▀░░▄▄▄▀


    */


    toggleMenu: function (ev) {
        let _this = L.NMenu.prototype;
        // console.log("toggleMenu", ev);
        console.log("_this", _this);
        if (!_this.isMenuVisible) {
            //set menu to visible
            _this.isMenuVisible = true;
            console.log("_this.isMenuVisible", _this.isMenuVisible);
            if(L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS)){
                L.DomUtil.removeClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS);
                L.DomUtil.removeClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS);
            }
            if(!L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE)){
                L.DomUtil.addClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
                L.DomUtil.addClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
            }
            L.NMenu.map.fire(_this.N_MENU_EVENT_MENU_OPEN, {
                menu: _this
            });

        } else {
            _this.isMenuVisible = false;
            console.log("_this.isMenuVisible", _this.isMenuVisible);
            if(!L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS)){
                L.DomUtil.addClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS);
                L.DomUtil.addClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS);
            }
            if(L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE)){
                L.DomUtil.removeClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
                L.DomUtil.removeClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
            }
            L.NMenu.map.fire(_this.N_MENU_EVENT_MENU_CLOSED, {
                menu: _this
            });
        }

    },

    accordianToggle: function (mainElement, toggle) {

    },














    loadItems: function (path) {
        let validate = L.NMenu.prototype.items.path;
        if (!validate) alert("no valid 'path' parameter passed in map.options.nmenu.path");
        let passedPath = path ? path : L.NMenu.prototype.items.path;
        fetch(passedPath)
            .then(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw Error(`loadInitialItems Request rejected with status ${res.status}`);
                }
            })
            .then(data => data.text())
            .then(data => {
                // menu.dispose();
                if (L.NMenu.prototype.containers.menuItemsElement) {
                    L.NMenu.prototype.containers.menuItemsElement.innerHTML += data;
                } else {
                    console.log('no "this.containers.menuULElement" defined, or correctly assigned somewhere...');
                    throw Error(`failed to add ${data} to "this.containers.menuULElement"`);
                }
            })
            .then(() => {
              //  this._setupComplete_Initialise(passedPath);

            })
            .catch(console.error);
    }


});








/*

░▒█░░░░░░░▒█▀▄▀█░█▀▀▄░▄▀▀▄░░░░█▀▀▄░█▀▄░█▀▄░▀█▀░█▀▀▄░░▀░░▀█▀░▒█░▒█░▄▀▀▄░▄▀▀▄░█░▄░░
░▒█░░░░▄▄░▒█▒█▒█░█▄▄█░█▄▄█░▄▄░█▄▄█░█░█░█░█░▒█░░█░▒█░░█▀░░█░░▒█▀▀█░█░░█░█░░█░█▀▄░░
░▒█▄▄█░▀▀░▒█░░▒█░▀░░▀░█░░░░▀▀░▀░░▀░▀▀░░▀▀░░▄█▄░▀░░▀░▀▀▀░░▀░░▒█░▒█░░▀▀░░░▀▀░░▀░▀░░

*/


L.Map.addInitHook(function () {

    L.setOptions(this.options, this);
    L.NMenu.prototype.initialize();

    this.nmenu = L.NMenu;
    L.NMenu.map = this;

    L.NMenu.defaults = this.options.nmenu ? this.options.nmenu : this.options;

    console.log("L.Map.addInitHook", this);
    console.log("L.Map.addInitHook", L.NMenu.prototype);

    // get options for which buttons to auto-add
    this.addControl(L.control.buttonator({}));


});


L.nmenu = function (opts) {
    return new L.NMenu(opts);
};




















/*

░▒█░░░░░░░▒█▀▀▄░▄▀▀▄░█▀▀▄░▀█▀░█▀▀▄░▄▀▀▄░█░░░░░▒█▀▀▄░█░▒█░▀█▀░▀█▀░▄▀▀▄░█▀▀▄░█▀▀▄░▀█▀░▄▀▀▄░█▀▀▄░░
░▒█░░░░▄▄░▒█░░░░█░░█░█░▒█░░█░░█▄▄▀░█░░█░█░░▄▄░▒█▀▀▄░█░▒█░░█░░░█░░█░░█░█░▒█░█▄▄█░░█░░█░░█░█▄▄▀░░
░▒█▄▄█░▀▀░▒█▄▄▀░░▀▀░░▀░░▀░░▀░░▀░▀▀░░▀▀░░▀▀░▀▀░▒█▄▄█░░▀▀▀░░▀░░░▀░░░▀▀░░▀░░▀░▀░░▀░░▀░░░▀▀░░▀░▀▀░░

*/


L.Control.Buttonator = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {

        let title, className, content, container, fn, context;

        context = map;

        if (map.zoomControl) {
            container = map.zoomControl._container;
        } else {
            container = L.DomUtil.create('div', 'leaflet-bar');
        }


        title = 'Menu Toggle';
        className = 'leaflet-control-menu-toggle-button';
        content = ['<i class="bi bi-arrow-right-circle-fill"></i>', '<i class="bi bi-arrow-left-circle-fill"></i>'];
        fn = L.NMenu.prototype.toggleMenu;

        L.NMenu.prototype.containers.menuToggleButton = this.create(title, className, content, container, fn, context);


        title = 'FullScreen Toggle';
        className = 'leaflet-control-fullscreen-toggle-button';
        content = ['<i class="bi bi-fullscreen"></i>', '<i class="bi bi-fullscreen-exit"></i>'];
        fn = this.toggleFullScreen;

        L.NMenu.prototype.containers.fullScreenToggleButton = this.create(title, className, content, container, fn, context);



        return container;
    },
    onRemove: function (map) {
        L.DomEvent
            .off(L.NMenu.prototype.containers.menuToggleButton, 'click', L.DomEvent.stopPropagation)
            .off(L.NMenu.prototype.containers.menuToggleButton, 'dblclick', L.DomEvent.stopPropagation)
            .off(L.NMenu.prototype.containers.menuToggleButton, 'click', L.DomEvent.preventDefault)
            .off(L.NMenu.prototype.containers.menuToggleButton, 'dblclick', L.DomEvent.preventDefault)
            .off(L.NMenu.prototype.containers.menuToggleButton, 'click', button.callback, context);

        L.NMenu.prototype.containers.menuToggleButton = null;
    },
    create: function (title, className, content, container, fn, context) {


        let button = L.DomUtil.create('a', className, container);
        button.href = '#';
        button.title = title;
        button.innerHTML = content[0];
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





    toggleFullScreen: function () {
        console.log(this);
        if (!L.NMenu.prototype.isFullScreen) {
            L.Control.Buttonator.prototype.openFullScreen();
            L.NMenu.prototype.isFullScreen = true;
        } else {
            L.Control.Buttonator.prototype.closeFullScreen();
            L.NMenu.prototype.isFullScreen = false;
        }
    },
    openFullScreen: function (element) {
        let validElement = element ? element : document.documentElement;
        if (validElement.requestFullscreen) {
            validElement.requestFullscreen();
        } else if (validElement.webkitRequestFullscreen) {
            /* Safari */
            validElement.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            validElement.msRequestFullscreen();
        }

    },
    closeFullScreen: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }

    }
});

L.control.buttonator = function (options) {
    return new L.Control.Buttonator(options);
};