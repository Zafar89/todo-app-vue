import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import { useCreateTodo } from "../components/CreateTodo/CreateTodo.script";
import { PRIORITY_ORDER } from "../types/TodoTypes";

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

describe("useCreateTodo", () => {
 it("should create a new todo with valid data", () => {
  const { createTodo, todoText, priority, errors } = useCreateTodo();
  todoText.value = "Complete the assignment";
  priority.value = 1;
  errors.todoText = null;
  errors.priority = null;

  createTodo();

  expect(todoText.value).toBe("");
  expect(priority.value).toBe(PRIORITY_ORDER.CRITICAL);
 });

 it("should not create a new todo with invalid data", () => {
  const { todoText, createTodo, errors } = useCreateTodo();
  todoText.value = "";
  createTodo();
  expect(errors.todoText).not.toBeNull();
 });

 it("should update an existing todo with valid data", () => {
  const { editTodo, todoText, priority, errors } = useCreateTodo();

  const existingTodo = { id: 1, name: "Existing Todo", priority: 2 };
  todoText.value = "Updated Todo";
  priority.value = 3;
  errors.todoText = null;
  errors.priority = null;

  const updated = editTodo(existingTodo);
  expect(updated).toBe(true);

  expect(todoText.value).toBe("");
  expect(priority.value).toBe(PRIORITY_ORDER.CRITICAL);
 });

 it("should not update an existing todo with invalid data (empty todoText)", () => {
  const { todoText, editTodo, errors } = useCreateTodo();

  const existingTodo = { id: 1, name: "Existing Todo", priority: 2 };
  todoText.value = "";

  const updated = editTodo(existingTodo);
  expect(updated).toBe(false);
  expect(errors.todoText).not.toBeNull();
 });
});
