// Common functions for the backend

import { getAccessToken } from "@/localStorage/accessToken";
import { PROJECTS_ENDPOINT } from "./config/constants";

// Make a GET request with access token to server endpoint
export const getFromServer = async (endpoint: string) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        throw new Error('No access token found');
    }
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response;
}

// Make a POST request with access token to server endpoint. Use content-type to be application/json
export const postJsonToServer = async (endpoint: string, body: any) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        throw new Error('No access token found');
    }
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Failed to trigger POST to server');
    }
    return response;
}