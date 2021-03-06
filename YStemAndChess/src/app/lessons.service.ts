import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  learningsArray = [
    {
      name: 'Pawn-It moves forward only',
      subSections: [
        {
          name: 'Basic',
          fen: '8/8/8/P7/8/5p2/8/8 w k - 0 1',
          info: `Pawns move one square only.
          But when they reach the other side of the board, they become a stronger piece!`,
        },
        {
          name: 'Capture',
          fen: '8/3p4/2p5/3p4/8/4P3/8/8 w - - 0 1',
          info: `Pawns move forward,
          but capture diagonally!`,
        },
        {
          name: 'Training 1',
          fen: '8/2p5/1ppp4/8/1pp5/1P6/8/8 w - - 0 1',
          info: 'Capture, then promote!',
        },
        {
          name: 'Training 2',
          fen: '2p5/3p4/1p2p3/1p1p4/2p5/3P4/8/8 w - - 0 1',
          info: `Capture, then promote!`,
        },
        {
          name: 'Traning 3',
          fen: '8/8/8/1pp1p3/3p2p1/P1PP3P/8/8 w - - 0 1',
          info: `Use all the pawns!
          No need to promote.`,
        },
        {
          name: 'Special Move',
          fen: '8/8/3p4/8/8/8/4P3/8 w - - 0 1',
          info: `A pawn on the second rank can move 2 squares at once!`,
        },
      ],
    },
    {
      name: 'Bishop',
      subSections: [
        {
          name: 'The Pawn',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Bishop',
          fen: '3qkbnR/3ppppp/8/8/8/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Knight',
          fen: '3qknnr/3ppppp/7k/8/7k/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Rook',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Queen',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The King',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
      ],
    },
    {
      name: 'Knight',
      subSections: [
        {
          name: 'The Pawn',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Bishop',
          fen: '3qkbnR/3ppppp/8/8/8/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Knight',
          fen: '3qknnr/3ppppp/7k/8/7k/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Rook',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Queen',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The King',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
      ],
    },
    {
      name: 'Rook',
      subSections: [
        {
          name: 'The Pawn',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Bishop',
          fen: '3qkbnR/3ppppp/8/8/8/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Knight',
          fen: '3qknnr/3ppppp/7k/8/7k/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Rook',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Queen',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The King',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
      ],
    },
    {
      name: 'Queen',
      subSections: [
        {
          name: 'The Pawn',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Bishop',
          fen: '3qkbnR/3ppppp/8/8/8/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Knight',
          fen: '3qknnr/3ppppp/7k/8/7k/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Rook',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Queen',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The King',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
      ],
    },
    {
      name: 'King',
      subSections: [
        {
          name: 'The Pawn',
          fen: 'R7/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Bishop',
          fen: '3qkbnR/3ppppp/8/8/8/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Knight',
          fen: '3qknnr/3ppppp/7k/8/7k/8/6PP/6KN w k - 0 1',
        },
        {
          name: 'The Rook',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The Queen',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
        {
          name: 'The King',
          fen: '7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1',
        },
      ],
    },
  ];
  constructor() {}

  getLearnings() {
    return this.learningsArray;
  }
}
