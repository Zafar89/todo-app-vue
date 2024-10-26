import { ref, computed } from "vue";
import { TodoType } from "../types/TodoTypes";

const todos = ref<TodoType[]>([]);
const todoToUpdate = ref<TodoType | undefined>(undefined);

const loadTodos = () => {
 const storedTodos = localStorage.getItem("todos");
 todos.value = storedTodos ? JSON.parse(storedTodos) : [];
};

if (typeof window != "undefined") loadTodos();

export const useTodoStore = () => {
 const getTodos = computed(() => todos.value.sort((a, b) => b.id! - a.id!));

 const addTodo = (todo: TodoType): void => {
  const newTodo = {
   id: new Date().getTime(),
   ...todo,
  };
  todos.value.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos.value));
 };

 const updateTodo = (todo: TodoType) => {
  todos.value = todos.value.filter((t) => t.id !== todo.id);
  todos.value.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos.value));
 };

 const deleteTodo = (id: number | undefined) => {
  if (!id) return;
  todos.value = todos.value.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos.value));
 };

 const deleteAllTodos = () => {
  if (typeof window !== "undefined" && !confirm("Are you sure?")) return;
  todos.value = [];
  localStorage.setItem("todos", JSON.stringify(todos.value));
 };

 return {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
  todoToUpdate,
 };
};
