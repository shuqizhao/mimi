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
      isLogin: this.getCookie(this.getGlobalData().LoginCookeName),
      isNeedWatch:false
    };
  },
  mounted: function() {
    this.watchLoginCookie();
    if(this.isLogin){
      this.isNeedWatch = true;
    }
  },
  methods: {
    watchLoginCookie: function() {
      var self = this;
      setInterval(function() {
        if (!self.getCookie(self.getGlobalData().LoginCookeName)&&self.isNeedWatch) {
            window.location.reload()
        }
      }, 100);
    }
  },
  components: {
    home: Home,
    login: Login
  }
};
</script>

<style>

</style>
