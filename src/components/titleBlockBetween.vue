<template>
  <b-row class="mt-5">
        <b-col>
            <h2>{{ title }}</h2>
            
            <button
                v-if="!showAllRecordsFlag"
                @click="showAllRows"
                class="btn btn-danger btn-sm float-right"
            >Show all pages ({{ dataFromAPI_status_data.total }})
            </button>
            <button
                v-else
                @click="showAllRows"
                class="btn btn-success btn-sm float-right"
            >Back to paged view ({{ dataFromAPI_status_data.total }})
            </button>

        </b-col>
    </b-row>
</template>

<script>
export default {
  name: "TitleBlockBetween",
  props: {
    title: String,
    showAllRecordsFlag: Boolean,
    dataFromAPI_status_data: Object
  },
  methods: {
      showAllRows() {
          this.$emit("showAllRows");
      }

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
