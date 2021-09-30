// overview.js

let table = document.getElementById("overviewTable").getElementsByTagName('tbody')[0];

for (let i = 0; i < 20; i++) {
    // Create an empty <tr> element and add it to the 1st position of the table:
    let row = table.insertRow(i);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);

    // Add some text to the new cells:
    cell1.innerHTML = "NEW CELL";
    cell2.innerHTML = "NEW CELL";
    cell3.innerHTML = "NEW CELL";
    cell4.innerHTML = "NEW CELL";
    cell5.innerHTML = "NEW CELL";
    cell6.innerHTML = "NEW CELL";
}