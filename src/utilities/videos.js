import { config } from './oauth2-config.js';

function getRequest(method, payload) {
    const standardRequest = {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: 'Bearer ' + config.accessTokenSessionStorage,
            'Content-Type': 'application/json',
            Origin: config.redirectUri,
        },
        mode: 'cors',
        credentials: 'include',
        cache: 'default',
        method: method,
    };

    if (method == 'post' && payload) {
        standardRequest.body = payload;
    }

    return standardRequest;
}

export async function goFetch(url, data, isLoading = {}, method = 'get', payload = null) {
    try {
        isLoading.value = true;
        const standardRequest = getRequest(method, payload);
        const response = await fetch(url, standardRequest);
        const json = await response.json();

        if (!response.ok) {
            data.value = [{
                error: json.error || 'General Error',
                status: response.status,
            }];

            return;
        }
        data.value = json.data;
    } catch (jsError) {
        const message = jsError.message ?? 'Fetch error';
        data.value = [{error: message, status: 'JS Error somewhere inside goFetch()'}];
    } finally {
        isLoading.value = false;
    }
}

export async function goFetchVideo(url, id, method = 'get', payload = null) {
    try {
        const standardRequest = getRequest(method, payload);
        const response = await fetch(url, standardRequest);
        const blob = await response.blob();

        const source = document.getElementById(id);
        const urlReferenceToBlob = URL.createObjectURL(blob);
        source.setAttribute('src', urlReferenceToBlob);
        source.parentElement.load();
    } catch (jsError) {
        const message = jsError ?? 'Fetch error';
        console.log('error message:', message);
    }
}