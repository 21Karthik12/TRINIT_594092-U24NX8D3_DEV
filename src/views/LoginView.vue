<template>
    <ErrorShow v-bind:bad="err.bad" v-bind:message="err.msg" v-bind:errorActive="err.active"></ErrorShow>

    <form>
        {{ value.headingValue }}
        <div class="form-row">
            <div class="form-group col-md-6">
                <div class="col-7">
                    <label>Username</label>
                    <input type="text" class="form-control" placeholder="Username" v-model="this.userData.username">
                </div>
            </div>

            <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password"
                    v-model="userData.password">
            </div>
        </div>
        <div v-if="newUser">
            <div class="form-group col-md-6">
                <label for="inputPassword4">Confirm Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password"
                    v-model="userData.confirmPassword">
            </div>
            <div class="alert alert-info" role="alert">
                Make sure the password is longer than 6 characters
            </div>
            <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" v-model="userData.email">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" v-model="userData.city">
                </div>
            </div>

            <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
                    v-model="userData.address">
            </div>


            <div class="form-group">
            </div>
            <div id="interestChecking" v-for="(interest, index) in userData.interests" v-bind:key="index">

                <input class="form-check-input" type="checkbox" v-model="userData.interests[index].selected">
                <label class="form-check-label" for="gridCheck"
                    v-bind:style="{ color: userData.interests[index].selected ? 'greenyellow' : 'black' }">
                    {{ interest.type }}
                </label>
            </div>

            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="option1" autocomplete="off" v-model="this.userData.NGO">
                    Register as NGO
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option2" autocomplete="off" checked> Register as
                    Philanthropist
                </label>
            </div>
        </div>
        <button type="submit" class="btn btn-success" @click="this.newUser ? newUserSubmit() : oldUserSubmit()">
            {{ value.buttonValue }}
        </button> <br>
        <button type="submit" class="btn btn-light" @click="this.newUser = !this.newUser" v-if="!newUser">New User
            ?</button>
        <button type="submit" class="btn btn-light" @click="this.newUser = !this.newUser" v-if="newUser">Already have
            an account ?</button>
    </form>

</template>

<script>
import { mapActions } from 'vuex'
import ErrorShow from '../components/ErrorShow.vue'
export default {
    name: 'LoginView',
    components: {
        ErrorShow,
    },
    data() {
        return {
            userData: {
                username: "",
                password: "",
                confirmPassword: "",
                address: "",
                city: "",
                email: "",
                interests: [
                    { type: 'Differently Abled Children', selected: false },
                    { type: 'War Veterans', selected: false },
                    { type: 'Homeless Population', selected: false },
                    { type: 'War Ridden Populace', selected: false },
                    { type: 'Something else', selected: false },
                    { type: 'Another thing', selected: false },
                    { type: 'And yet another thing', selected: false },
                ],
                NGO: false,
            },
            newUser: false,
            err: {
                bad: false,
                msg: "",
                active: false,
            }
        }
    },
    methods: {
        ...mapActions({ login: 'userLogin', create: 'userCreate' }),
        newUserSubmit() {
            console.log(this.userData)
            if (this.userData.password != this.userData.confirmPassword || this.userData.password.length < 6) {
                this.err.bad = true
                this.err.msg = "Please check the entered passwords"
                this.err.active = true
                setTimeout(() => {
                    this.err.active = false
                }, 2500);
            } else { //ok 
                this.create({
                    username: this.userData.username,
                    password: this.userData.password,
                    ngo: this.userData.NGO,
                    email: this.userData.email,
                    // interests : this.userData.interests.filter(val => val)
                    interests: 0
                }).then((res) => {
                    console.log(res);
                    this.err.bad = false;
                    this.err.msg = "You can now continue"
                    this.err.active = true;
                    setTimeout(() => this.err.active = false, 2500)
                }, (rej) => {
                    console.log(rej);
                    this.err.bad = true;
                    this.err.msg = "User already exists"
                    this.err.active = true;
                    setTimeout(() => this.err.active = false, 2500)
                })
            }
        },
        oldUserSubmit() {
            console.log(this.userData)
            if (!this.userData.username.length || !this.userData.password.length) {
                this.err.bad = true;
                this.err.msg = "Incorrect username or password"
                this.err.active = true;
                setTimeout(() => this.err.active = false, 2500)
            } else { //ok
                //TODO : API support for this not provided yet 

                //after request returns ok status
                this.err.bad = false;
                this.err.msg = "Welcome back";
                this.err.active = true;
                setTimeout(() => this.err.active = false, 2500);
                this.push(this.userData); //TODO : make this async
            }
        }
    },
    computed: {
        value() {
            return {
                headingValue: this.newUser ? "Sign Up and start your journey with us" : "Sign In and contiinue  to spread love",
                buttonValue: this.newUser ? "Sign Up " : "Sign In "
            }
        }
    }

}
</script>

