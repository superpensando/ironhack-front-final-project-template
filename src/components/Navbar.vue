<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <h2 class="main__title">Dashboard</h2>
      </li>
      <li class="navbar__item">
        <button class="navbar__link" type="button" @click="signOut">
          Log out
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useUserStore } from "../store/user.js";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
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

