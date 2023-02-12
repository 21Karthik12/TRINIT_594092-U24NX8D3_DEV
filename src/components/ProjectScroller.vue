<template>
    <h1>{{ title }}</h1>
    <div>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{ heading }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">❤️ : {{ likes }}</h6>
                <p class="card-text">{{ description }}.</p>
                <router-link :to="link" class="card-link">Login to Support these NGOs</router-link>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'ProjectScroller',
    props: {
        values: Object,
        title: String,
    },
    data() {
        return {
            ind: 0,
            heading: '',
            description: '',
            likes: '',
            link: '/login',
        }
    },
    methods: {
        updateValues() {
            let proj = this.values[this.ind]
            this.ind += 1;
            if (this.ind == this.values.length) this.ind = 0;
            this.heading = proj.title;
            this.description = proj.description;
            this.likes = proj.likes;
        },
        counter() {
            setInterval(this.updateValues, 1000);
        }
    },
    mounted() {
        this.counter();
    }

}
</script>