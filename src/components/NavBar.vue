<template>

    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <div class="navbar-brand" href="#">
                <img src="../assets/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                <router-link to="/"> NGO Konekt</router-link>
            </div>
            <ul class="nav justify-content-center">
                <li class="nav-item" v-if="!loggedIn">
                    <button type="button" class="btn btn-dark">
                        <router-link to="/login" style="color:white">Login/SignUp</router-link>
                    </button>
                </li>
                <li class="nav-item" v-if="loggedIn">
                    <button type="button" class="btn btn-light">
                        <router-link to="/login">Community</router-link>
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NavBar',
    computed: mapState({
        loggedIn: state => state.loggedIn
    })
}

</script>