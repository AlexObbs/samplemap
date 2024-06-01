// Create a custom icon class to include numbered markers without icons and shadows
var NumberedIcon = L.DivIcon.extend({
    options: {
        className: 'numbered-icon',
        html: '',
        number: ''
    },
    createIcon: function () {
        // Create a div element for the number
        var div = document.createElement('div');
        div.className = 'numbered-icon';
        var numDiv = document.createElement('div');
        numDiv.setAttribute('class', 'number');
        numDiv.innerHTML = this.options.number || '';
        div.appendChild(numDiv);
        this._setIconStyles(div, 'icon');
        return div;
    }
});

// Define locations and numbers
var locations = [
    { coords: [40.7128, -74.0060], name: "New York", number: 1, article: "https://en.wikipedia.org/wiki/New_York_City" },
    { coords: [51.5074, -0.1278], name: "London", number: 2, article: "https://en.wikipedia.org/wiki/London" },
    { coords: [46.8182, 8.2275], name: "Switzerland", number: 3, article: "https://en.wikipedia.org/wiki/Switzerland" }
];

// Initialize the map
var map = L.map('map').setView([20, 0], 2);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers with numbered icons
locations.forEach(function(location) {
    var icon = new NumberedIcon({ number: location.number });
    var marker = L.marker(location.coords, { icon: icon }).addTo(map);
    marker.bindPopup('<b>' + location.name + '</b><br><a href="' + location.article + '" target="_blank">Read Article</a>');
});
