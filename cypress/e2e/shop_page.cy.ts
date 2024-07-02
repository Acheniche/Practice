describe('Shop Filters and Search', () => {
  beforeEach(() => {
    cy.visit('/shop')
  })

  it('should display the shop page correctly', () => {
    cy.viewport('iphone-6')
    cy.get('h1').contains('Shop The Latest')
    cy.get('.filters-button').should('exist').and('be.visible')
    cy.get('.product-list').should('exist').and('be.visible')
  })

  it('should open and close filters on mobile view', () => {
    cy.viewport('iphone-6')
    cy.get('.filters-button').should('be.visible').click()
    cy.get('.Filters').should('be.visible').and('have.class', 'open')
    cy.get('body').should('have.class', 'filters-open')

    cy.get('.close-filters').click()
    cy.get('.Filters').should('not.be.visible').and('not.have.class', 'open')
    cy.get('body').should('not.have.class', 'filters-open')
  })

  it('should filter products by category', () => {
    cy.viewport('iphone-6')
    cy.get('.filters-button').click()
    cy.get('select').eq(0).select('electronics')
    cy.get('.filter-button').click()
    cy.get('.close-filters').click()
    cy.wait(5000)
    cy.get('.product-card').each(($el) => {
      const expectedTexts = [
        'WD 2TB Elements Portable External Hard Drive - USB 3.0',
        'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
        'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
        'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
        'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
        'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED'
      ];
    
      cy.wrap($el).find('.product-details').invoke('text').then((text) => {
        const matched = expectedTexts.some(expectedText => text.includes(expectedText));
        expect(matched).to.be.true;
      });
    });
  })

  it('should sort products by price', () => {
    cy.viewport('iphone-6')
    cy.get('.filters-button').click()
    cy.get('select').eq(1).select('desc')
    cy.get('.filter-button').click()
    cy.get('.close-filters').click()
    let previousPrice = Number.MAX_VALUE
    cy.wait(5000)
    cy.get('.product-card').each(($el) => {
      cy.wrap($el).find('.product-details p').invoke('text').then((text) => {
        const currentPrice = parseFloat(text.replace('$', ''))
        expect(currentPrice).to.be.lte(previousPrice)
        previousPrice = currentPrice
      })
    })
  })

  it('should filter products by price range', () => {
    cy.viewport('iphone-6')
    cy.get('.filters-button').click()
    cy.get('.range-thumb').first().trigger('mousedown', { which: 1, force: true  })
      .trigger('mousemove', { clientX: 50, force: true  })
      .trigger('mouseup', { force: true })

    cy.get('.range-thumb').last().trigger('mousedown', { which: 1, force: true  })
      .trigger('mousemove', { clientX: 140, force: true  })
      .trigger('mouseup', {force: true })

    cy.get('.filter-button').click()
    cy.get('.close-filters').click()
    cy.wait(5000)
    cy.get('.product-card').each(($el) => {
      cy.wrap($el).find('.product-details p').invoke('text').then((text) => {
        const price = parseFloat(text.replace('$', ''))
        expect(price).to.be.within(100, 400) 
      })
    })
  })

  it('should search for products', () => {
    const searchTerm = 'shirt';
    cy.viewport('iphone-6');
    cy.get('.filters-button').click();
    cy.get('.search-container input').type(searchTerm);
    cy.get('.search-container button').click();
    cy.get('.close-filters').click();
    cy.wait(5000)
    cy.get('.product-card').each(($el) => {
      cy.wrap($el).find('.product-details h3').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
      });
    });
  });

  it('should adapt product card layout for mobile view', () => {
    cy.viewport('iphone-6')

    cy.get('.product-card h3').should('have.css', 'font-size', '18px')
    cy.get('.product-card p').should('have.css', 'font-size', '18px')
    cy.get('.add-to-cart').should('have.css', 'font-size', '14px')
    cy.get('.product-card img').should('have.css', 'height', '136px')
  })

})
