<template>
    <p>{{ counter }}</p>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'App',
    computed: {
        ...mapGetters(['counter'])
    }
}

</script>
<style>
h1 {
    text-align: center;
    color: blue;
}
</style>