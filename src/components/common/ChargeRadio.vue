<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"
        >
          <v-avatar class="radio" :color="color" size="150">
            <v-img :src="src"></v-img>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row class="row" justify="center">
          <v-radio class="radio"></v-radio>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "ChargeRadio",
    props: {
      src: String,
      color: String
    },
    data(){
      return{

      }
    },
  }
</script>

<style lang="less" scoped>
  .row /deep/ .v-radio{
    margin-right: 0;
  }
  .radio /deep/ .v-input--selection-controls__input{
    margin-right: 0;
  }
</style>
