import { Injectable } from '@angular/core';
 





@Injectable({
  providedIn: 'root'
})




export class SopaServices {

generateGrid(words: string[], size: number): any[][] {
  
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ letra: '', encontrada: false }))
  );

  // Colocar las palabras en direcciones aleatorias
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) { // Limitar intentos para evitar loop infinito
      const direction = Math.floor(Math.random() * 2); // 0: horizontal derecha, 1: horizontal izquierda
      const row = Math.floor(Math.random() * size);
      let col: number;

      if (direction === 0) { // Horizontal derecha
        col = Math.floor(Math.random() * (size - word.length));
        if (this.canPlaceWord(grid, word, row, col, direction)) {
          for (let i = 0; i < word.length; i++) {
            grid[row][col + i].letra = word[i];
          }
          placed = true;
        }
      } else { // Horizontal izquierda
        col = Math.floor(Math.random() * (size - word.length)) + word.length - 1;
        if (this.canPlaceWord(grid, word, row, col, direction)) {
          for (let i = 0; i < word.length; i++) {
            grid[row][col - i].letra = word[i];
          }
          placed = true;
        }
      }
      attempts++;
    }
  }

  // Rellenar con letras aleatorias
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c].letra) {
        grid[r][c].letra = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
}


  private canPlaceWord(grid: any[][], word: string, row: number, col: number, direction: number): boolean {
    for (let i = 0; i < word.length; i++) {
      let r = row, c = col;
      if (direction === 0) { // Horizontal derecha
        c = col + i;
      } else { // Horizontal izquierda
        c = col - i;
      }
      if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length ||
          (grid[r][c].letra !== '' && grid[r][c].letra !== word[i])) {
        return false;
      }
    }
    return true;
  }
}
