<template>
<section class="main__wrapper">
    <router-view class="app-main" />
    <img class="main__wrapper-decoration" src="./assets/vue.svg" alt=""/>
</section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user.js";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/" });
    } else {
      // continue to dashboard
      router.push({ path: "/dashboard" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
