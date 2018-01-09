<template>
  <list :cfg="cfg"></list>
</template>
<script>
export default {
  data(){
      return {
          cfg:[{
            "id":1,
            "name":"zhangsan"
          }]
      }
  }
}
</script>