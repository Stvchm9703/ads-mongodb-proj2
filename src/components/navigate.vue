<template lang="pug">
.menu
  ul.menu-list
    li
      router-link(
        to="/departments" 
        :class="{'is-active': $route.path == '/departments'} "
      ).menu-label Department
      ul 
        router-link(
          to="/departments/create"
          :class="{ 'is-active': $route.path == '/departments/create' } "
        ) Create Department

  p.menu-label Administration
  ul.menu-list
    li Team Settings
    li
      a.is-active Manage Your Team
      ul
        li Members
        li Plugins
        li Add a member

    li Invitations
    li Cloud Storage Environment Settings
    li Authentication

</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.menu{
  margin-left: 0.25rem;
}
</style>
