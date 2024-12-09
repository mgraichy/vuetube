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
        method: method,
    };

    if (method == 'post' && payload) {
        standardRequest.body = payload;
    }

    return standardRequest;
}

export async function goFetch(url, data, method = 'get', payload = null) {
    try {
        const standardRequest = getRequest(method, payload);
        const response = await fetch(url, standardRequest);
        const json = await response.json();

        if (!response.ok) {
            // array of objects:
            data.value = [{
                error: json.error || 'General Error',
                status: response.status,
            }];

            return;
        }
        // 'json.data' is an array of objects,
        // now that we've safely fetch()ed the outermost 'json' object:
        data.value = json.data;
        console.log('data.value:',data.value);
    } catch (jsError) {
        const message = jsError.message ?? 'Fetch error';
        // array of objects:
        data.value = [{error: message, status: 'JS Error somewhere inside goFetch()'}];
        console.log('data.value:',data.value);
    }
}

export async function goFetchVideo(url, id, method = 'get', payload = null) {
    try {
        const standardRequest = getRequest(method, payload);
        const response = await fetch(url, standardRequest);
        const blob = await response.blob();
        // Downloaded the correct files:
        // console.log(blob);
        const source = document.getElementById(id);
        const contentsOfBlob = URL.createObjectURL(blob);
        // console.log('contentsOfBlob:', contentsOfBlob);
        source.setAttribute('src', contentsOfBlob);
        // reload <video>:
        source.parentElement.load();
    } catch (jsError) {
        const message = jsError ?? 'Fetch error';
        console.log('error message:', message);
    }
}