<template>
    <button type="button" class="btn btn-info btn-lg btn-block" @click="this.showAdd = !this.showAdd">
        Add Blog
    </button>
    <RouterLink to="/ngo">
        <button type="button" class="btn btn-warning btn-lg btn-block" @click="this.showAdd = !this.showAdd">
            Return
        </button>
    </RouterLink>

    <div v-if="showAdd">
        <BlogAdd></BlogAdd>
    </div>
    <div v-for="blog in blogs" :key="blog._id">
        <div class="jumbotron">
            <h1 class="display-4">{{ blog.title }}</h1>
            <p class="lead">{{ blog.description }}</p>
            <p>Users have shown you {{ blog.likes }} love</p>
            <hr class="my-4">
            <RouterLink to="/ngo">
                <button type="button" class="btn btn-danger btn-lg btn-block" @click="handleDelete(blog._id)">
                    Delete
                </button>
            </RouterLink>
            <hr class="my-4">
            <hr class="my-4">
            <p class="lead">
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BlogAdd from '../components/BlogAdd.vue'
export default {
    name: 'BlogView',
    components: {
        BlogAdd,
    },
    data() {
        return {
            showAdd: false,
        }
    },
    computed: {
        ...mapState({
            blogs: state => state.blog.allBlogs
        })
    },
    methods: {
        ...mapActions({
            get: 'getBlogs',
            push: 'createBlog',
            delete: 'deleteBlog',
        }),
        handleDelete(blogId) {
            this.delete(blogId)
        }
    },
    mounted() {
        this.get();
    }
}
</script>