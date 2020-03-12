import {parse} from 'query-string';
import Home from './comps/Home.svelte';
import data from '../test/fixture.json';
import request from './utils/request';

const {lat = 0.0, lng = 0.0, m = 1000} = parse(location.search);
const fetchAPI = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json`;
const url = `${fetchAPI}?lat=${lat}&lng=${lng}&m=${m}`;

function tap(callback) {
    return function(e) {
        callback(e);
        return e;
    }
}

request(url)
    .then(response => JSON.parse(response))
    .then(tap(console.log))
    .then(render);

function render(data) {
    const home = new Home({
        target: document.querySelector('#container'), 
        props: {
            stores: data.stores,
            lat,
            lng
        }
    });

    window.data = data;
}