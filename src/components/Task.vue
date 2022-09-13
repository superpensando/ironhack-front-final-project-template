<template>
  <div class="task">
    <template v-if="!isEdit">
      <h4 class="task__title">
        <i class="task__title-icon fa-regular fa-square-check" @click="updateStatusTask"></i> -
        {{ title }}
      </h4>
    </template>
    <template v-if="isEdit">
      <form class="form-tasks" @submit.prevent="editTask">
        <fieldset class="form-tasks__fieldset">
          <i class="form-tasks__element-icon fa-solid fa-quote-left"></i>
          <input
            v-model="taskTitle"
            class="form-tasks__element"
            type="text"
            name="taskTitle"
            id="taskTitle"
            placeholder="Task Title...."
            required
          />
        </fieldset>
      </form>
    </template>

    <div class="task__actions">
      <template v-if="isComplete">
        <i class="task__actions-icon fa-regular fa-pen-to-square" @click="isEdit=!isEdit"></i>
        <i class="task__actions-icon fa-regular fa-trash-can" @click="deleteTask"></i>
      </template>
    </div>
  </div>
  <div v-if="msgErrors.length > 0" class="bbdd__messages error">
    {{ msgErrors[0].message }} {{ msgErrors[0].status }}
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
      isEdit: false,
      taskTitle: this.title,
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
    async editTask() {
      try {
        await this.taskStore.editTask(this.idTask,this.taskTitle);
        this.isEdit=false;
        this.$emit("editTask"); 
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
    async deleteTask() {
      try {
        await this.taskStore.deleteTask(this.idTask);
        this.$emit("deleteTask");
      } catch (e) {
        this.msgErrors.push(e);
      }
    },
  },
};
</script>