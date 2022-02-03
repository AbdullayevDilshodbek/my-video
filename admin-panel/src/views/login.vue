<template>
  <div class="tmp">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="4">
          <v-card
            style="margin-top: 30vh"
            class="mx-auto display-1 rounded-xl"
            width="400"
            elevation="24"
          >
            <v-card-title class="justify-center" elevation="24">
              <v-icon>mdi-angularjs</v-icon>
              <v-icon>mdi-alpha-d-circle-outline</v-icon>
              <v-icon>mdi-alpha-m-circle-outline</v-icon>
              <v-icon>mdi-alpha-i-circle-outline</v-icon>
              <v-icon>mdi-alpha-n-circle-outline</v-icon>
            </v-card-title>
            <v-card-text>
              <v-form @keyup.native.enter="login">
                <v-text-field
                  v-model="user.username"
                  autofocus
                  prepend-inner-icon="mdi-account"
                  label="Login"
                  rounded
                  outlined
                  dense
                >don</v-text-field>
                <v-text-field
                  v-model="user.password"
                  @click:append="show_password"
                  rounded
                  prepend-inner-icon="mdi-lock"
                  :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="eye ? 'text' : 'password'"
                  label="Password"
                  outlined
                  dense
                >123</v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-btn
                type="submit"
                color="success"
                @click="login"
                @keyup.enter="login"
                >Kirish</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      eye: false,
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    show_password() {
      this.eye = !this.eye;
    },
    async login() {
      try {
        await this.$store.dispatch("auth/login", this.user);
        this.$router.push("/")
      } catch (error) {
        this.$toast.error('Login yoki parol xato')
      }
    },
  },
};
</script>

<style>
.tmp {
  background-image: url(./../assets/login.jpg);
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}
.mx-auto {
  opacity: 1;
}
</style>
