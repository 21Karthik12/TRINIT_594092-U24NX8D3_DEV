<template>
    <div v-for="project in projects" :key="project._id">
        <div class="jumbotron">
            <h1 class="display-4">{{ project.title }}</h1>
            <p class="lead">{{ project.description }}</p>
            <hr class="my-4">
            <RouterLink to="/">
                <button class="btn btn-success btn-lg btn-block" role="button" @click="handleLike(project._id)">
                    ❤️
                </button>
            </RouterLink>
            <RouterLink to="/">
                <button class="btn btn-danger btn-lg btn-block" role="button" @click="handleDislike(project._id)">
                    👎
                </button>
            </RouterLink>
            <p>{{ project.likes }} </p>
            <hr class="my-4">
            <hr class="my-4">

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'PhilView',
    computed: {
        ...mapState({
            projects: state => state.project.allProjects
        })
    },
    methods: {
        ...mapActions({
            get: 'getProjects',
            like: 'likeProject',
            dislike: 'dislikeProject'
        }),
        handleLike(projId) {
            this.like(projId);
        },
        handleDislike(projId) {
            this.dislik(projId);
        }
    },
    mounted() {
        this.get();
    }
}
</script>