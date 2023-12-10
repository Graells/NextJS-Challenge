/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit(' http://localhost:3000');
  });

  it('displays Input for searching', () => {
    cy.get('input[placeholder="🔍 Address"]')
      .should('be.visible')
      .should('be.enabled');
  });

  it('can type and enter and redirect to /map route', () => {
    const newSearch = 'Tokyo';
    cy.get('input[placeholder="🔍 Address"]').type(`${newSearch}{enter}`);
    cy.url({ timeout: 3000 }).should('include', '/map');
  });
});
