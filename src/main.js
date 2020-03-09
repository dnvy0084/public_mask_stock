import {parse} from 'query-string';
import Home from './comps/Home.svelte';
import data from '../test/fixture.json';

const {lat = 0.0, lng = 0.0} = parse(location.search);

new Home({
    target: document.querySelector('#container'), 
    props: {
        stores: data.stores,
        lat,
        lng
    }
});