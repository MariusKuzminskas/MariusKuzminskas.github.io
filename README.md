# Api table sort assignement

This is my implementation on getting data from API and procesisng it.

#### Tasks to be complete were

- Use any public API or make own to load JSON with 5000+ records

I used "http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=1990:2010/&format=json/&per_page=25" here is the documentation for it [LINK](https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures)

- Use vanilla js or any framework you like to implement data representation table (at least 3 columns)

I used Vue CLI ver3 to build up this project

- Click on any column header it should sort the table by particular column, next click should reverse order.

The data sorting works for the current batch of data rows

- Add pagination. Leave the possibility to see all records at once.

pagination is on top and bottom of the page it is the reapeated same component. The other component "titleBlockBetween.vue" holds the red buttom on the right and toggles view that shows all the tables.

- Output last clicked table cell data somewhere on the screen outside table. Change color of last clicked row.

The InfoBox component shows up to show what row was clicked. and you can dismiss it by clicking on it

- Have a strong concern about performance

I am taking only so much data as I need per one time. Raw data is filter out and make the object of objects that has only 3 shown parameters and is looped through.

- Commit source to a public repository (GitHub) and send the link
  [mariuskuzminskas.github.io](mariuskuzminskas.github.io)

- Would be nice to have a live demo online
  [mariuskuzminskas.github.io](mariuskuzminskas.github.io)

##### best regards Marius Kuzminskas

# api-data-sorter

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
