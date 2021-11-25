import {apiGetPageTickets} from '../modules/api_calls.js';

async function main() {

    let table = document.getElementById("LeaderboardTable").getElementsByTagName('tbody')[0];

    const tickets = await apiGetPageTickets();

    // Fill table with fetched tickets
    for (const ticket in tickets) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        // Add some text to the new cells:
        cell1.innerHTML = tickets[ticket]['name'];
        cell2.innerHTML = tickets[ticket]['points'];
    }
}

main();