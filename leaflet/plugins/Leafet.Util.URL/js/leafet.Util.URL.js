L.Util.URL = L.Util.extend({

    includes: L.Mixin.Events,
    defaults: {
        showParameters: {
            zoom: true,
            lat: true,
            lng: true,
            lon: false,
            mapID: true
        },
        parameterOptions: {
            locale: undefined,
            minimumFractionDigits: 0,
            maximumFractionDigits: 4,
            showInURL: true,
            showInAttribution: true,
            truncateInAttribution: true,
            truncatedWidth: '300px'
        }
    },
    settings: {},
    options: {},
    statics: {
        GET_PARAMETERS_ARRAY_FROM: 'arrayFrom',
        GET_PARAMETERS_VIA_REGEX: 'viaRegex'
    },

    changeDefaults: function (options) {
        // this.settings = {...this.defaults, ...options};
        this.settings = Object.assign(this.defaults, options);
        console.log("this.settings", this.settings);
    },
    gotoRandomHistoryItem: function () {
        var historyItems = L.Util.URL.location.history;
        var item = historyItems[Math.floor(Math.random() * historyItems.length)];
        history.replaceState({
            randomHistoryItem: item
        }, document.title, item);
    },

    gotoHistoryItem: function () {
        var historyItems = L.Util.URL.location.history;
        // var item = items[Math.floor(Math.random() * items.length)];
        // history.replaceState({randomHistoryItem: item}, document.title, item);
    },
    gotoPreviousHistoryItem: function () {
        var historyItems = L.Util.URL.location.history;
        // var item = items[Math.floor(Math.random() * items.length)];
        history.replaceState({
            historyItem: 'previousItem'
        }, document.title, historyItems[historyItems.length - 1]);
    },
    gotoNextHistoryItem: function () {
        var historyItems = L.Util.URL.location.history;
        // var item = items[Math.floor(Math.random() * items.length)];

        history.replaceState({
            historyItem: 'nextItem'
        }, document.title, historyItems[L.Util.URL.location.history.currentHistoryIndex + 1]);
    },

    getURLParameters: function (method) {
        let preferredMethod = method ? method : 'arrayFrom';
        let newURL = L.Util.URL._createURL();
        let newURLSearchParams = L.Util.URL._createURLSearchParams();
        let updatedParams
        if (preferredMethod == 'arrayFrom') {

            updatedParams = Array.from(newURLSearchParams.keys())
                .reduce((acc, key) => ({
                    ...acc,
                    [key]: newURLSearchParams.get(key)
                }), {});
            // console.log("getURLParameters == arrayFrom params - ", updatedParams);
        } else if (preferredMethod == 'viaRegex') {
            // Get url parameters
            updatedParams = {};
            newURL.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                updatedParams[key] = decodeURIComponent(value);
            });
            // console.log("getURLParameters == regex params - ", updatedParams);
        }
        return updatedParams;
    },
    updateParameter: function (parameter, value, decimals) {


        if (typeof value === 'number') {
            // console.log("woo a number");
            value = this.formatNumber(value, decimals);
        }

        L.Util.URL.parameters[parameter] = value;

        //update URL
        let locationSearchToUpdateTo = '?';
        for (const [key, value] of Object.entries(L.Util.URL.parameters)) {
            locationSearchToUpdateTo += `${key}=${value}` + '&';
        }

        //history things
        locationSearchToUpdateTo = locationSearchToUpdateTo.substring(0, locationSearchToUpdateTo.length - 1); // snip that last pesky &

        L.Util.URL.location.previousURL = location.href;
        L.Util.URL.location.currentURL = location.origin + location.pathname + locationSearchToUpdateTo;
        L.Util.URL.location.history.push(location.href);

        if (L.Util.URL.location.history.currentHistoryIndex == 99) {
            L.Util.URL.location.history = L.Util.URL.location.history.slice(1, 99)
        }

        L.Util.URL.location.history.currentHistoryIndex = isNaN(L.Util.URL.location.history.currentHistoryIndex) ? 0 : L.Util.URL.location.history.currentHistoryIndex + 1;

        //local/session storage things
        // console.log(L.Util.URL.location.history.currentHistoryIndex);
        // localStorage.setItem("lat", ev.latlng.lat);
        // localStorage.setItem("lng", ev.latlng.lng);
        localStorage.setItem('currentLocation', L.Util.URL.location.currentURL);
        localStorage.setItem('currentParameters', L.Util.URL.parameters);
        localStorage.setItem('history', L.Util.URL.location.history);

        sessionStorage.setItem('currentLocation', L.Util.URL.location.currentURL);
        sessionStorage.setItem('currentParameters', L.Util.URL.parameters);
        sessionStorage.setItem('history', L.Util.URL.location.history);
        // sessionStorage.setItem("lng", ev.latlng.lng);

        //update url
        //update url

        //update url defaults.parameterOptions.showInURL
        if (this.defaults.parameterOptions.showInURL) {
            history.replaceState({
                parameter: value
            }, document.title, locationSearchToUpdateTo + location.hash);
        }


        // attribution
        // console.log("this.map.url.options.showInAttribution", this.map.url.options.showInAttribution);

        if (this.defaults.parameterOptions.showInAttribution) {
            let attHTML = "<a id='attributionPrefix' href='#'>" + location.origin + location.pathname + locationSearchToUpdateTo + location.hash + "</a>";
            // console.log(attHTML);
            L.Util.URL.map.attributionControl.setPrefix(attHTML);
            let prefixElement = L.DomUtil.get('attributionPrefix');
            // console.log(prefixElement);

        }

    },
    clickToCopy: function (elementID) {
        let copyText = document.getElementById(elementID);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    },
    updateParameters: function (options) {
        if (options) {
            for (const [key, value] of Object.entries(options)) {
                L.Util.URL.updateParameter(key, value);
            }
        }
    },





    _createURL: function (url) {
        let createdURL = url ? new URL(url) : new URL(location.href);
        return createdURL;
    },
    _createURLSearchParams: function (url) {
        let createdURL = L.Util.URL._createURL(url);
        let newURLSearchParams = new URLSearchParams(createdURL.searchParams);
        return newURLSearchParams;
    },




    eventHandler: function (ev) {
        let consoleText = 'L.Util.URL eventHandler -- ';
        if (ev.type == 'move') {

        } else if (ev.type == 'moveend') {
            // console.log(consoleText + "moveend ev.target._lastCenter ~", ev);

            L.Util.URL.updateParameter('lat', ev.target.getCenter().lat);
            L.Util.URL.updateParameter('lng', ev.target.getCenter().lng);

        } else if (ev.type == 'zoomend') {
            // console.log(consoleText + "zoomend ev.target._zoom ~", ev.target._zoom);
            L.Util.URL.updateParameter('zoom', ev.target.getZoom());
        } else if (ev.type == 'zoomlevelschange') {
            //console.log(consoleText + "zoomlevelschange ev ~", ev);
        } else if (ev.type == 'baselayerschange') {
            // console.log(consoleText + "baselayerschange ev ~", ev);
        } else if (ev.type == 'layeradd') {
            //console.log(consoleText + "layeradd ev.layer.options.name ~", ev.layer.options.name);
            if (ev.layer.options.name) L.Util.URL.updateParameter('mapName', ev.layer.options.name);
            L.Util.URL.updateParameter('mapID', ev.layer._leaflet_id);
        } else if (ev.type == 'layerremove') {
            // console.log(consoleText + "layerremove ev.layer.options.name ~", ev.layer.options.name);
            //  delete L.Util.URL.parameter.map;
        } else if (ev.type == 'popupopen') {
            // console.log(consoleText + "layerremove ev.popup._source._leaflet_id ~", ev);
            L.Util.URL.updateParameter('popUpID', ev.popup._source._leaflet_id);
            // WHY THE F DOES THE MAP ID Change here?
            // L.Util.URL.updateParameter('mapID', ev.layer._leaflet_id);

        } else if (ev.type == 'click') {
            //  console.log(consoleText + "click ev ~", ev);
            // L.Util.URL.updateParameter('popUpID', ev.popup._source._leaflet_id);
            // WHY THE F DOES THE MAP ID Change here?
            // L.Util.URL.updateParameter('mapID', ev.layer._leaflet_id);

        } else {
            // console.log(consoleText + " ev ~", ev);
        }
        //
        // console.log(consoleText + " -- L.Util.URL.parameters -- ", L.Util.URL.parameters);
    },
    changeHandler: function (ev) {
        console.log("changeHandler -- ev.target ~", ev.target);
        //
    },
    formatNumber: function (num, min, max) {
        return num.toLocaleString(this.defaults.parameterOptions.locale, {
            minimumFractionDigits: min ? min : this.defaults.parameterOptions.minimumFractionDigits,
            maximumFractionDigits: max ? max : this.defaults.parameterOptions.maximumFractionDigits
        });
    }



});






L.Map.addInitHook(function () {
    console.log("@@ L.Util.URL -- L.Map.addInitHook @@ : ", this); // this refers to the map in the scope
    // this.myOwnAddinHook = this;

    L.setOptions(this, this.options);

    // this.options.urlOptions = this.url.options;



    let locationOptions = {
        history: [],
        currentURL: '',
        previousURL: '',
        currentHistoryIndex: '',
        onInitialLoad: {
            changeBaseLayer: false
        }
    };
    // Setting some initial parameters, functions, etc
    // console.log("L.Map.addInitHook @@ : ", L.Util.URL);
    // this.setAttribute("id", "leaflet-util-url-id-" + L.stamp(this));
    L.Util.URL.map = this;
    L.Util.URL.options = this.options.urlOptions;
    L.Util.URL.location = locationOptions;

    // L.Util.URL.parameters = L.Util.URL.getURLParameters();
    L.Util.URL.url = L.Util.URL._createURL();
    L.Util.URL.parameters = L.Util.URL.getURLParameters();
    console.log("L.Util.URL.parameters", L.Util.URL.parameters);
    L.Util.URL.hash = '#';
    // L.Util.URL.location.changeBaseLayeronInitialLoad = false;
    // L.Util.URL.urlSearchParams = L.Util.URL._createURLSearchParams();
    // L.Util.URL.location.currentURL = L.Util.URL.getURL().href;
    L.Util.URL.isActive = true;

    // create handlers to handle potential event changes to assist with 'deeplinking'
    this.on('zoomlevelschange', L.Util.URL.eventHandler, this); // Fired when the number of zoomlevels on the map is changed due to adding or removing a layer.
    this.on('zoomend', L.Util.URL.eventHandler, this); // Fired when the map has changed, after any animations.
    this.on('move', L.Util.URL.eventHandler, this); // Fired repeatedly during any movement of the map, including pan and fly animations.
    this.on('moveend', L.Util.URL.eventHandler, this); // Fired when the center of the map stops changing (e.g. user stopped dragging the map).
    this.on('baselayerchange', L.Util.URL.eventHandler, this); // Fired when the base layer is changed through the layers control.
    this.on('layeradd', L.Util.URL.eventHandler, this); // Fired when a new layer is added to the map.
    this.on('layerremove', L.Util.URL.eventHandler, this); // Fired when a new layer is removed from the map.
    this.on('overlayadd', L.Util.URL.eventHandler, this); // Fired when an overlay is selected through the layers control.
    this.on('zoomlevelschange', L.Util.URL.eventHandler, this); // Fired when the number of zoomlevels on the map is changed due to adding or removing a layer.
    this.on('popupopen', L.Util.URL.eventHandler, this); // Fired when a popup is opened in the map
    this.on('popupclose', L.Util.URL.eventHandler, this); // Fired when a popup in the map is closed

    this.addEventListener('onload', L.Util.URL.changeHandler);


    this.url = L.Util.URL;

    console.log("@@ L.Util.URL -- L.Map.addInitHook @@ : ", this.url); // this refers to the map in the scope
});


// localStorage.setItem("lat", ev.latlng.lat);
// localStorage.setItem("lng", ev.latlng.lng);
// sessionStorage.setItem("lat", ev.latlng.lat);
// sessionStorage.setItem("lng", ev.latlng.lng);


L.Util.url = function (opts) {
    return new L.Util.URL(opts);
}

// export default L.map.urlparameters