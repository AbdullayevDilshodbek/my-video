<template>
    <div>
      <v-toolbar class="mb-2" dense flat>
      <v-toolbar-title style="color: black;">{{title}}</v-toolbar-title>
      <v-spacer/>
      <v-btn color="success" @click="dialogData.dialog = !dialogData.dialog">
        <v-icon>mdi-plus-circle</v-icon>
        Qo'shish
      </v-btn>
    </v-toolbar>
        <addDialog :data.sync="dialogData" @reloaduser='getUsers'/>
        <v-data-table
                dense
                :headers="headers"
                :items="userList"
                class="mt-1"
                hide-default-footer
        >
        <template v-slot:item.password="{item}">
                        {{reverse(item.username)}}
        </template>
        </v-data-table>
        <Paginate store="user" collection="userList" method="uploadUsers"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Paginate from "../../components/Paginate.vue";
    import addDialog from "../../components/user/addDialog.vue";

    export default {
        name: 'user',
        components: {Paginate,addDialog},
        data() {
            return {
                title: 'Foydalanuvchilar',
                dialogData: {
                    title: 'Qo\'shish',
                    dialog: false,
                    user: {}
                },
                headers: [
                    {
                        text: 'ID',
                        divider: true,
                        value: 'id',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Login',
                        divider: true,
                        value: 'username',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Password',
                        divider: true,
                        value: 'password',
                        class: 'green lighten-2'
                    },
                    {
                        text: "Amallar",
                        divider: true,
                        value: "actions",
                        class: "green lighten-2",

                    },
                ]
            }
        },
        created() {
            this.getUsers()
        },
        computed: {
            ...mapGetters({
                userList: 'user/getUsers',
                getCurrentPage: 'user/getCurrentPage'
            })
        },
        methods: {
            async getUsers() {
                console.log('hello');
                try {
                    await this.$store.dispatch('user/uploadUsers', {
                        url: "/users?page=",
                        method: "get",
                        pageNumber: this.getCurrentPage,
                        body: {},
                    });
                } catch (error) {
                    this.$toast.error(error)
                }
            },
            reverse(s){
                let starts = '*'
                s.split("").map(() => starts = starts + '*');
                return starts
}
        }
    }
</script>

<style>

</style>