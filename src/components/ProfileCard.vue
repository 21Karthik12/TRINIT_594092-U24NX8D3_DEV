<template>
    Your profile
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ username }}</h5>
            <p class="card-text"> {{ text }}</p>
            <router-link v-bind:to="(isNGO ? '/ngo' : '/phil')">
                <p class="card-text"> View your space</p>
            </router-link>
        </div>
        <DropDown :elements="elements" :title="title" :type="type"></DropDown>
        <button type="button" class="btn btn-danger" @click="handleDelete">Delete Account</button>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import DropDown from './DropDown.vue'
export default {
    name: 'ProfileCard',
    components: {
        DropDown,
    },
    props: {
        isNGO: Boolean,
    },
    computed: {
        ...mapState({
            username: state => state.userName,
            interests: state => state.interests,
        }),
        text() {
            if (!this.isNGO) {
                return 'Welcome back fellow Philanthropist. \
                Your contributions have helped a lot.'
            } else {
                return 'Welcome back NGO! Your selfless contributions have helped a lot of people.'
            }
        }
    },
    data() {
        return {
            elements: [
                {
                    text: 'Update Profile',
                    link: '/user'
                },
                {
                    text: 'Funds Information',
                    link: '/funds'
                }],
            title: 'More account actions ⬇️',
            type: 'btn btn-info',
        }
    },
    methods: {
        ...mapActions({
            delete: 'userDelete'
        }),
        handleDelete() {
            console.log("Clicked delete");
            this.delete();
        }
    },
}
</script>