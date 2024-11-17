class CartPage {
    elements = {
        cartIcon: () => cy.get('[data-test="cart-icon"]'), // Selector for cart icon
        cartEmptyMessage: () => cy.get('[data-test="cart-empty-message"]'), // Selector for empty cart message
        addToCartButton: () => cy.get('[data-test="add-to-cart"]'), // Selector for 'Add to Cart' button
        productQuantity: () => cy.get('[data-test="quantity-selector"]'), // Selector for quantity input
        cartProductList: () => cy.get('[data-test="cart-product-list"]'), // Selector for cart product list
        cartTotal: () => cy.get('[data-test="cart-total"]'), // Selector for cart total
        removeProductButton: () => cy.get('[data-test="remove-product"]'), // Selector for remove button
        saveForLaterButton: () => cy.get('[data-test="save-for-later"]'), // Selector for 'Save for Later'
        continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'), // Selector for 'Continue Shopping'
        removeAllButton: () => cy.get('[data-test="remove-all"]'), // Selector for 'Remove All' button
        couponInput: () => cy.get('[data-test="coupon-input"]'), // Selector for coupon input
        couponApplyButton: () => cy.get('[data-test="apply-coupon"]'), // Selector for 'Apply Coupon'

        proceedToCheckoutButton: () => cy.get('[data-test="checkout-button"]'),
    };

    proceedToCheckout() {
        this.elements.proceedToCheckoutButton().click();
    }

    // Navigate to cart
    goToCart() {
        this.elements.cartIcon().click();
    }

    // Validate cart is empty
    verifyCartIsEmpty() {
        this.elements.cartEmptyMessage().should('be.visible').and('contain', 'Your cart is empty');
    }

    // Add product to cart
    addProductToCart() {
        this.elements.addToCartButton().click();
    }

    // Verify product is added to the cart
    verifyProductAdded(quantity) {
        this.elements.cartProductList().should('contain', `${quantity} item`);
    }

    // Update product quantity
    updateProductQuantity(quantity) {
        this.elements.productQuantity().clear().type(quantity);
    }

    // Verify cart total matches expected
    verifyCartTotal(expectedTotal) {
        this.elements.cartTotal().should('contain', expectedTotal);
    }

    // Remove product from the cart
    removeProduct() {
        this.elements.removeProductButton().click();
    }

    // Verify cart after removing product
    verifyCartAfterRemoval() {
        this.verifyCartIsEmpty();
    }

    // Save product for later
    saveForLater() {
        this.elements.saveForLaterButton().click();
    }

    // Verify 'Continue Shopping' button functionality
    verifyContinueShopping() {
        this.elements.continueShoppingButton().click();
        cy.url().should('eq', 'https://www.target.com/');
    }

    // Remove all products
    removeAllProducts() {
        this.elements.removeAllButton().click();
    }

    // Apply coupon
    applyCoupon(couponCode) {
        this.elements.couponInput().type(couponCode);
        this.elements.couponApplyButton().click();
    }

    // Verify coupon applied successfully
    verifyCouponApplied(expectedDiscount) {
        this.elements.cartTotal().should('contain', expectedDiscount);
    }
}

module.exports = new CartPage;
