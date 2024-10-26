<script lang="ts">
import { defineComponent } from "vue";
import CreateTodo from "../../components/CreateTodo/CreateTodo.vue";
import TodoList from "../../components/TodoList/TodoList.vue";

export default defineComponent({
 name: "Todo",
 components: {
  CreateTodo,
  TodoList,
 },
});
</script>

<template>
 <div class="d-flex justify-content-center p-4 bg-light">
  <div class="d-flex flex-column w-50 gap-3">
   <div class="todo-form"><CreateTodo /></div>
   <div class="todo-list"><TodoList /></div>
  </div>
 </div>
</template>
