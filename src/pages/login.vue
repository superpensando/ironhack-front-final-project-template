<template>
  <div class="auth__wrapper">
    <h2 class="main__title">Log in</h2>
    <form class="auth__form">
      <input class="auth__form-element form-email" type="email" name="email" id="email" placeholder="Email" />
      <input class="auth__form-element form-password" type="password" name="password" id="password"
        placeholder="Password" />
      <button class="auth__form-button" type="button">Submit</button>
    </form>
    <router-link class="auth__link" :to="'/Register/'">Click to Register</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>