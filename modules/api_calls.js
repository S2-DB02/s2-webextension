// Module for API call functions
import {getCurrentTabUrl} from './tabs.js'

export async function apiGetAsJSON(url) {
    try {
        const response = await fetch(url, {method: 'GET'});
  
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function apiGetPageTickets() {
    // Get URL from current tab and encode for transmission to API
    let currentTabUrl = await getCurrentTabUrl();
    currentTabUrl = encodeURIComponent(currentTabUrl);
    currentTabUrl = encodeURIComponent(currentTabUrl);

    const configUrl = chrome.runtime.getURL('/config.json');
    let apiTicketUrl = await apiGetAsJSON(configUrl);
    apiTicketUrl = apiTicketUrl['url_api_ticket_page'] + currentTabUrl;
    
    // Get tickets from database via API
    let tickets = await apiGetAsJSON(apiTicketUrl);
    tickets = tickets['data'];
    return tickets;
}