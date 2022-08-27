<template>
  <div class="task">
       <h4 class="task__title"> - {{ title}}</h4>
       <div class="task__actions">
        <button>Edit</button>
        <button>Delete</button>
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