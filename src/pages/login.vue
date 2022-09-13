<template>
  <div class="wrapper-auth">
    <h2 class="title-main title-main--auth">Log in</h2>
    <form class="form-auth" @submit.prevent="submit">
      <fieldset class="form-auth__fieldset">
        <input
          class="form-auth__element"
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <p class="messages__form-auth error" v-if="msgForm.email">
          {{ msgForm.email }}
        </p>
      </fieldset>
      <fieldset class="form-auth__fieldset">
        <input
          v-model="password"
          class="form-auth__element"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <p class="messages__form-auth error" v-if="msgForm.password">
          {{ msgForm.password }}
        </p>
      </fieldset>

      <button class="button-auth__form" type="submit">Submit</button>
    </form>
    <div v-if="msgErrors.length > 0" class="messages-bbdd error">
      {{ msgErrors[0].message }}
    </div>
    <router-link class="link-auth" :to="'/register/'"
      >Click to Register</router-link
    >
  </div>
  <div class="wrapper-auth">
    <div class="button-exp__group">
      <button
        @click="setTheme('forest')"
        class="button-exp forest"
        id="forest"
        type="text"
      >
        Forest
      </button>
      <button
        @click="setTheme('ocean')"
        class="button-exp ocean"
        id="ocean"
        type="text"
      >
        Ocean
      </button>
      <button
        @click="setTheme('spring')"
        class="button-exp spring"
        id="spring"
        type="text"
      >
        Spring
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../store/user.js";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      email: "",
      password: "",
      msgForm: [],
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
    };
  },
  watch: {
    email(value) {
      this.validateEmail(value);
    },
    password(value) {
      this.validatePassword(value);
    },
  },
  methods: {
    setTheme(theme) {
      const el = document.getElementsByTagName("html")[0];
      el.classList.replace(el.classList, theme);
    },
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msgForm["email"] = "";
      } else {
        this.msgForm["email"] = "Invalid Email rules";
      }
    },
    validatePassword(value) {
      if (/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])\S{8,64}$/.test(value)) {
        this.msgForm["password"] = "";
      } else {
        this.msgForm["password"] = "Invalid Password rules";
      }
    },
    async submit() {
      if (this.password && this.email) {
        try {
          await this.userStore.signIn(this.email, this.password);
          this.router.push({ path: "/dashboard" });
        } catch (e) {
          this.msgErrors.push(e);
        }
      }
    },
  },
};
</script>

<style>
</style>