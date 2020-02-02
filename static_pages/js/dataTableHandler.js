let points = [];

$.get("dataTable", function(data) {
  data.forEach(element => {
    $("#table-content").append(
      "<tr>" +
        `<td>${element.email}</td>` +
        `<td>${element.data1}</td>` +
        `<td>${element.data2}</td>` +
        `<td>${element.lat}</td>` +
        `<td>${element.long}</td>` +
        "</tr>"
    );

    points.push({ lat: element.lat, lng: element.long });
  });

  $("#data-table").DataTable( {
    rowReorder: {
        selector: 'td:nth-child(2)'
    },
    responsive: true
} );
  initMap();
});

// Initialize and add the map
function initMap() {

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: points[1]
  });

  // The marker, positioned at Uluru
  points.forEach(point => {
    new google.maps.Marker({ position: point, map: map });
  });
}
