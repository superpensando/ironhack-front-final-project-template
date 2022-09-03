<template>
  <div class="task">
    <h4 class="task__title">
      <i class="fa-regular fa-square-check" @click="updateStatusTask"></i> -
      {{ title }}
    </h4>
    <div class="task__actions">
      <template v-if="isComplete">
        <i class="fa-regular fa-pen-to-square"></i>
        <i  class="fa-regular fa-trash-can" @click="deleteTask" ></i>
      </template>
    </div>
  </div>
  <div v-if="msgErrors.length > 0" class="bbdd__messages error">
      {{ msgErrors[0].message }}  {{ msgErrors[0].status }}
    </div>
</template>

<script>
import { useTaskStore } from "../store/task.js";
import { useRouter } from "vue-router";

export default {
  name: "Task",
  props: {
    title: String,
    idTask: Number,
    isComplete: Boolean,
    key: Number,
  },
  data() {
    return {
      router: useRouter(),
      taskStore: useTaskStore(),
      msgErrors: [],
      edit: false,
    };
  },
  methods: {
    async updateStatusTask() {
      try {
        await this.taskStore.updateStatusTask(this.idTask, this.isComplete);
        this.$emit("updateStatusTask");
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    async deleteTask() {
      try {
        await this.taskStore.deleteTask(this.idTask);
        this.$emit('deleteTask');
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
  },
};
</script>