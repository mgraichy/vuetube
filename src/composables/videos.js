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

export async function goFetch(url, data, isLoading = {}, method = 'get', payload = null) {
    try {
        // data.value = [ { "id": 1, "title": "The Birthday Bot", "name": "M Graichy", "initials": "M", "comment": "Soluta enim aut eum architecto. Officia rerum maxime molestiae numquam dignissimos. Et porro perferendis quasi minima alias veniam.\n\nId magnam dignissimos architecto suscipit. Aut in rerum molestias. Omnis distinctio dolorem ut cumque ipsum. Illum consequuntur eius delectus aut et harum.\n\nCulpa error alias numquam cumque. Ut et dolore nihil magnam qui quidem doloribus. Possimus iure velit id provident unde dolorum vitae quam. Quos et cum minus.", "src": "bday-bot-540p.mp4", "views": "930K", "date": "2024-03-16T17:37:05.000000Z" }, { "id": 2, "title": "A Small Town", "name": "M Graichy", "initials": "M", "comment": "Beatae vel deserunt autem quaerat. Non doloremque rerum velit itaque unde. Omnis et alias ipsa. Ipsam veritatis labore atque hic fugiat ullam.\n\nNesciunt occaecati harum molestiae architecto facilis ea nulla. Vitae accusantium aut laborum minima velit laboriosam omnis molestiae. Et ut ut numquam doloribus. Sed repellat magni soluta iste.\n\nEos dolores asperiores fugit voluptates mollitia illo aut. Maiores ipsa voluptate quisquam dolorem debitis unde. Excepturi totam ipsa vitae fugiat ipsa enim voluptatem est. Et exercitationem dolorem ea.", "src": "town-540p.mp4", "views": "32K", "date": "2024-03-16T17:37:05.000000Z" }, { "id": 3, "title": "Traffic", "name": "M Graichy", "initials": "M", "comment": "Eum quasi voluptas consectetur minima saepe laudantium iste consequatur. Libero non minima impedit cum rerum ad voluptatem quia. Voluptatem temporibus quidem facilis explicabo nesciunt. Consequatur labore vel ullam vitae quia non ut.\n\nAut autem ea consequatur qui at rem est. Quidem magni qui ullam. Debitis omnis qui consequatur tenetur qui voluptas. Consectetur assumenda suscipit qui et quo.\n\nMolestiae aliquid sunt a soluta quis. Harum quod dolor voluptas dolores quasi.", "src": "traffic-540p.mp4", "views": "23K", "date": "2024-03-16T17:37:05.000000Z" } ];
        isLoading.value = true;
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
        data.value = [{error: message, status: 'JS Error somewhere inside goFetch()'}];
    } finally {
        isLoading.value = false;
    }
}

export async function goFetchVideo(url, id, method = 'get', payload = null) {
    try {
        console.log('url:', url, 'id:', id);
        const standardRequest = getRequest(method, payload);
        const response = await fetch(url, standardRequest);
        const blob = await response.blob();

        const source = document.getElementById(id);
        const contentsOfBlob = URL.createObjectURL(blob);
        source.setAttribute('src', contentsOfBlob);
        source.parentElement.load();
    } catch (jsError) {
        const message = jsError ?? 'Fetch error';
        console.log('error message:', message);
    }
}