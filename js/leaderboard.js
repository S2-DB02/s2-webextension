import {apiGetPagePoints, apiGetPageTickets} from '../modules/api_calls.js';

async function main() {

    let table = document.getElementById("LeaderboardTable").getElementsByTagName('tbody')[0];

    let userId = chrome.storage.sync.get("userId", (data) => {
        userId = data.userId;
        return userId;
    });
    
    await apiGetPageTickets('https://www.basworld.com/');
    const users = await apiGetPagePoints(userId);
    // Fill table with fetched tickets
    for (const User in users) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        // Add some text to the new cells:
        cell1.innerHTML = users[User]['rank'];
        cell2.innerHTML = users[User]['name'];
        cell3.innerHTML = users[User]['points'];

        if (users[User]['id'] == userId){
            cell1.className += "currentUser";
            cell2.className += "currentUser";
            cell3.className += "currentUser";
        }
    }
}

main();