<template>
 <form name="createTodoForm" @submit.prevent>
  <div class="card">
   <div class="card-header">{{ todoToUpdate ? "Update" : "Create" }} Todo</div>
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
      <div v-if="errors.todoText" class="text-danger">
       {{ errors.todoText }}
      </div>
     </div>

     <div class="d-flex gap-4 mb-3">
      <div
       class="form-check"
       v-for="option in priorityOptions"
       :key="option.label"
      >
       <input
        class="form-check-input"
        type="radio"
        :id="option.label"
        :value="option.value"
        v-model="priority"
       />
       <label class="form-check-label" :for="option.label">{{
        option.label
       }}</label>
      </div>
      <div class="btn-group" role="group" aria-label="Priority Selection"></div>
     </div>

     <div v-if="errors.priority" class="error-text">{{ errors.priority }}</div>
    </div>
   </div>
   <div class="card-footer">
    <button
     type="submit"
     class="btn btn-primary w-100"
     @click="handleFormSubmit"
    >
     {{ todoToUpdate ? "Update" : "Create" }} Todo
    </button>
   </div>
  </div>
 </form>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useCreateTodo } from "./CreateTodo.script";
import { useTodoStore } from "../../store/useTodoStore";
import { PRIORITY_ORDER } from "../../types/TodoTypes";

const { todoText, priority, priorityOptions, errors, createTodo, editTodo } =
 useCreateTodo();
const { todoToUpdate } = useTodoStore();

export default defineComponent({
 name: "CreateTodo",
 setup() {
  watch(
   () => todoToUpdate.value,
   (updatedValue) => {
    console.log(updatedValue, "here");
    if (updatedValue) {
     todoText.value = updatedValue.name;
     priority.value = updatedValue.priority;
    } else {
     todoText.value = "";
     priority.value = PRIORITY_ORDER.CRITICAL;
    }
   },
   { immediate: true }
  );

  const handleFormSubmit = () => {
   if (todoToUpdate.value) {
    const updated = editTodo({
     id: todoToUpdate?.value?.id,
     name: todoText.value,
     priority: priority.value,
    });
    if (updated) todoToUpdate.value = undefined;
   } else createTodo();
  };

  return {
   todoText,
   priority,
   priorityOptions,
   errors,
   todoToUpdate,
   handleFormSubmit,
  };
 },
});
</script>
