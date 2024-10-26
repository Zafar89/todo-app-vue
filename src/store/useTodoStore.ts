import { ref, computed } from "vue";

type TodoType = {
 id?: number;
 name: string;
 priority: number;
};

const todos = ref<TodoType[]>([]);

const loadTodos = () => {
 const storedTodos = localStorage.getItem("todos");
 todos.value = storedTodos ? JSON.parse(storedTodos) : [];
};

loadTodos();

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

 const deleteTodo = (id: number | undefined) => {
  if (!id) return;
  todos.value = todos.value.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos.value));
 };

 const deleteAllTodos = () => {
  if (!confirm("Are you sure?")) return;
  todos.value = [];
  localStorage.setItem("todos", JSON.stringify(todos.value));
 };

 return { getTodos, addTodo, deleteTodo, deleteAllTodos };
};
