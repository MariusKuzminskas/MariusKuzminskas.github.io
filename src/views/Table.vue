<template>
  <div class="mainTablePage">
    <b-container>
      <!-- <InfoBox msg="Welcome to Your Vue.js App" /> -->

      <h1 class="my-5">API call table sorting and pagination</h1>

      <!-- This is agood kandidate to be a component -->
      <h4>Api call parameters</h4>
      <table class="table table-striped table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Requested page</th>
            <th>Total pages</th>
            <th>per_page</th>
            <th>total</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{dataFromAPI_status_data.page}}</td>
            <td>{{dataFromAPI_status_data.pages}}</td>
            <td>{{dataFromAPI_status_data.per_page}}</td>
            <td>{{dataFromAPI_status_data.total}}</td>
            <td>{{dataFromAPI_status_data.lastupdated}}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <!-- Title Block between tables component  -->
      <TitleBlockBetween
        title="Actual data from API"
        v-bind:dataFromAPI_status_data="dataFromAPI_status_data"
        v-bind:showAllRecordsFlag="showAllRecordsFlag"
        v-on:showAllRows="showAllRows"
      />

      <!-- Pagination -->
      <Pagination v-on:nextPage="nextPage" v-on:prevPage="prevPage"></Pagination>

      <!-- Main Table -->
      <table id="mainApiDataTable" class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th @click="sort('country')">Country</th>
            <th @click="sort('date')">Data</th>
            <th @click="sort('population')">Population</th>
          </tr>
        </thead>

        <!-- table body with sorted data -->
        <tbody id="mainTableBody">
          <tr
            data-clicked="false"
            v-for="(value, index) in sortedData"
            :key="index"
            @click="select(value, $event)"
          >
            <td>{{value.country}}</td>
            <td>{{value.date}}</td>
            <td>{{value.population}}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <Pagination v-on:nextPage="nextPage" v-on:prevPage="prevPage"></Pagination>

      <!-- Info box showing what line was clicked -->
      <InfoBox
        v-if="selectedRow"
        v-bind:selectedRow="selectedRow"
        v-on:clearCard="selectedRow = null"
      />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from "@/components/pagination.vue";
import InfoBox from "@/components/InfoBox.vue";
import TitleBlockBetween from "@/components/titleBlockBetween.vue";

import axios from "axios";
import { log } from "util";
export default {
  name: "Table",
  data() {
    return {
      dataFromAPI: [],
      dataParsed: [],
      currentSort: "country",
      currentSortDir: "asc",
      fetchFinish: false,
      showAllRecordsFlag: false,
      pageSize: 25,
      currentPage: 1,
      nextPageNr: 2,
      prevPageNr: 2,
      totalPages: 222,
      apiCallAddress_base:
        "http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=1990:2010&format=json&per_page=25",
      apiCallAddress_newCall: "",
      selectedRow: null
    };
  },
  components: {
    Pagination,
    InfoBox,
    TitleBlockBetween
  },
  methods: {
    parseRawData() {
      //This is me trying to copy an array
      //let country, Year, Population;
      let newData = [];
      let rawData = this.dataFromAPI[1];
      for (let i = 0; i < rawData.length; i++) {
        newData.push({
          country: rawData[i].country.value,
          date: rawData[i].date,
          population: rawData[i].value
        });
      }
      this.dataParsed = newData;
    },
    clearClick() {
      // Clearing any clicked rows
      const rowsArray = document.querySelectorAll("#mainTableBody tr");
      for (let i = 0; i < rowsArray.length; i++) {
        rowsArray[i].setAttribute("data-clicked", false);
      }
    },
    select(row, event) {
      this.clearClick();
      this.selectedRow = row;
      let target = event.currentTarget;
      target.setAttribute("data-clicked", true);
    },
    sort: function(s) {
      if (this.fetchFinish) {
        //if s == current sort, reverse
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
        }
      }
      this.currentSort = s;
    },
    nextPage() {
      if (this.currentPage <= this.totalPages) {
        this.clearClick();
        this.currentPage++;
        this.nextPageNr = this.currentPage;
        this.apiCallAddress_newCall =
          this.apiCallAddress_base + "&page=" + this.nextPageNr;
        this.getNewData(this.apiCallAddress_newCall);
      } else {
        console.log("you are at the far end");
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.clearClick();
        this.currentPage--;
        this.prevPageNr = this.currentPage;
        this.apiCallAddress_newCall =
          this.apiCallAddress_base + "&page=" + this.prevPageNr;
        this.getNewData(this.apiCallAddress_newCall);
      } else {
        console.log("you are at the low end");
      }
    },
    showAllRows() {
      // showing all the data or loding the first page
      this.clearClick();
      if (!this.showAllRecordsFlag) {
        this.apiCallAddress_newCall =
          this.apiCallAddress_base.slice(0, -2) +
          +this.dataFromAPI_status_data.total;
        this.getNewData(this.apiCallAddress_newCall);
        this.showAllRecordsFlag = true;
      } else {
        this.getNewData(this.apiCallAddress_base);
        this.showAllRecordsFlag = false;
      }
    },
    getNewData(url) {
      axios
        .get(url)
        .then(response => (this.dataFromAPI = response.data))
        .then(this.parseRawData);
    }
  },
  computed: {
    getDataFromAPI_rows() {
      return this.dataFromAPI[1];
    },
    dataFromAPI_status_data() {
      if (this.dataFromAPI[0] != null) {
        return this.dataFromAPI[0];
      } else return 0;
    },
    totalRecords() {},
    sortedData: function() {
      if (this.dataParsed != null) {
        return this.dataParsed.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === "desc") modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
      }
      return 0;
    }
  },
  created() {
    axios
      .get(this.apiCallAddress_base)
      .then(response => (this.dataFromAPI = response.data))
      .then(this.parseRawData)
      .then((this.fetchFinish = true))
      .catch(error => {
        console.log(error.response);
      });
  }
};
</script>

<style lang="css" scoped>
.bg-gray {
  background-color: rgb(223, 223, 223);
}
#mainApiDataTable th {
  cursor: pointer;
}
#mainTableBody tr {
  cursor: pointer;
}

tr[data-clicked="true"] {
  background: darkblue !important;
  color: rgb(247, 204, 125) !important ;
  font-weight: 600;
}
</style>