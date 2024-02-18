<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <base-card>
        <header><h2>Requests Received</h2></header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <li v-for="req in requestReceived" :key="req.id">
            <div>
              <a :href="'mailto:' + req.userEmail">{{ req.userEmail }}</a>
            </div>
            <p>{{ req.coachId }}</p>
            <p>{{ req.message }}</p>
          </li>
        </ul>
        <h3 v-else>You haven't recevied any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    requestReceived() {
      return this.$store.getters["requests"];
    },
    hasRequests() {
      return this.$store.getters["hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchRequests");
      } catch (error) {
        this.error = error.message || "something bad";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
h3 {
  text-align: center;
}
</style>
