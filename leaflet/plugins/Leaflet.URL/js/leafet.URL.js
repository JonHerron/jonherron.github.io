L.Util.URL = L.Util.extend({

    includes: L.Evented,
    version: 0.1,
    isActive: false,
    isMapActive: false,
    options: {
        showInURL: true,
        showInAttribution: false

    },

    statics: {
        PARSE_PARAMETERS_VIA_ARRAY_FROM: 'viaArrayFrom',
        PARSE_PARAMETERS_VIA_REGEX: 'viaRegex',
        PARSE_PARAMETERS_VIA_URL_PARAMS: 'viaURLParams',
        L_URL_INITIAL_LOAD: 'lurlinitialload',
        L_URL_UPDATE_PARAMETER: 'lurlupdateparameter'
    },

    map: null, //this.map._loaded    ,
    history: [],
    lastURL: '',
    parameters: {
        some: 'parameters',
        exist: 'here'
    },

    hasHashChanged: function () {
        var doc_mode = window.documentMode;
        return ('onhashchange' in window) &&
            (doc_mode === undefined || doc_mode > 7);
    },
    parseHash: function(hash) {
		if(hash.indexOf('#') === 0) {
			hash = hash.substr(1);
		}
		var args = hash.split("/");
		if (args.length == 3) {
			var zoom = parseInt(args[0], 10),
			lat = parseFloat(args[1]),
			lon = parseFloat(args[2]);
			if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
				return false;
			} else {
				return {
					center: new L.LatLng(lat, lon),
					zoom: zoom
				};
			}
		} else {
			return false;
		}
	},
    formatHash: function(map) {
		var center = map.getCenter(),
		    zoom = map.getZoom(),
		    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

		return "#" + [zoom,
			center.lat.toFixed(precision),
			center.lng.toFixed(precision)
		].join("/");
	},
    isMapLoaded: function (map) {
        return map._loaded;
    }


});

L.Util.URL.prototype = {

};


L.Class.addInitHook(function () {
    console.log("UTIL.URL!! -- L.Class.addInitHook @@ : ", this); // this refers to the map in the scope
});


L.Map.addInitHook(function () {

    let url = this.url;

    url = L.Util.URL;
    url.map = this;
    url.isActive = url.isMapActive = url.isMapLoaded = true;








    // L.URL.options;
    console.log("UTIL.URL!! -- L.Map.addInitHook @@ : ", this); // this refers to the map in the scope

    console.log(url.statics.L_URL_INITIAL_LOAD);

    console.log("L.Util.URL.hasHashChanged()", url.hasHashChanged());

    // console.log(L.getParamString(this.url.prototype.parameters, location.href));

});


// L.util.url = function (opts) {
//     return new L.Util.URL(opts);
// }

// export default L.map.urlparameters