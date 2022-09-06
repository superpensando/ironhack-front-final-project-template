<template>
  <Navbar :pageTitle="pageTitle" :pageLink="pageLink" />
  <section class="wrapper__tasks">
    <article class="wrapper-paper wrapper__tasks-status isUncomplete">
      <img class="wrapper-paper-pin" src="./../assets/img/pin.png" alt="" />
      <h3 class="main__subtitle">
        <span>TODO!</span>
        <router-link class="tasks__link" :to="'/newtask'">
          New Task!
        </router-link>
      </h3>
      <Task
        v-for="task in tasksList.filter((x) => x.is_complete === false)"
        :title="task.title"
        :idTask="task.id"
        :isComplete="true"
        :key="task.id" 
        @updateStatusTask="handleChildUpdateStatusTask"  
        @deleteTask="handleChildDeleteTask" 
        @editTask="handleChildEditTask"
      />
    </article>

    <article class="wrapper-paper wrapper__tasks-status isComplete">
      <img class="wrapper-paper-pin" src="./../assets/img/pin.png" alt="" />
      <h3 class="main__subtitle">DONE!</h3>
      <Task
        v-for="task in tasksList.filter((x) => x.is_complete === true)"
        :title="task.title"
        :idTask="task.id"
        :isComplete="false"
        :key="task.id"
        @updateStatusTask="handleChildUpdateStatusTask" 
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
      pageTitle: "My Tasks",
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
        //console.log(this.taskStore.tasks);
      } catch (e) {
        //errorMsg.value = e.message;
      }
    },
    handleChildUpdateStatusTask(){
      this.getTasks();
    },
    handleChildEditTask(){
      this.getTasks();
    },
    handleChildDeleteTask(){
      this.getTasks();
    },
  },
  mounted: function () {
    this.getTasks();
  },
};
</script>

<style>
</style>