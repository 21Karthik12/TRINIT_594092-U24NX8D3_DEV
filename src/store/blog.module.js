import axios from "axios"
let baseURL = "http://localhost:4000/api/";

export default {
    state: {
        allBlogs: [], //contains objectt 
        likedBlogs: [],  //contains  id
        dislikedBlogs: [] //contains id of disliked  blogs by user
    },
    getters: {
        getBlogsOfProject(projId) {
            let res = this.$store.state.allBlogs.filter((blog) => blog.proj_id == projId)
            res.sort((a, b) => a.publish_date > b.publish_date)
            return res;
        }
    },
    mutations: {
        pushAllBlogs(state, payload) {
            state.allBlogs = payload
        },
        pushBlog(state, payload) {
            state.allBlogs.push(payload)
        },
        removeBlog(state, blogId) {
            state.allBlogs = state.allBlogs.filter((blog) => {
                blog._id != blogId
            })
        },
        likeBlog(state, blogId) {
            let done = false;
            for (let id in state.likedBlogs) {
                if (id == blogId) {
                    done = true;
                    break;
                }
            }

            if (done) return;

            for (let blog in state.allBlogs) {
                if (blog._id == blogId) {
                    blog.likes += 1
                    state.likedBlogs.push(blogId);
                    break;
                }
            }
        },
        dislikeBlog(state, blogId) {
            let done = false;
            for (let id in state.dislikedBlogs) {
                if (id == blogId) {
                    done = true;
                    break;
                }
            }

            if (done) return;

            for (let blog in state.allBlogs) {
                if (blog._id == blogId) {
                    blog.like -= 1
                    state.dislikedBlogs.push(blogId);
                    break;
                }
            }
        }
    },
    actions: {
        getBlogs({ commit }) {
            axios.get(baseURL + 'blogposts')
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Got all blogs", res);
                        commit("pushAllBlogs", res.data)
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        createBlog({ commit }, payload) {
            console.log(payload)
            axios.post(baseURL + 'blogposts', payload)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Successfully added post");
                        commit("pushBlog", res.data);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        deleteBlog({ commit }, blogId) {
            console.log("Deleting the blog: ", blogId);
            axios.delete(baseURL + `blogposts/${blogId}`)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Delete successfull");
                        commit("removeBlog", blogId);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        likeBlog({ commit }, blogId) {
            console.log("Liking the blog:", blogId);
            axios.patch(baseURL + `blogposts/${blogId}/addLike`)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Liked blog Successful");
                        commit("likeBlog", blogId);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        dislikeBlog({ commit }, blogId) {
            console.log("Disliking the blod:", blogId);
            axios.patch(baseURL + `blogposts/${blogId}/removeLike`)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Dislike successful")
                        commit("dislikeBlog", blogId);
                    } else {
                        console.log(res.data.error);
                    }
                })
        }
    }
}