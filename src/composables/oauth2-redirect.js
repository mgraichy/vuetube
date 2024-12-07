import { config } from './oauth2-config.js';

// REDIRECT to /oauth/authorize:
function stringOfRandomBytes(numberOfBytes = 64) {
    const array = new Uint8Array(numberOfBytes);
    // getRandomValues() works by reference (MDN docs say 'in place'):
    window.crypto.getRandomValues(array);
    const hexOutput = 16;
    return Array.from(
            array,
            (byteNumber) => byteNumber.toString(hexOutput).padStart(2, '0')
    ).join('');
}

function base64Urlencode(arrayBufferPromise) {
    return btoa(
            String.fromCharCode.apply(
                null,
                new Uint8Array(arrayBufferPromise)
            )
        ).replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function sha256(plainText) {
    const encoder = new TextEncoder();
    const dataAsUint8Array = encoder.encode(plainText);
    return await window.crypto.subtle.digest('SHA-256', dataAsUint8Array);
}

async function pkceChallengeFromVerifier(codeVerifier) {
    const hashedPromise = await sha256(codeVerifier);
    return base64Urlencode(hashedPromise);
}

export async function redirectToAuthorizationServer() {
    const state = stringOfRandomBytes(20);
    sessionStorage.setItem('pkce_state', state);

    const codeVerifier = stringOfRandomBytes(64);
    sessionStorage.setItem('pkce_code_verifier', codeVerifier);

    const codeChallengePromise = await pkceChallengeFromVerifier(codeVerifier);

    // https://laravel.com/docs/11.x/passport#code-grant-pkce-redirecting-for-authorization:
    const oauthUrl =  new URL(config.oauthAuthorize);
    const queryObject = {
        response_type: config.responseType,
        client_id: config.clientId,
        state: state,
        scope: '',
        redirect_uri: config.redirectUri,
        code_challenge: codeChallengePromise,
        code_challenge_method: config.codeChallengeMethod,
    };

    const queryParams = new URLSearchParams(queryObject);
    queryParams.forEach((v, k) => {
        oauthUrl.searchParams.append(k, v);
    });

    window.location = oauthUrl.href;
}
