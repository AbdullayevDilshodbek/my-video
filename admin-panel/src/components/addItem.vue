<template>
    <div>
      <v-toolbar class="mb-2" dense flat>
      <v-toolbar-title style="color: black;">{{data.title}}</v-toolbar-title>
      <v-spacer/>
      <v-btn color="success" @click="addItem">
        <v-icon>mdi-plus-circle</v-icon>
        Qo'shish
      </v-btn>
    </v-toolbar>
    </div>
</template>

<script>
    export default {
        name: 'addItem',
        props: ['data']
    }
</script>

<style lang="scss" scoped>

</style>