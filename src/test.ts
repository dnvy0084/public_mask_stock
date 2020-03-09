import {parse} from 'query-string';

const fetchAPI = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json`;

function init() {
    const {lat, lon} = parse(location.search);
    
    console.log(lat, lon);

    const url = `${fetchAPI}?lat=${lat}&lng=${lon}&m=1000`;
    const init: RequestInit = {
        mode: 'no-cors'
    }

    console.log(url);

    fetch(url, init).then(e => console.log('fetch', e)).catch(err => console.log('fetch error', err));

    request(url).then(e => console.log('response', typeof e, e.length)).catch(err => console.log('err', err));
}

function getCurrentGeoLocation() {
    const geo = navigator.geolocation;

    if(!geo || !geo.getCurrentPosition) return null;

    geo.getCurrentPosition((...args) => console.log('success', args), err => console.warn(err));
}
 
function request(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.onreadystatechange = (e) => {
            if(req.readyState === 4) {
                resolve(req.response);
            }
        }

        req.onerror = (e) => {
            reject(e);
        }

        req.open('GET', url);
        req.withCredentials = true;
        req.send();
    })
}

window.onload = init;