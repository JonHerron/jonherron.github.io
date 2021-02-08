let mapOptions = {
    zoomControl: true
};

let mymap = L.map('map', mapOptions).setView([54.91418099296834, -1.3817024230957031], 3);



let imageholder = {
    loremPicsum: {
        seed: 'seed',
        random: true,
        grayScale: true,
        blur: 2
    }
};


let placeholderTile_Options = {
    imageholder: {
        loremPicsum: {
            seed: 'seed',
            random: true,
            grayScale: true,
            blur: 2
        },
        fillMurray: {
            grayScale: true
        },
        placeCage: {
            grayScale: true,
            crazy: true,
            gif: true
        },
        stevenSegallery: {
            grayScale: true
        },
        loremFlickr: {
            keywords: ['dog', 'cat'],
            grayScale: true,
            random: true,
            and: true
        },
        dummyImage: {
            defaultURL: 'https://dummyimage.com',
            fileExtension: '.jpg',
            backgroundColour: '000000', // Hex value, no hash
            textColour: 'FFFFFF', // Hex value, no hash
            text: 'Dummy+Image+Placeholder{x}{y}{z}'
        },
        placeBeard: {
            defaultURL: 'https://placebeard.it',
            grayScale: true,
            noTag : true
        },
        placeImg: {
            defaultURL: 'http://placeimg.com/',
            grayScale: true,
            sepia: true,
            categories: ['any', 'animals', 'arch', 'nature', 'people', 'tech']
        },
        fakeImg: {
            defaultURL: 'https://fakeimg.pl',
            backgroundColour: '000000', // Hex value, no hash
            textColour: 'FFFFFF', // Hex value, no hash
            text: 'FAKEIMG+PL+X{x}+Y{y}+Z{z}',
            font: 'lobster'
        }
    },
    tileResolution: 512
};


let placeholderTileLayer1 = L.tileLayer.imageplaceholder('loremFlickr', placeholderTile_Options);
// let placeholderTileLayer2 = L.tileLayer.imageholder('fillMurray');

let baseLayers = {
    "Fake Img": L.tileLayer.imageplaceholder('fakeImg'),
    "Lorem Flickr": placeholderTileLayer1,
    "Lorem Picsum": L.tileLayer.imageplaceholder('loremPicsum'),
    "Fill Murray": L.tileLayer.imageplaceholder('fillMurray'),
    "Place Cage": L.tileLayer.imageplaceholder('placeCage'),
    "Steven SeGALLERY": L.tileLayer.imageplaceholder('stevenSegallery'),
    "Dummy Image": L.tileLayer.imageplaceholder('dummyImage'),
    "Place Kitten": L.tileLayer.imageplaceholder('placeKitten'),
    "Place Beard": L.tileLayer.imageplaceholder('placeBeard'),
    "Place Img": L.tileLayer.imageplaceholder('placeImg'),
    "Place Bear": L.tileLayer.imageplaceholder('placeBear')
    
};

L.control.layers(baseLayers).addTo(mymap);

placeholderTileLayer1.addTo(mymap);