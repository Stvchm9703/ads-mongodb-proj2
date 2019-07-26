<template lang="pug">
div 
  h2.title Location Information
  section.form
    b-field( label="Location Distuct")
      b-input( :value="$props.loc_dist" )
      
    b-field( label="Department Short Name")
      b-input( :value="$props.dept_name_short" )

    b-field( label="")
      b-input(:value="")


</template>
<script>
export default {
  props:{
    loc_dist : {
      type: String,
      default: "Hong Kong"
    },
    loc_subdist :{
      type:String,
      default : "",
    } 
  }
}
</script>
