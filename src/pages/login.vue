<template>
  <div class="auth__wrapper">
    <Title />
    <form class="auth__form">
      <input class="auth__form-element form-username" type="text" name="username" id="username" placeholder="Username" />
      <input class="auth__form-element form-password" type="password" name="password" id="password" placeholder="Password" />
      <button class="auth__form-button" type="button">Submit</button>
    </form>
  </div>
</template>

<script>
import Title from './../components/Title.vue';
export default {
  components: {
    Title,
  },
}
</script>

<style>
</style>