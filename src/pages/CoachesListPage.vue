<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul>
      <li v-for="coach in coaches" :key="coach.id">{{ coach.firstName }}</li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['coaches'])
  }
}
</script>