<template>
  <div class="task">
    <h4 class="task__title">
      <i class="fa-regular fa-square-check" @click="updateStatus"></i> -
      {{ title }}
    </h4>
    <div class="task__actions">
      <button v-if="isComplete" class="tasks__form-button">
        <i class="fa-regular fa-trash-can"></i>
      </button>
      <button class="tasks__form-button">
        <i v-if="isComplete" class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
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
      };
    },
    methods: {
      async updateStatus() {
        try {
          await this.taskStore.updateStatus(this.idTask, this.isComplete);
          this.$emit('updateStatus');
        } catch (e) {
          this.msgErrors.push(e);
        }     
      },
    },
}
</script>