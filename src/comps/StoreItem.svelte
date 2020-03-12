<script>
    import switchRemainToInfo from '../utils/switchRemainToInfo';

    export let name = '';
    export let remain = '';
    export let stockAt = "00:00:00";
    export let address = '';
    export let lat = 0.0;
    export let lng = 0.0;

    let remainNum = 0;
    let remainStatus = ''
    let soldOut = false;
    
    $: {
        ({remainNum, remainStatus, soldOut} = switchRemainToInfo(remain));
    }

    $:red = soldOut ? 0 : (1 - Math.min(1, remain / 150)) * 255 | 0;
</script>

<li class="list-item" 
    class:sold-out={soldOut} 
    style="{soldOut ? '' : `color: rgb(${red}, 0, 0)`}">
    <div>
        {name}: [{remainStatus}]
    </div>
    <div class="address">
        {address}
    </div>
    <div class="address">
        {stockAt}
    </div>
</li>

<style>
    .stock {
        color: black;
        font-weight: bold;
    }

    .address {
        /* font-weight: ''; */
        font-size: 10px;
        color: #333;
    }

    .list-item {
        margin: 10px;
    }

    .sold-out {
        color: #aaa;
    }
</style>