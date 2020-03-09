<script>
    export let name = '';
    export let total = 0;
    export let sold = 0;
    export let soldOut = false;
    export let address = '';
    export let lat = 0.0;
    export let lng = 0.0;
    
    $:red = soldOut ? 0 : (1 - Math.min(1, (total - sold) / 150)) * 255 | 0;
</script>

<li class="list-item" 
    class:sold-out={soldOut} 
    style="{soldOut ? '' : `color: rgb(${red}, 0, 0)`}">
    <div>
        {name}: [{soldOut ? '품절' : total - sold}]
    </div>
    <div class="address">
        {address}
    </div>
    <div class="address">
        {lat}:{lng}
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