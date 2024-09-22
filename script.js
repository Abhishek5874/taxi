// Initialize the map
var map = L.map('map').setView([42.3149, -83.0364], 13); // Default coordinates for Windsor, Ontario

// Load and display the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var pickupMarker, dropoffMarker; // Global variables to store the markers

// Function to update the route with new pickup and drop-off locations
function updateRoute(pickup, dropoff) {
    // If previous markers exist, remove them
    if (pickupMarker) {
        map.removeLayer(pickupMarker);
    }
    if (dropoffMarker) {
        map.removeLayer(dropoffMarker);
    }

    // Get coordinates for the pickup location using the Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${pickup}`)
        .then(response => response.json())
        .then(data => {
            if (data && data[0]) {
                var pickupLat = data[0].lat;
                var pickupLon = data[0].lon;

                // Add a marker for the new pickup location
                pickupMarker = L.marker([pickupLat, pickupLon]).addTo(map)
                    .bindPopup(`Pickup: ${pickup}`).openPopup();

                // Center the map around the new pickup location
                map.setView([pickupLat, pickupLon], 13);
            }
        });

    // Get coordinates for the drop-off location using the Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${dropoff}`)
        .then(response => response.json())
        .then(data => {
            if (data && data[0]) {
                var dropoffLat = data[0].lat;
                var dropoffLon = data[0].lon;

                // Add a marker for the new drop-off location
                dropoffMarker = L.marker([dropoffLat, dropoffLon]).addTo(map)
                    .bindPopup(`Drop-off: ${dropoff}`).openPopup();
            }
        });
}

// Event listener for the "Update Route" button
document.getElementById('updateRoute').addEventListener('click', function () {
    var pickup = document.getElementById('pickup').value;
    var dropoff = document.getElementById('dropoff').value;

    // Validate input and update route
    if (pickup && dropoff) {
        updateRoute(pickup, dropoff);
    } else {
        alert("Please enter both pickup and drop-off locations.");
    }
});
