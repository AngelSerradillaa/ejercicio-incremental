describe('Proceso de compra de 3 productos', () => {
  let products;

  before(() => {
    // Carga la fixture con los productos de prueba antes de los tests
    cy.fixture('products.json').then((data) => {
      products = data;
    });
  });

  beforeEach(() => {
    // Mock de lista completa de productos
    cy.intercept('GET', 'https://fakestoreapi.com/products', products).as('getProducts');

    // Mock individual para detalles producto por ID
    cy.intercept('GET', /https:\/\/fakestoreapi\.com\/products\/\d+/, (req) => {
      const id = Number(req.url.split('/').pop());
      const product = products.find(p => p.id === id);
      req.reply(product ? product : {});
    }).as('getProduct');

    // Visitar la página principal
    cy.visit('/');
    cy.wait('@getProducts');
  });

  it('completa el flujo de compra de 3 productos', () => {
    // Añadir dos productos desde la home
    cy.get('.product-card').eq(0).click();
    cy.wait('@getProduct');
    cy.get('button').contains('Añadir al carrito').click();
    cy.go('back');

    cy.get('.product-card').eq(1).click();
    cy.wait('@getProduct');
    cy.get('button').contains('Añadir al carrito').click();
    cy.go('back');

    // Buscar un producto específico y añadir al carrito
    cy.get('input[placeholder="Buscar productos..."]').type('shirt{enter}');
    cy.get('.product-card').eq(0).click();
    cy.wait('@getProduct');
    cy.get('button').contains('Añadir al carrito').click();

    // Ir al carrito
    cy.get('button[routerlink="/basket"]').click();

    // Completar formulario de compra
    cy.get('input[name="nombre"]').type('Juan');
    cy.get('input[name="apellido"]').type('Pérez');
    cy.get('input[name="direccion"]').type('Calle Falsa 123');
    cy.get('input[name="cp"]').type('28080');
    cy.get('input[name="telefono"]').type('600123456');

    // Aceptar términos y condiciones (checkbox)
    cy.get('input[type="checkbox"]').check();

    // Enviar pedido
    cy.contains('button', 'Enviar pedido').click();

    // En la página de checkout (pago)
    cy.get('input[name="cardNumber"]').type('4999999999999999');
    cy.get('input[name="expiryDate"]').type('12/30');
    cy.get('input[name="cvc"]').type('123');

    // Pulsar botón Pagar
    cy.contains('button', 'Pagar').click();

    // Confirmación de pago
    cy.contains('h2', '✅ Pago completado').should('be.visible');
    cy.contains('Gracias por su compra.').should('be.visible');

    // Opcional: volver a inicio
    cy.contains('button', 'Volver a inicio').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});