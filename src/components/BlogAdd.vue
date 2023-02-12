<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Enter Title</span>
        </div>
        <input type="text" class="form-control" placeholder="Title" aria-label="Username"
            aria-describedby="basic-addon1" v-model="this.title">
    </div>

    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">Enter description</span>
        </div>
        <textarea class="form-control" aria-label="Description" v-model="this.description"></textarea>
    </div>

    <RouterLink to="/ngo">
        <button type="button" class="btn btn-success btn-lg btn-block" @click="handleSubmit()">
            Add Blog
        </button>
    </RouterLink>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'BlogAdd',
    data() {
        return {
            title: '',
            description: '',
        }
    },
    methods: {
        ...mapActions({
            push: 'createBlog',
        }),
        handleSubmit() {
            let projId = this.$route.params.projId
            let obj = {
                title: this.title,
                description: this.description,
                publish_date: new Date(),
                proj_id: projId
            }
            this.push(obj);
        }
    }
}
</script>