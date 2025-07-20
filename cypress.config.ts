import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Cambia por el puerto de tu app si es distinto
    // otras configuraciones...
  },
});
