// test.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('My First Test', () => {
    it('visit cite and test it', () => {
      cy.visit('http://localhost:3000/discover')
      cy.findByRole('banner').within(()=>{
        cy.findByRole('searchbox', { name: /search/i })
        .click().type('Alien{enter}')
      })
      cy.findByRole('main').within(()=>{
          cy.get('[aria-label="Alien"]').within(()=>{
            cy.get('[aria-label="add to favourite"]').click()
            cy.get('[aria-label="add to watch later list"]').click()
          })
      })
      cy.findByRole('navigation').within(()=>{
          cy.findByRole('link', { name: /favourite/i }).click()
      })

      cy.findByRole('main').within(()=>{
        cy.findAllByRole('listitem').should('have.length', 1)
      })

      cy.findByRole('main').within(()=>{
        cy.get('[aria-label="Alien"]').within(()=>{
          cy.get('[aria-label="add to favourite"]').click()
        })
    })

    cy.findByRole('main').within(()=>{
        cy.findAllByRole('listitem').should('have.length', 0)
      })

      cy.findByRole('navigation').within(()=>{
        cy.findByRole('link', { name: /watch later/i }).click()
      })

      cy.findByRole('main').within(()=>{
        cy.findAllByRole('listitem').should('have.length', 1)
      })

      cy.findByRole('main').within(()=>{
        cy.get('[aria-label="Alien"]').within(()=>{
          cy.get('[aria-label="add to watch later list"]').click()
        })  
      })

      cy.findByRole('main').within(()=>{
        cy.findAllByRole('listitem').should('have.length', 0)
      })


    })
  })

