export async function fetchVideos(data, id = null) {
    data.value = {
        id: 2,
    };

    return data;
    // fetch(`/api/videos/?id=${id}`, {
    //     headers: getStandardHeaders(csrfCookie),
    //     mode: 'cors',
    //     credentials: 'include',
    //     method: 'get',
    // }).then((response) => {
    //     return response.json();
    // }).then((json) => {
    //     data.value = json;
    // }).catch((err) => { });

    // return data;
}

// export async function getVideo(data, id) {
//     await setCsrfCookie();
//     const csrfCookie = getCookie('XSRF-TOKEN');

//     fetch(`/api/video/?id=${id}`, {
//         headers: getStandardHeaders(csrfCookie),
//         mode: 'cors',
//         credentials: 'include',
//         method: 'get',
//     }).then((response) => {
//         return response.json();
//     }).then((json) => {
//         data.value = json;
//     }).catch((err) => { });

//     return data;
// }

// export async function getComments(data, id) {
//     await setCsrfCookie();
//     const csrfCookie = getCookie('XSRF-TOKEN');

//     fetch(`/api/comment/?id=${id}`, {
//         headers: getStandardHeaders(csrfCookie),
//         mode: 'cors',
//         credentials: 'include',
//         method: 'get',
//     }).then((response) => {
//         return response.json();
//     }).then((json) => {
//         data.value = json;
//     }).catch((err) => { });

//     return data;
// }

