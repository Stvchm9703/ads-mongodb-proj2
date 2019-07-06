<template lang="pug">
  div#app.container
    p {{$route.path}}
    .columns
      navigate.column.is-3
      router-view.column.is-9
</template>


<script>
import navigate from '@/components/navigate.vue';
export default {
    components:{
      navigate
    },
    beforeDestroy() {
        this.$store.dispatch('onDestroy');
    }
};
</script>

