<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th @click="sortTable('name')">
            Name
            <span v-if="currentColumn === 'name'">
              {{ sortDirection === "asc" ? "↑" : "↓" }}</span
            >
          </th>
          <th @click="sortTable('age')">
            Age
            <span v-if="currentColumn === 'age'">{{
              sortDirection === "asc" ? "↑" : "↓"
            }}</span>
          </th>
          <th @click="sortTable('email')">
            Email
            <span v-if="currentColumn === 'email'">{{
              sortDirection === "asc" ? "↑" : "↓"
            }}</span>
          </th>
          <th @click="sortTable('country')">
            Country
            <span v-if="currentColumn === 'country'">{{
              sortDirection === "asc" ? "↑" : "↓"
            }}</span>
          </th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedData" :key="item.id">
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
      currentColumn: "",
      sortDirection: "",
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
          name: "Isabella Nguyen",
          age: 31,
          email: "isabella@example.com",
          country: "Vietnam",
          response: "Yes",
        },
      ],
    };
  },
  computed: {
    sortedData() {
      const sortedData = this.dummyData.slice();
      if (this.currentColumn && this.currentColumn !== "response") {
        sortedData.sort((a, b) => {
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
      }
      return this.sortDirection === "desc" ? sortedData.reverse() : sortedData;
    },
  },
  methods: {
    sortTable(column) {
      if (column !== "response") {
        if (this.currentColumn === column) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.currentColumn = column;
          this.sortDirection = "asc";
        }
      }
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
</style>
