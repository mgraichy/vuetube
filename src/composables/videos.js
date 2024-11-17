import { ref, watchEffect, toValue } from 'vue';
import { config } from './oauth2-config.js';


function getRequest(method = 'get') {
    return {
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Origin: config.redirectUri,
        },
        mode: 'cors',
        credentials: 'include',
        method: method,
    };
}

export function useFetch(url) {
    const data = ref(null);
    const error = ref(null);
    const standardRequest = getRequest();


    const fetchData = () => {
        // reset state before fetching..
        data.value = null;
        error.value = null;

        fetch(toValue(url), standardRequest)
            .then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err));
    }

    watchEffect(() => {
        fetchData();
    });

    return { data, error };
}
