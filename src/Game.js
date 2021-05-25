import { INVALID_MOVE } from 'boardgame.io/core';
/*
  'setup' é uma função que inicializa os valores do estado do jogo (game state) 'G'
  'G' e 'ctx' são objetos gerenciados pelo próprio boardgame.io
  'ctx' contem metadata como 'turn' e 'currentPlayer'
*/

export const TicTacToe = {
  //  Cria as células com 9 posições
  setup: () => ({ cells: Array(9).fill(null) }),

  /*  
    Definindo a quantidade de movimentos do player em cada turno.
    Ao finalizar o movimento, o turno finaliza. 
  */
  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: (G, ctx, id) => {
      //  Valida se a célula já está em uso
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }

      //  Seta o id da célula com o id do player atual
      G.cells[id] = ctx.currentPlayer;
    },
  },

  //  Método para verificar o fim do jogo.
  //  Este método é chamado em todo fim de turno.
  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },

  // Método para adicionar bots ao jogo
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
};

// Condições para vitória
// Retorna true se `cells` está em uma configuração de vitória.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

// Retorna true se todas as `cells` estão preenchidas.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}