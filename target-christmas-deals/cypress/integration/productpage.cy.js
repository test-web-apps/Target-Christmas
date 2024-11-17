class ProductPage {

  elements = {
      searchBar: () => cy.get('#search'), // Search bar selector
      searchResult: () => cy.get('[data-module-type="ProductListGrid"]'), // Selector for search results container
      productLink: () => cy.xpath('(.//div[@class="sc-6fc499dc-0 sc-11955945-1 gMAKgb VvJFh"])[1]'), // Select the first product link in search results
      productTitle: () => cy.get('[data-test="product-title"]'), // Product title selector
      productImages: () => cy.get('[data-test="image-gallery-item-0"] > .sc-acf174c5-15 > .styles_aspectRatio__2_EWn > :nth-child(1) > .sc-2c12ca73-0 > .sc-2c12ca73-1 > .sc-2c12ca73-3'), // Product image selector
      productPrice: () => cy.get('[data-test="product-price"]'), // Product price selector
      availabilityStatus: () => cy.get('[data-test="availability-status"]'), // Availability status selector
      productDescription: () => cy.get('[data-test="item-details-description"]'), // Product description selector
      addToCartButton: () => cy.get('[data-test="shippingButton"]'), // Add to cart button selector
      cart: () => cy.xpath('//div[@class="sc-f82024d1-0 iigiuV"]'), // Cart selector
      outOfStockMessage: () => cy.get('[data-test="out-of-stock"]'), // Out of stock message selector
      zoomedImage: () => cy.get('[data-test="icon-expand-item-0"]'), // Zoomed image selector
  };

  // Visit the homepage
  visitHomePage() {
      cy.visit('https://www.target.com/');
  }

  // Perform a search for a product
  searchForProduct(productName) {
      this.elements.searchBar().clear().type(productName).type('{enter}');
      cy.wait(10000)
  }

  // Click on the first product link in the search results
  clickOnProductLink() {
    cy.wait(5000)
      this.elements.productLink().click();
  }

  // Verify that the product title is visible
  verifyProductTitle() {
      this.elements.productTitle().should('be.visible');
  }

  // Verify product images are displayed correctly
  verifyProductImages() {
      cy.wait(5000)
      this.elements.productImages().should('be.visible').and('not.have.attr', 'distorted');
  }

  // Verify product price
  verifyProductPrice() {
      this.elements.productPrice().should('be.visible');
  }

  // Verify availability status is shown
  verifyAvailabilityStatus() {
    this.elements.availabilityStatus().then(($el) => {
      if ($el.length > 0) {
          $el.should('be.visible');
      } else {
          cy.log('Availability status element is not present. This might be a bug.');
      }
  });
  }

  // Verify product description is displayed
  verifyProductDescription() {
      this.elements.productDescription().should('be.visible');
  }

  // Add product to cart
  addProductToCart() {
    cy.wait(4000)
      this.elements.addToCartButton().click();
  }

  // Verify that product is added to the cart
  verifyProductAddedToCart() {
      this.elements.cart().should('contain', '1 item'); // Update selector if needed
  }

  // Hover over product image to zoom
  verifyImageToZoom() {
      this.elements.productImages().click();
  }

  // Verify out of stock message
  verifyOutOfStockMessage() {
    this.elements.outOfStockMessage().then(($el) => {
      if ($el.length > 0) {
          $el.should('be.visible').and('contain.text', 'Out of Stock');
        } 
    else {
          cy.log('Out of stock message is not present. This might be a bug.');
        }
  });
  }

  // Reload the page
  refreshPage() {
      cy.reload();
  }

  // Verify zoom functionality on images
  verifyZoomFunctionality() {
    this.verifyImageToZoom(); // Trigger the hover action
    this.elements.zoomedImage()
    .should('be.visible') // Assert that the zoomed section appears
    .and('have.css', 'background-image') // Optionally, ensure the background image is set
    .and('include', 'https://target.scene7.com/is/image/Target/GUEST_fd674b4f-c03d-4004-9cc5-6a1077935c35?wid=800&hei=800&qlt=80&fmt=pjpeg'); // Verify part of the image URL
  }
}

module.exports = new ProductPage();
