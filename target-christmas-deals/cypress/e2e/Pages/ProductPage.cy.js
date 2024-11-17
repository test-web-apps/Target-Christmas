const productpageCy = require("../../integration/productpage.cy");

describe('Target Product Page Tests', () => {

    

    it('should search for a product and verify the product title', () => {
        cy.viewport(1366, 768)
        productpageCy.visitHomePage();
        productpageCy.searchForProduct('Apple iPad');
        productpageCy.clickOnProductLink();
        productpageCy.verifyProductTitle();
    });

    it('should verify product images are displayed', () => {
        cy.viewport(1366, 768);
        productpageCy.visitHomePage();
        productpageCy.searchForProduct('Apple iPad');
        productpageCy.clickOnProductLink();
        productpageCy.verifyProductImages();
    });

    it.only('should add product to cart and verify it is added', () => {
        cy.viewport(1366, 768);
        productpageCy.visitHomePage();
        productpageCy.searchForProduct('Apple iPad');
        productpageCy.clickOnProductLink();
        productpageCy.addProductToCart();
        productpageCy.verifyProductAddedToCart();
    });

    it('should hover over product image and verify zoom functionality', () => {
        cy.viewport(1366, 768);
        productpageCy.visitHomePage();
        productpageCy.searchForProduct('Apple iPad');
        productpageCy.clickOnProductLink();
        productpageCy.verifyImageToZoom();
        productpageCy.verifyZoomFunctionality(); // Ensures zoomed image is displayed
    });

    // Test: Verify "Out of Stock" message is displayed
    it('should verify out of stock message is displayed', () => {
        cy.viewport(1366, 768);
        productpageCy.visitHomePage();
        productpageCy.searchForProduct('Out of Stock Product'); // Use a product known to be out of stock
        productpageCy.clickOnProductLink();
        productpageCy.verifyOutOfStockMessage(); // Ensures the out-of-stock message appears
    });
});
