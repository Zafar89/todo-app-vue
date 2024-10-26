<template>
 <div class="card">
  <div class="card-header">Add Todo</div>
  <div class="card-body">
   <div class="todo-form-container">
    <div class="mb-3">
     <label for="todo_title" class="form-label">Title</label>
     <input
      type="text"
      v-model="todoText"
      class="form-control"
      placeholder="e.g. Complete the assignment"
      id="todo_title"
      :autofocus="true"
     />
     <div v-if="errors.todoText" class="text-danger">{{ errors.todoText }}</div>
    </div>

    <div class="d-flex gap-4 mb-3">
     <div
      class="form-check"
      v-for="option in priorityOptions"
      :key="option.value"
     >
      <input
       class="form-check-input"
       type="radio"
       :id="option.value"
       :value="option.value"
       v-model="priority"
      />
      <label class="form-check-label" :for="option.value">{{
       option.label
      }}</label>
     </div>
     <div class="btn-group" role="group" aria-label="Priority Selection"></div>
    </div>

    <div v-if="errors.priority" class="error-text">{{ errors.priority }}</div>
   </div>
  </div>
  <div class="card-footer">
   <button class="btn btn-primary w-100" @click="createTodo">Create</button>
  </div>
 </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCreateTodo } from "./CreateTodo.script";

const { todoText, priority, priorityOptions, errors, createTodo } =
 useCreateTodo();

export default defineComponent({
 name: "CreateTodo",
 setup() {
  return { todoText, priority, priorityOptions, errors, createTodo };
 },
});
</script>
