// Module for API call functions

export async function apiGetAsJSON(url) {
    try {
        const response = await fetch(url, {method: 'GET'});
  
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function apiGetPageTickets(url) {
    // Get URL from current tab and encode for transmission to API
    url = encodeURIComponent(url);
    url = encodeURIComponent(url);

    const configUrl = chrome.runtime.getURL('/config.json');
    let apiTicketUrl = await apiGetAsJSON(configUrl);
    apiTicketUrl = apiTicketUrl['url_api_ticket_page'] + url;
    
    // Get tickets from database via API
    let tickets = await apiGetAsJSON(apiTicketUrl);
    tickets = tickets['data'];
    return tickets;
}

export async function apiGetPagePoints(id) {
    // Get URL from current tab and encode for transmission to API

    const configUrl = chrome.runtime.getURL('/config.json');
    let apiPointsUrl = await apiGetAsJSON(configUrl);
    apiPointsUrl = apiPointsUrl['url_api_leaderboard'] + id;
    
    // Get users from database via API
    let users = await apiGetAsJSON(apiPointsUrl);
    return users;
}
export async function apiGetLoggedInUser(id) {
    // Get URL from current tab and encode for transmission to API

    const configUrl = chrome.runtime.getURL('/config.json');
    let apiLoggedsUrl = await apiGetAsJSON(configUrl);
    apiLoggedsUrl = apiLoggedsUrl['url_api_LoggedInUser'] + id;
    
    // Get users from database via API
    let LoggedUser = await apiGetAsJSON(apiLoggedsUrl);
    return LoggedUser;
}
export async function apiGetUserData() {
    const configUrl = await achrome.runtime.getURL('/config.json');
    let apiTicketUrl = await apiGetAsJSON(configUrl);
    apiUserUrl = apiUserUrl['url_api_user']

    // Check for user existence
}