class CheckoutPage {
    elements = {
        orderSummary: () => cy.get('#cartSummaryLoading'), // Selector for order summary

        proceedToCheckout: () => cy.get('[data-test="checkout-button"]'),

        firstNameInput: () => cy.get('#first_name'), // Selector for first name input
        lastNameInput: () => cy.get('#last_name'), // Selector for last name input
        addressInput: () => cy.get('[data-test="@web/TypeaheadInput/Input"]'), // Selector for address input
        zipCodeInput: () => cy.get('#zip_code'), // Selector for zip code input
        cityInput: () => cy.get('#city'), // Selector for city input
        stateInput: () => cy.get('#state'), // Selector for state input
        phoneNumberInput: () => cy.get('#phone_number'), // Selector for phone number input
        defaultAddressCheckbox: () => cy.get('#default_address'), // Checkbox for default address
        saveAndContinueButton: () => cy.get('[data-test="primary-save-button"]'), // Save and continue button
        addressDialogBox: () => cy.get(), // Dialog box for verifying address details
        submitAddressButton: () => cy.get('[data-test="avs-suggestions-submit-selected-address-button"]'), // Button to submit the selected address
        paymentMethodDropdown: () => cy.get(), // Selector for payment method dropdown
        paypalOption: () => cy.get('[data-test="PayPalRadioButtonCell"]'), // Selector for PayPal option
        continueButton: () => cy.get('[data-test="save_and_continue_button_step_PAYMENT"]'), // Continue shopping button after order
        orderConfirmation: () => cy.get('[data-test="pay-with-paypal-in-four-button"]'), // Selector for order confirmation
        thankYouMessage: () => cy.get('[data-test="thank-you-message"]'), // Selector for "thank you" message
    };

    // Proceed to checkout
    proceedToCheckout() {
        this.elements.proceedToCheckout().click();
    }

    // Fill shipping address
    fillShippingAddress(address) {
        const { firstName, lastName, streetAddress, zip, city, state, phone } = address;
        this.elements.firstNameInput().type(firstName);
        this.elements.lastNameInput().type(lastName);
        this.elements.addressInput().type(streetAddress);
        this.elements.zipCodeInput().type(zip);
        this.elements.cityInput().type(city);
        this.elements.stateInput().type(state);
        this.elements.phoneNumberInput().type(phone);
        this.elements.defaultAddressCheckbox().check(); // Check default address checkbox
    }

    // Click Save and Continue
    clickSaveAndContinue() {
        this.elements.saveAndContinueButton().click();
    }

    // Verify address dialog box
    verifyAddressDialog() {
        this.elements.addressDialogBox().should('be.visible'); // Verify the dialog box
    }

    // Submit address
    submitAddress() {
        this.elements.submitAddressButton().click();
    }

    // Select payment method
    selectPaymentMethod(method) {
        this.elements.paymentMethodDropdown().select(method);
    }

    // Select PayPal option
    selectPayPal() {
        this.elements.paypalOption().click();
    }

    // Verify order confirmation
    verifyOrderConfirmation() {
        this.elements.orderConfirmation().should('be.visible');
    }

    // Verify Thank You message
    verifyThankYouMessage() {
        this.elements.thankYouMessage().should('be.visible');
    }

    // Continue shopping
    continueShopping() {
        this.elements.continueButton().click();
    }
}

module.exports = new CheckoutPage();

