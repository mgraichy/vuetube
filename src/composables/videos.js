import { ref, watchEffect, toValue } from 'vue';
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
        const json     = await response.json();
        // json.data is an array, now that we've safely fetch()ed an object:
        data.value = json.data;
        // console.log('URL from XHR:', url);
        // console.log('JSON "data.value" from XHR:', data.value);
    } catch (error) {
        if (typeof error !== 'undefined') {
            const message = error.message ?? 'Fetch error';
            data.value.push({message: message});
        } else {
            data.value.push({message: 'Fetch error'});
        }
    }
}

