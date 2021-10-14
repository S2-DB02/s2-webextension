async function getJSON(url) {
    try {
        const response = await fetch(url, {method: 'GET'});
  
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getCurrentTabUrl() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
}

async function main() {

    let table = document.getElementById("overviewTable").getElementsByTagName('tbody')[0];
    let currentTabUrl = await getCurrentTabUrl();
    // URL is encoded twice
    currentTabUrl = encodeURIComponent(currentTabUrl);
    currentTabUrl = encodeURIComponent(currentTabUrl);

    const configUrl = chrome.runtime.getURL('/config.json');
    let apiTicketUrl = await getJSON(configUrl);
    apiTicketUrl = apiTicketUrl['url_api_ticket_page'];
    apiTicketUrl = apiTicketUrl + currentTabUrl;
    
    let tickets = await getJSON(apiTicketUrl);
    tickets = tickets['data'];

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