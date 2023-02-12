<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">@</span>
        </div>
        <input type="text" class="form-control" :placeholder="this.username" aria-label="Username"
            aria-describedby="basic-addon1" v-model="this.newUsername">
    </div>

    <div class="input-group mb-3">
        <input type="text" class="form-control" :placeholder="this.email" aria-label="Recipient's username"
            aria-describedby="basic-addon2" v-model="this.newEmail">
        <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">@gmail.com</span>
        </div>
    </div>

    <input class="form-control" type="text" :placeholder="'Current password :' + this.password" readonly>

    <div class="form-group col-md-6">
        <label for="inputPassword4">New Password</label>
        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" v-model="this.pass1">
    </div>
    <div class="form-group col-md-6">
        <label for="inputPassword5">Confirm Password</label>
        <input type="password" class="form-control" id="inputPassword5" placeholder="Password" v-model="this.pass2">
    </div>
    <button type="button" class="btn btn-success btn-lg btn-block" @click="handleSubmit">Save Changes</button>
    <router-link to="/">
        <button type="button" class="btn btn-danger btn-lg btn-block">Return</button>
    </router-link>
    <ErrorShow :bad="this.bad" :message="this.message" :errorActive="this.errorActive"> </ErrorShow>
</template>

<script>
import ErrorShow from '../components/ErrorShow.vue'
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
    name: 'UserUpdateView',
    components: {
        ErrorShow
    },
    data() {
        return {
            newUsername: '',
            newEmail: '',
            pass1: '',
            pass2: '',
            bad: false,
            message: '',
            errorActive: false
        }
    },
    computed: {
        ...mapState({
            username: state => state.userName,
            password: state => state.password,
            email: state => state.email,
        })
    },
    methods: {
        ...mapActions({
            push: 'userUpdate'
        }),
        async handleSubmit() {
            if (this.pass1 != this.pass2) {
                this.activateError("Password don't match", true);
            } else if (this.newEmail == this.email && this.pass1 == this.password && this.newUsername == this.username) {
                this.activateError("No changes to save", true);
            } else if (this.pass1.length < 6) {
                this.activateError("Password is too short. Needs to be 6 characters", true);
            } else {
                const obj = {
                    username: this.newUsername.length ? this.newUsername : this.username,
                    password: this.pass1.length ? this.pass1 : this.password,
                    email: this.newEmail.length ? this.newEmail : this.email
                }
                this.push(obj)
                this.activateError("Changes Saved", false);
            }
        },
        activateError(msg, bad) {
            this.errorActive = true;
            this.message = msg;
            this.bad = bad;
            setTimeout(() => {
                this.errorActive = false
            }, 2500);
        }
    },
}
</script> 