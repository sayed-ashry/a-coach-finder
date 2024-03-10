<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section><coach-filter @change-filter="setFilters"></coach-filter></section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to register as coach</base-button
          >
          <base-button
            link
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item v-for="coach in coaches" :key="coach.id" :coach="coach">
          </coach-item>
        </ul>
        <h3 v-else>No Coaches Found.</h3></base-card
      >
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/CoachItem.vue";
import CoachFilter from "@/components/CoachFilter.vue";
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    coaches() {
      const coaches = this.$store.getters["coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },

    hasCoaches() {
      return !this.isLoading && this.$store.getters["hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["isCoach"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadCoaches");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
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
