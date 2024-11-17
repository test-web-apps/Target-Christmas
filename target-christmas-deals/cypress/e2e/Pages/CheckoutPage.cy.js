const checkoutpageCy = require("../../integration/checkoutpage.cy");
const cartpageCy = require("../../integration/cartpage.cy");

describe('Checkout Process', () => {
    beforeEach(() => {
        cy.visit('https://www.target.com/');
    });

    it('TC_CK_01: Verify that the "Proceed to Checkout" button works', () => {
        cartpageCy.goToCart(); // Navigate to cart
        checkoutpageCy.proceedToCheckout(); // Proceed to checkout
        cy.url().should('include', 'checkout'); // Verify user is redirected to checkout page
    });

    it('TC_CK_02: Verify that the user can review the cart on the checkout page', () => {
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.reviewOrderSummary(); // Verify order summary is displayed
    });

    it('TC_CK_03: Verify that the user can add shipping address during checkout', () => {
        const address = {
            firstName: 'Aman',
            lastName: 'Singh',
            streetAddress: 'Lacrosse Clinic',
            zip: '54601',
            city: 'La Crosse',
            state: 'Wisconsin',
            phone: '(188) 824-8446'
        };
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.fillShippingAddress(address); // Fill in the shipping address
        checkoutpageCy.clickSaveAndContinue(); // Save and continue
        checkoutpageCy.verifyAddressDialog(); // Verify address dialog
        checkoutpageCy.submitAddress(); // Submit address
    });

    it('TC_CK_04: Verify that the user can choose a shipping method', () => {
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.chooseShippingMethod('Standard'); // Select shipping method
    });

    it('TC_CK_05: Verify that the user can apply a coupon code during checkout', () => {
        const coupon = 'PROMO123';
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.applyCoupon(coupon); // Apply coupon
        checkoutpageCy.verifyOrderConfirmation(); // Verify confirmation
    });

    it('TC_CK_06: Verify that the user can select PayPal as payment method', () => {
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.selectPayPal(); // Select PayPal option
        cy.url().should('include', 'paypal'); // Verify redirection to PayPal
    });

    it('TC_CK_07: Verify that the user receives an error message for invalid payment details', () => {
        const invalidPaymentDetails = '1234567890123456'; // Sample invalid card number
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.enterPaymentDetails(invalidPaymentDetails); // Enter invalid payment details
        cy.get('[data-test="error-message"]').should('contain', 'Invalid payment details'); // Verify error message
    });

    it('TC_CK_10: Verify that the user can place the order successfully', () => {
        const paymentDetails = '4111111111111111'; // Sample valid card number
        const address = {
            firstName: 'Aman',
            lastName: 'Singh',
            streetAddress: 'Lacrosse Clinic',
            zip: '54601',
            city: 'La Crosse',
            state: 'Wisconsin',
            phone: '(188) 824-8446',
        };
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.fillShippingAddress(address); // Fill shipping address
        checkoutpageCy.enterPaymentDetails(paymentDetails); // Enter payment details
        checkoutpageCy.placeOrder(); // Place order
        checkoutpageCy.verifyOrderConfirmation(); // Verify order confirmation
    });

    it('TC_CK_12: Verify that user can go back to shopping after placing an order', () => {
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.placeOrder(); // Place the order
        checkoutpageCy.verifyThankYouMessage(); // Verify Thank You message
        checkoutpageCy.continueShopping(); // Click continue shopping
        cy.url().should('eq', 'https://www.target.com/'); // Verify redirection to shopping page
    });

    it('TC_CK_13: Verify that "Thank You" message appears after order placement', () => {
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.placeOrder(); // Place the order
        checkoutpageCy.verifyThankYouMessage(); // Verify Thank You message
    });

    it('TC_CK_15: Verify that user is redirected for external payment methods (e.g., PayPal)', () => {
        cartpageCy.goToCart();
        checkoutpageCy.proceedToCheckout();
        checkoutpageCy.selectPayPal(); // Select PayPal as payment method
        cy.url().should('include', 'paypal'); // Verify redirection to PayPal
    });
});
