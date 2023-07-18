<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dummyData" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.country }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dummyData: [
        { id: 1, name: 'John Doe', age: 25, email: 'john@example.com', country: 'USA' },
        { id: 2, name: 'Alice Smith', age: 30, email: 'alice@example.com', country: 'Canada' },
        { id: 3, name: 'Bob Johnson', age: 22, email: 'bob@example.com', country: 'UK' },
        { id: 4, name: 'Emma Lee', age: 28, email: 'emma@example.com', country: 'Australia' },
        { id: 5, name: 'Michael Wang', age: 27, email: 'michael@example.com', country: 'China' },
        { id: 6, name: 'Sophia Kim', age: 29, email: 'sophia@example.com', country: 'South Korea' },
        { id: 7, name: 'William Tan', age: 24, email: 'william@example.com', country: 'Singapore' },
        { id: 8, name: 'Olivia Garcia', age: 26, email: 'olivia@example.com', country: 'Spain' },
        { id: 9, name: 'Noah Martinez', age: 23, email: 'noah@example.com', country: 'Mexico' },
        { id: 10, name: 'Isabella Nguyen', age: 31, email: 'isabella@example.com', country: 'Vietnam' },
      ],
    };
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

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
}
</style>
