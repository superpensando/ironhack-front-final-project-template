<template>
  <div class="auth__wrapper">
    <h2 class="main__title">Register</h2>
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
        <p class="auth__form-msg" v-if="msg.email">{{ msg.email }}</p>
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
        <p class="auth__form-msg" v-if="msg.password">{{ msg.password }}</p>
      </fieldset>
      <fieldset class="auth__fieldset">
        <input
          v-model="confirmPassword"
          class="auth__form-element form-password"
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          placeholder="Confirm Password"
          required
        />
        <p class="auth__form-msg" v-if="msg.confirmPassword">
          {{ msg.confirmPassword }}
        </p>
      </fieldset>

      <button class="auth__form-button" type="submit">Submit</button>
    </form>
    <router-link class="auth__link" :to="'/auth/'">Click to LogIn</router-link>
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
      confirmPassword: "",
      msg: [],
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
    confirmPassword(value) {
      this.validateConfirmPassword(value);
    },
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },
    validatePassword(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg["password"] =
          "Must be 8 characters! " + difference + " characters left";
      } else {
        this.msg["password"] = "";
      }
    },
    validateConfirmPassword(value) {
      if (this.password !== this.confirmPassword) {
        this.msg["confirmPassword"] = "The passwords are not equals";
      } else {
        this.msg["confirmPassword"] = "";
      }
    },
    async submit() {
      if (this.password && this.email && this.confirmPassword) {
        try {
          await this.userStore.signUp(
            this.email,
            this.password,
          );
          router.push({ path: "/auth" });
        } catch (e) {
          console.log("error SignUp");
        }
      }
    },
  },
};
</script>

<style>
</style>