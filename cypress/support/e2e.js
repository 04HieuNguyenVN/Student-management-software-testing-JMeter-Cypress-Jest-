// ***********************************************************
// This support file is loaded before all test files.
// You can use it to:
// - Load custom commands
// - Configure global settings
// - Set up beforeEach hooks
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Prevent Cypress from failing tests on uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // Return false to prevent test from failing
  return false;
});
