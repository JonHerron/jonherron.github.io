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


let placeholderTileLayer1 = L.tileLayer.imageholder('loremFlickr', placeholderTile_Options);
// let placeholderTileLayer2 = L.tileLayer.imageholder('fillMurray');

let baseLayers = {
    "Fake Img": L.tileLayer.imageholder('fakeImg'),
    "Lorem Flickr": placeholderTileLayer1,
    "Lorem Picsum": L.tileLayer.imageholder('loremPicsum'),
    "Fill Murray": L.tileLayer.imageholder('fillMurray'),
    "Place Cage": L.tileLayer.imageholder('placeCage'),
    "Steven SeGALLERY": L.tileLayer.imageholder('stevenSegallery'),
    "Dummy Image": L.tileLayer.imageholder('dummyImage'),
    "Place Kitten": L.tileLayer.imageholder('placeKitten'),
    "Place Beard": L.tileLayer.imageholder('placeBeard'),
    "Place Img": L.tileLayer.imageholder('placeImg'),
    "Place Bear": L.tileLayer.imageholder('placeBear')
    
};

L.control.layers(baseLayers).addTo(mymap);

placeholderTileLayer1.addTo(mymap);