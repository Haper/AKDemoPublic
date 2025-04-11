describe('SignUpForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/forms');
    // cy.get('[data-cy="signUpFormHeading"]').scrollIntoView({ block: 'start' });
  });

  it('renders the sign up form', () => {
    cy.get('[data-cy="signUpForm"]').scrollIntoView();
    cy.get('[data-cy="signUpForm"]').should('be.visible');
  });

  it('renders the sign up form heading', () => {
    cy.get('[data-cy="signUpFormHeading"]').scrollIntoView();
    cy.get('[data-cy="signUpFormHeading"]').should('be.visible');
  });

  it('renders the salutation selection field', () => {
    cy.get('[data-cy="signUpFormHeading"]').scrollIntoView();
    cy.get('[data-cy="signUpFormHeading"]').should('be.visible');
  });

  it('renders the firstname input field', () => {
    cy.get('[data-cy="signUpFirstnameInput"]').scrollIntoView();
    cy.get('[data-cy="signUpFirstnameInput"]').should('be.visible');
  });

  it('renders the lastname input field', () => {
    cy.get('[data-cy="signUpLastnameInput"]').scrollIntoView();
    cy.get('[data-cy="signUpLastnameInput"]').should('be.visible');
  });

  it('renders the username input field', () => {
    cy.get('[data-cy="signUpUsernameInput"]').scrollIntoView();
    cy.get('[data-cy="signUpUsernameInput"]').should('be.visible');
  });

  it('renders the email input field', () => {
    cy.get('[data-cy="signUpEmailInput"]').scrollIntoView();
    cy.get('[data-cy="signUpEmailInput"]').should('be.visible');
  });

  it('renders the phone input field', () => {
    cy.get('[data-cy="signUpPhoneInput"]').scrollIntoView();
    cy.get('[data-cy="signUpPhoneInput"]').should('be.visible');
  });

  it('renders the password input field', () => {
    cy.get('[data-cy="signUpPasswordInput"]').scrollIntoView();
    cy.get('[data-cy="signUpPasswordInput"]').should('be.visible');
  });

  it('renders the confirm password input field', () => {
    cy.get('[data-cy="signUpConfirmPasswordInput"]').scrollIntoView();
    cy.get('[data-cy="signUpConfirmPasswordInput"]').should('be.visible');
  });

  it('renders the submit button', () => {
    cy.get('[data-cy="signUpSubmitButton"]').scrollIntoView();
    cy.get('[data-cy="signUpSubmitButton"]').should('be.visible');
  });

  it('submits the form with valid credentials', () => {
    cy.get('[data-cy="signUpSalutationInput"]').click();
    cy.get('.custom-select__option').contains('Mr.').click();
    cy.get('[data-cy="signUpFirstnameInput"]').type('John');
    cy.get('[data-cy="signUpLastnameInput"]').type('Doe');
    cy.get('[data-cy="signUpUsernameInput"]').type('johndoe');
    cy.get('[data-cy="signUpEmailInput"]').type('johndoe@example.com');
    cy.get('[data-cy="signUpPhoneInput"]').type('+1234567890');
    cy.get('[data-cy="signUpPasswordInput"]').type('Password123');
    cy.get('[data-cy="signUpConfirmPasswordInput"]').type('Password123');
    cy.get('[data-cy="signUpSubmitButton"]').click();

    cy.get('[data-cy="signUpFirstnameAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpFirstnameAcceptIcon"]').should('be.visible');
    cy.get('[data-cy="signUpLastnameAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpLastnameAcceptIcon"]').should('be.visible');
    cy.get('[data-cy="signUpUsernameAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpUsernameAcceptIcon"]').should('be.visible');
    cy.get('[data-cy="signUpEmailAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpEmailAcceptIcon"]').should('be.visible');
    cy.get('[data-cy="signUpPhoneAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpPhoneAcceptIcon"]').should('be.visible');
    cy.get('[data-cy="signUpPasswordAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpPasswordAcceptIcon"]').should('be.visible');
    cy.get('[data-cy="signUpConfirmPasswordAcceptIcon"]').scrollIntoView();
    cy.get('[data-cy="signUpConfirmPasswordAcceptIcon"]').should('be.visible');

    cy.get('[data-cy="signUpFirstnameError"]').scrollIntoView();
    cy.get('[data-cy="signUpFirstnameError"]').should('not.be.visible');
    cy.get('[data-cy="signUpLastnameError"]').scrollIntoView();
    cy.get('[data-cy="signUpLastnameError"]').should('not.be.visible');
    cy.get('[data-cy="signUpUsernameError"]').scrollIntoView();
    cy.get('[data-cy="signUpUsernameError"]').should('not.be.visible');
    cy.get('[data-cy="signUpEmailError"]').scrollIntoView();
    cy.get('[data-cy="signUpEmailError"]').should('not.be.visible');
    cy.get('[data-cy="signUpPhoneError"]').scrollIntoView();
    cy.get('[data-cy="signUpPhoneError"]').should('not.be.visible');
    cy.get('[data-cy="signUpPasswordError"]').scrollIntoView();
    cy.get('[data-cy="signUpPasswordError"]').should('not.be.visible');
    cy.get('[data-cy="signUpConfirmPasswordError"]').scrollIntoView();
    cy.get('[data-cy="signUpConfirmPasswordError"]').should('not.be.visible');
  });

  it('displays an error message for invalid credentials', () => {
    cy.get('[data-cy="signUpSubmitButton"]').click();

    cy.get('[data-cy="signUpFirstnameError"]').scrollIntoView();
    cy.get('[data-cy="signUpFirstnameError"]').should('be.visible');
    cy.get('[data-cy="signUpFirstnameAcceptIcon"]').should('not.exist');

    cy.get('[data-cy="signUpLastnameError"]').scrollIntoView();
    cy.get('[data-cy="signUpLastnameError"]').should('be.visible');
    cy.get('[data-cy="signUpLastnameAcceptIcon"]').should('not.exist');

    cy.get('[data-cy="signUpUsernameError"]').scrollIntoView();
    cy.get('[data-cy="signUpUsernameError"]').should('be.visible');
    cy.get('[data-cy="signUpUsernameAcceptIcon"]').should('not.exist');

    cy.get('[data-cy="signUpEmailError"]').scrollIntoView();
    cy.get('[data-cy="signUpEmailError"]').should('be.visible');
    cy.get('[data-cy="signUpEmailAcceptIcon"]').should('not.exist');

    cy.get('[data-cy="signUpPhoneError"]').scrollIntoView();
    cy.get('[data-cy="signUpPhoneError"]').should('be.visible');
    cy.get('[data-cy="signUpPhoneAcceptIcon"]').should('not.exist');

    cy.get('[data-cy="signUpPasswordError"]').scrollIntoView();
    cy.get('[data-cy="signUpPasswordError"]').should('be.visible');
    cy.get('[data-cy="signUpPasswordAcceptIcon"]').should('not.exist');

    cy.get('[data-cy="signUpConfirmPasswordError"]').scrollIntoView();
    cy.get('[data-cy="signUpConfirmPasswordError"]').should('be.visible');
    cy.get('[data-cy="signUpConfirmPasswordAcceptIcon"]').should('not.exist');
  });
});
