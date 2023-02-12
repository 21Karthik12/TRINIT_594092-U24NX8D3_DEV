<template>
    <div class="alert alert-success" role="alert" v-if="!bad && errorActive">
        {{ message }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="bad && errorActive">
        {{ message }}
    </div>
</template>

<script>
export default {
    name: 'ErrorShow',
    props: {
        bad: Boolean,
        message: String,
        errorActive: Boolean,
    }
}
</script>