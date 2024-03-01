const zoomLevel = 14;
const mapConfig = {
    minZoom: 10,
    maxZoom: 16,
};

const center = {

    lat: 52.095805,
    lon: 5.1093,
};

const pijlstaart = {
    lat: 52.095805,
    lon: 5.1093,
    options: {
        title: "Amsterdamsestraatweg 3",
    },
};

// const vlampijp = {
//     lat: 52.104986,
//     lon: 5.085252,
//     options: {
//         title: "Vlampijpstraat 80",
//     },
// };

const map = L.map("map", mapConfig).setView(
    [center.lat, center.lon],
    zoomLevel
);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const placeMarker = location => {
    L.marker([location.lat, location.lon], location.options)
        .addTo(map)
        .bindPopup(location.options.title)
        .on("click", event => {
            map.setView(event.target.getLatLng(), zoomLevel);
        });
};

placeMarker(pijlstaart);
placeMarker(vlampijp);
