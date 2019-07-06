<template lang="pug">
  div#app.container
    .columns
      .column.is-3
        navigate
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

