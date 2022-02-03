<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          link
          :to="link"
          active-class="active_class"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

        <v-main style="padding: 10px 25px 0px 25px;">
            <router-view/>
        </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      cards: ['Today', 'Yesterday'],
      drawer: true,
      links: [
        ['mdi-account-supervisor', 'Foydalanuvchilar', '/users'],
        ['mdi-send', 'Tavarlar','/products'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
    }),
    methods: {
      async getAllUsers(){
        await this.$store.dispatch('auth/fetchUserData')
      }
    },
    created(){
      
    },
    computed: {
      ...mapGetters({
        user: 'auth/getUser',
        rules: 'auth/getRules',
        users: 'auth/'
      })
    }
  }
</script>
<style>
    .active_class {
        margin-left: 5px;
        color: #13a555 !important;
    }
    .components {
        color: #007BFF;
    }
</style>