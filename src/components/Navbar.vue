<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <h2 class="main__title">{{ pageTitle }}</h2>
     </li>
      <li class="navbar__item">
        <button v-if="pageTitle == 'Dashboard'" class="navbar__link" type="button" @click="signOut">
          {{ pageLink }}
        </button>          
        <router-link v-if="pageTitle == 'New Task'" class="tasks__link" :to="'/dashboard'">Back</router-link>
      </li>
    </ul>
  </nav>
  <p class="main__user"> {{ this.userStore.user.email}} </p>  
</template>

<script>
import { useUserStore } from "../store/user.js";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  props: {
        pageTitle: String,
        pageLink: String,
  },
  data() {
    return {
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
    };
  },
  methods: {
    async signOut() {
        try {
          this.router.push({ path: "/" });
          this.userStore.signOut();
        } catch (e) {
          this.msgErrors.push(e);
          //console.log(this.msgErrors);
        }
    }
  }
};
</script>

