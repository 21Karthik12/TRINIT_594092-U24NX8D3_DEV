import axios from 'axios'
let baseURL = 'http://localhost:4000/api/transactions/'

export default {
    state: {
        allTransactions: [],
        myTransactions: [],
    },
    getters: {
        getTransactionByProject(projectId) {
            let res = this.$store.state.myTransactions;
            res = res.filter(t => t.proj_id == projectId)
            return res;
        }
    },
    mutations: {
        setTransactions(state, payload) {
            let uid = this.$store.state.userId;
            for (let p in payload) {
                if (p.user_id == uid) this.$store.state.myTransactions.push(p);
                state.allTransactions.push(p);
            }
        },
        addTransaction(state, payload) {
            let uid = this.$store.state.userId;
            if (payload.user_id == uid) state.myTransactions.push(payload);
            state.allTransactions.push(payload);
        }
    },
    actions: {
        getTransactions({ context }) {
            axios.get(baseURL)
                .then((res) => {
                    if (res.status < 300) {
                        console.log("Received transactions");
                        context.commit("setTransactions", res.data);
                    } else {
                        console.log(res.data.error);
                    }
                })
        },
        createTransaction({ context }, payload) {
            console.log("Creating transaction : ", payload);
            axios.post(baseURL, payload)
                .then((res) => {
                    if (res < 300) {
                        console.log("Success");
                        context.commit("addTransaction", payload);
                    } else {
                        console.log(res.data.error);
                    }
                })
        }
    }
}
//    user_id: string;
//     transaction_id: string;
//     amount: string;
//     proj_id: string;
//     description?: string | undefined;