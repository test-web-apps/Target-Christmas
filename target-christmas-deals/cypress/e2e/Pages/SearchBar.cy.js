const  searchbarCy = require("../../integration/searchbar.cy");


describe('Target Search Bar', () => {
    beforeEach(() => {
        searchbarCy.visitHomePage();
    });

    it('Should display the search bar', () =>{
        searchbarCy.verifySearchBarPresence();
    });

    it('Should allow searching for a product',() => {
        searchbarCy.searchProduct('Christmas Tree');
        searchbarCy.verifySearchBarPresence();
    });

    it('Should show suggestions when typing in the search bar',() => {
        searchbarCy.verifySearchSuggestions('Christmas Tree ornaments');
    });

    // it.only('Should allow clicking a search suggestion and display results', () => {
    //     searchbarCy.clickSearchSuggestionAndVerifyResults('christmas tree');
    // });

});