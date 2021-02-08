L.TileLayer.ImagePlaceholder = L.TileLayer.extend({

    options: {
        imageholder: {
            tileResolution: 512,
            loremPicsum: {
                defaultURL: 'https://picsum.photos',
                fileExtension: '.jpg',
                seed: 'seed',
                random: false,
                grayScale: false,
                blur: 2
            },
            fillMurray: {
                defaultURL: 'https://www.fillmurray.com',
                grayScale: false
            },
            placeCage: {
                defaultURL: 'https://www.placecage.com',
                grayScale: false,
                crazy: false,
                gif: false
            },
            stevenSegallery: {
                defaultURL: 'https://www.stevensegallery.com',
                grayScale: false
            },
            loremFlickr: {
                defaultURL: 'https://loremflickr.com',
                keywords: ['dog', 'cat'],
                grayScale: false,
                random: true,
                and: true
            },
            dummyImage: {
                defaultURL: 'https://dummyimage.com',
                fileExtension: '.jpg',
                backgroundColour: '000000', // Hex value, no hash
                textColour: 'FFFFFF', // Hex value, no hash
                text: 'Dummy+Image+Placeholder+X{x}+Y{y}+Z{z}'
            },
            placeKitten: {
                defaultURL: 'https://placekitten.com',
                grayScale: true
            },
            placeBeard: {
                defaultURL: 'https://placebeard.it',
                grayScale: true,
                noTag : true
            },
            placeImg: {
                defaultURL: 'http://placeimg.com',
                grayScale: true,
                sepia: true,
                categories: ['any', 'animals', 'arch', 'nature', 'people', 'tech']
            },
            placeBear: {
                defaultURL: 'http://placebear.com',
                grayScale: true
            },
            fakeImg: {
                defaultURL: 'https://fakeimg.pl',
                backgroundColour: '3D3D3D', // Hex value, no hash
                textColour: 'DDFFAA', // Hex value, no hash
                text: 'X{x}+Y{y}+Z{z}',
                font: 'lobster'
            },
            errorTiles: {
                baseURL: 'https://via.placeholder.com',
                backgroundColour: '000000', // Hex value, no hash
                textColour: 'FFFFFF', // Hex value, no hash
                text: 'ERROR+LOADING+X{x}+Y{y}+Z{z}'
            }
        }

    },

    initialize: function (type, options) {

        options = L.setOptions(this, options);
        // console.log('initialize this', this);
        // console.log('initialize options', options);
        let potentialTypes = ['loremPicsum', 'fillMurray', 'dummyImage', 'loremFlickr'];
        let imageType = type ? type : 'loremPicsum';

        let ihOptions;
        let attribution;
        let defaultURL, fileExtension, tileRes, seed, random, grayScale, blur, crazy, gif, keywords, and, backgroundColour, textColour, text, noTag, sepia, categories, font;

        let loremPicsum, fillMurray, placeCage, stevenSegallery, loremFlickr, dummyImage, placeKitten, placeBeard, placeImg, placeBear, fakeImg;

        let rndCheck;
        let grayScaleCheck;
        let blurCheck;
        let crazyCheck;
        let gifCheck;

        ihOptions = this.imageholderOptions = L.TileLayer.prototype.options.imageholder ? L.TileLayer.prototype.options.imageholder : L.TileLayer.ImagePlaceholder.prototype.options.imageholder;

        tileRes = ihOptions.tileResolution ? ihOptions.tileResolution : 512;

        loremPicsum = ihOptions.loremPicsum ? ihOptions.loremPicsum : {};
        fillMurray = ihOptions.fillMurray ? ihOptions.fillMurray : {};
        placeCage = ihOptions.placeCage ? ihOptions.placeCage : {};
        stevenSegallery = ihOptions.stevenSegallery ? ihOptions.stevenSegallery : {};
        loremFlickr = ihOptions.loremFlickr ? ihOptions.loremFlickr : {};
        dummyImage = ihOptions.dummyImage ? ihOptions.dummyImage : {};
        placeKitten = ihOptions.placeKitten ? ihOptions.placeKitten : {};
        placeBeard = ihOptions.placeBeard ? ihOptions.placeBeard : {};
        placeImg = ihOptions.placeImg ? ihOptions.placeImg : {};
        placeBear = ihOptions.placeBear ? ihOptions.placeBear : {};
        fakeImg = ihOptions.fakeImg ? ihOptions.fakeImg : {};

        let tileUrl;

        if (imageType == 'loremPicsum') {
            defaultURL = 'https://picsum.photos';

            fileExtension = loremPicsum.fileExtension ? loremPicsum.fileExtension : '.jpg';
            seed = loremPicsum.seed ? 'seed' : false;
            random = loremPicsum.random ? Math.ceil(Math.random() * 10) : false;
            grayScale = loremPicsum.grayScale ? 'grayScale' : false;
            blur = loremPicsum.blur ? loremPicsum.blur : false;
            rndCheck = (random != false) ? 'random=' + random + '&' : '';
            grayScaleCheck = (grayScale != false) ? 'grayscale&' : '';
            blurCheck = (blur != false) ? 'blur=' + blur : '';


            tileUrl = defaultURL + '/' + tileRes + '/' + tileRes + '?' + rndCheck + grayScaleCheck + blurCheck;

        }

        if (imageType == 'fillMurray') {
            defaultURL = 'https://www.fillmurray.com';

            grayScale = fillMurray.grayScale ? 'g/' : '';

            tileUrl = defaultURL + '/' + grayScale + tileRes + '/' + tileRes;

        }

        if (imageType == 'placeCage') {
            defaultURL = 'https://www.placecage.com';

            grayScale = placeCage.grayScale ? 'g/' : '';
            crazy = placeCage.crazy ? 'c/' : '';
            gif = placeCage.gif ? 'gif/' : '';

            let thereCanBeOnlyOne = '';
            if (((grayScale != '') && (crazy != '')) || ((grayScale != '') && (gif != ''))) {
                //thereCanBeOnlyOne defaulting to grayScale
                thereCanBeOnlyOne = grayScale

            } else if ((crazy != '') || ((crazy != '') && (gif != ''))) {
                //thereCanBeOnlyOne defaulting to crazy
                thereCanBeOnlyOne = crazy
            }

            tileUrl = defaultURL + '/' + thereCanBeOnlyOne + tileRes + '/' + tileRes;
        }

        if (imageType == 'stevenSegallery') {
            defaultURL = 'https://www.stevensegallery.com';

            grayScale = stevenSegallery.grayScale ? 'g/' : '';

            tileUrl = defaultURL + '/' + grayScale + tileRes + '/' + tileRes;
        }

        if (imageType == 'loremFlickr') {
            defaultURL = 'https://loremflickr.com';

            grayScale = loremFlickr.grayScale ? 'g/' : '';
            let rndNum = Math.ceil(Math.random() * 10);
            random = loremFlickr.random ? '?random=' + rndNum : '';
            and = loremFlickr.and ? '/all' : '';
            keywords = loremFlickr.keywords ? loremFlickr.keywords.join() : '';

            tileUrl = defaultURL + '/' + grayScale + tileRes + '/' + tileRes + '/' + keywords + and + random;


        }

        if (imageType == 'dummyImage') {
            defaultURL = 'https://dummyimage.com';
            fileExtension = dummyImage.fileExtension ? dummyImage.fileExtension : '';
            backgroundColour = dummyImage.backgroundColour ? dummyImage.backgroundColour : 'FF0';
            textColour = dummyImage.textColour ? dummyImage.textColour : 'FFF';
            text = dummyImage.text ? dummyImage.text : '';



            tileUrl = defaultURL + '/' + tileRes + 'x' + tileRes + '/' + backgroundColour + '/' + textColour + fileExtension + '&text=' + text;


        }


        if (imageType == 'placeKitten') {
            defaultURL = 'http://www.placekitten.com';

            grayScale = placeKitten.grayScale ? 'g/' : '';

            tileUrl = defaultURL + '/' + grayScale + tileRes + '/' + tileRes;
        }

        
        if (imageType == 'placeBeard') {
            defaultURL = 'http://www.placebeard.it';

            grayScale = placeBeard.grayScale ? 'g/' : '';
            noTag = placeBeard.noTag ? '/notag' : '';

            tileUrl = defaultURL + '/' + grayScale + tileRes + noTag;
        }

        
        if (imageType == 'placeImg') {
            defaultURL = 'http://www.placeimg.com';

            grayScale = placeImg.grayScale ? '/grayscale' : '';
            sepia = placeImg.sepia ? '/sepia' : '';
            categories = placeImg.categories ? placeImg.categories : ['any', 'animals', 'arch', 'nature', 'people', 'tech'];

            tileUrl = defaultURL + '/' + tileRes + '/' + tileRes + '/' + categories[1] + sepia;
        }

        
        if (imageType == 'placeBear') {
            defaultURL = 'http://www.placebear.com';

            grayScale = placeBear.grayScale ? 'g/' : '';

            tileUrl = defaultURL + '/' + grayScale + tileRes + '/' + tileRes;
        }


        if (imageType == 'fakeImg') {
            defaultURL = 'https://fakeimg.pl';
            backgroundColour = fakeImg.backgroundColour ? fakeImg.backgroundColour : '3D3D3D';
            textColour = fakeImg.textColour ? fakeImg.textColour : 'FFDDAA';
            text = fakeImg.text ? fakeImg.text : 'FAKEIMG+PL+X{x}+Y{y}+Z{z}';
            font = fakeImg.font ? fakeImg.font : 'lobster'


            tileUrl = defaultURL + '/' + tileRes + 'x' + tileRes + '/' + backgroundColour + '/' + textColour + '/' + '?text=' + text + '&font=' + font;


        }


        // console.log(this);
        // 'https://picsum.photos/512/512?random=2&grayscale&blur=2'
        // console.log("tileUrl", tileUrl);






        let errorTileBaseUrl, errorTileBackgroundColour, errorTileTextColour, errorTileText;
        errorTileBaseUrl = 'https://via.placeholder.com/'
        errorTileBackgroundColour = '000000';
        errorTileTextColour = 'FFFFFF';
        errorTileText = 'ERROR+LOADING';

        let errorTileUrl = errorTileBaseUrl +
            tileRes +
            '/' +
            errorTileTextColour +
            '/' +
            errorTileBackgroundColour +
            '/?text=' +
            errorTileText;

        let attText = defaultURL ? defaultURL : errorTileBaseUrl;
        //    this._attributionUrl = L.Util.template(attributionText);
        attribution = 'Images courtesy of <a href="' + attText + '">' + attText + '</a>';

        //Reset validated options
        options.attribution = attribution;
        options.errorTileUrl = errorTileUrl;
        L.TileLayer.prototype.initialize.call(this, tileUrl, options);
    },

    onAdd: function onAdd(map) {
        L.TileLayer.prototype.onAdd.call(this, map);
        // console.log("IMAGEHOLDER MAP TILES ADDED", this);
        console.log("this._url -- Tile URL -- ", this._url);
    },


    onRemove: function onRemove(map) {
        L.TileLayer.prototype.onRemove.call(this, map);
        // console.log("IMAGEHOLDER MAP TILES REMOVED", this);
    }

});

L.TileLayer.addInitHook(function () {
    console.log("addInitHook", this);
});

L.tileLayer.imageplaceholder = function (opts) {
    return new L.TileLayer.ImagePlaceholder(opts);
};