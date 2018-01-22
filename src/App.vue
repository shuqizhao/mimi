<template>
<div>
    <mimiApp v-show="show" :show='show'></mimiApp>
    <loading v-show="!show"></loading>   
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>

<style>

</style>
