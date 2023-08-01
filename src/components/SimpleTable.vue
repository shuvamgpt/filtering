<template>
  <div @click="handleClickOutside">
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
          :footer-props="{
            'items-per-page-options': [5, 10, 15],
          }"
          fixed-header
          :height="550"
          :loading="tableLoading"
          loading-text="Loading...Please wait"
        >
          <template
            v-for="(header, index) in headers"
            v-slot:[`header.${header.value}`]
          >
            <div :key="index">
              <p class="header-text">{{ header.text }}</p>
              <v-row align="center">
                <v-col>
                  <button
                    @click="
                      toggleFilter(header.value);
                      stopEvent($event);
                    "
                  >
                    Filter
                    <v-icon :class="{ 'rotate-icon': toggle[header.value] }">
                      mdi-chevron-down
                    </v-icon>
                  </button>
                  <div
                    class="filter-box-wrapper"
                    v-if="toggle[header.value]"
                    @click.stop
                  >
                    <div class="filter-box">
                      <div
                        v-for="option in filterOptions[header.value]"
                        :key="option"
                      >
                        <label>
                          <input
                            type="checkbox"
                            :value="option"
                            v-model="filterValues[header.value]"
                          />
                          {{ option }}
                        </label>
                      </div>
                      <div>
                        <button @click="resetFilter(header.value)">
                          Reset Filter
                        </button>
                      </div>
                    </div>
                  </div>
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
      toggle: {},
      totalData: 0,
      tableLoading: false,
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
        this.$set(this.toggle, header.value, false);
      }
    },
    resetFilter(column) {
      this.filterValues[column] = [];
    },
    toggleFilter(column) {
      for (const header of this.headers) {
        if (header.value !== column) {
          this.toggle[header.value] = false;
        }
      }
      this.toggle[column] = !this.toggle[column];
    },
    getResponseClass(response) {
      return response === "Yes" ? "response-yes" : "response-no";
    },
    stopEvent(event) {
      event.stopPropagation();
    },
    handleClickOutside(event) {
      const target = event.target;
      const filterBoxes = document.querySelectorAll(".filter-box-wrapper");
      let clickInsideFilterBox = false;
      for (const box of filterBoxes) {
        if (box.contains(target)) {
          clickInsideFilterBox = true;
          break;
        }
      }
      if (!clickInsideFilterBox) {
        for (const header of this.headers) {
          this.toggle[header.value] = false;
        }
      }
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

.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

.filter-box-wrapper {
  position: absolute;
  background-color: transparent;
}

.filter-box {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  padding: 10px;
  z-index: 1;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  max-height: 150px;
  overflow-y: auto;
}

.show-filter {
  display: block;
}
</style>
