<template>
  <div class="paginationMain">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- Pagination -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item w-25">
            <a @click.prevent="prevPage" class="page-link" href="#">Previous Page</a>
          </li>
          <li @click.prevent="nextPage" class="page-item w-25">
            <a class="page-link" href="#">Next Page</a>
          </li>
        </ul>
      </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    msg: String
  },
  methods: {
      nextPage() {
          this.$emit("nextPage");
      },
      prevPage() {
          this.$emit("prevPage");
      }

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
