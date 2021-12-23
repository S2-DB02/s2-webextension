import {apiGetPageTickets} from '../modules/api_calls.js';
import {getCurrentTabUrl} from '../modules/tabs.js';

async function main() {

    let table = document.getElementById("overviewTable").getElementsByTagName('tbody')[0];

    const tickets = await apiGetPageTickets(await getCurrentTabUrl());
    const types = [
        "Media",
        "Lay-out",
        "Translation",
        "Markup",
        "Other"
    ]

    // Fill table with fetched tickets
    for (const ticket in tickets) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = tickets[ticket]['name'];
        cell2.innerHTML = types[tickets[ticket]['type'] - 1];
        cell3.innerHTML = new Date(tickets[ticket]['created_at']).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });
        cell4.innerHTML = tickets[ticket]['remark'];
    }
}

main();