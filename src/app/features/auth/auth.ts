import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Autenticación</h3>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control" id="email" placeholder="Ingrese su email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
                </div>
                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-top: 50px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `]
})


export class Auth {

}