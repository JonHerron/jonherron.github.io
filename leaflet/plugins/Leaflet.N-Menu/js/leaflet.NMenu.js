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
        N_MENU_EVENT_MENU_OPEN: 'leaflet-nmenu-event-menu-open',
        N_MENU_EVENT_MENU_CLOSED: 'leaflet-nmenu-event-menu-closed'
    },

    styles: {
        N_MENU_CLASS: 'leaflet-nmenu',
        N_MENU_CLASS_ACTIVE: 'leaflet-nmenu-active',
        N_MENU_CLASS_ROOT: 'leaflet-nmenu-accordian'
    },

    statics: {
        N_MENU_PARENT_ITEM_OPEN: 'leaflet-nmenu-parent-item-open',
        N_MENU_PARENT_ITEM_CLOSED: 'leaflet-nmenu-parent-item-closed',
        N_MENU_CHILD_ITEM_OPEN: 'leaflet-nmenu-child-item-open',
        N_MENU_CHILD_ITEM_CLOSED: 'leaflet-nmenu-child-item-closed',

        N_MENU_MAP_CREATE: 'leaflet-nmenu-map-create',

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

    initialize: function (map, options) {

        L.setOptions(this, options);
        this.setupDom();
        console.log(this);
    },

    setupDom: function () {
        // this.containers.menuItemsElement = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        this.containers.mainContainerElement = L.DomUtil.get('nmenu') ? L.DomUtil.get('nmenu') : document.createElement("div");
        this.containers.menuParentElement = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        this.containers.mapParentElement = L.DomUtil.get('map') ? L.DomUtil.get('map') : document.createElement("div");

        this.containers.mainContainerElement.id = 'nmenu';
        this.containers.menuParentElement.id = 'menu';
        this.containers.mapParentElement.id = 'map';

        this.containers.mapParentElement.parentNode.insertBefore(this.containers.mainContainerElement, this.containers.mapParentElement);
        // this.containers.mainContainerElement.appendChild(this.containers.menuParentElement);
        // this.containers.mainContainerElement.appendChild(this.containers.mapParentElement);
        

    },

    toggleMenu: function (ev) {
        // console.log("toggleMenu", ev);
        console.log("this.containers.mainContainerElement", this);
        if (!this.isMenuVisible) {
            //set menu to visible
            this.isMenuVisible = true;
            console.log("this.isMenuVisible", this.isMenuVisible);
            L.DomUtil.addClass(L.NMenu.prototype.containers.mainContainerElement, L.NMenu.prototype.styles.N_MENU_CLASS_ACTIVE);
        } else {
            this.isMenuVisible = false;
            console.log("this.isMenuVisible", this.isMenuVisible);
            L.DomUtil.removeClass(L.NMenu.prototype.containers.mainContainerElement, L.NMenu.prototype.styles.N_MENU_CLASS_ACTIVE);
        }

    },

    accordianToggle: function (mainElement, toggle) {

    }

});





L.Map.addInitHook(function () {

    L.setOptions(this.options, this);
    L.NMenu.prototype.initialize();

    this.nmenu = L.NMenu;

    L.NMenu.defaults = this.options.nmenu ? this.options.nmenu : this;

    console.log("L.Map.addInitHook", this);
    console.log("L.Map.addInitHook", L.NMenu.prototype);


    this.addControl(L.control.buttonator({}));


});


L.nmenu = function (opts) {
    return new L.NMenu(opts);
};












L.Control.Buttonator = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {

        let title, className, content, container, fn, context;

        context = this;

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
        }
        else{
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