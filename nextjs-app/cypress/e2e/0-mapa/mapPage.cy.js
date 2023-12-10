/// <reference types="cypress" />

describe('MapPage', () => {
  beforeEach(() => {
    cy.visit(' http://localhost:3000/map');
  });

  it('displays Input for searching', () => {
    cy.get('input[placeholder="🔍 Address"]')
      .should('be.visible')
      .should('be.enabled');
  });

  it('can type and enter and show result on list', () => {
    const newSearch = 'Manila';
    cy.get('input[placeholder="🔍 Address"]').type(`${newSearch}{enter}`);
    cy.get('ul').should('contain', newSearch);
  });
});
