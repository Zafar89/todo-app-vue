import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import TodoList from "../components/TodoList/TodoList.vue";
import { useTodoStore } from "../store/useTodoStore";

// Mock for localStorage
const localStorageMock = {
 store: {} as Record<string, string>,
 getItem(key: string) {
  return this.store[key] || null;
 },
 setItem(key: string, value: string) {
  this.store[key] = value;
 },
 clear() {
  this.store = {};
 },
};

beforeEach(() => {
 vi.stubGlobal("localStorage", localStorageMock);
 localStorageMock.clear();
});

afterEach(() => {
 vi.clearAllMocks();
});

vi.mock("../../store/useTodoStore", () => {
 return {
  useTodoStore: () => ({
   getTodos: { value: [] }, // Starts with an empty todo list
   deleteTodo: vi.fn(),
   deleteAllTodos: vi.fn(),
   todoToUpdate: { value: undefined },
  }),
 };
});

describe("TodoList", () => {
 it("should return correct number of todos", () => {
  const { getTodos } = useTodoStore();
  expect(getTodos.value).toEqual([]);
 });

 it("should delete a todo", () => {
  const { getTodos, deleteTodo } = useTodoStore();
  const todoToDelete = { id: 1, name: "Todo 1", priority: 1 };
  getTodos.value = [todoToDelete];
  deleteTodo(todoToDelete.id);
  expect(getTodos.value).not.toContain(todoToDelete);
 });

 it("should delete all todos", () => {
  const { getTodos, deleteAllTodos } = useTodoStore();
  getTodos.value = [{ id: 1, name: "Todo 1", priority: 1 }];
  deleteAllTodos();
  expect(getTodos.value).toEqual([]);
 });
});
