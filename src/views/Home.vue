<template>
  <v-data-table :headers="headers" :items="residences" class="elevation-1">
    <template slot-scope="{ item }">
      <td>{{ item.title }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "Título" }
    ],
    residences: []
  }),
  methods: {
    async load() {
      this.residences = (await this.$http.get('http://localhost:9090/residence')).data
    }
  },
  mounted() {
    this.load()
  }
};
</script>
