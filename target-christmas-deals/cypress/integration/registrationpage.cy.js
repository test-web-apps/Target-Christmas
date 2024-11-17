class RegistrationPage {
    visitHomePage() {
      cy.visit('https://www.target.com/');
    }
  
    clickSignInButton() {
      cy.get('[data-test="@web/AccountLink"]').click();  
      cy.wait(4000)
    }
  
    clickCreateAccount() {
      cy.get('[data-test="accountNav-createAccount"]').click(); 
      cy.wait(5000) 
    }
  
    fillRegistrationDetails(email, firstName, lastName, password) {
      cy.get('#username').type(email);
      cy.get('#firstname').type(firstName);
      cy.get('#lastname').type(lastName);
      cy.get('#password').should('be.visible');
      cy.get('#password').click();
      cy.get('input[type="password"]').type(password);
      cy.get('#keepMeSignedIn').check();  // Check the 'Keep me signed in' box
    }
  
    submitCreateAccount() {
      cy.get('#createAccount').click();  // Click Create Account button
    }
  
    verifyOTPReceived() {
      cy.wait(11000)
      cy.get('input[placeholder="Enter your code"]').then(($input) => {
        // This will prompt the user to manually input the OTP
        cy.log('Please enter the OTP and click "Verify"');
        // Wait for manual action (use with caution, only for dev environments)
        cy.wait(5000); // Adjust time to allow user to enter OTP
      });
    
      cy.get('#verify').click();

      cy.get('[data-test="optin-skip-button"]').click()


    }
  
    verifyAccountCreated(username) {
      cy.wait(5000)
      cy.get('[data-test="@web/AccountLink"]').click()
      
      cy.xpath('//div[@class="styles_baseCell__zb2BN styles_bottom__6vPQ_"]')
        .should('be.visible') // Ensure the greeting is visible
        .and('contain.text', `Hi, ${username}`);// Check if redirected to account page
    }
  }
  
  module.exports = new RegistrationPage;
  