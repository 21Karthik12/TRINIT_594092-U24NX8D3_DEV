<template>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Project Title</span>
        </div>
        <input type="text" class="form-control" placeholder="New Title" aria-label="Username"
            aria-describedby="basic-addon1" v-model="this.title">
    </div>
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">Project Description</span>
        </div>
        <textarea class="form-control" aria-label="With textarea" v-model="this.description"></textarea>
    </div>
    <RouterLink to="/">
        <button type="button" class="btn btn-success btn-lg btn-block" @click="handleSubmit">
            Create Project
        </button>
    </RouterLink>

</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'ProjectAdd',
    data() {
        return {
            description: '',
            title: '',
        }
    },
    computed: {
        ...mapState({
            uid: state => state.userId
        })
    },
    methods: {
        ...mapActions({
            push: 'createProject'
        }),
        handleSubmit() {
            this.push({
                description: this.description,
                title: this.title,
                user_id: this.uid,
                start_date: new Date()
            })
        }
    }
}
</script>