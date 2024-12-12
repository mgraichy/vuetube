const homeUri  = 'https://localhost:5173';
const oauthUri = 'https://dev.laravel';
const accessTokensessionStorage = sessionStorage.getItem('access_token');
export const config = {
    clientId: 1,
    grantType: 'authorization_code',
    responseType: 'code',
    codeChallengeMethod: 'S256',
    homeUri: homeUri,
    oauthUri: oauthUri,
    redirectUri: `${homeUri}/callback`,
    oauthAuthorize: `${oauthUri}/oauth/authorize`,
    oauthAccessToken: `${oauthUri}/oauth/token`,
    accessTokenSessionStorage: accessTokensessionStorage,
};

export function authenticate() {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) return false;
    return true;
}