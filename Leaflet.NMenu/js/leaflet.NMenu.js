L.NMenu = L.Class.extend({

    options: {
        version: "1.0.0",
        nmenu: {
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
                openToggleContent: '<i class="bi bi-door-open-fill"></i>',
                closeToggleContent: '<i class="bi bi-door-closed-fill"></i>'
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
    
        },
        containers: {
            mapDIVElement: '',
            menuDIVElement: '',
            menuULElement: ''
        },
        isDisposed: false,
        isTransitioning: false,
        isVisible: true,
        stopEventsOn: {
            click: 'click',
            mousedown: 'mousedown',
            dblclick: 'dblclick',
            contextmenu: 'contextmenu'
        }

    },

    statics: {
        N_MENU: 'leaflet-nmenu',
        N_MENU_ROOT: 'nmenu-accordian',
        N_MENU_ACTIVE: 'leaflet-nmenu-active',
        N_MENU_COLLAPSE: 'leaflet-nmenu-collapse',
        N_MENU_COLLAPSED: 'leaflet-nmenu-collapsed',
        N_MENU_COLLAPSING: 'leaflet-nmenu-collapsing',
        N_MENU_SHOW: 'leaflet-nmenu-show',
        N_MENU_HIDE: 'leaflet-nmenu-hide',
        N_MENU_VISIBLE: 'leaflet-nmenu-visible',
        N_MENU_HIDDEN: 'leaflet-nmenu-hidden',

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
        
        this.nMenuOptions = options.nmenu ? options.nmenu : L.NMenu.prototype.options.nmenu;
        this.containers = options.containers ? options.containers : L.NMenu.prototype.options.containers;
        this.containers.mapDIVElement = L.DomUtil.get(map);
        this.defaultConfig = options.defaultConfig ? options.defaultConfig : L.NMenu.prototype.options.defaultConfig;
        
        this.containers = options.containers ? options.containers : L.NMenu.prototype.options.containers;
        this.isDisposed = options.isDisposed ? options.isDisposed : L.NMenu.prototype.options.isDisposed;
        this.isTransitioning = options.isTransitioning ? options.isTransitioning : L.NMenu.prototype.options.isTransitioning;
        this.isVisible = options.isVisible ? options.isVisible : L.NMenu.prototype.options.isVisible;
        this.stopEventsOn = options.stopEventsOn ? options.stopEventsOn : L.NMenu.prototype.options.stopEventsOn;

        this._checkAndSetupDOM();
        this._checkNMenuOptions();
        this._createMenuDOM();
        this._loadInitialItems();


    },
    _setupComplete_Initialise: function (method) {
        console.log("Loading or setup of '" + method + "' completed...", this);
        // this._checkMenuDOM();
        // this.accordianToggle(this.containers.menuULElement, false);
        this.accordianToggle('nmenu-accordian');
        // $("#nmenu-accordian a").click(this.accordianMultiLevelToggle);
        console.log("L.NMenu.N_MENU ", L.NMenu.N_MENU);
        console.log("L.NMenu this", this);
    },
    _loadInitialItems: function (path) {
        let validate = this.options.nmenu.path;
        if (!validate) alert("no valid 'path' parameter passed in map.options.nmenu.path");
        let passedPath = path ? path : this.options.nmenu.path;
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
                if(this.containers.menuULElement){
                    this.containers.menuULElement.innerHTML += data;
                }
                else{
                    console.log('no "this.containers.menuULElement" defined, or correctly assigned somewhere...');
                    throw Error(`failed to add ${data} to "this.containers.menuULElement"`);
                }
            })
            .then(() => {
                this._setupComplete_Initialise(passedPath);
                
            })
            .catch(console.error);
    },
    _checkAndSetupDOM: function () {
        let nMenuDIV, menuDIV, testContent;

        // checks whether there is a div with an ID of 'menu' and sets it up, otherwise creates one and inserts into DOM;

        menuDIV = L.DomUtil.get('menu') ? L.DomUtil.get('menu') : document.createElement("div");
        menuDIV.id = 'nmenu-banner-container';
        L.DomUtil.addClass(menuDIV, L.NMenu.N_MENU_BANNER_CONTAINER);
        L.DomUtil.addClass(menuDIV, 'blended');
        testContent = document.createElement("h1");
        testContent.textContent = "LEAFET N MENU";
        menuDIV.appendChild(testContent);

        this.containers.menuDIVElement = nMenuDIV = document.createElement("div");
        nMenuDIV.id = 'nmenu';

        nMenuDIV.appendChild(menuDIV);

        this.containers.mapDIVElement.parentNode.insertBefore(nMenuDIV, this.containers.mapDIVElement);

    },
    _checkNMenuOptions: function () {
        


/* <li class="nmenu-accordian-mainmenu-item active">
  <a class="nmenu-accordian-trigger" href="#Leaflet.NMenu">
    <i class="bi bi-camera-fill"></i> Profile <span></span>
  </a>
  <div class="nmenu-accordian-panel">
    <h4>Lorem ipsum dolor sit amet.</h4>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium minima dolores assumenda id.
      Porro consequuntur at dolor eum, neque labore!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur non sint sequi ipsa laudantium, a
      iure rem vel nemo soluta temporibus, consectetur at corrupti aspernatur maxime, iusto neque
      blanditiis deleniti.</p>
  </div>
</li> 

            menuConfig: {
                parentTrigger: 'li',
                subMenu: 'ul',
                toggle: true,
                triggerElement: 'a'
            }


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
            },

*/

        // create 'li' or parentrigger
        // create 'a' or triggerElement
        // potentially create 'ul' or submenu
        // alternatively create 'div' or submenu

        let nMenuOpts = this.nMenuOptions ? this.nMenuOptions : {};

        console.log("this.nMenuOptions", this.nMenuOptions);
        
        let parentTriggerElement, subMenu, toggleItems, triggerElement;
        if(nMenuOpts.menuConfig){
            toggleItems = nMenuOpts.menuConfig.toggleItems;
            parentTriggerElement = L.DomUtil.create(nMenuOpts.menuConfig.parentTrigger);
            triggerElement = L.DomUtil.create(nMenuOpts.menuConfig.triggerElement);
            subMenu = L.DomUtil.create(nMenuOpts.menuConfig.subMenu);

            parentTriggerElement.appendChild(triggerElement);
            parentTriggerElement.appendChild(subMenu);

            L.DomUtil.addClass(parentTriggerElement, L.NMenu.N_MENU_MAIN_MENU_ACCORDIAN_ITEM);
        }
         

        console.log("parentTriggerElement", parentTriggerElement);
        console.log("nMenuOpts.menuConfig.toggleItems", toggleItems);





    },
    _createMenuDOM: function () {

        L.DomUtil.addClass(this.containers.menuDIVElement, L.NMenu.N_MENU_VISIBLE);

        this.containers.menuULElement = L.DomUtil.create('ul', L.NMenu.N_MENU_CONTAINER_UL, this.containers.menuDIVElement);
        L.DomUtil.addClass(this.containers.menuULElement, L.NMenu.N_MENU);
        L.DomUtil.addClass(this.containers.menuULElement, L.NMenu.N_MENU_ROOT);
        this.containers.menuULElement.id = 'nmenu-ul-container';


        this._menuVisibleStyles();


    },
    _checkMenuDOM: function () {

        let ulC = this.containers.menuULElement;
        // let ulCNodes = L.DomUtil.get('.nmenu-ul-container li ul');

        // console.log("ulC", L.DomUtil.getStyle(ulC));
        console.log("ulC", ulC);
        // console.log(this.getFirstParentMatch('ul', 'nmenu-ul-container'));
        for (let i = 0; i < ulC.children.length; i++) {
            console.log(">Start Parent " + i + " ---------------------------------------");
            console.log(">Parent " + i + "--", ulC.children[i].tagName);

            if (ulC.children[i].tagName == 'LI') {
                for (let j = 0; j < ulC.children.length; j++) {
                    console.log(">>Start Child --" + j + " ---------------------------------------");
                    console.log(">>Child " + j + "--", ulC.children[j].tagName);

                    if (ulC.children[j].tagName == 'LI') {
                        for (let k = 0; k < ulC.children.length; k++) {
                            console.log(">>>Start Grandchild " + k + " ---------------------------------------");
                            console.log(">>>Grandchild " + k + "--", ulC.children[k].tagName);
                            console.log(">>End Grandchild " + k + " ---------------------------------------");
                        }
                        
                    }
                    console.log(">>End Child " + j + " ---------------------------------------");
                }
            }
            console.log(">End Parent " + i + "---------------------------------------");

        }



    },

    _menuVisibleStyles: function () {

        let tCmeDS = this.containers.menuDIVElement.style;

        // tCmeDS.setProperty('--scrollbar-background', "#FF0");

        tCmeDS.height = '100%';
        tCmeDS.display = 'block';
        // tCmeDS.backgroundColor = "#FF0";
        tCmeDS.position = 'absolute';
        tCmeDS.overflowY = 'auto';
        tCmeDS.overflowX = 'hidden';
        // tCmeDS.transitionTimingFunction = 'ease-in-out';
        tCmeDS.transition = 'width 0.1s ease-in-out';
        tCmeDS.width = '250px';

        let tCmaDS = this.containers.mapDIVElement.style;
        tCmaDS.overflowX = 'hidden';
        tCmaDS.overflowY = 'hidden';
        tCmaDS.height = '100%';
        tCmaDS.transition = 'width 0.1s ease-in-out';
        tCmaDS.width = 'calc(100% - 250px)';
        // tCmeDS.transitionTimingFunction = 'ease-in-out';


        tCmaDS.left = '250px';

        let tCmeUS = this.containers.menuULElement.style;
    //    tCmeUS.marginLeft = '10px';
        tCmeUS.padding = 0;
        tCmeUS.listStyle = 'none';

    },
    _menuHiddenStyles: function () {

        let tCmeDS = this.containers.menuDIVElement.style;
        tCmeDS.height = '100%';
        tCmeDS.display = 'block';
        // tCmeDS.backgroundColor = "#FF0";
        tCmeDS.position = 'absolute';
        tCmeDS.overflowY = 'auto';
        tCmeDS.overflowX = 'hidden';
        tCmeDS.transition = 'width 0.1s ease-in-out';
        tCmeDS.width = '';



        let tCmaDS = this.containers.mapDIVElement.style;
        tCmaDS.overflowX = 'hidden';
        tCmaDS.overflowY = 'hidden';
        tCmaDS.height = '100%';
        tCmaDS.width = '100%';
        tCmaDS.left = '0';
        tCmaDS.transition = 'left 0.1s ease-in-out';



    },



    _createButton: function (title, className, content, container, fn, context) {

        
        let button = L.DomUtil.create('a', className, container);
        // button = L.DomUtil.create('a', className, container);
        button.href = '#';
        button.title = title;
        button.innerHTML = content;

        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', title);

        L.DomEvent
            .on(button, 'click', L.DomEvent.stopPropagation)
            .on(button, 'dblclick', L.DomEvent.stopPropagation)
            .on(button, 'click', L.DomEvent.preventDefault)
            .on(button, 'dblclick', L.DomEvent.preventDefault)
            .on(button, 'click', fn, context);

        return button;
    },
    toggleMenu: function (ev) {

        console.log("TOGGLE ev", ev);
        console.log("TOGGLE this", this);

        if (this.isVisible) {

            this.nMenu._menuVisibleStyles();

            this.isVisible = false;
        } else {

            this.nMenu._menuHiddenStyles();

            this.isVisible = true;
        }

        this.invalidateSize();

    },
    accordianToggle: function (mainElement, toggle){
        let defaultToggle = toggle ? toggle : false;
        document.addEventListener('click', function (event) {
         // alert(mainElement+' .a-btn');
            if (!event.target.matches('.'+mainElement+' .'+L.NMenu.N_MENU_ACCORDIAN_TRIGGER)) return;
            else{
                if(!event.target.parentElement.classList.contains('active')){
                    if(defaultToggle==true){
                        var elementList = document.querySelectorAll(mainElement+' .'+L.NMenu.N_MENU_MAIN_MENU_ACCORDIAN_ITEM);
                        Array.prototype.forEach.call(elementList, function (event) {
                            event.classList.remove('active');
                        });
                    }            
                    event.target.parentElement.classList.add('active');
                }else{
                    event.target.parentElement.classList.remove('active');
                }
            }
        });
    },
    accordianMultiLevelToggle: function (ev) {
        console.log(ev);
        var link = ev.target;
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(function() {
                if (++count == closest_ul.find("ul").length)
                        parallel_active_links.removeClass("active");
        });

        if (!link_status) {
                closest_li.children("ul").slideDown();
                closest_li.addClass("active");
        }
    }

});

// L.nmenu = function (opts) {
//     return new L.NMenu(opts);
// };


L.Map.addInitHook(function () {
    console.log("NMENU!! -- L.Map.addInitHook @@ : this ==", this);
    console.log("NMENU!! -- L.Map.addInitHook @@ : L.NMenu ==", L.NMenu);

    if (this.options.nmenu) {
        this.nMenu = new L.NMenu('map', this.options);
        L.NMenu.map = this.nMenu.map = this;
        // L.NMenu.

        let title, className, content, container, fn, context;
        if (this.zoomControl) {
			container = this.zoomControl._container;
		} else {
			container = L.DomUtil.create('div', 'leaflet-bar');
		}

        title = 'Menu Toggle';
        className = 'leaflet-control-zoom-menutoggle';
        content = '<i class="bi bi-three-dots-vertical"></i>';
        //container = this.zoomControl._container;
        fn = this.nMenu.toggleMenu;
        context = this;


        L.NMenu.menuToggleButton = this.nMenu.menuToggleButton = this.nMenu._createButton(title, className, content, container, fn, context);
        console.log("nMenu", this.nMenu);
    } else {
        alert("No nmenu options passed");
    }



});