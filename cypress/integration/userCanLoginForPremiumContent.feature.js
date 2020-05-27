describe("successfully", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/articles",
      response: "fixture:article_list.json",
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/articles/3",
      response: "fixture:premium_article.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.visit("/");
    cy.get("button#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("Button#submit").contains("Submit").click();
    });
  });

  it("and is directed to main page", () => {
    cy.get("#article-1").should("contain", "title 1");
  });

  it("with valid credentials", () => {
    cy.get("div#login").within(() => {
      cy.get("p").should("contain", "user@mail.com");
    });
  });

  it("can view premium article", () => {
    cy.visit("/article/3");
    cy.get("#article-3-body").then((text) => {
      text.length >= 100;
    });
  });
});

describe('unsuccessfully', () => {
  before(() => {
    cy.visit('/sign_in');
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/*",
      response: "fixture:unsuccessful_login.json",
      headers: {
        uid:"user@mail.com"
      },
      status: 400
    })
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("wrongpassword");
      cy.get('Button').contains('Submit').click()
    });
  })
    it("with invalid credentials", () => {
    cy.get("#error-message").should("contain", "Invalid login credentials. Please try again.");
  });


describe('and can end his/her session', () => {
  beforeEach(() => {
    cy.visit('/sign_in');
    cy.server();
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
      method: "DELETE",
      url: "http://localhost:3000/api/auth/*",
      response: "fixture:logout.json",
      headers: {
        uid: "user@mail.com"
      }
    })
    cy.get('#login-form').within(() => {
      cy.get('#email').type('user@mail.com');
      cy.get('#password').type('password');
      cy.get('Button').contains('Submit').click();
    });
  })

  it('clicking the Log out button', () => {
    cy.get('#logout').contains('Logout').click()
    cy.get('#logout').should('not.exist')
  })

  it('and is redirected to login page', () => {
    cy.get('#logout').contains('Logout').click()
    cy.get('#login-form').should('be.visible')
  })
  })
})

describe('User can sign up for an account to see premium content', () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.visit('/sign_in');
    cy.get('#login-form').contains('Click here').click();
  })
  it('completes sign up form succesfully', () => {
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('user@mail.com');
      cy.get('#password').type('password');
      cy.get('#password-confirmation').type('password');
      cy.get('Button').contains('Submit').click();
      cy.get('')
    });
  });
  

})
