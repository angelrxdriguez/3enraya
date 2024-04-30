// Variables que voy a usar
let tablero = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let perdido = false;
let jugador1 = prompt("Ingrese el nombre del jugador 1:");
let jugador2 = prompt("Ingrese el nombre del jugador 2:");
// Obtener las celdas del tablero
const cells = document.querySelectorAll('.cell');

// Función para actualizar el tablero
function actualizarT() {
  $('.cell').each(function(index) {
    // Obtener el símbolo del jugador en la posición actual
    var symbol = tablero[index];

    // Seleccionar la celda actual
    var cell = $(this);

    // Limpiar el contenido de la celda
    cell.empty();

    // Si hay un símbolo en la posición actual
    if (symbol !== '') {
      // Crear una etiqueta de imagen
      var img = $('<img>');
      

      // Establecer el src de la imagen según el símbolo del jugador
      img.attr('src', symbol === 'X' ? 'x.png' : 'o.png');
      img.attr('width', '90');
      img.attr('height', '90');
      // Agregar la imagen a la celda
      cell.append(img);
    }
  });
}

// Función para comprobar si alguien ha ganado
function ganador() {
  // Comprobar filas
  if (
    (tablero[0] === currentPlayer && tablero[1] === currentPlayer && tablero[2] === currentPlayer) ||
    (tablero[3] === currentPlayer && tablero[4] === currentPlayer && tablero[5] === currentPlayer) ||
    (tablero[6] === currentPlayer && tablero[7] === currentPlayer && tablero[8] === currentPlayer)
  ) {
    return true;
  }

  // Comprobar columnas
  if (
    (tablero[0] === currentPlayer && tablero[3] === currentPlayer && tablero[6] === currentPlayer) ||
    (tablero[1] === currentPlayer && tablero[4] === currentPlayer && tablero[7] === currentPlayer) ||
    (tablero[2] === currentPlayer && tablero[5] === currentPlayer && tablero[8] === currentPlayer)
  ) {
    return true;
  }

  // Comprobar diagonales
  if (
    (tablero[0] === currentPlayer && tablero[4] === currentPlayer && tablero[8] === currentPlayer) ||
    (tablero[2] === currentPlayer && tablero[4] === currentPlayer && tablero[6] === currentPlayer)
  ) {
    return true;
  }

  return false;
}

// Función para cambiar de jugador
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Ahora, en lugar de asignar eventos a las celdas dentro del bucle forEach, lo haremos utilizando jQuery después de que el DOM esté completamente cargado.
$(document).ready(function() {
  // Asignar eventos a las celdas del tablero
  $('.cell').click(function() {
    // Obtener el índice de la celda clicada
    var index = $(this).index();
    
    // Si el juego ya ha terminado o la celda ya ha sido marcada, no hacer nada
    if (perdido || tablero[index]) {
      return;
    }

    // Marcar la celda con el símbolo del jugador actual
    tablero[index] = currentPlayer;
    actualizarT();

    // Comprobar si alguien ha ganado
    if (ganador()) {
      alert(`¡${currentPlayer === 'X' ? jugador1 : jugador2} es un grande!`);
      perdido = true;
      return;
    }

    // Si no hay ganador y todas las celdas están marcadas, el juego ha terminado en empate
    if (!tablero.includes('')) {
      alert('¡Empate!');
      perdido = true;
      return;
    }

    // Cambiar de jugador
    switchPlayer();
  });
});

// Función para reiniciar el juego
function resetGame() {
  tablero = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  perdido = false;
  actualizarT();
}

$(document).ready(function() {
  $('#reset-button').click(function() {
    resetGame();
  });
});

// Asignar eventos a las celdas del tablero
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    // Si el juego ya ha terminado o la celda ya ha sido marcada, no hacer nada
    if (perdido || tablero[index]) {
      return;
    }

    // Marcar la celda con el símbolo del jugador actual
    tablero[index] = currentPlayer;
    actualizarT();

    // Comprobar si alguien ha ganado
    if (ganador()) {
      alert(`¡${currentPlayer === 'X' ? jugador1 : jugador2} es un grande!`);
      perdido = true;
      return;
    }

    // Si no hay ganador y todas las celdas están marcadas, el juego ha terminado en empate
    if (!tablero.includes('')) {
      alert('¡Empate!');
      perdido = true;
      return;
    }

    // Cambiar de jugador
    switchPlayer();
  });
});

// Asignar evento al botón de reinicio
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
