const homepageCy = require("../../integration/homepage.cy")

describe('Target Christmas Deals Homepage Tests', () => {
    beforeEach(() => {
        homepageCy.visitHomePage();  // Open homepage before each test
    });
  
    it('Should display the header', () => {
        homepageCy.verifyHeader();  // Verify the header is visible
    });
  
    it('Should display the navigation bar', () => {
        homepageCy.verifyNavigationBar();  // Verify navigation bar is visible
    });
  
    it('Should make all banners clickable', () => {
        homepageCy.verifyAllBannersClickable();  // Check that banners are clickable
    });
  
    it('Should allow searching for a product', () => {
        homepageCy.searchProduct('Christmas Tree');  // Search for a product
    });
  
    it('Should navigate carousel when arrows are clicked', () => {
        homepageCy.checkCarouselNavigation();  // Test carousel navigation
    });
  
    it('Should display category icons', () => {
        homepageCy.verifyCategoryIcons();
    });

    it('Should display Christmas Deals section', () => {
        homepageCy.verifyChristmasDealsSection();  // Verify Christmas Deals section
    });
  });