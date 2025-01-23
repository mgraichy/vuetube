const homeUri  = 'https://vuetube.mgraichy.com';
const oauthUri = 'https://laravue.mgraichy.com';
const accessTokensessionStorage = sessionStorage.getItem('access_token');
export const config = {
    clientId: 3,
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