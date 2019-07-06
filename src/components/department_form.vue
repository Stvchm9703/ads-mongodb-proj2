<template lang="pug">
div 
  h1.title Department Information
  section.form
    b-field( label="Department ID")
      b-input( :value="$props.dept_id" )
    
    b-field( label="Department Full Name")
      b-input( :value="$props.dept_name_long" )
      
    b-field( label="Department Short Name")
      b-input( :value="$props.dept_name_short" )
  
</template>
<script>
export default {
  props:{
    dept_id : String,
    dept_name_long : String,
    dept_name_short: String,
  }
}
</script>
