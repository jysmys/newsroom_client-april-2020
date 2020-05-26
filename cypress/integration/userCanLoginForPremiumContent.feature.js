describe('User authenticates', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/');
  });

  describe('successfully', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/auth/*",
        response: "fixture:successful_login.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/articles",
        response: "fixture:article_list.json",
        headers: {
          uid:"user@mail.com"
        }
      })
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/articles/3",
        response: "fixture:premium_article.json",
        headers: {
          uid:"user@mail.com"
        }
      });
      cy.get('#login').click();
      cy.get('#login-form').within(() => {
        cy.get('#email').type('user@mail.com');
        cy.get('#password').type('password');
        cy.get('Button').contains('Submit').click();
      });
    })

    it('with valid credentials', () => {
      cy.get('.header').should('contain', 'Welcome user@mail.com');
    });

    it('and is directed to main page', () => {
      cy.get("#article-1").should("contain", "title 1");
    });

    it('can view premium article', () => {
      cy.visit('/article/3');
      cy.get("#article-3-body").its('length').should('be.gt', 100);
    })
  })

  // describe('unsuccessfully', () => {
  //   it("with invalid credentials", () => {
  //     cy.route({
  //       method: "POST",
  //       url: "http://localhost:3000/api/auth/*",
  //       response: "fixture:unsuccessful_login.json",
  //       headers: {
  //         uid:"user@mail.com"
  //       },
  //       status: 400
  //     })
  //     cy.get("#login-form").within(() => {
  //       cy.get("#email").type("user@mail.com");
  //       cy.get("#password").type("wrongpassword");
  //       cy.get('Button').contains('Submit').click()
  //     });
  //     cy.get("#error-message").should("contain", "Invalid login credentials. Please try again.");
  //   });
  // })

  // describe('and can end his/her session', () => {
  //   beforeEach(() => {
  //     cy.route({
  //       method: "POST",
  //       url: "http://localhost:3000/api/auth/*",
  //       response: "fixture:successful_login.json",
  //       headers: {
  //         uid:"user@mail.com"
  //       }
  //     })
  //     cy.route({
  //       method: "GET",
  //       url: "http://localhost:3000/api/auth/*",
  //       response: "fixture:successful_login.json",
  //       headers: {
  //         uid:"user@mail.com"
  //       }
  //     })
  //     cy.route({
  //       method: "DELETE",
  //       url: "http://localhost:3000/api/auth/*",
  //       response: "fixture:logout.json",
  //       headers: {
  //         uid: "user@mail.com"
  //       }
  //     })
  //     cy.get('#login-form').within(() => {
  //       cy.get('#email').type('user@mail.com');
  //       cy.get('#password').type('password');
  //       cy.get('Button').contains('Submit').click();
  //     });
  //   })

  //   it('clicking the Log out button', () => {
  //     cy.get('#logout').contains('Log out user@mail.com').click()
  //     cy.get('#logout').should('not.exist')
  //   })

  //   it('and is redirected to login page', () => {
  //     cy.get('#logout').contains('Log out user@mail.com').click()
  //     cy.get('#login-form').should('be.visible')
  //   })
  // })
});