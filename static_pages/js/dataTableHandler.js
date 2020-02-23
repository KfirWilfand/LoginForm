let points = [];
let map;
let mapMarker;

$.get("dataTable", function(data) {
  data.forEach(element => {
    let text = `${element.data1}` + "," + `${element.data2}`;
    $("#table-content").append(
      `<tr onClick=onRowDataClickHandle(${element.lat},${element.long})>` +
        `<td>${element.email}</td>` +
        `<td>${element.data1}</td>` +
        `<td>${element.data2}</td>` +
        `<td>${element.lat}</td>` +
        `<td>${element.long}</td>` +
        "</tr>"
    );

    points.push({ lat: element.lat, lng: element.long ,text: text});
  });

  $("#data-table").DataTable({
    rowReorder: {
      selector: "td:nth-child(2)"
    },
    responsive: true
  });
  initMap();
});

// Initialize and add the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: points[1]
  });

  // The marker, positioned at Uluru
  points.forEach(point => {
    new google.maps.Marker({
      position: point,
      map: map,
      label: {
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        text: point.text
      }
    });
  });
}

function onRowDataClickHandle(newLat, newLng) {
  if (mapMarker) {
    mapMarker.setMap(null);
  }

  map
    .setCenter({
      lat: newLat,
      lng: newLng
    });
}
