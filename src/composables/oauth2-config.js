const homeUri  = 'http://localhost:5173';
const oauthUri = 'https://dev.laravel';
const accessTokenSessionStorage = sessionStorage.getItem('access_token');
export const config = {
    clientId: 12,
    grantType: 'authorization_code',
    responseType: 'code',
    codeChallengeMethod: 'S256',
    homeUri: homeUri,
    oauthUri: oauthUri,
    redirectUri: `${homeUri}/callback`,
    oauthAuthorize: `${oauthUri}/oauth/authorize`,
    oauthAccessToken: `${oauthUri}/oauth/token`,
    accessTokenSessionStorage: accessTokenSessionStorage,
};