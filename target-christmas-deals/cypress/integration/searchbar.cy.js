class SearchBar{

    elements ={

        searchBar: () => cy.get('#search'),
        
        searchResult: () => 
            cy.get('[data-module-type="ProductListGrid"]') // Select the parent element
              .find('div.sc-e72ec7b-6.Bjcbq') // Use `find` to locate the child element
              .should('be.visible') // Ensure the element is visible
              .wait(3000),
        

              searchSuggestion: () =>
                cy.get('[class="sc-859e7637-3 dTUnnZ"]', { timeout: 10000 })
                  .find('[class="sc-bd5d6398-0 fuemVI"]')
                  .should('be.visible')
                  
            

    };

    visitHomePage(){
        cy.visit('https://www.target.com/');
    }

    verifySearchBarPresence(){
        this.elements.searchBar().should('be.visible').and('be.enabled');
    }

    //perform a search
    searchProduct(productName){
        this.elements.searchBar().clear().type(productName).type('{enter}');
    }

    //check if the search results are displayed
    verifySearchResultsDisplayed(){
        this.elements.searchResult().should('be.visible');
    }

    //check if search suggestions appear
    verifySearchSuggestions(productName){
        this.elements.searchBar().clear().type(productName);
        this.elements.searchSuggestion().should('be.visible');
    }

    //click on a search suggestion and verify the results
    clickSearchSuggestionAndVerifyResults(suggestion) {
        this.elements.searchSuggestion().click();
        cy.wait(10000)
        this.elements.searchResult().should('be.visible');
    }

}

module.exports = new SearchBar();