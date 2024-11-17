class LoginPage {
    visitHomePage() {
      cy.visit('https://www.target.com/');
    }
  
    clickSignInButton() {
      cy.get('[data-test="@web/AccountLink"]').click();
      cy.get('[data-test="accountNav-signIn"]').click();
    }

  
    enterLoginDetails(email, password) {
      cy.wait(4000);
      cy.get('#username').type(email);
      cy.get('[data-test="login-password"]').type(password);
      cy.get('#keepMeSignedIn').check(); 
      //cy.xpath('//a[@class="sc-e851bd29-0 jEhmxg"]').click();
      //cy.xpath('//button[@id="login"]').click();
      cy.wait(5000)
    }

    submitLogin() {
        cy.get('#login').click();  // Click the Sign In button
      }
  
  
    verifySuccessfulLogin(username) {
        cy.wait(5000)
        cy.get('[data-test="@web/AccountLink"]').click()
        
        cy.xpath('//div[@class="styles_baseCell__zb2BN styles_bottom__6vPQ_"]')
          .should('be.visible') // Ensure the greeting is visible
          .and('contain.text', `Hi, ${username}`);// Check if redirected to account page
    }
  
    verifyErrorMessage() {
      cy.get('#username--ErrorMessage').should('be.visible').and('contain', 'Please enter a valid email or phone number')
    }
  }
  
  module.exports = new LoginPage
