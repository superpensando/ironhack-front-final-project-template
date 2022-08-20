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
        <p class="auth__form-messages error" v-if="msgForm.confirmPassword">
          {{ msgForm.confirmPassword }}
        </p>
      </fieldset>

      <button class="auth__form-button" type="submit">Submit</button>
    </form>
    <div v-if="msgErrors.length>0" class="bbdd__messages error">
      {{ msgErrors[0].message }} <br/> {{ msgErrors[0].status }}
    </div>

    <router-link class="auth__link" :to="'/'">Click to LogIn</router-link>
  </div>
  <div class="auth__wrapper">
        <div v-if="msgInfo.length>0">
         <h3 class="main__subtitle"> {{ msgInfo[0].title}}</h3>
         <p>{{ msgInfo[0].body}}</p>
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
      confirmPassword: "",
      msgErrors:[],
      msgInfo:[],
      msgForm: [],
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
    validateConfirmPassword(value) {
      if (this.password !== this.confirmPassword) {
        this.msgForm["confirmPassword"] = "The passwords are not equals";
      } else {
        this.msgForm["confirmPassword"] = "";
      }
    },
    async submit() {
      if (this.password && this.email && this.confirmPassword) {
        try {
          await this.userStore.signUp(
            this.email,
            this.password,
          );
          this.msgInfo.push({
             "title":'You have registered!',
             "body":'To complete the process, you will have received a confirmation email. Please accept the email.'
          });       
         setTimeout(() => {
              this.router.push({ path: "/" });
          }, 4000);
          
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