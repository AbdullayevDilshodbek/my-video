<template>
  <div>
    <v-dialog
      v-model="data.dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title style="background-color: #21b421; color: azure"
          >ADD</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="mt-2">
          <v-form @keyup.native.enter="updateData">
            <v-text-field
              v-model="data.user.username"
              label="Login"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="data.user.full_name"
              label="To`liq ism sharf"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="data.user.password"
              @click:append="eye = !eye"
              :type="eye ? 'password' : 'text'"
              :append-icon="eye ? 'mdi-eye-off' : 'mdi-eye'"
              label="Parol"
              placeholder="placeholder"
              outlined
              dense
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="success" @click="saveData">Saqlash</v-btn>
          <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "addDialog",
  props: ["data"],
  data() {
    return {
      eye: true,
    };
  },
  created() {
  },
  computed: {
            ...mapGetters('user', ['getCurrentPage']),
        },
  methods: {
    closeDialog() {
        this.$emit('update:data', {dialog:false,user:{username:"",full_name:"",password:""}})
        this.data.dialog = false;
    },
    async saveData() {
         try {
                await this.$store.dispatch('user/userAction', {
                        url: "/users?page=",
                        method: "post",
                        pageNumber: this.getCurrentPage,
                        body: data.user,
                    });
                  this.$toast.success('Success')
                  this.closeDialog()
                  this.$emit('reloaduser')
                } catch (error) {
                    this.$toast.error(error)
                }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>