let mapOptions = {
    zoomControl: true
};

let mymap = L.map('map', mapOptions).setView([54.91418099296834, -1.3817024230957031], 3);



let placeholderTile_1_Options = {

}

let placeholderTile_2_Options = {
    placeholder: {
        backgroundColour: '3D3D3D', // Hex value, no hash
        textColour: 'FDFDFD', // Hex value, no hash
        text: 'WHOOP'
    }
};


let placeholderTileLayer1 = L.tileLayer.placeholder(placeholderTile_1_Options);
let placeholderTileLayer2 = L.tileLayer.placeholder(placeholderTile_2_Options);

let baseLayers = {
    "Placeholder 1": placeholderTileLayer1,
    "Placeholder 2": placeholderTileLayer2
};

L.control.layers(baseLayers).addTo(mymap);

placeholderTileLayer1.addTo(mymap);