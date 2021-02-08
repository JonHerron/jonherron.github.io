L.TileLayer.PLACEHOLDER = L.TileLayer.extend({

    options: {
        placeholder: {
            tileResolution: 512,
            baseURL: 'https://via.placeholder.com/',
            backgroundColour: 'FFFFFF', // Hex value, no hash
            textColour: '000000', // Hex value, no hash
            text: 'PLACEHOLDER',
            errorTiles: {
                baseURL: 'https://via.placeholder.com/',
                backgroundColour: '000000', // Hex value, no hash
                textColour: 'FFFFFF', // Hex value, no hash
                text: 'ERROR+LOADING',
            }
        }

    },

    initialize: function initialize(options) {

        options = L.setOptions(this, options);

        let po, poe;

        let tileResolution, tileBaseUrl, backgroundColour, textColour, text;
        let errorTileBaseUrl, errorTileBackgroundColour, errorTileTextColour, errorTileText;

        if (options.placeholder) {

            po = options.placeholder;

            tileResolution = po.tileResolution ? po.tileResolution : 512;
            tileBaseUrl = po.baseURL ? po.baseURL : 'https://via.placeholder.com/';
            backgroundColour = po.backgroundColour ? po.backgroundColour : 'FFFFFF';
            textColour = po.textColour ? po.textColour : '000000';
            text = po.text ? po.text : 'PLACEHOLDER';

            if (po.errorTiles) {
                poe = po.errorTiles;

                errorTileBaseUrl = poe.baseURL ? poe.baseURL : 'https://via.placeholder.com/'
                errorTileBackgroundColour = poe.backgroundColour ? poe.backgroundColour : '000000';
                errorTileTextColour = poe.textColour ? poe.textColour : 'FFFFFF';
                errorTileText = poe.text ? poe.text : 'ERROR+LOADING';
            } else {
                errorTileBaseUrl = 'https://via.placeholder.com/'
                errorTileBackgroundColour = '000000';
                errorTileTextColour = 'FFFFFF';
                errorTileText = 'ERROR+LOADING';
            }
        } else {
            // no options passed so set defaults
            tileResolution = 512;
            tileBaseUrl = 'https://via.placeholder.com/';
            backgroundColour = 'FFFFFF';
            textColour = '000000';
            text = 'PLACEHOLDER';

            errorTileBaseUrl = 'https://via.placeholder.com/'
            errorTileBackgroundColour = '000000';
            errorTileTextColour = 'FFFFFF';
            errorTileText = 'ERROR+LOADING';

        }

        let errorTileUrl = errorTileBaseUrl +
            tileResolution +
            '/' +
            errorTileTextColour +
            '/' +
            errorTileBackgroundColour +
            '/?text=' +
            errorTileText;

        console.log("errorTileUrl", errorTileUrl);


        let tileUrl = tileBaseUrl +
            tileResolution +
            '/' +
            backgroundColour +
            '/' +
            textColour +
            '/?text=' +
            text +
            '+' +
            tileResolution +
            'x' +
            tileResolution +
            '+Z({z})+X({x})+Y({y})';

        console.log("tileUrl", tileUrl);

        //    this._attributionUrl = L.Util.template(attributionText);
        let attribution = 'Map data &copy; <a href="' + errorTileBaseUrl + '">' + errorTileBaseUrl + '</a>';

        //Reset validated options
        options.attribution = attribution;
        options.errorTileUrl = errorTileUrl;
        L.TileLayer.prototype.initialize.call(this, tileUrl, options);

    },

    onAdd: function onAdd(map) {
        L.TileLayer.prototype.onAdd.call(this, map);
        // console.log("PLACEHOLDER MAP TILES ADDED", this);
    },


    onRemove: function onRemove(map) {
        L.TileLayer.prototype.onRemove.call(this, map);
        // console.log("PLACEHOLDER MAP TILES REMOVED", this);
    }

});



L.tileLayer.placeholder = function (opts) {
    return new L.TileLayer.PLACEHOLDER(opts);
};