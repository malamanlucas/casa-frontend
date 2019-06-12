<template>
  <v-data-table :headers="headers" :items="residences" class="elevation-1">
    <template #items="{ item }">
      <td>{{ item.address.district }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.address.addressFully }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "Bairro", value: "address.district" },
      { text: "Título", value: "title" },
      { text: "Endereço", value: "street" },
      { text: "Preço Mensal", value: "title" },
      { text: "Condomínio", value: "title" },
      { text: "Total", value: "title" }
    ],
    residences: []
  }),
  methods: {
    async load() {
      this.residences = (await this.$axios.get('http://localhost:9090/residence')).data
    }
  },
  mounted() {
    this.load()
  }
};
</script>
