<template lang="pug">
div
  .container
    .hero.is-primary.is-bold.is-12
      .hero-body
        .container
          h1.title Create Department 
          h2.subtitle 
    div(v-if="isReady==true")
      hr
      deptForm
      hr
      locForm
    
</template>

<script>
import deptForm from '@/components/department_form.vue';
import locForm from '@/components/location_form.vue';
export default {
  components:{
    deptForm , locForm
  },
  data:()=>({
    isReady : true
  })
}
</script>

<style>

</style>
