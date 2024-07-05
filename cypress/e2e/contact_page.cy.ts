describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display validation errors when submitting an empty form', () => {
    cy.get('.contact-form').submit()
    cy.get('.error-message').should('be.visible')
  })

  it('should enable the submit button when the form is valid', () => {
    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="subject"]').type('Test Subject')
    cy.get('textarea[name="message"]').type('This is a test message.')

    cy.get('input[type="submit"]').should('not.be.disabled')
  })

  it('should disable the submit button when the form is invalid', () => {
    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="subject"]').type('Test Subject')
    cy.get('textarea[name="message"]').type('This is a test message.')

    cy.get('input[type="submit"]').should('be.disabled')
  })

  it('should display error messages for invalid input', () => {
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('.contact-form').submit()
    cy.get('.error-message').contains('Invalid email').should('be.visible')
  })

  it('should submit the form on valid input', () => {
    cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
      statusCode: 200,
      body: { text: 'OK' },
    }).as('sendEmail')

    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="email"]').type('ache.niche00@mail.ru')
    cy.get('input[name="subject"]').type('Test Subject')
    cy.get('textarea[name="message"]').type('This is a test message.')

    cy.get('.contact-form').submit()
    
    cy.wait('@sendEmail').its('response.statusCode').should('eq', 200)
  })

  it('should get 500 status code after failed email submission', () => {
    cy.intercept('POST', 'https://api.emailjs.com/api/v1.0/email/send', {
      statusCode: 500,
      body: { text: 'Internal Server Error' },
    }).as('sendEmailFail')

    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('input[name="subject"]').type('Test Subject')
    cy.get('textarea[name="message"]').type('This is a test message.')

    cy.get('.contact-form').submit()

    cy.wait('@sendEmailFail').its('response.statusCode').should('eq', 500)
  })
})
