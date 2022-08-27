<template>
  <Navbar :pageTitle="pageTitle" :pageLink="pageLink" />
  <section class="wrapper__tasks">
    <router-link class="tasks__link" :to="'/newtask'">Add New Task</router-link>

    <article class="wrapper-paper wrapper__tasks-status isUncomplete">
      <h3 class="main__subtitle">TOdo Tasks</h3>
      <Task
        v-for="task in tasksList.filter((x) => x.is_complete === false)"
        :title="task.title"
        :key="task.id"
      />
    </article>

    <article class="wrapper-paper wrapper__tasks-status isComplete">
      <h3 class="main__subtitle">Done Tasks</h3>
      <Task
        v-for="task in tasksList.filter((x) => x.is_complete === true)"
        :title="task.title"
        :key="task.id"
      />
    </article>
  </section>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Task from "../components/Task.vue";

import { useUserStore } from "../store/user.js";
import { useTaskStore } from "../store/task.js";
import { useRouter } from "vue-router";

export default {
  components: { Navbar, Task },
  data() {
    return {
      pageTitle: "Dashboard",
      pageLink: "Log out",
      msgErrors: [],
      router: useRouter(),
      userStore: useUserStore(),
      taskStore: useTaskStore(),
      tasksList: [],
    };
  },
  methods: {
    async getTasks() {
      try {
        await this.taskStore.fetchTasks();
        this.tasksList = this.taskStore.tasks;
      } catch (e) {
        //errorMsg.value = e.message;
      }
    },
  },
  mounted: function () {
    this.getTasks();
  },
};
</script>

<style>
</style>