// ***********************************************
// Custom Cypress commands for Student Management System
// ***********************************************

/**
 * Login command with role-based credentials
 * @param {string} role - admin, teacher, or student
 */
Cypress.Commands.add("login", (role = "admin") => {
  const credentials = {
    admin: { username: "admin", password: "admin123" },
    teacher: { username: "gv001", password: "gv123" },
    student: { username: "sv001", password: "sv123" },
  };

  const { username, password } = credentials[role];

  cy.visit("/login");
  cy.get('input[type="text"]').type(username);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();

  // Wait for redirect after login
  cy.url().should("not.include", "/login");
  cy.url().should("include", "/dashboard");
});

/**
 * Logout command
 */
Cypress.Commands.add("logout", () => {
  cy.get("button").contains("Đăng xuất").click();
  cy.url().should("include", "/login");
});

/**
 * Navigate to specific page from sidebar
 * @param {string} menuItem - Text of the menu item to click
 */
Cypress.Commands.add("navigateTo", (menuItem) => {
  cy.get("nav").contains(menuItem).click();
  cy.wait(300); // Wait for navigation
});

/**
 * Fill and submit form
 * @param {Object} formData - Key-value pairs for form fields
 */
Cypress.Commands.add("fillForm", (formData) => {
  Object.entries(formData).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      // Handle select/dropdown
      cy.get(`select[name="${field}"], select#${field}`).select(value[0]);
    } else {
      cy.get(
        `input[name="${field}"], input#${field}, textarea[name="${field}"]`
      )
        .clear()
        .type(value);
    }
  });
});

/**
 * Check if user has specific role permissions
 * @param {string} role - admin, teacher, or student
 * @param {Array} expectedMenuItems - Menu items that should be visible
 */
Cypress.Commands.add("verifyRolePermissions", (role, expectedMenuItems) => {
  expectedMenuItems.forEach((item) => {
    cy.get("nav").should("contain", item);
  });
});
