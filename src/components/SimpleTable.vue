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
        <v-data-table
          :headers="headers"
          :items="filteredDesserts"
          :search="search"
          :options.sync="paginationOptions"
          :server-items-length="totalData"
          :footer-props="{
            'items-per-page-options': [5, 10, 15],
          }"
          fixed-header
          :height="550"
          :loading="tableLoading"
          loading-text="Loading...Please wait"
          :custom-filter="filterTable"
        >
          <template
            v-for="(header, index) in headers"
            v-slot:[`header.${header.value}`]
          >
            <div :key="index">
              <p class="header-text">{{ header.text }}</p>
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
                    clearable
                  >
                    <template v-slot:prepend-item>
                      <v-list-item @click="resetFilter(header.value)">
                        <v-list-item-action>
                          <v-icon>mdi-refresh</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>Reset</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-select>
                  <v-select v-else @click="resetFilter(header.value)"
                    >Reset</v-select
                  >
                </v-col>
              </v-row>
            </div>
          </template>

          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ item.fat }}</td>
              <td>{{ item.carbs }}</td>
              <td>{{ item.protein }}</td>
              <td :class="getResponseClass(item.response)">
                {{ item.response }}
              </td>
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
        { text: "Response", value: "response" },
      ],
      desserts: dessertsData,
      filterOptions: {},
      filterValues: {},
      paginationOptions: {},
      // totalData: 0,
      // tableLoading: false
    };
  },
  computed: {
    filteredDesserts() {
      const filters = this.filterValues;
      return this.desserts.filter((dessert) => {
        return (
          (filters.name.length === 0 ||
            filters.name.includes(dessert.name.toString())) &&
          (filters.calories.length === 0 ||
            filters.calories.includes(dessert.calories.toString())) &&
          (filters.fat.length === 0 ||
            filters.fat.includes(dessert.fat.toString())) &&
          (filters.carbs.length === 0 ||
            filters.carbs.includes(dessert.carbs.toString())) &&
          (filters.protein.length === 0 ||
            filters.protein.includes(dessert.protein.toString())) &&
          (filters.response.length === 0 ||
            filters.response.includes(dessert.response.toString()))
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
    getResponseClass(response) {
      return response === "Yes" ? "response-yes" : "response-no";
    },
  },
};
</script>

<style scoped>
:deep .header-text {
  margin-bottom: 0px !important;
}

.response-yes {
  background-color: green;
  color: white;
}

.response-no {
  background-color: red;
  color: white;
}
</style>
