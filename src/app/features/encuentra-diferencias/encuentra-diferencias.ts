import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-encuentra-diferencias',
  imports: [CommonModule, FormsModule],
  templateUrl: './encuentra-diferencias.html',
  styleUrl: './encuentra-diferencias.css'
})



export class EncuentraDiferencias {
  cant_diferencias = 6;
  cant_diferencias_usuario: number = 0;
  mensaje: string = '';

  submit() {
    // Almacenar el valor en la variable
    console.log('Respuesta enviada:', this.cant_diferencias_usuario);
    // Comparar con la cantidad real
    if (this.cant_diferencias_usuario === this.cant_diferencias) {
      this.mensaje = '¡Correcto! Has acertado el número de diferencias. 🎉';
    } else {
      this.mensaje = `💥 ¡Ups! No era esa. Pero cada intento te acerca al acierto. 😉🚀`;
    }
  }

}
