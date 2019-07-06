<template lang="pug">
div 
  h2.title Location Information
  section.form
    b-field( label="Department Full Name")
      b-input( :value="$props.dept_name_long" )
      
    b-field( label="Department Short Name")
      b-input( :value="$props.dept_name_short" )
  
</template>
<script>
export default {
  props:{
    loc_dist : String,
    loc_subdist : String
  }
}
</script>
