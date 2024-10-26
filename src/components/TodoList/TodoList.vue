<template>
 <div class="d-flex flex-column gap-3">
  <div class="d-flex justify-content-between">
   <p class="h5">Todo List:</p>
   <select id="sortOrder" v-model="sortOrder" v-if="todos.length > 0">
    <option value="default">Newest First</option>
    <option value="high-to-low">Critical to Optional</option>
    <option value="low-to-high">Optional to Critical</option>
   </select>
  </div>
  <div class="todo-list-group list-group" v-if="todos.length > 0">
   <li
    v-for="todo in todos"
    class="list-group-item d-flex justify-content-between align-items-center"
    :key="todo.id"
   >
    <div class="d-flex flex-column gap-2">
     <span class="h6">
      <input type="text" class="border-0" :value="todo.name" />
     </span>
     <span class="badge priority-pill bg-primary">
      {{ PRIORITY_NAMES.get(todo.priority) }}
     </span>
    </div>
    <div class="todo-actions">
     <button
      class="btn btn-link text-decoration-none"
      @click="handleTodoUpdate(todo)"
     >
      Edit
     </button>
     <button
      class="btn btn-link text-decoration-none"
      @click="handleDeleteTodo(todo.id!)"
     >
      Delete
     </button>
    </div>
   </li>
  </div>
  <div class="alert alert-warning" v-else>No Todos found.</div>
  <div v-if="todos.length > 0" class="delete-all">
   <input
    type="button"
    class="btn btn-danger w-100"
    value="Clear All Todos"
    @click="handleDeleteAllTodos()"
   />
  </div>
 </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useTodoStore } from "../../store/useTodoStore";
import { PRIORITY_NAMES, TodoType } from "../../types/TodoTypes";

export default defineComponent({
 name: "TodoList",
 setup() {
  const { getTodos, deleteTodo, deleteAllTodos, todoToUpdate } = useTodoStore();

  const sortOrder = ref("default");

  const handleDeleteTodo = (id: number) => {
   deleteTodo(id);
  };

  const handleDeleteAllTodos = () => {
   deleteAllTodos();
  };

  const handleTodoUpdate = (todo: TodoType) => {
   todoToUpdate.value = todo;
  };

  const sortedTodos = computed(() => {
   const todos = [...getTodos.value];
   switch (sortOrder.value) {
    case "high-to-low":
     return todos.sort((a, b) => a.priority - b.priority);
    case "low-to-high":
     return todos.sort((a, b) => b.priority - a.priority);
    default:
     return todos.sort((a, b) => b.id! - a.id!);
   }
  });

  return {
   todos: sortedTodos,
   handleDeleteTodo,
   handleDeleteAllTodos,
   handleTodoUpdate,
   sortOrder,
   PRIORITY_NAMES,
  };
 },
});
</script>

<style scoped src="./TodoList.css"></style>
