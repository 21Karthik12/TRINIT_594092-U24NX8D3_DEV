<template>
    <div @mouseover="handleHover()" @mouseleave="handleExit()">
        <button type="button" v-bind:class="type">{{ title }}</button>
        <div v-if="this.showDropDown">
            <div v-for="(item, index) in elements" v-bind:key="index">
                <router-link v-bind:to="item.link">
                    <button type="button" v-bind:class="type">{{ item.text }}</button>
                </router-link>
            </div>
        </div>
    </div>


</template>

<script>

export default {
    name: 'DropDown',
    data() {
        return {
            showDropDown: false
        }
    },
    props: {
        elements: Object,
        title: String,
        type: String,
    },
    methods: {
        handleHover() {
            console.log("Showing Menu")
            this.showDropDown = true;
        },
        handleExit() {
            console.log("Hiding menu")
            this.showDropDown = false;
        }
    }
}
</script>