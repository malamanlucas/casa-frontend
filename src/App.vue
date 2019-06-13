<template>
  <v-app class="grey lighten-4">
    <v-content>
      <router-view></router-view>
    </v-content>
    <div>
      {{ env }}
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    env: process.env.VUE_APP_ENV
  })
}
</script>
