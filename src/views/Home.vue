<template>
  <div>
    <v-card-title>
      Residence System feio para glória de Deus!
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table
      :search="search"
      :expand="true"
      :headers="headers"
      :items="residences"
      item-key="id"
      class="elevation-1"
    >
      <!-- <template #headers="{ headers }">
        <tr>
          <th
            v-for="header in headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template> -->

      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">Nenhuma residência cadastrada no banco</v-alert>
      </template>

      <template #items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.address.district }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.address.addressFully }}, {{ props.item.address.zipCode | cep }}</td>
          <!-- <td>{{ props.item.monthPrice.value | currency }}</td>
        <td>{{ props.item.monthPrice.condominium | currency }}</td>
          <td>{{ props.item.monthPrice.iptu | currency }}</td>-->
          <td>{{ props.item.monthPrice.totalAmount | currency }}</td>
        </tr>
      </template>

      <template #expand="{ item }">
        <v-container>
          <v-layout row wrap justify-start>
            <v-flex xs4>
              <span class>Preço</span>
              : {{ item.monthPrice.value | currency }}
            </v-flex>
            <v-flex xs4>
              <span class>Condomínio</span>
              : {{ item.monthPrice.condominium | currency }}
            </v-flex>
            <v-flex xs4>
              <span class>Iptu</span>
              : {{ item.monthPrice.iptu | currency }}
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex row wrap justiy-center>
              <v-btn block :href="item.link" target="_blank">VER IMÓVEL NO FORNECEDOR</v-btn>
              {{ item.link }}
            </v-flex>
          </v-layout>
        </v-container>
        <!-- <v-card flat> -->
        <!-- <v-card-text>qwehqwuhewqhueqwhu</v-card-text> -->
        <!-- </v-card> -->
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      sortBy: ""
    },
    search: "",
    expand: false,
    headers: [
      { text: "Bairro", value: "address.district" },
      { text: "Título", value: "title" },
      { text: "Endereço", value: "street" },
      // { text: "Preço", value: "monthPrice.value" },
      // { text: "Condomínio", value: "monthPrice.condominium" },
      // { text: "IPTU", value: "monthPrice.iptu" },
      { text: "Total (preço + cond)", value: "monthPrice.totalAmount" }
    ],
    residences: []
  }),
  methods: {
    async load() {
      const response = await this.$axios.get("/residence");
      this.residences = response.data;
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  },
  mounted() {
    this.load();
  }
};
</script>
