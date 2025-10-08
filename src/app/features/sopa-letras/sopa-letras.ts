import { Component, OnInit } from '@angular/core';
import { SopaServices } from '../../core/services/sopa-services';
import { CommonModule } from '@angular/common';

interface Celda {
  letra: string;
  encontrada: boolean;
  seleccionada: boolean;
}

@Component({
  selector: 'app-sopa-letras',
  imports: [CommonModule],
  templateUrl: './sopa-letras.html',
  styleUrl: './sopa-letras.css'
})


 

export class SopaLetras implements OnInit {
  palabras = ['BRILLAR', 'LORENZANAS', 'VOZ', 'COLOR', 'LUZ', 'HISTORIA', 'VALORAR', 'MUSICA', 'DIALOGO', 'REFLEJAR'];
  encontradas: string[] = [];
  tablero: Celda[][] = [];
  seleccion: { letra: string, x: number, y: number }[] = [];
  seleccionando = false;
  showSuccessMessage = false;

  constructor(private SopaServices: SopaServices) {}

  ngOnInit() {
    this.tablero = this.SopaServices.generateGrid(this.palabras, 14);
  }

  startSelection(rowIndex: number, colIndex: number) {
    this.seleccionando = true;
    this.seleccion = [{ letra: this.tablero[rowIndex][colIndex].letra, x: rowIndex, y: colIndex }];
    this.tablero[rowIndex][colIndex].seleccionada = true;
  }

  continueSelection(rowIndex: number, colIndex: number) {
    if (!this.seleccionando) return;
    const cell = this.tablero[rowIndex][colIndex];
    if (!cell.seleccionada) {
      cell.seleccionada = true;
      this.seleccion.push({ letra: cell.letra, x: rowIndex, y: colIndex });
    }
  }

  onTouchMove(event: TouchEvent) {
    if (!this.seleccionando) return;
    event.preventDefault(); // Prevenir scroll

    const touch = event.touches[0];
    const gridElement = event.currentTarget as HTMLElement;
    const gridRect = gridElement.getBoundingClientRect();

    // Obtener tamaño de celda dinámicamente
    const firstCell = gridElement.querySelector('.cell') as HTMLElement;
    if (!firstCell) return;
    const cellSize = firstCell.offsetWidth;
    const padding = parseInt(getComputedStyle(gridElement).paddingLeft) || 15;
    const margin = 1; // Margin de celda

    const relativeX = touch.clientX - gridRect.left - padding;
    const relativeY = touch.clientY - gridRect.top - padding;

    const colIndex = Math.floor(relativeX / (cellSize + 2 * margin));
    const rowIndex = Math.floor(relativeY / (cellSize + 2 * margin));

    if (rowIndex >= 0 && rowIndex < this.tablero.length &&
        colIndex >= 0 && colIndex < this.tablero[0].length) {
      this.continueSelection(rowIndex, colIndex);
    }
  }

  endSelection() {
    this.seleccionando = false;

    if (this.seleccion.length < 2) {
      // Limpiar si menos de 2 letras
      this.clearSelection();
      return;
    }

    // Verificar si la selección forma una línea recta
    if (!this.isValidSelection()) {
      this.clearSelection();
      return;
    }

    const palabraSeleccionada = this.seleccion.map(c => c.letra).join('');

    // Verificar si coincide con alguna palabra
    const palabraValida = this.palabras.find(p =>
      p === palabraSeleccionada || p.split('').reverse().join('') === palabraSeleccionada
    );

    if (palabraValida && !this.encontradas.includes(palabraValida)) {
      // Marcar celdas como encontradas
      this.seleccion.forEach(c => {
        this.tablero[c.x][c.y].encontrada = true;
      });
      this.encontradas.push(palabraValida);

      // Verificar si todas las palabras han sido encontradas
      if (this.encontradas.length === this.palabras.length) {
        setTimeout(() => {
          this.showSuccessMessage = true;
        }, 500); // Pequeño delay para que se vea el último resaltado
      }
    }

    // Limpiar selección temporal
    this.clearSelection();
  }

  reiniciarJuego() {
    this.encontradas = [];
    this.seleccion = [];
    this.seleccionando = false;
    this.showSuccessMessage = false;
    this.tablero = this.SopaServices.generateGrid(this.palabras, 14);
  }

  private isValidSelection(): boolean {
    if (this.seleccion.length < 2) return false;

    const first = this.seleccion[0];
    const last = this.seleccion[this.seleccion.length - 1];

    const dx = last.x - first.x;
    const dy = last.y - first.y;

    // Calcular dirección
    let dirX = 0, dirY = 0;
    if (dx !== 0) dirX = dx > 0 ? 1 : -1;
    if (dy !== 0) dirY = dy > 0 ? 1 : -1;

    // Verificar que todas las celdas estén en línea recta
    for (let i = 1; i < this.seleccion.length; i++) {
      const expectedX = first.x + i * dirX;
      const expectedY = first.y + i * dirY;
      if (this.seleccion[i].x !== expectedX || this.seleccion[i].y !== expectedY) {
        return false;
      }
    }

    return true;
  }

  private clearSelection() {
    this.tablero.forEach(fila =>
      fila.forEach(celda => (celda.seleccionada = false))
    );
    this.seleccion = [];
  }

}
