<script>
    import StoreItem from './StoreItem.svelte';

    export let lat = 0.0;
    export let lng = 0.0;
    export let stores = [];
    export let _stores = stores;

    const filter = {
        includeSoldOut: true,
        ascending: false,
        decending: false,
        distance: false
    };

    function soldOut(remain) {
        return remain === 'empty' || 
            remain === 'break' || 
            remain === null || 
            remain === 'null';
    }

    function mapToNum(remain) {
        switch(remain) {
            case 'plenty':
                return 200

            case 'some':
                return 100

            case 'few':
                return 30

            case 'empty':
                return 0

            case 'break':
                return 0

            default:
        }

        return 0;
    }

    function updateList() {
        if(filter.includeSoldOut) {
            _stores = stores;
        }
        else {
            _stores = stores.filter(store => !soldOut(store.remain_stat));
        }

        if(filter.ascending) {
            _stores = sortByAscending(_stores);
        }

        if(filter.decending) {
            _stores = sortByDesending(_stores);
        }

        if(filter.distance) {
            _stores = sortByDistance(_stores, lat, lng);
        }
    }

    function onClick(e) {
        filter.ascending = false;
        filter.decending = false;
        filter.distance = false;

        switch(e.target.textContent) {
            case '오름차순':
                filter.ascending = true;
                break;

            case '내림차순':
                filter.decending = true;
                break;

            case '거리순':
                filter.distance = true;
                break;
        }

        updateList();
    }

    function sortByAscending(arr) {
        return arr.sort((a, b) => mapToNum(a.remain_stat) - mapToNum(b.remain_stat))
    }

    function sortByDesending(arr) {
        return arr.sort((a, b) => mapToNum(b.remain_stat) - mapToNum(a.remain_stat))
    }

    function diff(ax, ay, bx, by) {
        const dx = ax - bx;
        const dy = ay - by;

        return dx * dx + dy * dy;
    }

    function sortByDistance(arr, lat, lng) {
        return arr.sort((a, b) => {
            const diffA = diff(lat, lng, a.lat, a.lng);
            const diffB = diff(lat, lng, b.lat, b.lng);

            return diffA - diffB;
        })
    }

    function onChecked(e) {
        filter.includeSoldOut = e.target.checked;

        updateList();
    }
    
</script>

<div>
    <button on:click={onClick}>오름차순</button>
    <button on:click={onClick}>내림차순</button>
    <button on:click={onClick}>거리순</button>
    <input type="checkbox" on:change={onChecked} checked value="품절"/>
    <ul>
        {#each _stores as store}
            <StoreItem
                name={store.name.replace(/test::/, '')} 
                remain={store.remain_stat}
                stockAt={store.stock_at}
                address={store.addr}
                lat={store.lat}
                lng={store.lng}>
            </StoreItem>
        {/each}
    </ul>
</div>

<style>
    
</style>