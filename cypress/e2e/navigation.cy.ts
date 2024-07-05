describe('Header Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to the Shop page', () => {
    cy.get('nav a').contains('Shop').click()
    cy.url().should('include', '/shop')
  })

  it('should navigate to the Cart page', () => {
    cy.get('nav a').get('#CartImg').click()
    cy.url().should('include', '/cart')
  })

  it('should navigate to the Login page if not authenticated', () => {
    cy.get('nav a').contains('Login').click()
    cy.url().should('include', '/login')
  })

  it('should navigate to the Registration page if not authenticated', () => {
    cy.get('nav a').contains('Registration').click()
    cy.url().should('include', '/registration')
  })

  it('should logout if authenticated', () => {
    cy.visit('/login')
    cy.get('input[placeholder="E-mail Address"]').type('test@test.com')
    cy.get('input[placeholder="Password"]').type('Test1!')
    cy.get('body').click('topLeft', { force: true }); 
    cy.get('.login__btn').contains('Login').click()
    cy.wait(5000)
    cy.get('nav a').contains('Logout').click()
    cy.url().should('include', '/')
  })

  it('should open and close the mobile menu', () => {
    cy.viewport('iphone-6')
    cy.get('.burger').click()
    cy.get('.mobile-menu').should('be.visible')
    cy.get('.mobile-menu nav a').contains('Home').click()
    cy.get('.mobile-menu').should('not.be.visible')
  })
})