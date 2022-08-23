<template>
   <Navbar :pageTitle="pageTitle" :pageLink="pageLink"/>
   <div class="tasks__wrapper">
     <router-link class="tasks__link" :to="'/newtask'">Add New Task</router-link>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    components: { Navbar },
    data() {
        return {
            pageTitle: "Dashboard",
            pageLink: "Log out",        
        };
    },
}
</script>

<style>

</style>