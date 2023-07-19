<template>
  <div class="table-container">
    <div class="universal-search">
      <input
        type="text"
        v-model="universalSearch"
        placeholder="Search"
        @input="applyFilters"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>
            Name

            <div class="option-tooltip" v-show="showOptions.name">
              <ul>
                <li v-for="option in options.name" :key="option">
                  <label>
                    <input
                      type="checkbox"
                      v-model="filters.name"
                      :value="option"
                      @change="applyFilters"
                    />
                    {{ option }}
                  </label>
                </li>
              </ul>
            </div>
            <button class="option-toggle" @click="toggleOptions('name')">
              {{ showOptions.name ? "Hide" : "Show" }} Options
            </button>
          </th>
          <th>
            Age
            <div class="option-tooltip" v-show="showOptions.age">
              <ul>
                <li v-for="option in options.age" :key="option">
                  <label>
                    <input
                      type="checkbox"
                      v-model="filters.age"
                      :value="option"
                      @change="applyFilters"
                    />
                    {{ option }}
                  </label>
                </li>
              </ul>
            </div>
            <button class="option-toggle" @click="toggleOptions('age')">
              {{ showOptions.age ? "Hide" : "Show" }} Options
            </button>
          </th>
          <th>
            Email
            <div class="option-tooltip" v-show="showOptions.email">
              <ul>
                <li v-for="option in options.email" :key="option">
                  <label>
                    <input
                      type="checkbox"
                      v-model="filters.email"
                      :value="option"
                      @change="applyFilters"
                    />
                    {{ option }}
                  </label>
                </li>
              </ul>
            </div>
            <button class="option-toggle" @click="toggleOptions('email')">
              {{ showOptions.email ? "Hide" : "Show" }} Options
            </button>
          </th>
          <th>
            Country
            <div class="option-tooltip" v-show="showOptions.country">
              <ul>
                <li v-for="option in options.country" :key="option">
                  <label>
                    <input
                      type="checkbox"
                      v-model="filters.country"
                      :value="option"
                      @change="applyFilters"
                    />
                    {{ option }}
                  </label>
                </li>
              </ul>
            </div>
            <button class="option-toggle" @click="toggleOptions('country')">
              {{ showOptions.country ? "Hide" : "Show" }} Options
            </button>
          </th>
          <th>
            Responses
            <button class="sort-toggle" @click="sortTable('response')">
              {{
                currentColumn === "response"
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : ""
              }}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.country }}</td>
          <td
            :style="{
              backgroundColor: item.response === 'Yes' ? 'green' : 'red',
            }"
          >
            {{ item.response }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOptions: {
        name: false,
        age: false,
        email: false,
        country: false,
      },
      currentColumn: "",
      sortDirection: "",
      filters: {
        name: [],
        age: [],
        email: [],
        country: [],
      },
      options: {
        name: [],
        age: [],
        email: [],
        country: [],
      },
      universalSearch: "",
      dummyData: [
        {
          id: 1,
          name: "John Doe",
          age: 25,
          email: "john@example.com",
          country: "USA",
          response: "No",
        },
        {
          id: 2,
          name: "Alice Smith",
          age: 30,
          email: "alice@example.com",
          country: "Canada",
          response: "No",
        },
        {
          id: 3,
          name: "Bob Johnson",
          age: 22,
          email: "bob@example.com",
          country: "UK",
          response: "No",
        },
        {
          id: 4,
          name: "Emma Lee",
          age: 28,
          email: "emma@example.com",
          country: "Australia",
          response: "Yes",
        },
        {
          id: 5,
          name: "Michael Wang",
          age: 27,
          email: "michael@example.com",
          country: "China",
          response: "No",
        },
        {
          id: 6,
          name: "Sophia Kim",
          age: 29,
          email: "sophia@example.com",
          country: "South Korea",
          response: "No",
        },
        {
          id: 7,
          name: "William Tan",
          age: 24,
          email: "william@example.com",
          country: "Singapore",
          response: "Yes",
        },
        {
          id: 8,
          name: "Olivia Garcia",
          age: 26,
          email: "olivia@example.com",
          country: "Spain",
          response: "Yes",
        },
        {
          id: 9,
          name: "Noah Martinez",
          age: 23,
          email: "noah@example.com",
          country: "Mexico",
          response: "No",
        },
        {
          id: 10,
          name: "Isabella john",
          age: 31,
          email: "isabella@example.com",
          country: "Vietnam",
          response: "Yes",
        },
      ],
    };
  },
  created() {
    this.extractOptions();
  },
  computed: {
    filteredData() {
      let filteredData = this.dummyData.slice();
      Object.keys(this.filters).forEach((column) => {
        if (this.filters[column].length > 0) {
          filteredData = filteredData.filter((item) =>
            this.filters[column].includes(item[column])
          );
        }
      });

      if (this.universalSearch) {
        const searchQuery = this.universalSearch.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchQuery)
          )
        );
      }
      if (this.currentColumn && this.currentColumn !== "response") {
        filteredData.sort((a, b) => {
          if (
            this.currentColumn === "name" ||
            this.currentColumn === "email" ||
            this.currentColumn === "country"
          ) {
            return a[this.currentColumn].localeCompare(b[this.currentColumn]);
          } else if (this.currentColumn === "age") {
            return a[this.currentColumn] - b[this.currentColumn];
          }
          return 0;
        });
        if (this.sortDirection === "desc") {
          filteredData.reverse();
        }
      } else if (this.currentColumn === "response") {
        filteredData.sort((a, b) => {
          return a.response.localeCompare(b.response);
        });
      }
      return filteredData;
    },
  },
  methods: {
    extractOptions() {
      Object.keys(this.filters).forEach((column) => {
        const uniqueOptions = [
          ...new Set(this.dummyData.map((item) => item[column])),
        ];
        this.options[column] = uniqueOptions;
      });
    },
    toggleOptions(column) {
      this.showOptions[column] = !this.showOptions[column];
    },
    sortTable(column) {
      if (this.currentColumn === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.currentColumn = column;
        this.sortDirection = "asc";
      }
    },
    applyFilters() {
      this.extractOptions();
    },
  },
};
</script>

<style>
.table-container {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
  cursor: pointer;
}

.option-toggle {
  margin-left: 8px;
}

.option-tooltip {
  position: relative;
  display: inline-block;
  margin-top: 4px;
}

.option-tooltip ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 0;
  width: 200px;
}

.option-tooltip li {
  padding: 8px;
  cursor: pointer;
}

.option-tooltip li:hover {
  background-color: #f2f2f2;
}

.sort-toggle {
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
