const  cartpageCy = require("../../integration/cartpage.cy");

describe('Cart Functionality Tests', () => {
    const cartpageCy = new CartPage();

    beforeEach(() => {
        cy.visit('https://www.target.com/'); // Visit website
    });

    it('TC_CF_01 - Verify that the cart icon is displayed on the page', () => {
        cartpageCy.elements.cartIcon().should('be.visible');
    });

    it('TC_CF_02 - Verify that the cart is empty by default', () => {
        cartpageCy.goToCart();
        cartpageCy.verifyCartIsEmpty();
    });

    it('TC_CF_03 - Validate adding a product to the cart', () => {
        cartpageCy.addProductToCart();
        cartpageCy.verifyProductAdded(1);
    });

    it('TC_CF_04 - Verify that cart updates when product quantity is changed', () => {
        cartpageCy.addProductToCart();
        cartpageCy.updateProductQuantity(2);
        cartpageCy.verifyProductAdded(2);
    });

    it('TC_CF_05 - Verify that the cart displays correct total price', () => {
        cartpageCy.addProductToCart();
        cartpageCy.verifyCartTotal('$29.99'); // Replace with actual price for the product
    });

    it('TC_CF_06 - Verify removing a product from the cart', () => {
        cartpageCy.addProductToCart();
        cartpageCy.removeProduct();
        cartpageCy.verifyCartAfterRemoval();
    });

    it('TC_CF_07 - Verify that the cart displays product details', () => {
        cartpageCy.addProductToCart();
        cartpageCy.elements.cartProductList().should('contain', 'Product Name'); // Replace with actual product name
    });

    it('TC_CF_09 - Verify that the cart displays available promotions and discounts', () => {
        cartpageCy.addProductToCart();
        cartpageCy.applyCoupon('PROMO123'); // Replace with a valid coupon
        cartpageCy.verifyCouponApplied('$5.00'); // Replace with actual discount
    });

    it('TC_CF_19 - Verify Cart Page\'s Continue Shopping Button Functionality', () => {
        cartpageCy.goToCart();
        cartpageCy.verifyContinueShopping();
    });

    it('TC_CF_20 - Verify Cart Page\'s Remove All Button Functionality', () => {
        cartpageCy.addProductToCart();
        cartpageCy.removeAllProducts();
        cartpageCy.verifyCartIsEmpty();
    });
});