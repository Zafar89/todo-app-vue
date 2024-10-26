/// <reference types="cypress" />

describe("Todo App E2E Tests", () => {
 beforeEach(() => {
  cy.visit("/"); // Adjust this if your app runs on a different base URL
 });

 it("should create a new todo", () => {
  // Enter a new todo
  cy
   .get('input[placeholder="Add a new todo"]') // Change selector based on your input field
   .type("Complete the assignment{enter}");

  // Verify the new todo is added to the list
  cy.contains("Complete the assignment").should("exist");
 });

 it("should sort todos", () => {
  // Create some todos
  cy.get('input[placeholder="Add a new todo"]').type("First Todo{enter}");
  cy.get('input[placeholder="Add a new todo"]').type("Second Todo{enter}");
  cy.get('input[placeholder="Add a new todo"]').type("Third Todo{enter}");

  // Change sort order to "high-to-low"
  cy.get("#sortOrder").select("high-to-low");

  // Check the order of todos (assuming sorting logic is implemented)
  // Adjust based on your expected behavior
  cy.get(".todo-list-group .list-group-item").eq(0).contains("Third Todo"); // Update this based on priority values
 });

 it("should delete a todo", () => {
  cy.get('input[placeholder="Add a new todo"]').type("Todo to delete{enter}");

  // Delete the todo
  cy
   .contains("Todo to delete")
   .parent() // Assuming the buttons are in the same parent element
   .find("button")
   .contains("Delete")
   .click();

  // Verify the todo is deleted
  cy.contains("Todo to delete").should("not.exist");
 });

 it("should clear all todos", () => {
  cy.get('input[placeholder="Add a new todo"]').type("Todo 1{enter}");
  cy.get('input[placeholder="Add a new todo"]').type("Todo 2{enter}");

  // Clear all todos
  cy.get(".btn-danger").click(); // Adjust selector for the Clear All Todos button

  // Verify no todos are displayed
  cy.get(".alert-warning").should("exist");
 });
});
