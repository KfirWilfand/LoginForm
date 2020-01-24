var txt1 = "<p>Text.</p>";               // Create element with HTML 
var thead = $("<thead></thead>").append('<tr>' +
'<th scope="col">#</th>' +
'<th scope="col">First</th>' +
'<th scope="col">Last</th>' +
'<th scope="col">Handle</th>' +
'</tr>');

// var txt3 = document.createElement("p");  // Create with DOM
// txt3.innerHTML = "Text.";
$("data-table").append(thead);      // Append the new elements

function getTableElement(){
    
}