<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Project Title</span>
        </div>
        <input type="text" class="form-control" placeholder="New Title" aria-label="Username"
            aria-describedby="basic-addon1" v-model="this.newTitle">
    </div>
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">Project Description</span>
        </div>
        <textarea class="form-control" aria-label="With textarea" v-model="this.newDescription"></textarea>
    </div>
    <RouterLink to="/">
        <button type="button" class="btn btn-success btn-lg btn-block" @click="handleSubmit">
            Save Changes
        </button>
    </RouterLink>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'ProjectUpdate',
    data() {
        return {
            newTitle: '',
            newDescription: '',
        }
    },
    props: {
        projId: String,
        oldTitle: String,
        oldDescription: String,
    },
    methods: {
        ...mapActions({
            push: 'updateProject'
        }),
        handleSubmit() {
            console.log('Updating');
            this.push({ projId: this.projId, title: this.newTitle, description: this.newDescription })
        }
    }

}
</script>