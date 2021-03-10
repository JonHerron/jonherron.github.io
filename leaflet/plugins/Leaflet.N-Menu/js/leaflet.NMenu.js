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
    items: [{ 
        name: 'Template Item',
        id: 'template1',
        open: true,
        classes: '',
        items: undefined,
        element: {
            type: undefined,
            attributes: undefined,
            styles: undefined,
            innerHTML: undefined
        }
    }],


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



        N_MENU_MENU_TRIGGER: 'leaflet-nmenu-menu-trigger',
        N_MENU_PARENT_TRIGGER: 'leaflet-nmenu-parent-trigger',
        N_MENU_CHILD_TRIGGER: 'leaflet-nmenu-child-trigger',
        N_MENU_GRANDCHILD_TRIGGER: 'leaflet-nmenu-grandchild-trigger',

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

    initialize: function (map) {

        map.options.nmenu ? L.setOptions(this, map.options.nmenu) : L.setOptions(this, map.options);

        this._setMapNMenuFrameworkStyles();
        this._createMapNMenuFramework();
        this._setMapNMenuFrameworkClasses();
        this._createBanner();
        this.setupDisplayType();

        // this.loadItems(); --> moved to map.addinithook()


        if (this.options.items) console.log("createAccordianItems()", this.createAccordianItems(this.options.items));

    },

    /* 

    ░▒█▀▀▄░▒█▀▀▀█░▒█▀▄▀█░░░▒█▀▄▀█░█▀▀▄░█▀▀▄░░▀░░▄▀▀▄░█░▒█░█░░█▀▀▄░▀█▀░░▀░░▄▀▀▄░█▀▀▄
    ░▒█░▒█░▒█░░▒█░▒█▒█▒█░░░▒█▒█▒█░█▄▄█░█░▒█░░█▀░█▄▄█░█░▒█░█░░█▄▄█░░█░░░█▀░█░░█░█░▒█
    ░▒█▄▄█░▒█▄▄▄█░▒█░░▒█░░░▒█░░▒█░▀░░▀░▀░░▀░▀▀▀░█░░░░░▀▀▀░▀▀░▀░░▀░░▀░░▀▀▀░░▀▀░░▀░░▀


    */

    _setMapNMenuFrameworkStyles: function () {
        const cssHideStyles = `.leaflet-n-menu-multi-level-accordian,
                       .leaflet-n-menu-accordian-item ul,
                       .leaflet-n-menu-accordian-parent input[type='checkbox'] {
                          display: none;
                       }`;

        const cssShowStyles = `.leaflet-n-menu-multi-level-accordian,
                        .leaflet-n-menu-accordian-item input:checked ~ ul {
                          display: block; 
                          transition: display 1s ease-in-out;
                        }`;

        const defaultLabelStyles = `input[type=checkbox]+label {
                            cursor: pointer;
                            width: 100%;
                            font-weight: bold;
                            user-select: none;
                          }`;

        const defaultLabelInteractions = `input[type=checkbox]:focus+label,
                              input[type=checkbox]:hover+label,
                              input[type=checkbox]:checked+label {
                                font-weight: bolder;
                              }`;

        

        let cssAll = cssHideStyles + cssShowStyles + defaultLabelStyles + defaultLabelInteractions;
        this.styleTag = this.injectCSS(cssAll);
    },

    _createMapNMenuFramework: function () {
        // this.containers.menuItemsElement = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        this.containers.mainContainerElement = L.DomUtil.get('map-n-menu') ? L.DomUtil.get('map-n-menu') : document.createElement("div");
        this.containers.menuParentElement = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        this.containers.mapParentElement = L.DomUtil.get('map') ? L.DomUtil.get('map') : document.createElement("div");
        this.containers.menuItemsElement = L.DomUtil.get('accordian') ? L.DomUtil.get('accordian') : document.createElement("div");

        this.containers.mainContainerElement.id = 'map-n-menu'; // just in case this isn't set as this, make sure it is
        this.containers.menuParentElement.id = 'menu'; // same reasons as above
        this.containers.menuItemsElement.id = 'accordian'; // same reasons as above
        L.DomUtil.addClass(this.containers.menuItemsElement, 'leaflet-n-menu-multi-level-accordian');
        this.containers.mapParentElement.id = 'map'; // same reasons as above

        this.containers.mapParentElement.parentNode.insertBefore(this.containers.mainContainerElement, this.containers.mapParentElement);
        this.containers.mainContainerElement.appendChild(this.containers.menuParentElement);
        this.containers.mainContainerElement.appendChild(this.containers.mapParentElement);
        this.containers.menuParentElement.appendChild(this.containers.menuItemsElement);
    },

    _setMapNMenuFrameworkClasses: function () {
        //choose or read the intial state
        L.DomUtil.addClass(L.NMenu.prototype.containers.menuParentElement, L.NMenu.prototype.styles.N_MENU_CLASS);
        L.DomUtil.addClass(L.NMenu.prototype.containers.mapParentElement, L.NMenu.prototype.styles.N_MENU_CLASS);
    },

    setupDisplayType: function () {

    },

    _createBanner: function () {

        /*         
        header: {
            position: 'sticky',
            id: 'n_menu_header',
            classes: 'leaflet-n-menu-banner-container',
            element: {
                type: 'div',
                attributes: undefined,
                styles: {
                    //position: 'sticky', // same endpoint as nmenu>header>position therefore not required, will override nmenu>header>position
                    top: 0,
                    zIndex: 5,
                    backgroundImage: 'url(./img/tile.png)',
                    backgroundColor: 'rgb(16, 83, 150)',
                    backgroundBlendMode: 'multiply',
                    height: '80px',
                    backgroundSize: 'contain',
                    userSelect: 'none'
                },
                innerHTML: `<h2>LEAFET 'N' MENU</h2>`
            }

        } 
        */

        let bannerContainerElement = this.options.header.element.type ? this.options.header.element.type : 'div';
        let bannerContainerClasses = this.options.header.classes ? this.options.header.classes : '';
        let bannerContainer = L.DomUtil.create(bannerContainerElement, bannerContainerClasses, this.containers.menuItemsElement);
        if (this.options.header.position) bannerContainer.style['position'] = this.options.header.position;

        let headerStyles = this.options.header.element.styles;
        for (let option in headerStyles) {
			bannerContainer.style[option] = headerStyles[option];
		}

        if (this.options.header.element.innerHTML) bannerContainer.innerHTML += this.options.header.element.innerHTML; 


    },


    /* 

    ░▒█▀▀▄░▒█▀▀▀█░▒█▀▄▀█░░░▒█▀▄▀█░█▀▀▄░█▀▀▄░░▀░░▄▀▀▄░█░▒█░█░░█▀▀▄░▀█▀░░▀░░▄▀▀▄░█▀▀▄
    ░▒█░▒█░▒█░░▒█░▒█▒█▒█░░░▒█▒█▒█░█▄▄█░█░▒█░░█▀░█▄▄█░█░▒█░█░░█▄▄█░░█░░░█▀░█░░█░█░▒█
    ░▒█▄▄█░▒█▄▄▄█░▒█░░▒█░░░▒█░░▒█░▀░░▀░▀░░▀░▀▀▀░█░░░░░▀▀▀░▀▀░▀░░▀░░▀░░▀▀▀░░▀▀░░▀░░▀


    */














    /**
    
    ░▀█▀░▀█▀░█▀▀░█▀▄▀█░░░▒█▀▀▀░█░▒█░█▀▀▄░█▀▄░▀█▀░░▀░░▄▀▀▄░█▀▀▄░█▀▀▄░█░░░▀░░▀█▀░█░░█
    ░▒█░░░█░░█▀▀░█░▀░█░░░▒█▀▀░░█░▒█░█░▒█░█░░░░█░░░█▀░█░░█░█░▒█░█▄▄█░█░░░█▀░░█░░█▄▄█
    ░▄█▄░░▀░░▀▀▀░▀░░▒▀░░░▒█░░░░░▀▀▀░▀░░▀░▀▀▀░░▀░░▀▀▀░░▀▀░░▀░░▀░▀░░▀░▀▀░▀▀▀░░▀░░▄▄▄▀

    */

    createAccordianItems: function (accordianItems) {

        let container = L.DomUtil.create('div', '', this.containers.menuItemsElement);
        let _accordianItem;

        for (var i = 0; i < accordianItems.length; i++) {

            // {
            //     name: 'something',
            //     id: 'Phillie',
            //     open: false, // implied
            //     icons: {default: '', hover: '', focus: '', selected: ''},
            //     items: accSubItems,
            //     itemsOpenByDefault: true,
            //     element: {
            //         type: 'div',
            //         classes: undefined,
            //         attributes: undefined,
            //         styles: undefined,
            //         innerHTML: undefined,
            //     }
            // }

            

            _accordianItem = L.DomUtil.create('div', 'leaflet-n-menu-accordian-item leaflet-n-menu-accordian-parent', container);

            let piInput = L.DomUtil.create('input', '', _accordianItem);
            piInput.setAttribute('type', 'checkbox');
            if(accordianItems[i].open) piInput.setAttribute('checked', '');
            piInput.id = accordianItems[i].id;

            let piLabel = L.DomUtil.create('label', '', _accordianItem);
            piLabel.setAttribute('for', accordianItems[i].id);
            piLabel.setAttribute('aria-expanded', 'false');
            let piI = L.DomUtil.create('i', 'bi bi-menu-button-wide-fill', piLabel);
            let text = accordianItems[i].name;
            piLabel.innerHTML = piLabel.innerHTML + text;

            let piAccordian = L.DomUtil.create('ul', 'leaflet-n-menu-accordian-parent-ul', _accordianItem);

            let subMenuParentElement = L.DomUtil.create('li', 'leaflet-n-menu-accordian-parent-li', piAccordian);

            if (accordianItems[i].items) {

                let subMenuItem = this.createAccordianItems(accordianItems[i].items);

                subMenuParentElement.appendChild(subMenuItem);

            } else if (accordianItems[i].element) {

                //     element: {
                //         type: 'div',
                //         attributes: undefined,
                //         classes: '',
                //         styles: {},
                //         innerHTML: undefined,
                //     }
                let currentElement = accordianItems[i].element;

                if (!currentElement.type) currentElement.type = 'div';
                let subMenuParentElementElement = L.DomUtil.create((currentElement.type), 'leaflet-n-menu-accordian-parent-div', subMenuParentElement);

                if (currentElement.attributes) {
                    for (const [key, value] of Object.entries(currentElement.attributes)) {
                        subMenuParentElementElement.setAttribute(key, value);
                    }
                }

                if (currentElement.styles) {
                    for (const [key, value] of Object.entries(currentElement.styles)) {
                        subMenuParentElementElement.style[key] = value;
                    }
                }

                if(currentElement.classes) {
                    L.DomUtil.addClass(this.container, currentElement.classes);
                }

                if (currentElement.innerHTML) {
                    subMenuParentElementElement.innerHTML = currentElement.innerHTML;
                } else {
                    subMenuParentElementElement.innerHTML += `<div class="divItem">A DIV Item</div>`;
                }




            } else {
                let subMenuParentElementTrigger = L.DomUtil.create('a', '', subMenuParentElement);
                subMenuParentElementTrigger.setAttribute('href', '#');
                let subMenuParentElementTriggerIcon = L.DomUtil.create('i', 'bi bi-menu-button-wide', subMenuParentElementTrigger);
                subMenuParentElementTrigger.innerHTML = subMenuParentElementTrigger.innerHTML + `A Child Item`;
            }

            container.appendChild(_accordianItem);
        }

        return container
    },

    /**
    
    ░▀█▀░▀█▀░█▀▀░█▀▄▀█░░░▒█▀▀▀░█░▒█░█▀▀▄░█▀▄░▀█▀░░▀░░▄▀▀▄░█▀▀▄░█▀▀▄░█░░░▀░░▀█▀░█░░█
    ░▒█░░░█░░█▀▀░█░▀░█░░░▒█▀▀░░█░▒█░█░▒█░█░░░░█░░░█▀░█░░█░█░▒█░█▄▄█░█░░░█▀░░█░░█▄▄█
    ░▄█▄░░▀░░▀▀▀░▀░░▒▀░░░▒█░░░░░▀▀▀░▀░░▀░▀▀▀░░▀░░▀▀▀░░▀▀░░▀░░▀░▀░░▀░▀▀░▀▀▀░░▀░░▄▄▄▀

    */



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
            if (L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS)) {
                L.DomUtil.removeClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS);
                L.DomUtil.removeClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS);
            }
            if (!L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE)) {
                L.DomUtil.addClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
                L.DomUtil.addClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
            }
            L.NMenu.map.fire(_this.N_MENU_EVENT_MENU_OPEN, {
                menu: _this
            });

        } else {
            _this.isMenuVisible = false;
            console.log("_this.isMenuVisible", _this.isMenuVisible);
            if (!L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS)) {
                L.DomUtil.addClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS);
                L.DomUtil.addClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS);
            }
            if (L.DomUtil.hasClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE)) {
                L.DomUtil.removeClass(_this.containers.menuParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
                L.DomUtil.removeClass(_this.containers.mapParentElement, _this.styles.N_MENU_CLASS_ACTIVE);
            }
            L.NMenu.map.fire(_this.N_MENU_EVENT_MENU_CLOSED, {
                menu: _this
            });
        }

    },











    loadItems: function (path) {
        console.log("L.NMenu.prototype.options.ajax.onLoad", L.NMenu.prototype.options.ajax.onLoad);
        let validate = L.NMenu.prototype.options.ajax.onLoad;
        if (!validate) alert("no valid 'path' parameter passed in map.options.ajax.onLoad");
        let passedPath = path ? path : L.NMenu.prototype.options.ajax.onLoad;
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
    },



    loadHTML: function (path, container) {

        fetch(path)
            .then(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw Error(`loadHTML Request rejected with status ${res.status}`);
                }
            })
            .then(data => data.text())
            .then(data => {
                // menu.dispose();
                if (container) {
                    container.innerHTML += data;
                } else {
                    console.log(`'${path}' not found`);
                    throw Error(`failed to add ${data} to ${container}`);
                }
            })
            .then(() => {
                //  this._setupComplete_Initialise(passedPath);

            })
            .catch(console.error);
    },

    injectCSS: function (css) {
        let styleTag = document.createElement("style");
        styleTag.innerText = css;
        document.head.appendChild(styleTag);

        return styleTag;
    }


});








/*

░▒█░░░░░░░▒█▀▄▀█░█▀▀▄░▄▀▀▄░░░░█▀▀▄░█▀▄░█▀▄░▀█▀░█▀▀▄░░▀░░▀█▀░▒█░▒█░▄▀▀▄░▄▀▀▄░█░▄░░
░▒█░░░░▄▄░▒█▒█▒█░█▄▄█░█▄▄█░▄▄░█▄▄█░█░█░█░█░▒█░░█░▒█░░█▀░░█░░▒█▀▀█░█░░█░█░░█░█▀▄░░
░▒█▄▄█░▀▀░▒█░░▒█░▀░░▀░█░░░░▀▀░▀░░▀░▀▀░░▀▀░░▄█▄░▀░░▀░▀▀▀░░▀░░▒█░▒█░░▀▀░░░▀▀░░▀░▀░░

*/


L.Map.addInitHook(function () {

    L.setOptions(this.options, this);
    L.NMenu.prototype.initialize(this, this.options);

    this.nmenu = L.NMenu;
    this.nmenu.options = this.options.nmenu;
    this.nmenu.containers = L.NMenu.prototype.containers;
    this.nmenu.createAccordianItems = L.NMenu.prototype.createAccordianItems.bind(this.nmenu)
    L.NMenu.map = this;

    // L.NMenu.defaults = this.options.nmenu ? this.options.nmenu : this.options;

    L.NMenu.prototype.loadItems();

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