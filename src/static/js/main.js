const zoomLevel = 14;

const center = {
    lat: 52.101144,
    lon: 5.09808,
};

const pijlstaart = {
    lat: 52.095805,
    lon: 5.1093,
    options: {
        title: "Amsterdamsestraatweg 3",
    },
};

const vlampijp = {
    lat: 52.104986,
    lon: 5.085252,
    options: {
        title: "Vlampijpstraat 80",
    },
};

const map = L.map("map").setView([center.lat, center.lon], zoomLevel);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const pijlstaartMarker = L.marker([
        pijlstaart.lat,
        pijlstaart.lon,
        pijlstaart.options,
    ])
    .addTo(map)
    .bindPopup(pijlstaart.options.title);

const vlampijpMarker = L.marker([vlampijp.lat, vlampijp.lon, vlampijp.options])
    .addTo(map)
    .bindPopup(vlampijp.options.title);