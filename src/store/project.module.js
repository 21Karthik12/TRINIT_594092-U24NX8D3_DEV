import axios from "axios"
let baseURL = "http://localhost:4000/api/projects";

export default {
    state: {
        allProjects: [],
        likedProjects: [],
        dislikedProjects: [],
    },
    getters: {
        getProjectsOfUser(userId) {
            let res = this.$store.state.allProjects;
            res = res.filter(project => project.user_id == userId)
            res.sort((a, b) => a.start_date > b.star_date)
            return res;
        },
        getAllProjects() {
            return this.$store.state.allProjects
        }
    },
    mutations: {
        setAllProjects(state, payload) {
            state.allProjects = []
            state.allProjects = payload
            console.log('Set projects:', state.allProjects)
        },
        pushProject(state, payload) {
            let found = false;
            for (let p in state.allProjects) if (p._id == payload._id) found = true;
            if (found) return;
            state.allProjects.push(payload);
        },
        removeProject(state, projectId) {
            state.allProjects = state.allProjects.filter((p) => {
                p._id != projectId
            })
        },
        likeProject(state, projectId) {
            let done = false;
            for (let pid in state.likedProjects) {
                if (pid == projectId) done = true;
            }
            if (done) return;
            for (let p in state.allProjects) {
                if (p._id == projectId) {
                    p.likes += 1;
                    state.likedProjects.push(projectId);
                    break;
                }
            }
        },
        dislikeProject(state, projectId) {
            let done = false;
            for (let pid in state.dislikedProjects) {
                if (pid == projectId) done = true;
            }
            if (done) return;
            for (let p in state.allProjects) {
                if (p._id == projectId) {
                    p.likes -= 1;
                    state.dislikedProjects.push(projectId);
                    break;
                }
            }
        },
        changeProject(state, payload) {
            for (let p = 0; p < state.allProjects.length; p++) {
                if (payload.projId == state.allProjects[p]._id) {
                    state.allProjects[p].description = payload.description
                    state.allProjects[p].title = payload.title
                }
            }
        }
    },
    actions: {
        getProjects({ commit }) {
            axios.get(baseURL)
                .then((res) => {
                    if (res.status < 300) {
                        commit("setAllProjects", res.data);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        createProject({ commit }, payload) {
            console.log('Creating the  project:', payload);
            axios.post(baseURL, payload)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Successully make project");
                        commit("pushProject", payload);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        updateProject({ commit }, payload) {
            axios.patch(baseURL + '/' + payload.projId)
                .then((res) => {
                    if (res.status < 300) {
                        console.log(res.data)
                        commit("changeProject", {
                            title: payload.title, description: payload.description
                        })
                    } else console.log(res.data.error)
                })
        },
        deleteProject({ commit }, projectId) {
            console.log("Deleting project", projectId);
            axios.delete(baseURL + '/' + projectId)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Delete successful");
                        commit("removeProject", projectId);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        likeProject({ commit }, projectId) {
            console.log("Likingg the project:", projectId);
            axios.patch(baseURL + '/' + projectId)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Like  succesfull");
                        commit("likeProject", projectId);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        dislikeProject({ commit }, projectId) {
            console.log("Disliking project : ", projectId);
            axios.patch(baseURL + '/' + projectId)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Dislike successful");
                        commit("dislikeProject", projectId);
                    } else {
                        console.log(res.data.error);
                    }
                })
        }
    }
}
