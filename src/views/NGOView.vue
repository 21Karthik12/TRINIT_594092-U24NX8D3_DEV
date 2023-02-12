<template>
    <h1>My Projects</h1>
    <button type="button" class="btn btn-info btn-lg btn-block" @click="this.showAdd = !this.showAdd">
        Add Project
    </button>
    <div v-if="showAdd">
        <ProjectAdd></ProjectAdd>
    </div>
    <div v-for="project in this.myProjects" :key="project._id">
        <div class="jumbotron" v-if="project._id != uid">
            <h1 class="display-4">{{ project.title }}</h1>
            <p class="lead">{{ project.description }}</p>
            <hr class="my-4">
            <p>This is all the ❤️ people gave you : {{ project.likes }} </p>
            <p class="lead">
                <button type="button" class="btn btn-info btn-lg btn-block" @click="this.showUpdate = !this.showUpdate">
                    Update
                </button>
                <RouterLink :to="{ name: 'blogs', params: { projId: project._id } }">
                    <button class="btn btn-success btn-lg btn-block" role="button">
                        View Blogs
                    </button>
                </RouterLink>
                <RouterLink to="/">
                    <button type="button" class="btn btn-danger btn-lg btn-block" @click="handleDelete(project._id)">
                        Delete
                    </button>
                </RouterLink>
            </p>
            <div v-if="showUpdate">
                <ProjectUpdate :projId="project._id" :oldTitle="project.title" :oldDescription="project.description">
                </ProjectUpdate>
            </div>
            <hr class="my-4">
            <hr class="my-4">
        </div>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProjectUpdate from '../components/ProjectUpdate.vue'
import ProjectAdd from '../components/ProjectAdd.vue'
export default {
    name: 'NGOView',
    components: {
        ProjectUpdate,
        ProjectAdd,
    },
    computed: {
        ...mapState({
            myProjects: state => state.project.allProjects,
            uid: state => state.userId,
        })
    },
    data() {
        return {
            showUpdate: false,
            showAdd: false,
        }
    },
    methods: {
        ...mapActions({
            get: 'getProjects',
            create: 'createProject',
            remove: 'deleteProject',
        }),
        handleDelete(projId) {
            console.log('Deleting:', projId)
            this.remove(projId)
        },
        mounted() {
            this.get();
        }
    },


}
</script>