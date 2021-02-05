L.Util.URL = L.Util.extend({

    includes: L.Mixin.Events,
    options: {
        showInURL: true,
        showInAttribution: true
    },
    statics: {
        GET_PARAMETERS_ARRAY_FROM: 'arrayFrom',
        GET_PARAMETERS_VIA_REGEX: 'viaRegex'
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
    updateParameter: function (parameter, value, remove) {
        let deleteCheck = remove ? remove : false;

        if (!deleteCheck) L.Util.URL.parameters[parameter] = value;

        //update URL
        let locationSearchToUpdateTo = '?';
        for (const [key, value] of Object.entries(L.Util.URL.parameters)) {
            locationSearchToUpdateTo += `${key}=${value}` + '&';
        }
        locationSearchToUpdateTo = locationSearchToUpdateTo.substring(0, locationSearchToUpdateTo.length - 1); // snip that last pesky &

        L.Util.URL.location.previousURL = location.href;
        L.Util.URL.location.currentURL = location.origin + location.pathname + locationSearchToUpdateTo;
        L.Util.URL.location.history.push(location.href);

        if (L.Util.URL.location.history.currentHistoryIndex == 99) {
            L.Util.URL.location.history = L.Util.URL.location.history.slice(1, 99)
        }

        L.Util.URL.location.history.currentHistoryIndex = isNaN(L.Util.URL.location.history.currentHistoryIndex) ? 0 : L.Util.URL.location.history.currentHistoryIndex + 1;

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

        //update url
        history.replaceState({
            parameter: value
        }, document.title, locationSearchToUpdateTo + location.hash);

        // attribution
        console.log("this.options.showInAttribution", this);
        if(this.options.showInAttribution) L.Util.URL.map.attributionControl.setPrefix(location.href);

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

            L.Util.URL.updateParameter('lat', ev.target.url.map.getCenter().lat);
            L.Util.URL.updateParameter('lng', ev.target.url.map.getCenter().lng);

        } else if (ev.type == 'zoomend') {
            // console.log(consoleText + "zoomend ev.target._zoom ~", ev.target._zoom);
            L.Util.URL.updateParameter('zoom', ev.target._zoom);
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

        } else {
            // console.log(consoleText + " ev ~", ev);
        }
        //
        // console.log(consoleText + " -- L.Util.URL.parameters -- ", L.Util.URL.parameters);
    },
    changeHandler: function (ev) {
        // console.log("changeHandler -- ev.target ~", ev.target);
        //
    },



});






var URLUtil = L.Class.extend({
    statics: {
        GET_PARAMETERS_ARRAY_FROM: 'arrayFrom',
        GET_PARAMETERS_VIA_REGEX: 'viaRegex'
    }
});



L.Class.addInitHook(function () {
    // Setting some initial parameters, functions, etc
    console.log("UTIL.URL!! -- L.Class.addInitHook @@ : ");
    L.Util.URL.isActive = true;
    this.on('zoomlevelschange', L.Util.URL.eventHandler, this); // Fired when the number of zoomlevels on the map is changed due to adding or removing a layer.
    // this.setAttribute("id", "leaflet-util-url-id-" + L.stamp(this));

});




L.Map.addInitHook(function () {
    console.log("UTIL.URL!! -- L.Map.addInitHook @@ : ");    // this refers to the map in the scope
    // this.myOwnAddinHook = this;
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
    L.Util.URL.location = locationOptions;

    // L.Util.URL.parameters = L.Util.URL.getURLParameters();
    L.Util.URL.url = L.Util.URL._createURL();
    L.Util.URL.parameters = L.Util.URL.getURLParameters();
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


    // done, set L.Util.URL to L.util.url for possible? compatibility, seems weird to have to do it this way though
    this.url = L.Util.URL;
    // console.log("Did the url have any parameters? If so, they should be here, \n However if more have been set programatically they may also should here, depending upon 'when' they were set\n ", this.url.parameters);
    // console.log("they can also be acessed and set/updated via your 'map' var, so... ''map.url.parameters'', ''map.url.updateParameter('lat', '-12.3')'', etc...");
    // console.log("... or via L.Util.URL... then the equivalent, so... ''L.Util.URL.parameters'', ''L.Util.URL.updateParameter('lat', '-12.3')'', etc...");
    // console.log("... ''L.Util.URL.map'' is also available as a property and refers to the current ''map'' property...");
    // console.log("-= ==================================== =-");
    // console.log("-= myMapVar.map.urlUtilities.parameters =-", this.url.parameters);
    // console.log("-= ==================================== =-");
    console.log("this.options", this.options);

    //handle whether to load URL params, passed params, or just set it to a default value
    if (this.url.parameters) {
        console.log("Set map to any available url parameters");
        if (this.url.parameters.zoom) {
            console.log("Set zoom");
            L.Util.URL.updateParameter("zoom", this.url.parameters.zoom);
        }
        if (this.url.parameters.lat && (this.url.parameters.lng || this.url.parameters.lon)) {
            console.log("set lat/lng");
        }
        if (this.url.parameters.mapID) {
            console.log("set MapID");
        }
    } else if (this.options) {

    } else {

    }

});


// localStorage.setItem("lat", ev.latlng.lat);
// localStorage.setItem("lng", ev.latlng.lng);
// sessionStorage.setItem("lat", ev.latlng.lat);
// sessionStorage.setItem("lng", ev.latlng.lng);


// L.util.url = function (opts) {
//     return new L.Util.URL(opts);
// }

// export default L.map.urlparameters