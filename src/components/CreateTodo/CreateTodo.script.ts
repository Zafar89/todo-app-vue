import { ref, reactive } from "vue";
import { useTodoStore } from "../../store/useTodoStore";
import { PRIORITIES, PRIORITY_ORDER, TodoType } from "../../types/TodoTypes";

interface TodoErrors {
 todoText: string | null;
 priority: string | null;
}

export function useCreateTodo() {
 const todoText = ref<string>("");
 const priority = ref<number>(PRIORITY_ORDER.CRITICAL);
 const { addTodo } = useTodoStore();
 const { updateTodo } = useTodoStore();

 const priorityOptions = [
  { label: PRIORITIES.CRITICAL, value: PRIORITY_ORDER.CRITICAL },
  { label: PRIORITIES.MODERATE, value: PRIORITY_ORDER.MODERATE },
  { label: PRIORITIES.OPTIONAL, value: PRIORITY_ORDER.OPTIONAL },
 ];

 const errors = reactive<TodoErrors>({
  todoText: null,
  priority: null,
 });

 const validateForm = () => {
  errors.todoText =
   todoText.value.trim() === "" ? "Please enter a to-do item" : null;
  errors.priority = priority.value ? null : "Please select a priority";
  return !errors.todoText && !errors.priority;
 };

 const createTodo = () => {
  if (!validateForm()) return;
  const newTodo = {
   name: todoText.value,
   priority: priority.value,
  };

  addTodo(newTodo);
  todoText.value = "";
  priority.value = PRIORITY_ORDER.CRITICAL;
 };

 const editTodo = (todo: TodoType) => {
  if (!validateForm()) return false;
  updateTodo(todo);
  todoText.value = "";
  priority.value = PRIORITY_ORDER.CRITICAL;
  return true;
 };

 return {
  todoText,
  priority,
  priorityOptions,
  errors,
  createTodo,
  editTodo,
 };
}
