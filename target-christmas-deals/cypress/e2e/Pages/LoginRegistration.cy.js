const loginpageCy = require("../../integration/loginpage.cy");
const registrationpageCy = require("../../integration/registrationpage.cy");

describe('Target Website Login and Registration Tests', () => {
    // Set the viewport size before each test
    beforeEach(() => {
        cy.viewport(1366, 768); // Set to 1920x1080 resolution
    });

    it.only('Verify login functionality with valid credentials', () => {
        loginpageCy.visitHomePage();
        loginpageCy.clickSignInButton();
        loginpageCy.enterLoginDetails('adityabhardwajshu@gmail.com', 'Target@123');
        loginpageCy.submitLogin();
        loginpageCy.verifySuccessfulLogin('Aditya');
    });
  
    it('Verify error message for invalid login', () => {
        loginpageCy.visitHomePage();
        loginpageCy.clickSignInButton();
        loginpageCy.enterLoginDetails('asdf@gmail.com', 'Target@123');
        loginpageCy.submitLogin();
        loginpageCy.verifyErrorMessage();
    });
  
    it('Verify successful registration with valid details', () => {
        registrationpageCy.visitHomePage();
        registrationpageCy.clickSignInButton();
        registrationpageCy.clickCreateAccount();
        registrationpageCy.fillRegistrationDetails('alienware907@gmail.com', 'Aditya', 'Bhardwaj', 'Target@123');
        //registrationpageCy.agreeToTermsAndConditions();
        registrationpageCy.submitCreateAccount();
        registrationpageCy.verifyOTPReceived();
        registrationpageCy.verifyAccountCreated('Aditya');
    });
  
    it.skip('Verify error message for missing registration fields', () => {
        registrationpageCy.visitHomePage();
        registrationpageCy.clickSignInButton();
        registrationpageCy.clickCreateAccount();
        registrationpageCy.fillRegistrationDetails('', '', '', '');  // Leave fields blank
        registrationpageCy.submitCreateAccount();
        cy.get('.error-message').should('be.visible').and('contain', 'All fields are required');
    });
});