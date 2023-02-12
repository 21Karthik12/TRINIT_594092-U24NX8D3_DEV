<template>
  <div class="jumbotron">
    <h1 class="display-4" v-if="!loggedIn">Hello, kind Stranger!</h1>
    <h1 class="display-4" v-if="loggedIn">Welcome back {{ username }}!</h1>
    <p class="lead">Thanks for checking us out. We are NGO Konekt.</p>
    <hr class="my-4">
    <p>We aim to provide a centralized app where NGOs and philanthropists can connect</p>
    <p>For learning more about us click on the button below</p>
    <p class="lead">
      <button class="btn btn-primary btn-lg" role="button" @click="this.showMore = !this.showMore">Learn more</button>
    </p>
    <p v-if="this.showMore">
      <ProjectScroller :values="this.projects" title="Featured Projects"> </ProjectScroller>
    </p>
  </div>
  <ProfileCard v-bind:isNGO="this.isNGO" v-if="loggedIn"></ProfileCard>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import ProjectScroller from './ProjectScroller.vue'
import ProfileCard from './ProfileCard.vue'
export default {
  name: 'LandingPage',
  components: {
    ProfileCard,
    ProjectScroller,
  },
  data() {
    return {
      showMore: false,
    }
  },
  computed: mapState({
    loggedIn: state => state.loggedIn,
    isNGO: state => state.typeNGO,
    isPhil: state => state.typePhil,
    username: state => state.userName,
    interests: state => state.interests,
    projects: state => state.project.allProjects,
  }),
  mounted() {
    this.get();
    console.log({
      loggedIn: this.loggedIn,
      isNGO: this.isNGO,
      isPhil: this.isPhil,
      username: this.username,
      interests: this.interests
    })
  },
  methods: {
    ...mapActions({
      get: "getProjects"
    })
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
