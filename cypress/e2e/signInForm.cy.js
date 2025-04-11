// cypress/e2e/signInForm.cy.js
describe('SignInForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/forms');
  });

  it('renders the sign in form', () => {
    cy.get('[data-cy="signInForm"]').should('be.visible');
  });

  it('renders the sign in form heading', () => {
    cy.get('[data-cy="signInFormHeading"]').should('be.visible');
  });

  it('renders the username input field', () => {
    cy.get('[data-cy="signInUsernameInput"]').should('be.visible');
  });

  it('renders the password input field', () => {
    cy.get('[data-cy="signInPasswordInput"]').should('be.visible');
  });

  it('renders the submit button', () => {
    cy.get('[data-cy="signInSubmitButton"]').should('be.visible');
  });

  it('submits the form with valid credentials', () => {
    cy.get('[data-cy="signInUsernameInput"]').type('valid-username');
    cy.get('[data-cy="signInPasswordInput"]').type('valid-password');
    cy.get('[data-cy="signInSubmitButton"]').click();
    cy.get('[data-cy="signInUsernameError"]').should('not.be.visible');
    cy.get('[data-cy="signInPasswordError"]').should('not.be.visible');
  });

  it('displays an error message for invalid credentials', () => {
    cy.get('[data-cy="signInSubmitButton"]').click();
    cy.get('[data-cy="signInUsernameError"]').should('be.visible');
    cy.get('[data-cy="signInPasswordError"]').should('be.visible');
  });
});