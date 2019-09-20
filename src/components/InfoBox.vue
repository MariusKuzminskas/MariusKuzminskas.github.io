<template>
    <div class="card_component">
        <div
            class="alert alert-info lastClickedRow"
            role="alert"
            title="Click to dismiss"
            @click="clearCard"
        >
            <div class="wrapper">
                <span class="x_close">x</span>
                <h5 class>last clicked row</h5>
                <p>
                    <span>{{selectedRow.country}}</span> |
                    <span class="font-weight-bold">{{selectedRow.date}}</span> |
                    <span>{{selectedRow.population}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfoBox",
    props: ["selectedRow"],
    methods: {
      clearCard() {
        this.$emit("clearCard")
      }
    } 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lastClickedRow {
    cursor: pointer;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 4px 3px 11px;
    /* width: 100%; */
}
.lastClickedRow p {
    margin-bottom: 0;
}

.lastClickedRow .wrapper {
    position: relative;
    cursor: pointer;
    padding-right: 25px;
}
.wrapper > span {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: -10px;
    padding: 3px 4px;
    background-color: #fff;
    border-radius: 4px;
}

</style>
