<template>
  <section>
    <router-link to="/register">Register as Coach</router-link>

    <ul v-if="hasCoaches">
      <coach-item v-for="coach in coaches" :key="coach.id" :coach="coach">
      </coach-item>
    </ul>

    <h3 v-else>No Coaches Found.</h3>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import CoachItem from "@/components/CoachItem.vue";
export default {
  components: { CoachItem },
  computed: {
    ...mapGetters(["coaches", "hasCoaches"]),
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
