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
    } catch (jsError) {
        const message = jsError.message ?? 'Fetch error';
        // array of objects:
        data.value = [{error: message, status: 'JS Error'}];
    }
}

export async function goFetchBlob(url, data, method = 'get', payload = null) {
    console.log('url',url, 'data',data)
    const standardRequest = getRequest(method, payload);
    const response = await fetch(url, standardRequest);
    const json = await response.json();
    if (!response.ok) {
        console.log('HEY!');
    }
    data.value = json.data;
    // const base64 = json.data;
    // data.value = atob(base64);
    // console.log('base64:',base64, 'data.value:', data.value);
    // const decoded = atob(base64);
    // const url2 = URL.createObjectURL(json);
    // document.querySelector('video').src = url2;
    // data.value = URL.createObjectURL(decoded);
}