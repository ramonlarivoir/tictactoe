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
};