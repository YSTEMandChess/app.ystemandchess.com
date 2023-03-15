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
      name: 'Bishop - It moves diagonally ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/7p/8/8/4p3/8/6B1/8 w - - 0 1',
          info: 'Grab all the black pawns! ',
        },
        {
          name: 'Training 1',
          fen: '8/8/8/1p6/8/1B1p4/p3p3/1p1p4 w - - 0 1',
          info: `The fewer moves you make, the better!`,
        },
        {
          name: 'Training 2',
          fen: '8/8/8/8/p1B5/1p1p4/2p1p3/1p6 w - - 0 1',
          info: 'Grab all the black pawns!',
        },
        {
          name: 'Training 3',
          fen: '8/8/8/3pp3/3pp3/3pp3/8/2B2B2 w - - 0 1',
          info: `One light-squared bishop, one dark-squared bishop. You need both!`,
        },
        {
          name: 'Training 4',
          fen: '8/6p1/1p5p/8/3B4/4p3/8/p1p5 w - - 0 1',
          info: 'Grab all the black pawns!',
        },
        {
          name: 'Final',
          fen: '6p1/3Bp2p/5p2/5p2/7p/p1B5/2p5/8 w - - 0 1',
          info: `One light-squared bishop, one dark-squared bishop. You need both!`,
        },
      ],
    },
    {
      name: 'Knight - It moves in an L shape ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/3p4/8/2p5/4N3/8/8/8 w - - 0 1',
          info: `Knights have a fancy way of jumping around!`,
        },
        {
          name: 'Training 1',
          fen: '7p/5p2/8/6p1/3p4/2p2p2/4p3/1N6 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 2',
          fen: '8/2Np4/1p2p3/3p4/5p2/8/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 3',
          fen: '8/8/8/8/4ppp1/4pNp1/4ppp1/8 w - - 0 1',
          info: `Knights can jump over obstacles!Escape and vanquish the pawns!`,
        },
        {
          name: 'Training 4',
          fen: '8/8/6p1/8/4pp2/2pN4/4pp2/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Final',
          fen: '2p5/2N1p3/2p5/1p1p1p2/1p1p4/4p3/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
      ],
    },
    {
      name: 'Rook - It moves in straight lines ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/8/4p3/8/8/8/4R3/8 w - - 0 1',
          info: `Click on the rook to bring it to the pawn!`,
        },
        {
          name: 'Training 1',
          fen: '8/2R5/8/2p2p2/8/8/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 2',
          fen: '8/8/8/8/8/1p2R2p/7p/8 w - - 0 1',
          info: `The fewer moves you make, the better!`,
        },
        {
          name: 'Training 3',
          fen: '5ppR/6pp/8/8/8/8/8/6p1 w - - 0 1',
          info: `The fewer moves you make, the better!`,
        },
        {
          name: 'Training 4',
          fen: '8/2R3p1/8/8/p3R2p/6p1/8/8 w - - 0 1',
          info: `Use two rooks to speed things up!`,
        },
        {
          name: 'Final',
          fen: '8/1p3pp1/8/3p4/6p1/5R2/5p2/R2p4 w - - 0 1',
          info: `Use two rooks to speed things up!`,
        },
      ],
    },
    {
      name: 'Queen - Queen = rook + bishop  ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/2p5/8/4p3/8/8/4Q3/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 1',
          fen: '5p2/8/8/8/3Q4/p6p/5p2/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 2',
          fen: '5p2/8/3p3p/8/2Q5/p5p1/8/5p2 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 3',
          fen: '6p1/6Q1/8/1p5p/8/3p4/p6p/6p1 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Final',
          fen: '6p1/8/p4pp1/8/7p/8/5p2/3pQ2p w - - 0 1',
          info: `Grab all the pawns!`,
        },
      ],
    },
    {
      name: 'King - The most important piece ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/8/3p4/8/8/8/3K4/8 w - - 0 1',
          info: 'The king is slow.  ',
        },
        {
          name: 'Training',
          fen: '8/8/8/8/8/3p4/2p1p3/4K3 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Final',
          fen: '8/8/8/2ppK3/2p3p1/4pp2/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
      ],
    },
  ];

  pawnArray = [
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
  ];

  bishopArray = [
    {
      name: 'Bishop - It moves diagonally ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/7p/8/8/4p3/8/6B1/8 w - - 0 1',
          info: 'Grab all the black pawns! ',
        },
        {
          name: 'Training 1',
          fen: '8/8/8/1p6/8/1B1p4/p3p3/1p1p4 w - - 0 1',
          info: `The fewer moves you make, the better!`,
        },
        {
          name: 'Training 2',
          fen: '8/8/8/8/p1B5/1p1p4/2p1p3/1p6 w - - 0 1',
          info: 'Grab all the black pawns!',
        },
        {
          name: 'Training 3',
          fen: '8/8/8/3pp3/3pp3/3pp3/8/2B2B2 w - - 0 1',
          info: `One light-squared bishop, one dark-squared bishop. You need both!`,
        },
        {
          name: 'Training 4',
          fen: '8/6p1/1p5p/8/3B4/4p3/8/p1p5 w - - 0 1',
          info: 'Grab all the black pawns!',
        },
        {
          name: 'Final',
          fen: '6p1/3Bp2p/5p2/5p2/7p/p1B5/2p5/8 w - - 0 1',
          info: `One light-squared bishop, one dark-squared bishop. You need both!`,
        },
      ],
    },
  ];

  Knight = [
    {
      name: 'Knight - It moves in an L shape ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/3p4/8/2p5/4N3/8/8/8 w - - 0 1',
          info: `Knights have a fancy way of jumping around!`,
        },
        {
          name: 'Training 1',
          fen: '7p/5p2/8/6p1/3p4/2p2p2/4p3/1N6 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 2',
          fen: '8/2Np4/1p2p3/3p4/5p2/8/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 3',
          fen: '8/8/8/8/4ppp1/4pNp1/4ppp1/8 w - - 0 1',
          info: `Knights can jump over obstacles!Escape and vanquish the pawns!`,
        },
        {
          name: 'Training 4',
          fen: '8/8/6p1/8/4pp2/2pN4/4pp2/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Final',
          fen: '2p5/2N1p3/2p5/1p1p1p2/1p1p4/4p3/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
      ],
    },
  ];

  Rook = [
    {
      name: 'Rook - It moves in straight lines ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/8/4p3/8/8/8/4R3/8 w - - 0 1',
          info: `Click on the rook to bring it to the pawn!`,
        },
        {
          name: 'Training 1',
          fen: '8/2R5/8/2p2p2/8/8/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 2',
          fen: '8/8/8/8/8/1p2R2p/7p/8 w - - 0 1',
          info: `The fewer moves you make, the better!`,
        },
        {
          name: 'Training 3',
          fen: '5ppR/6pp/8/8/8/8/8/6p1 w - - 0 1',
          info: `The fewer moves you make, the better!`,
        },
        {
          name: 'Training 4',
          fen: '8/2R3p1/8/8/p3R2p/6p1/8/8 w - - 0 1',
          info: `Use two rooks to speed things up!`,
        },
        {
          name: 'Final',
          fen: '8/1p3pp1/8/3p4/6p1/5R2/5p2/R2p4 w - - 0 1',
          info: `Use two rooks to speed things up!`,
        },
      ],
    },
  ];

  Queen = [
    {
      name: 'Queen - Queen = rook + bishop  ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/2p5/8/4p3/8/8/4Q3/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 1',
          fen: '5p2/8/8/8/3Q4/p6p/5p2/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 2',
          fen: '5p2/8/3p3p/8/2Q5/p5p1/8/5p2 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Training 3',
          fen: '6p1/6Q1/8/1p5p/8/3p4/p6p/6p1 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Final',
          fen: '6p1/8/p4pp1/8/7p/8/5p2/3pQ2p w - - 0 1',
          info: `Grab all the pawns!`,
        },
      ],
    },
  ];

  King = [
    {
      name: 'King - The most important piece ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/8/3p4/8/8/8/3K4/8 w - - 0 1',
          info: 'The king is slow.  ',
        },
        {
          name: 'Training',
          fen: '8/8/8/8/8/3p4/2p1p3/4K3 w - - 0 1',
          info: `Grab all the pawns!`,
        },
        {
          name: 'Final',
          fen: '8/8/8/2ppK3/2p3p1/4pp2/8/8 w - - 0 1',
          info: `Grab all the pawns!`,
        },
      ],
    },
  ];

  constructor() {}

  getLearnings(offset=10) {
    if(offset ==0)
    {
      return this.pawnArray;
    }else if(offset ==1)
    {
      return this.bishopArray;
    }
    else if(offset ==2)
    {
      return this. Knight;
    }
    else if(offset ==3)
    {
      return this.Rook;
    }
    else if(offset ==4)
    {
      return this. Queen;
    }
    else if(offset ==5)
    {
      return this.King;
    }
    else if(offset ==10)
    {
      return this.learningsArray;
    }
    
  }
}
