<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import addItem from "./components/addItem.vue";
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
