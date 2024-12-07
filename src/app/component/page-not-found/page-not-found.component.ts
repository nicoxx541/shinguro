import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="error-container">
      <h1>Error 404</h1>
      <p>"Te equivocaste, vuelve a intentarlo."</p>
      <p>La página que buscas no existe.</p>
      <button (click)="goBack()">Volver</button>
    </div>
  `,
  styles: [
    `
      .error-container {
        text-align: center;
        margin-top: 50px;
        color: #444;
      }

      .error-container h1 {
        font-size: 2.5rem;
        font-weight: bold;
        color: #e63946;
      }

      .error-container p {
        font-size: 1.2rem;
        color: #555;
      }

      .error-container button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 1rem;
        color: #fff;
        background-color: #457b9d;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .error-container button:hover {
        background-color: #1d3557;
      }
    `,
  ],
})
export class PageNotFoundComponent {
  goBack() {
    window.history.back(); // Esto permite volver a la página anterior
  }
}
