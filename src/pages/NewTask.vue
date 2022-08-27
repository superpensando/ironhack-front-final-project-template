<template>
  <Navbar :pageTitle="pageTitle" :pageLink="pageLink" />
  <div class="newtask__wrapper">
    <form class="newtask__form" @submit.prevent="submitTask">
      <fieldset class="newtask__fieldset">
        <input
          v-model="taskTitle"
          class="newTask__form-element"
          type="text"
          name="taskTitle"
          id="taskTitle"
          placeholder="New Task Title"
          required
        />
      </fieldset>
      <button class="newTask__form-button" type="submit">Write task</button>
    </form>
    <div v-if="msgErrors.length > 0" class="bbdd__messages error">
      {{ msgErrors[0].message }} <br />
      {{ msgErrors[0].status }}
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { useUserStore } from "../store/user.js";
import { useTaskStore } from "../store/task.js";
import { useRouter } from "vue-router";

export default {
  components: { Navbar },
  data() {
    return {
      pageTitle: "New Task",
      pageLink: "Back",
      taskTitle: "",
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
      taskStore: useTaskStore(),
    };
  },
  methods: {
    async submitTask() {
      if (this.taskTitle) {
        try {
          await this.taskStore.newTask(this.taskTitle, this.userStore.user.id);
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