class HomePage{

    // define selector for home page

    elements ={

        header: () => cy.get('#headerPrimary'),

        navigationBar: () => cy.get('[data-test="@web/HeaderPrimaryNav"]'),

        banner: () => cy.get('[data-component-id="WEB-411702"] > [data-test="@web/SlingshotComponents/Superhero"]'),

        searchBar: () => cy.get('[data-test="@web/Search/SearchInput"]'),
        // searchResults: () => cy.get('[rel="search"]'),

        carousel: () => cy.xpath('//div[@class="sc-1aa3ca61-0 ApDzZ h-padding-t-tight"]'),
        carouselNextArrow: () => cy.get('[data-component-id="WEB-413094"] > [data-test="-accordion"] > [data-test="collapsibleClippingDiv"] > [data-test="collapsibleContentDiv"] > [data-test="@web/SlingshotComponents/ProductsCarousel"] > [data-test="filmstrip-products-carousel"] > .sc-1aa3ca61-0 > .kzvouQ'), //forward arrow on the carousel
        //carouselPrevArrow: () => cy.xpath('class="sc-1aa3ca61-1 kzvouQ"'), // back arrow on the carousel

        categoryIcons: () => cy.xpath('//div[@class="sc-d2c8633b-0 gKocju"]', { timeout: 10000 }), // category icons
        
        christmasDealsSection: () => cy.get('[data-component-id="WEB-412850"] > [data-test="@web/SlingshotComponents/Storyblocks"] > .cBzSuK > .sc-5da3fdcc-0 > :nth-child(1) > [data-test="@web/SlingshotComponents/common/Storyblock"] > [data-test="storyblock-storyblockLinkWrapper"]'), // christmas Deals section
        
        productCards: () => cy.xpath('//div[@class="sc-e72ec7b-6 Bjcbq"]'),
        addToCartButton: () => cy.xpath('//button[@class="sc-ddc722c0-0 sc-f1230b39-0 kzYXYI doBYzz"]'), // add to Cart button on hover
       
       
        promotionalBanner: () => cy.get('img[src="https://target.scene7.com/is/image/Target/GUEST_c3c3aec9-222c-4c81-9730-e38b5475acd9?wid=668&qlt=80&fmt=webp"]'), // promotional banner for Christmas Deals

    };

    //defining action for thoes element

    visitHomePage(){
        cy.visit('https://www.target.com/');
    }

    verifyHeader(){
        this.elements.header().should('be.visible');
    }

    verifyNavigationBar(){
        this.elements.navigationBar().should('be.visible');
    }

    verifyAllBannersClickable() {
        cy.get('[data-component-id="WEB-411702"] > [data-test="@web/SlingshotComponents/Superhero"]').each((banner) => {
            cy.wrap(banner).should('be.visible');  // Ensure each banner is visible
            cy.wrap(banner).click({force: true});               // Optionally click on each banner
            cy.go('back');      
        });
    }

    searchProduct(productName){
        this.elements.searchBar().type(productName).type('{enter}');
    }

    checkCarouselNavigation(){
        this.elements.carousel().should('exist').then((carousel) => {
            if(carousel.length){
                this.elements.carouselNextArrow({timeout: 10000}).should('be.visible').click();
                           
                //this.elements.carouselPrevArrow({timeout: 2000}).should('be.visible').click();
            }
            else{
                cy.log('Carousel not present on this page.');
            }
        })
    }



    verifyCategoryIcons(){

       // cy.xpath('//div[@class="sc-d2c8633b-0 gKocju"]').click({force: true});

        this.elements.categoryIcons().each((icon) => {
            cy.wrap(icon).click();
            

            // cy.get('[data-test="@web/MainMenu/LeftNavCategoriesHeading"]')
            // .should('be.visible').and('contain',icon.text());

            this.elements.categoryIcons().each(($icon) => {
                // Ensure the menu is still open and the icon is visible
                cy.wrap($icon).scrollIntoView().click({force : true}); // Click on the icon
        
                // Verify that the category page or section loads
                cy.xpath('//div[@class="styles_baseCell__zb2BN styles_cellStandard__zO7OD h-text-lg h-text-bold"]')  // Replace with the selector for the category page content
                  .should('be.visible');
        
                // Reopen the menu to test the next icon, if necessary
                cy.xpath('//button[@class="styles_baseIconButton__1zmiH styles_iconButtonClose__R7qvf styles_sm__ZqLFy"]').click(); // Reopen menu
            });
        })
    }

    verifyChristmasDealsSection(){
        this.elements.christmasDealsSection({ timeout: 10000 }).should('be.visible')
    }

    verifyProductCardDetails(){
        this.elements.productCards().each((card) => {
            cy.wrap(card).fing('img').should('be.visible');
            cy.wrap(card).find('.price').should('be.visible');
        });
    }

    checkAddToCartVisibility(){
        this.elements.productCards().each((card) => {
            cy.wrap(card).find(
                this.elements.addToCartButton().should('be.visible')
            )
        });
    }


}

module.exports = new HomePage