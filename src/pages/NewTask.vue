<template>
  <div class="wrapper__main-newTask">
    <Navbar :pageTitle="pageTitle" :pageLink="pageLink" />
    <div class="wrapper-paper">
      <form
        class="tasks__form tasks__form-newTask"
        @submit.prevent="submitTask"
      >
        <fieldset class="tasks__form-fieldset">
          <i class="tasks__form-element-icon fa-solid fa-quote-left"></i>
          <input
            v-model="taskTitle"
            class="tasks__form-element"
            type="text"
            name="taskTitle"
            id="taskTitle"
            placeholder="Task Title...."
            required
          />
        </fieldset>
        <button class="button-tasks__form" type="submit">Add</button>
      </form>
      <div v-if="msgErrors.length > 0" class="bbdd__messages error">
        {{ msgErrors[0].message }} <br />
        {{ msgErrors[0].status }}
      </div>
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