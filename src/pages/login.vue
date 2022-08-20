<template>
 <div class="auth__wrapper">
    <h2 class="main__title">Log in</h2>
    <form class="auth__form" @submit.prevent="submit">
      <fieldset class="auth__fieldset">
        <input
          class="auth__form-element form-email"
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <p class="auth__form-messages error" v-if="msgForm.email">{{ msgForm.email }}</p>
      </fieldset>
      <fieldset class="auth__fieldset">
        <input
          v-model="password"
          class="auth__form-element form-password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <p class="auth__form-messages error" v-if="msgForm.password">{{ msgForm.password }}</p>
      </fieldset>

      <button class="auth__form-button" type="submit">Submit</button>
    </form>
      <div v-if="msgErrors.length>0" class="bbdd__messages error">
      {{ msgErrors[0].message }} <br/> {{ msgErrors[0].status }}
    </div>
    <router-link class="auth__link" :to="'/register/'">Click to Register</router-link>
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
      msgErrors:[],
      router: useRouter(),
      userStore:useUserStore(),

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
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msgForm["email"] = "";
      } else {
        this.msgForm["email"] = "Invalid Email Address";
      }
    },
    validatePassword(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msgForm["password"] =
          "Must be 8 characters! " + difference + " characters left";
      } else {
        this.msgForm["password"] = "";
      }
    },
    async submit() {
     if (this.password && this.email) {
        try {
          await this.userStore.signIn(
            this.email,
            this.password,
          );
          this.router.push({ path: "/dashboard" }); 
        } catch (e) {
          this.msgErrors.push(e);
        }
      }
    },
  },

}
</script>

<style>
</style>