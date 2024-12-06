import { config } from './oauth2-config.js';

// On the Callback URL, after you've redirected to /oauth/authorize:
export async function xhr() {
    try {
        const pkceState = sessionStorage.getItem('pkce_state');
        const pkceCodeVerifier = sessionStorage.getItem('pkce_code_verifier');
        const queryParams = new URLSearchParams(window.location.search);

        const returnedState = queryParams.get('state');
        if (returnedState !== pkceState) {
            throw Error('State check failed');
        }

        const authorizationCode = queryParams.get('code');

        // https://laravel.com/docs/11.x/passport#code-grant-pkce-converting-authorization-codes-to-access-tokens:
        const url =  new URL(config.oauthAccessToken);
        const headers = {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Origin: config.redirectUri,
        };

        const jsonObject = {
            grant_type: config.grantType,
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            code_verifier: pkceCodeVerifier,
            code: authorizationCode,
        };
        const bodyParams = JSON.stringify(jsonObject);

        const options = {
            headers: headers,
            body: bodyParams,
            method: 'post',
            mode: 'cors',
        };

        const response = await fetch(url, options);
        const value = await response.json();

        if (value.access_token != null) {
            sessionStorage.setItem('access_token', value.access_token);
        } else {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('pkce_code_verifier');
            sessionStorage.removeItem('pkce_state');
        }

        window.location.replace(config.homeUri);
    } catch (e) {
        console.error('Error during OAuth2 flow:', e);
    }
}
