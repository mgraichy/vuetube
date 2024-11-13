import { config } from './oauth2-config.js';

// On the Callback URL after you've redirected to /oauth/authorize,
// send a fetch() --- same as BE cURL:
export async function xhr() {
    const pkceState = sessionStorage.getItem('pkce_state');
    const pkceCodeVerifier = sessionStorage.getItem('pkce_code_verifier');
    const queryParams = new URLSearchParams(window.location.search);

    const returnedState = queryParams.get('state');
    try {
        if (returnedState !== pkceState) {
            throw Error('State check failed');
        }
    } catch (e) {
        console.log(e);
        return;
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

    sessionStorage.setItem('access_token', value.access_token);
    // window.location.replace(config.homeUri);
}
