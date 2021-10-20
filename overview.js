import {apiGetPageTickets} from './modules/api_calls.js';

async function main() {

    let table = document.getElementById("overviewTable").getElementsByTagName('tbody')[0];

    const tickets = await apiGetPageTickets();

    // Fill table with fetched tickets
    for (const ticket in tickets) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        // Add some text to the new cells:
        cell1.innerHTML = tickets[ticket]['name'];
        cell2.innerHTML = tickets[ticket]['type'];
        cell3.innerHTML = tickets[ticket]['priority'];
        cell4.innerHTML = tickets[ticket]['status'];
        cell5.innerHTML = tickets[ticket]['developer'];
        cell6.innerHTML = tickets[ticket]['created_at'];
    }
}

main();