describe("About Page", () => {
  it("Open About Page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("About");
  });
});
