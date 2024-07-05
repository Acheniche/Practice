describe('Cart Page Tests', () => {
  beforeEach(() => {
    cy.visit('/cart') 
  })

  it('should display empty cart message when no items are in the cart', () => {
    cy.contains('Cart is empty(')
    cy.contains('Go to shop').click()
    cy.url().should('include', '/shop')
  })

  it('should add items to the cart and display them', () => {
    cy.visit('/shop')
    cy.get('.product-details').first().click()
    cy.contains('Add to Cart').click()
    cy.visit('/cart')
    cy.get('.product-item').should('have.length', 1)
  })

  it('should remove one item from the cart', () => {
    cy.visit('/shop')
    cy.get('.product-details').first().click()
    cy.contains('Add to Cart').click()
    cy.visit('/cart')
    cy.get('.product-item').should('have.length', 1)
    cy.get('[data-cy=remove-one]').click()
    cy.get('.product-item').should('have.length', 0)
  })

  it('should remove all items from the cart', () => {
    cy.visit('/shop')
    cy.get('.product-details').first().click()
    cy.contains('Add to Cart').click()
    cy.visit('/cart')
    cy.get('.product-item').should('have.length', 1)
    cy.get('[data-cy=remove-all]').click()
    cy.get('.product-item').should('have.length', 0)
  })

  it('should confirm purchase and display thank you message', () => {
    cy.visit('/shop')
    cy.get('.product-details').first().click()
    cy.contains('Add to Cart').click()
    cy.visit('/cart')
    cy.get('[data-cy=shop-now]').click()
    cy.contains('Confirm Purchase')
    cy.get('[data-cy=confirm-purchase]').click()
    cy.contains('Спасибо за покупку!')
  })
})
