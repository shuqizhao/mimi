<template>
    <home v-if="isLogin"></home>
    <login v-else></login>
</template>

<script>

const Home = r =>
  require.ensure([], () => r(require("../components/home.vue")), "home");

const Login = r =>
  require.ensure([], () => r(require("../components/login.vue")), "login");
export default {
//   props: ["isLogin"],
  data() {
    return {
        isLogin:true
    };
  },
  mounted: function() {},
  components: {
    home: Home,
    login: Login
  }
};
</script>

<style>

</style>
