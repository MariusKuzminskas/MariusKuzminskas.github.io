<template>
  <div class="home container">
    <h1 class="display2">Api table sort assignement</h1>
    <p class="lead">This is my implementation on getting data from API and procesisng it.</p>
    <h4>Tasks to be complete were</h4>
    <ul class>
      <li>Use any public API or make own to load JSON with 5000+ records</li>
      <p>
        I used "http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=1990:2010/&format=json/&per_page=25"
        here is the documentation for it
        <a
          href="https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures"
        >LINK</a>
      </p>
      <li>Use vanilla js or any framework you like to implement data representation table (at least 3 columns)</li>
      <p>I used Vue CLI ver3 to build up this project</p>
      <li>Click on any column header it should sort the table by particular column, next click should reverse order.</li>
      <p>The data sorting works for the current batch of data rows</p>
      <li>Add pagination. Leave the possibility to see all records at once.</li>
      <p>
        pagination is on top and bottom of the page it is the reapeated same component. The other component "titleBlockBetween.vue"
        holds the red buttom on the right and toggles view that shows all the tables.
      </p>
      <li>Output last clicked table cell data somewhere on the screen outside table. Change color of last clicked row.</li>
      <p>The InfoBox component shows up to show what row was clicked. and you can dismiss it by clicking on it</p>
      <li>Have a strong concern about performance</li>
      <p>
        I am taking only so much data as I need per one time. Raw data is filter out and make the object of objects that has only 3 shown parameters
        and is looped through.
      </p>
      <li>Commit source to a public repository (GitHub) and send the link</li>
      <a href="mariuskuzminskas.github.io">mariuskuzminskas.github.io</a>
      <li>Would be nice to have a live demo online</li>
      <a href="mariuskuzminskas.github.io">mariuskuzminskas.github.io</a>
    </ul>
    <H5 class="mt-5 mb-3">best regards Marius Kuzminskas</H5>
  </div>
</template>

<script>
// @ is an alias to /src
import InfoBox from "@/components/InfoBox.vue";

export default {
  name: "home",

  components: {
    InfoBox
  }
};
</script>

<style lang="css" scoped>
.home {
  text-align: left;
}
li {
  font-weight: 600;
}
p {
  margin-bottom: 5px;
}
</style>
