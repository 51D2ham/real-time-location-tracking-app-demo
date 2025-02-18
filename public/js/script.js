const socket = io();  // Initialize Socket.io

// Check if the browser supports Geolocation
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error("Geolocation error:", error);
        },
        {
            enableHighAccuracy: true,  // accuracy level
            timeout: 10000,    // refresh time for fetching location
            maximumAge: 0, // not caching
        }
    );
}

// Initialize the map
const map = L.map("map").setView([0, 0], 14);  // Default to world center

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

const markers = {};  // Store markers by user ID

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    // Only center the map on new users/marker
    if (!markers[id]) {
        map.setView([latitude, longitude]);
    }

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);   
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

// Remove disconnected users'/ markers
socket.on("user-disconnect", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
