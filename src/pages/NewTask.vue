<template>
 <Navbar :pageTitle="pageTitle" :pageLink="pageLink"/>
  <div class="newtasks__wrapper">

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    components: { Navbar },
    data() {
        return {
            pageTitle: "New Task",
            pageLink:"Back",        
        };
    },
}

</script>

<style>

</style>