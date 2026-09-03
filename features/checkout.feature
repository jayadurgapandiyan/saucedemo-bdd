Feature: SauceDemo checkout

  Scenario: Successfully complete checkout with four selected products
    Given I open the SauceDemo website
    When I login with username "standard_user" and password "secret_sauce"
    And I handle the popup if it appears
    And I verify the Products page
    And I add the selected products to the cart
    Then I should see exactly 4 products in the cart
    When I navigate to the cart page
    Then I verify the Cart page
    And I verify all selected products are displayed
    When I click the Checkout button
    Then I should see the Checkout Information page
    When I enter first name "jaya"
    And I enter last name "durga"
    And I enter zip code "600014"
    And I click the Continue button
    Then I should see the Checkout Overview page
    And I should see all selected products
    When I click the Finish button
    Then I should see the order confirmation message "Thank you for your order!"
    And the URL should contain "checkout-complete.html"
