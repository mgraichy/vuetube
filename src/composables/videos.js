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

export function useFetch(url, method = 'get', payload = null) {
    const data = ref(null);
    const error = ref(null);
    const standardRequest = getRequest(method, payload);


    const fetchData = () => {
        // reset state before fetching..
        data.value = null;
        error.value = null;

        fetch(toValue(url), standardRequest)
            .then((res) => res.json())
            .then((json) => {
                data.value = json;
                console.log('JSON:', data.value);
            })
            .catch((err) => (error.value = err));
    }

    watchEffect(() => {
        fetchData();
    });

    return { data, error };
}
