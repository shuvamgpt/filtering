<template>
    <div>
      <v-app>
        <v-card>
          <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-container>
            <v-row :key="header.value" v-for="header in headers">
              <v-col :key="header.value">
                <template v-if="header.value === 'name'">
                  {{ header.text }}
                </template>
                <template v-else>
                  <v-row align="center">
                    <v-col>
                      <v-select
                        v-if="filterOptions[header.value].length > 0"
                        v-model="filterValues[header.value]"
                        :items="filterOptions[header.value]"
                        label="Filter"
                        multiple
                        chips
                        small-chips
                      ></v-select>
                      <v-btn v-else @click="resetFilter(header.value)">Reset</v-btn>
                    </v-col>
                  </v-row>
                </template>
              </v-col>
            </v-row>
          </v-container>
          <v-data-table
            :headers="headers"
            :items="filteredDesserts"
            :search="search"
            :options.sync="paginationOptions"
            :server-items-length="totalData"
            :footer-props="{
                'items-per-page-options': [5, 10, 15],
            }"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
                <td>{{ item.fat }}</td>
                <td>{{ item.carbs }}</td>
                <td>{{ item.protein }}</td>
                <td>{{ item.iron }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-app>
    </div>
  </template>
  
  <script>
  import dessertsData from "./desserts.js";
  
  export default {
    name: "simpleTable",
    data() {
      return {
        search: "",
        headers: [
          { text: "Dessert (100g serving)", value: "name" },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" },
        ],
        desserts: dessertsData,
        filterOptions: {},
        filterValues: {},
        paginationOptions: {},
        totalData: 12
      };
      
    },
    computed: {
      filteredDesserts() {
        const filters = this.filterValues;
        return this.desserts.filter((dessert) => {
          return (
            (filters.name.length === 0 || filters.name.includes(dessert.name.toString())) &&
            (filters.calories.length === 0 || filters.calories.includes(dessert.calories.toString())) &&
            (filters.fat.length === 0 || filters.fat.includes(dessert.fat.toString())) &&
            (filters.carbs.length === 0 || filters.carbs.includes(dessert.carbs.toString())) &&
            (filters.protein.length === 0 || filters.protein.includes(dessert.protein.toString())) &&
            (filters.iron.length === 0 || filters.iron.includes(dessert.iron.toString()))
          );
        });
      },
    },
    created() {
      this.extractFilterOptions();
    },
    methods: {
      extractFilterOptions() {
        for (const header of this.headers) {
          const uniqueValues = Array.from(
            new Set(this.desserts.map((item) => item[header.value].toString()))
          );
          this.$set(this.filterOptions, header.value, uniqueValues);
          this.$set(this.filterValues, header.value, []);
        }
      },
      resetFilter(column) {
        this.filterValues[column] = [];
      },
    },
  };
  </script>
  
  <style scoped> </style>
  