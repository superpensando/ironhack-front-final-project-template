<template>
  <div class="task">
       <h4 class="task__title"> <i class="fa-regular fa-square-check"></i> - {{ title}}</h4>
       <div class="task__actions">
        <button class="tasks__form-button"><i class="fa-regular fa-trash-can"></i></button>
        <button class="tasks__form-button"><i class="fa-regular fa-pen-to-square"></i></button>     
       </div>
  </div>
</template>

<script>
export default {
    name: "Task",
    props: {
        title: String,
        key: Number,
    },

}
</script>

<style>

</style>