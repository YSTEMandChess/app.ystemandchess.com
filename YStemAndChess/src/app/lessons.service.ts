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
    {
      name: 'piece checkmate 1',
      subSections: [
        {
          name: 'Queen and rook mate',
          fen: '8/8/3k4/8/8/4K3/8/Q6R w k - 0 1',
          info: 'Use your queen and rook to restrict the king and deliver checkmate. Mate in 3 if played perfectly.',
        },
        {
          name: 'Two rook mate',
          fen: '8/8/3k4/8/8/4K3/8/R6R',
          info: "Use your rooks to restrict the king and deliver checkmate. Mate in 4 if played perfectly.",
        },
        {
          name: 'Queen and bishop mate',
          fen: '8/8/3k4/8/8/2QBK3/8/8',
          info: `Use your queen and bishop to restrict the king and deliver checkmate. Mate in 5 if played perfectly.`,
        },
        {
          name: 'Queen and knight mate',
          fen: '8/8/3k4/8/8/2QNK3/8/8',
          info: `Use your queen and knight to restrict the king and deliver checkmate. Mate in 5 if played perfectly.`,
        },
        {
          name: 'Queen mate',
          fen: '8/8/3k4/8/8/4K3/8/4Q3',
          info: `Use your queen to restrict the king, force it to the edge of the board and deliver checkmate. The queen can't do it alone, so use your king to help. Mate in 6 if played perfectly.`,
        },
        {
          name: 'Rook mate',
          fen: '8/8/3k4/8/8/4K3/8/4R3',
          info: `Use your rook to restrict the king, force it to the edge of the board and deliver checkmate. The rook can't do it alone, so use your king to help. Mate in 11 if played perfectly.`,
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

  pieceCheckmate1 = [
    {
      name: 'piece checkmate 1 Basic checkmates',
      subSections: [
        {
          name: 'Queen and rook mate',
          fen: '8/8/3k4/8/8/4K3/8/Q6R w - - 0 1',
          info: 'Use your queen and rook to restrict the king and deliver checkmate. Mate in 3 if played perfectly.',
        },
        {
          name: 'Two rook mate',
          fen: '8/8/3k4/8/8/4K3/8/R6R w - - 0 1',
          info: `Use your rooks to restrict the king and deliver checkmate. Mate in 4 if played perfectly.`,
        },
        {
          name: 'Queen and bishop mate',
          fen: '8/8/3k4/8/8/2QBK3/8/8 w - - 0 1',
          info: `Use your queen and bishop to restrict the king and deliver checkmate. Mate in 5 if played perfectly.`,
        },
        {
          name: 'Queen and knight mate',
          fen: '8/8/3k4/8/8/2QNK3/8/8 w - - 0 1',
          info: `Use your queen and knight to restrict the king and deliver checkmate. Mate in 5 if played perfectly.`,
        },
        {
          name: 'Queen mate',
          fen: '8/8/3k4/8/8/4K3/8/4Q3 w - - 0 1',
          info: `Use your queen to restrict the king, force it to the edge of the board and deliver checkmate. The queen can't do it alone, so use your king to help. Mate in 6 if played perfectly.`,
        },
        {
          name: 'Rook mate',
          fen: '8/8/3k4/8/8/4K3/8/4R3 w - - 0 1',
          info: `Use your rook to restrict the king, force it to the edge of the board and deliver checkmate. The rook can't do it alone, so use your king to help. Mate in 11 if played perfectly.`,
        },
      ],
    },
  ];

  checkmatePatternI = [
    {
      name: 'checkmate pattern I Recognize the patterns',
      subSections: [
        {
          name: "Back-Rank  Mate #1",
          fen: "6k1/4Rppp/8/8/8/8/5PPP/6K1 w - - 0 1",
          info: "A Back-Rank Mate is a checkmate delivered by a rook or queen along the back rank in which the mated king is unable to move up the board because the king is blocked by friendly pieces (usually pawns) on the second rank."
        },
        {
          name: "Back-Rank  Mate #2",
          fen: "2r1r1k1/5ppp/8/8/Q7/8/5PPP/4R1K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Back-Rank  Mate #3",
          fen: "8/1p6/kp6/1p6/8/8/5PPP/5RK1 w - - 0 1",
          info: "Checkmate the opponent in 1 move"
        },
        {
          name: "Back-Rank  Mate #4",
          fen: "6k1/3qb1pp/4p3/ppp1P3/8/2PP1Q2/PP4PP/5RK1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Hook mate #1",
          fen: "R7/4kp2/5N2/4P3/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Hook Mate involves the use of a rook, knight, and pawn along with one blockading piece to limit the opponent's king's escape. In this mate, the rook is protected by the knight and the knight is protected by the pawn."
        },
        {
          name: "Hook mate #2",
          fen: "5r1b/2R1R3/P4r2/2p2Nkp/2b3pN/6P1/4PP2/6K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Hook mate #3",
          fen: "2b1Q3/1kp5/p1Nb4/3P4/1P5p/p6P/K3R1P1/5q2 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Anastasia’s mate #1",
          fen: "5r2/1b2Nppk/8/2R5/8/8/5PPP/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. In Anastasia's Mate, a knight and rook team up to trap the opposing king between the side of the board on one side and a friendly piece on the other. This checkmate got its name from the novel 'Anastasia und das Schachspiel' by Johann Jakob Wilhelm Heinse."
        },
        {
          name: "Anastasia’s mate #2",
          fen: "5r1k/1b2Nppp/8/2R5/4Q3/8/5PPP/6K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Anastasia’s mate #3",
          fen: "5rk1/1b3ppp/8/2RN4/8/8/2Q2PPP/6K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Anastasia’s mate #4",
          fen: "1r5k/6pp/2pr4/P1Q3bq/1P2Bn2/2P5/5PPP/R3NRK1 b - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Blind swine mate #1",
          fen: "1r5k/6pp/2pr4/P1Q3bq/1P2Bn2/2P5/5PPP/R3NRK1 b - - 0 1",
          info: "Checkmate the opponent in 3 moves. The name of this pattern was coined by Polish master Dawid Janowski, referring to coupled rooks on a player's 7th rank as swine. For this type of mate, the rooks on white's 7th rank can start out on any two of the files from a to e, and although black pawns are commonly present, they are not necessary to affect the mate."
        },
        {
          name: "Blind swine mate #2",
          fen: "r4rk1/2R5/1n2N1pp/2Rp4/p2P4/P3P2P/qP3PPK/8 w - - 0 1",
          info: "Checkmate the opponent in 6 moves"
        },
        {
          name: "Blind swine mate #3",
          fen: "5rk1/1R1R1p1p/4N1p1/p7/5p2/1P4P1/r2nP1KP/8 w - - 0 1",
          info: "Checkmate the opponent in 5 moves"
        },
        {
          name: "Smothered Mate #1",
          fen: "6rk/6pp/8/6N1/8/8/8/7K w - - 0 1",
          info: "Checkmate the opponent in 1 move. Smothered Mate occurs when a knight checkmates a king that is smothered (surrounded) by his friendly pieces and he has nowhere to move nor is there any way to capture the knight. It is also known as 'Philidor's Legacy' after François-André Danican Philidor, though its documentation predates Philidor by several hundred years."
        },
        {
          name: "Smothered Mate #2",
          fen: "6rk/6pp/6q1/6N1/8/7Q/6PP/6K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Smothered Mate #3",
          fen: "3r3k/1p1b1Qbp/1n2B1p1/p5N1/Pq6/8/1P4PP/R6K w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Smothered Mate #4",
          fen: "r1k4r/ppp1bq1p/2n1N3/6B1/3p2Q1/8/PPP2PPP/R5K1 w - - 0 1",
          info: "Checkmate the opponent in 6 moves"
        },
      ]
    }
  ]
  checkmatePatternsII = [
    {
      name: "Checkmate Patterns II Recognize the patterns",
      subSections: [
        {
          name: "Double Bishop Mate #1",
          fen: "7k/5B1p/8/8/8/8/8/5KB1 w - - 0 1",
          info: "Checkmate the opponent in 1 move"
        },
        {
          name: "Double Bishop Mate #2",
          fen: "r1bq3k/pp2R2p/3B2p1/2pBbp2/2Pp4/3P4/P1P3PP/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move"
        },
        {
          name: "Double Bishop Mate #3",
          fen: "r3k2r/pbpp1ppp/1p6/2bBPP2/8/1QPp1P1q/PP1P3P/RNBR3K b kq - 0 1",
          info: "Checkmate the opponent in 2 move"
        },
        {
          name: "Boden's Mate #1",
          fen: "2kr4/3p4/8/8/5B2/8/8/5BK1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. In Boden's Mate, two attacking bishops on criss-crossing diagonals deliver mate to a king obstructed by friendly pieces, usually a rook and a pawn."
        },
        {
          name: "Boden's Mate #2",
          fen: "2k1rb1r/ppp3pp/2n2q2/3B1b2/5P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 1",
          info: "Checkmate the opponent in 2 move"
        },
        {
          name: "Boden's Mate #3",
          fen: "2kr1b1r/pp1npppp/2p1bn2/7q/5B2/2NB1Q1P/PPP1N1P1/2KR3R w - - 0 1",
          info: "Checkmate the opponent in 2 move"
        },
        {
          name: "Balestra Mate #1",
          fen: "5k2/8/6Q1/8/8/6B1/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Balestra Mate is similar to Boden's Mate, but instead of two bishops, a bishop and a queen is used. The bishop delivers the checkmate, while the queen blocks the remaining escape squares."
        },
        {
          name: "Arabian Mate #1",
          fen: "7k/5R2/5N2/8/8/8/8/7K w - - 0 1",
          info: "Checkmate the opponent in 1 move. In the Arabian Mate, the knight and the rook team up to trap the opposing king on a corner of the board. The rook sits on a square adjacent to the king both to prevent escape along the diagonal and to deliver checkmate while the knight sits two squares away diagonally from the king to prevent escape on the square next to the king and to protect the rook."
        },
        {
          name: "Arabian Mate #2",
          fen: "r4nk1/pp2r1p1/2p1P2p/3p1P1N/8/8/PPPK4/6RR w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Arabian Mate #3",
          fen: "3qrk2/p1r2pp1/1p2pb2/nP1bN2Q/3PN3/P6R/5PPP/R5K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Corner Mate #1",
          fen: "7k/7p/8/6N1/8/8/8/6RK w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Corner Mate works by confining the king to the corner using a rook or queen and using a knight to engage the checkmate."
        },
        {
          name: "Corner Mate #2",
          fen: "5rk1/3Q1p2/6p1/P5r1/R1q1n3/7B/7P/5R1K b - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Morphy's Mate #1",
          fen: "7k/5p1p/8/8/7B/8/8/6RK w - - 0 1",
          info: "Checkmate the opponent in 1 move. Morphy's Mate is named after Paul Morphy. It works by using the bishop to attack the enemy king while your rook and an enemy pawn helps to confine it."
        },
        {
          name: "Morphy's Mate #2",
          fen: "5rk1/p4p1p/1p1rpp2/3qB3/3PR3/7P/PP3PP1/6K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Morphy's Mate #3",
          fen: "2r2rk1/5ppp/pp6/2q5/2P2P2/3pP1RP/P5P1/B1R3K1 w - - 0 1",
          info: "Checkmate the opponent in 6 moves"
        },
        {
          name: "Pillsbury's Mate #1",
          fen: "5rk1/5p1p/8/8/8/8/1B6/4K2R w - - 0 1",
          info: "Checkmate the opponent in 1 move. Pillsbury's Mate is named for Harry Nelson Pillsbury and is a variation of Morphy's Mate. The rook delivers checkmate while the bishop prevents the King from fleeing to the corner square."
        },
        {
          name: "Pillsbury's Mate #2",
          fen: "2rqnrk1/pp3ppp/1b1p4/3p2Q1/2n1P3/3B1P2/PB2NP1P/R5RK w - - 0 1",
          info: "Checkmate the opponent in 5 moves"
        },
        {
          name: "Damiano's Mate #1",
          fen: "5rk1/6p1/6P1/7Q/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Damiano's Mate is a classic method of checkmating and one of the oldest. It works by confining the king with a pawn or bishop and using a queen to initiate the final blow. Damiano's mate is often arrived at by first sacrificing a rook on the h-file, then checking the king with the queen on the h-file, and then moving in for the mate. The checkmate was first published by Pedro Damiano in 1512."
        },
        {
          name: "Damiano's Mate #2",
          fen: "4rk2/1p1q1p2/3p1Bn1/p1pP1p2/P1P5/1PK3Q1/8/7R w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Damiano's Mate #3",
          fen: "q1r4r/1b2kpp1/p3p3/P1b5/1pN1P3/3BBPp1/1P4P1/R3QRK1 b - - 0 1",
          info: "Checkmate the opponent in 5 moves"
        },
        {
          name: "Lolli's Mate #1",
          fen: "6k1/5p2/5PpQ/8/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Lolli's Mate involves infiltrating Black's fianchetto position using both a pawn and queen. The queen often gets to the h6 square by means of sacrifices on the h-file. It is named after Giambattista Lolli."
        },
        {
          name: "Lolli's Mate #2",
          fen: "r4r2/1q3pkp/p1b1p1n1/1p4QP/4P3/1BP3P1/P4P2/R2R2K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Lolli's Mate #3",
          fen: "4r1qk/5p1p/pp2rPpR/2pbP1Q1/3pR3/2P5/P5PP/2B3K1 w - - 0 1",
          info: "Checkmate the opponent in 6 moves"
        },
      ]
    }
  ]
  checkmatePatternsIII = [
    {
      name: "Checkmate Patterns III Recognize the patterns",
      subSections: [
        {
          name: "Opera Mate #1",
          fen: "4k3/5p2/8/6B1/8/8/8/3R2K1 w - - 0 1", 
          info: "Checkmate the opponent in 1 move. The Opera Mate works by attacking the king on the back rank with a rook using a bishop to protect it. A pawn or other piece other than a knight of the enemy king's is used to restrict its movement. The checkmate was named after its implementation by Paul Morphy in 1858 at a game at the Paris opera against Duke Karl of Brunswick and Count Isouard, known as the 'The Opera Game'."
        },
        {
          name: "Opera Mate #2",
          fen: "rn1r2k1/ppp2ppp/3q1n2/4b1B1/4P1b1/1BP1Q3/PP3PPP/RN2K1NR b KQ - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Opera Mate #3",
          fen: "rn3rk1/p5pp/2p5/3Ppb2/2q5/1Q6/PPPB2PP/R3K1NR b KQ - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Anderssen's Mate #1",
          fen: "6k1/6P1/5K1R/8/8/8/8/8 w - - 0 1",
          info: "Checkmate the opponent in 1 move. In Anderssen's mate, named for Adolf Anderssen, the rook or queen is supported by a diagonally-attacking piece such as a pawn or bishop as it checkmates the opposing king along the eighth rank."
        },
        {
          name: "Anderssen's Mate #2",
          fen: "1k2r3/pP3pp1/8/3P1B1p/5q2/N1P2b2/PP3Pp1/R5K1 b - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Anderssen's Mate #3",
          fen: "2r1nrk1/p4p1p/1p2p1pQ/nPqbRN2/8/P2B4/1BP2PPP/3R2K1 w - - 0 1",
          info: "Checkmate the opponent in 4 moves"
        },
        {
          name: "Dovetail Mate #1",
          fen: "1r6/pk6/4Q3/3P4/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. In the Dovetail Mate, the mating queen is one square diagonally from the mated king which escape is blocked by two friendly non-Knight pieces."
        },
        {
          name: "Dovetail Mate #2",
          fen: "r1b1q1r1/ppp3kp/1bnp4/4p1B1/3PP3/2P2Q2/PP3PPP/RN3RK1 w - - 0 1",
          info: "Checkmate the opponent in 1 moves"
        },
        {
          name: "Dovetail Mate #3",
          fen: "6k1/1p1b3p/2pp2p1/p7/2Pb2Pq/1P1PpK2/P1N3RP/1RQ5 b - - 0 1",
          info: "Checkmate the opponent in 4 moves"
        },
        {
          name: "Dovetail Mate #4",
          fen: "rR6/5k2/2p3q1/4Qpb1/2PB1Pb1/4P3/r5R1/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Other variations of the Dovetail Mate can occur if a queen delivers mate by checking the king from a diagonally adjacent square while supported by a friendly piece and you also control the two potential escape squares with other pieces, typically a bishop."
        },
        {
          name: "Cozio's Mate #1",
          fen: "8/8/1Q6/8/6pk/5q2/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves. Cozio's Mate is an upside down version of the Dovetail Mate. It was named after a study by Carlo Cozio that was published in 1766."
        },
        {
          name: "Swallow's Tail Mate #1",
          fen: "3r1r2/4k3/R7/3Q4/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Swallow's Tail Mate works by attacking the enemy king with a queen that is protected by a rook or other piece. The enemy king's own pieces block its means of escape. It is also known as the Guéridon Mate."
        },
        {
          name: "Swallow's Tail Mate #2",
          fen: "8/8/2P5/3K1k2/2R3p1/2q5/8/8 b - - 0 1",
          info: "Checkmate the opponent in 1 moves"
        },
        {
          name: "Epaulette Mate #1",
          fen: "3rkr2/8/5Q2/8/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Epaulette Mate is a checkmate where two parallel retreat squares for a checked king are occupied by its own pieces, preventing its escape."
        },
        {
          name: "Epaulette Mate #2",
          fen: "1k1r4/pp1q1B1p/3bQp2/2p2r2/P6P/2BnP3/1P6/5RKR b - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Epaulette Mate #3",
          fen: "5r2/pp3k2/5r2/q1p2Q2/3P4/6R1/PPP2PP1/1K6 w - - 0 1",
          info: "Checkmate the opponent in 1 moves"
        },
        {
          name: "Pawn Mate #1",
          fen: "8/7R/1pkp4/2p5/1PP5/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Although the Pawn Mate can take many forms, it is generally characterized as a mate in which a pawn is the final attacking piece and where enemy pawns are nearby. The Pawn Mate is sometimes also called the David and Goliath Mate, named after the biblical account of David and Goliath."
        },
        {
          name: "Pawn Mate #2",
          fen: "r1b3nr/ppp3qp/1bnpk3/4p1BQ/3PP3/2P5/PP3PPP/RN3RK1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        }
      ]
    }
  ]
  checkmatePatternIV = [
    {
      name: "Checkmate Pattern IV Recognize the patterns",
      subSections: [
        {
          name: "Suffocation Mate #1",
          fen: "5rk1/5p1p/8/3N4/8/8/1B6/7K w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Suffocation Mate works by using the knight to attack the enemy king and the bishop to confine the king's escape routes."
        },
        {
          name: "Suffocation Mate #2",
          fen: "r4k1r/1q3p1p/p1N2p2/1pp5/8/1PPP4/1P3PPP/R1B1R1K1 w - - 0 1",
          info: "Checkmate the opponent in 4 moves"
        },
        {
          name: "Greco's Mate #1",
          fen: "7k/6p1/6Q1/8/8/1B6/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Greco's Mate is named after the famous Italian checkmate cataloguer Gioachino Greco. It works by using the bishop to contain the black king by use of the black g-pawn and subsequently using the queen or a rook to checkmate the king by moving it to the edge of the board."
        },
        {
          name: "Greco's Mate #2",
          fen: "r4r1k/ppn1NBpp/4b3/4P3/3p1R2/1P6/P1P3PP/R5K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Greco's Mate #3",
          fen: "r2q1rk1/pbp3pp/1p1b4/3N1p2/2B5/P3PPn1/1P3P1P/2RQK2R w K - 0 1",
          info: "Checkmate the opponent in 4 moves"
        },
        {
          name: "Max Lange's Mate #1",
          fen: "2Q5/5Bpk/7p/8/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Max Lange's Mate is named after German chess player and problem composer Max Lange. It works by using the bishop and queen in combination to checkmate the king."
        },
        {
          name: "Max Lange's Mate #2",
          fen: "r3k3/ppp2pp1/8/2bpP2P/4q3/1B1p1Q2/PPPP2P1/RNB4K b q - 0 1",
          info: "Checkmate the opponent in 5 moves"
        },
        {
          name: "Blackburne's Mate #1",
          fen: "5rk1/7p/8/6N1/8/8/1BB5/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Blackburne's Mate is named for Joseph Henry Blackburne. This checkmate utilizes an enemy rook (or bishop or queen) to confine the black king's escape to the f8 square. One of the bishops confines the black king's movement by operating at a distance, while the knight and the other bishop operate within close range."
        },
        {
          name: "Réti's Mate #1",
          fen: "1nb5/1pk5/2p5/8/7B/8/8/3R3K w - - 0 1",
          info: "Checkmate the opponent in 1 move. Réti's Mate is named after Richard Réti, who delivered it in an 11-move game against Savielly Tartakower in 1910 in Vienna. It works by trapping the enemy king with four of its own pieces that are situated on flight squares and then attacking it with a bishop that is protected by a rook or queen."
        },
        {
          name: "Légal's Mate #1",
          fen: "3q1b2/4kB2/3p4/4N3/8/2N5/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. In Légal's Mate, the knight moves into a position to check the king. The bishop is guarded by the other knight, and the enemy pieces block the king's escape."
        },
        {
          name: "Kill Box Mate #1",
          fen: "2kr4/8/1Q6/8/8/8/5PPP/3R1RK1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. The Kill Box Mate occurs when a rook is next to the enemy king and supported by a queen that also blocks the king's escape squares. The rook and the queen catch the enemy king in a 3 by 3 'kill box'."
        },
        {
          name: "Triangle Mate #1",
          fen: "8/3p4/3k4/2R4Q/8/4K3/8/8 w - - 0 1",
          info: "Checkmate the opponent in 1 move. A Triangle Mate is delivered by a queen attacking an enemy king, while it is supported by a rook. The queen and rook are one square away from the enemy king. They are on the same rank or file, separated by one square, with the enemy king being between them one square away, forming a triangle. The king must be restricted from escaping to the middle square behind it away from the queen and rook, by the edge of the board, a piece blocking it, or by controlling that square with a third piece."
        },
        {
          name: "Vukovic Mate #1",
          fen: "4k3/R7/4N3/3r4/8/B7/4K3/8 w - - 0 1",
          info: "Checkmate the opponent in 1 move. In the Vukovic Mate, a rook and knight team up to mate the king on the edge of the board. The rook delivers mate while supported by a third piece, and the knight is used to block the king's escape squares."
        },
        {
          name: "Vukovic Mate #2",
          fen: "R7/8/8/7p/6n1/6k1/3r4/5K2 b - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Vukovic Mate #3",
          fen: "2r5/8/8/5K1k/4N1R1/7P/8/8 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
      ]
    }
  ]
  piececheckmatesII = [
    {
      name: "Piece checkmates II Challenging checkmates",
      subSections: [
        {
          name: "Queen vs bishop mate",
          fen: "8/8/3kb3/8/8/3KQ3/8/8 w - - 0 1",
          info: "Keep your pieces on the opposite color squares from the enemy bishop to stay safe. Use your queen to encroach on the king and look for double attacks. Mate in 10 if played perfectly."
        },
        {
          name: "Queen vs knight mate",
          fen: "8/8/3kn3/8/8/3KQ3/8/8 w - - 0 1",
          info: "Force the enemy king to the edge of the board while avoiding tricky knight forks. Mate in 12 if played perfectly."
        },
        {
          name: "Queen vs rook mate",
          fen: "8/3kr3/8/3KQ3/8/8/8/8 w - - 0 1",
          info: "Normally the winning process involves the queen first winning the rook by a fork and then checkmating with the king and queen, but forced checkmates with the rook still on the board are possible in some positions or against incorrect defense. Mate in 18 if played perfectly."
        },
        {
          name: "Two bishop mate",
          fen: "8/8/3k4/8/8/2BBK3/8/8 w - - 0 1",
          info: "When trying to checkmate with two bishops, there are two important principles to follow. One, the bishops are best when they are near the center of the board and on adjacent diagonals. This cuts off the opposing king. Two, the king must be used aggressively, in conjunction with the bishops.Mate in 13 if played perfectly."
        },
        {
          name: "Knight and bishop mate #1",
          fen: "8/8/1k1K4/8/2BN4/8/8/8 w - - 0 1",
          info: "Of the basic checkmates, this is the most difficult one to force, because the knight and bishop cannot form a linear barrier to the enemy king from a distance. The checkmate can be forced only in a corner that the bishop controls. The mating process often requires accurate play, since a few errors could result in a draw either by the fifty-move rule or stalemate.Mate in 10 if played perfectly."
        },
        {
          name: "Knight and bishop mate #2",
          fen: "8/8/3k4/3B4/3K4/8/3N4/8 w - - 0 1",
          info: "Of the basic checkmates, this is the most difficult one to force, because the knight and bishop cannot form a linear barrier to the enemy king from a distance. The checkmate can be forced only in a corner that the bishop controls. The mating process often requires accurate play, since a few errors could result in a draw either by the fifty-move rule or stalemate.Mate in 19 if played perfectly."
        },
        {
          name: "Two knights vs pawn",
          fen: "6k1/6p1/8/4K3/4NN2/8/8/8 w - - 0 1",
          info: "Two knights can't force checkmate by themselves, but if the enemy has a pawn, we can avoid stalemate and force mate.Mate in 15 if played perfectly."
        }
      ]
    },
  ]
  knightAndBishopMate = [
    {

      name: "Knight and Bishop Mate interactive lesson",
      subSections: [
        {
          name: "Introduction",
          fen: "4k3/8/8/8/8/8/8/4KBN1 w - - 0 1",
          info: "In this Study, we will look at how to checkmate a lone King with a Knight and Bishop.The first thing to note, is that we can only checkmate the King in the corner of the board which is the same color as our Bishop, which in this example is a8 and h1. If we had a dark squared Bishop, we could only checkmate Black on a1 or h8.Black will therefore try to stay in the center of the board, and if they can't, then they will move towards the 'wrong' corner, meaning a corner in which we can't checkmate the King.White however, wants to force Black's King to a8 or h1. To accomplish this, there are two well-known methods that can be used. One is called 'Delétang's triangle method' and the other is called 'the W method'. You only have to know one of these methods. In this Study, we will learn the first one.The basic idea is to restrict Black's King to smaller and smaller areas of the board."
        },
        {
          name: "Epic Failure",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          info: "KBN vs K is a fairly rare endgame. A 2001 study showed that it happens in about 0.02% of games. Even so, it can be useful to study because the technique is hard to find OTB as this game shows.This game took place in Geneva, Switzerland in 2013. It was Round 4 in a FIDE Women Grand Prix tournament. The Women's World Chess Champion, Anna Ushenina, failed to mate with Knight and Bishop and her opponent claimed a draw due to the 50 move rule.The relevant part of the game starts at 72. Nxc3. Scroll through the moves and watch the video below. Move on to the next chapter when you're ready.www.youtube.com/watch?v=YFF5ibgB6eA"
        },
        {
          name: "Restricting the king to the first triangle",
          fen: "4k3/8/8/8/8/8/8/4KBN1 w - - 0 1",
          info: "You will have to use all of your pieces to push Black's king to a corner. Black will first try to stay in the center. Continue the lesson by moving your King towards the center."
        },
        {
          name: "Exercise: Restricting the king to the first triangle",
          fen: "6k1/5N2/5K2/8/2B5/8/8/8 w - - 20 11",
          info: "In the previous chapter, Black replied to Nf7+ with Kh7. Here, Black replies Kg8 instead. Based on what we have learned so far, what move should White now play?"
        },
        {
          name: "Restricting the king to the second triangle",
          fen: "8/8/3k2K1/8/8/1B1N4/8/8 b - - 29 15",
          info: "Before we can transition our Bishop to the second triangle by playing Ba4, we must further restrict the Black King. Start by taking away the f8 square"
        },
        {
          name: "Exercise: Restricting the king to the second triangle",
          fen: "8/4k1K1/8/8/2B5/3N4/8/8 w - - 34 18",
          info: "What would you play in this position?"
        },
        {
          name: "Restricting the king to the third triangle",
          fen: "8/1k2K3/8/1B1N4/8/8/8/8 b - - 61 31",
          info: "Before you can safely transition your Bishop to the third triangle by playing Ba6, you must further restrict the Black King. Restrict the Black King further in a way that does not allow Black to take the opposition."
        },
        {
          name: "Delivering Mate",
          fen: "2B5/k1K5/8/3N4/8/8/8/8 b - - 0 1",
          info: "When we reach the third triangle, our King and Bishop is restricting the enemy King which frees up our Knight to deliver mate."
        },
        {
          name: "Exercise: Delivering Mate",
          fen: "2B5/k1K5/8/3N4/8/8/8/8 w - - 1 2",
          info: "In this position, the King is on a7 instead of a8 which means you must checkmate Black slightly differently. Mate in three."
        },
        {
          name: "Exercise: Checkmate the Engine",
          fen: "4k3/8/8/8/8/8/8/4KBN1 w - - 0 1",
          info: "Checkmate the opponent"
        },
        {
          name: "Exercise: Checkmate the Engine- DSB Edition",
          fen: "4k3/8/8/8/8/8/8/4KNB1 w - - 0 1",
          info: "Checkmate the opponent"
        },
        {
          name: "Exercise: Checkmate the Engine- Rotated Edition",
          fen: "1NBK4/8/8/8/8/8/8/3k4 w - - 0 1",
          info: "Checkmate the opponent"
        },
      ]
    },
  ]
  thePin = [
    {
      name: "The Pin Pin it to win it",
      subSections: [
        {
          name: "Set up an absolute pin #1",
          fen: "7k/8/8/4n3/4P3/8/8/6BK w - - 0 1",
          info: "Get a winning position in 2 moves. An absolute pin is when a piece is pinned to its king and can't move without exposing its king to a check from an opposing piece on the same line or diagonal. Pin the knight to win it."
        },
        {
          name: "Set up an absolute pin #2",
          fen: "5k2/p1p2pp1/7p/2r5/8/1P3P2/PBP3PP/1K6 w - - 0 1",
          info: "Get a winning position in 2 moves. Can you set up an immediate absolute pin?"
        },
        {
          name: "Set up a relative pin #1",
          fen: "1k6/ppp3q1/8/4r3/8/8/3B1PPP/R4QK1 w - - 0 1",
          info: "Get a winning position in 1 move. A relative pin is one where the piece shielded by the pinned piece is a piece other than the king, but it's typically more valuable than the pinned piece. Moving such a pinned piece is legal but may not be prudent, as the shielded piece would then be vulnerable to capture. Do you see the immediate relative pin?"
        },
        {
          name: "Exploit the pin #1",
          fen: "4k3/6p1/5p1p/4n3/8/7P/5PP1/4R1K1 w - - 0 1",
          info: "Get a winning position in 2 moves. Use your knowledge of pins to win a piece."
        },
        {
          name: "Exploit the pin #2",
          fen: "r4rk1/pp1p1ppp/1qp2n2/8/4P3/1P1P2Q1/PBP2PPP/R4RK1 w - - 0 1",
          info: "Get a winning position in 1 move. Use your knowledge of pins to win a piece."
        },
        {
          name: "Exploit the pin #3",
          fen: "4r1r1/2p5/1p1kn3/p1p1R1p1/P6p/5N1P/1PP1R1PK/8 w - - 0 1",
          info: "Get a winning position in 1 move. Use your knowledge of pins to win a pawn. From Magnus Carlsen - Arkadij Naiditsch, 2009."
        },
        {
          name: "Exploit the pin #4",
          fen: "1r1n1rk1/ppq2p2/2b2bp1/2pB3p/2P4P/4P3/PBQ2PP1/1R3RK1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Exploit the pin #5",
          fen: "q5k1/5pp1/8/1pb1P3/2p4p/2P2r1P/1P3PQ1/1N3R1K b - - 0 1",
          info: "Get a winning position in 3 moves"
        },
      ]
    },
  ]
  theSkewer = [
    {
      name: "The Skewer Yum - Skewers!",
      subSections: [
        {
          name: "Relative Skewer #1",
          fen: "8/1r3k2/2q1ppp1/8/5PB1/4P3/4QK2/5R2 w - - 0 1",
          info: "Get a winning position in 2 moves. A skewer is an attack upon two pieces in a line and is similar to a pin. A skewer is sometimes described as a 'reverse pin'; the difference is that in a skewer, the more valuable piece is in front of the piece of lesser value. If the piece being attacked is not a king, then it is a Relative Skewer."
        },
        {
          name: "Relative Skewer #2",
          fen: "r2r2k1/2p2ppp/5n2/4p3/pB2P3/P2q3P/2R2PP1/2RQ2K1 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Relative Skewer #3",
          fen: "4rr1k/ppqb2p1/3b4/2p2n2/2PpBP1P/PP4P1/2QBN3/R3K2R b KQ - 0 22",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Absolute Skewer #1",
          fen: "8/3qkb2/8/8/4KB2/5Q2/8/8 b - - 0 1",
          info: "Get a winning position in 2 moves. A skewer is an attack upon two pieces in a line and is similar to a pin. A skewer is sometimes described as a 'reverse pin'; the difference is that in a skewer, the more valuable piece is in front of the piece of lesser value. If the piece being attacked is a king, then it is an Absolute Skewer. The king is said to be skewered."
        },
       { 
          name: "Absolute Skewer #2",
          fen: "2Q5/1p4q1/p4k2/6p1/P3b3/6BP/5PP1/6K1 w - - 4 51",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Absolute Skewer #3",
          fen: "5Q2/2k2p2/3bqP2/R2p4/3P1p2/2p4P/2P3P1/7K w - - 1 1",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Absolute Skewer #4",
          fen: "5k2/pp1b4/3N1pp1/3P4/2p5/q1P1QP2/5KP1/8 w - - 0 39",
          info: "Get a winning position in 4 moves."
        },
        {
          name: "Absolute Skewer #5",
          fen: "6q1/6p1/2k4p/R6B/p7/8/2P3P1/2K5 w - - 0 1",
          info: "Get a winning position in 3 moves."
        },
      ]
    },
  ]
  theFork = [
    {
      name: "The Fork Use the fork, Luke",
      subSections: [
        {
          name: "Knight Fork #1",
          fen: "2q3k1/8/8/5N2/6P1/7K/8/8 w - - 0 1",
          info: "Get a winning position in 2 moves. A fork is a tactic whereby a single piece makes two or more direct attacks simultaneously. Most commonly two pieces are threatened, which is also sometimes called a double attack. The attacking piece is called the forking piece; the pieces attacked are said to be forked."
        },
        {
          name: "Knight Fork #2",
          fen: "6k1/5r1p/p2N4/nppP2q1/2P5/1P2N3/PQ5P/7K w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Pawn Fork #1",
          fen: "7k/8/8/4b1n1/8/8/5PPP/5R1K w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Pawn Fork #2",
          fen: "r1bqkb1r/pppp1ppp/2n5/4p3/2B1N3/5N2/PPPP1PPP/R1BQK2R b KQkq - 0 2",
          info: "Equalize in 2 moves"
        },
        {
          name: "Rook Fork #1",
          fen: "8/8/b5k1/8/8/8/1K6/3R4 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Bishop Fork #1",
          fen: "5k2/8/8/8/8/r6P/5B2/6K1 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Queen Fork #1",
          fen: "4k2r/2n2p1p/6p1/3n4/5Q2/8/5PPP/6K1 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Double Attack #1",
          fen: "r3k3/7p/6p1/5p2/5r2/2NP4/PPP2PPP/R5K1 w - - 0 1",
          info: "Get a winning position in 3 moves. A fork is often also called a double attack, because it usually attacks two targets. A fork can of course attack more than two targets, and the targets don't have to be pieces. Direct mating threats, or even an implied threat can also be excellent targets for a fork.In this position, you can fork an undefended piece and a second implied threat."
        },
        {
          name: "Double Attack #2",
          fen: "3r1k2/pp1n2pb/q1p1Qp2/2P2r2/3Pp1Np/P1P1B2P/6P1/1R1R2K1 w - - 0 1",
          info: "Get a winning position in 2 moves. In this position, you can fork an undefended piece and a direct mate threat."
        },
        {
          name: "Fork Challenge #1 N",
          fen: "8/5pk1/8/4p3/pp1qPn2/5P2/PP2B3/2Q2K2 b - - 0 1",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Fork Challenge #2 N",
          fen: "4k3/R4br1/8/p3P3/4N3/5K2/8/8 w - - 0 1",
          info: "Get a winning position in 4 moves."
        },
        {
          name: "Fork Challenge #3 N",
          fen: "r5k1/ppp2p1p/6pB/4n2n/3bPp1q/2NB3P/PPP3PK/R2Q1R2 b - - 1 1",
          info: "Get a winning position in 4 moves."
        },
        {
          name: "Fork Challenge #4 Q",
          fen: "8/1q6/p3p1k1/2P1Q2p/P3P2P/2P5/4r1PK/8 w - - 0 1",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Fork Challenge #5 Q",
          fen: "5Bk1/1b1r2p1/q4p1p/2Q5/2P5/6PP/P4P2/4R1K1 b - - 0 31",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Fork Challenge #6 P",
          fen: "r1bq1rk1/3np1bp/p2p1pp1/1PpP3n/4PP1B/2N2Q2/PP1N2PP/R3KB1R b KQ - 1 1",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Fork Challenge #7 P",
          fen: "4b1rr/4k1p1/4pp1n/pp1pP1RP/2pP1R2/P1P2B1N/2PK1P2/8 w - - 0 1",
          info: "Get a winning position in 3 moves."
        },
      ]
    },
  ]
  discoveredAttacks = [
    {
      name: "Discovered Attacks Including discovered checks",
      subSections: [
        {
          name: "Discovered Attacks #1",
          fen: "5q2/3k2pp/8/8/8/5N2/6PP/5RK1 w - - 0 1",
          info: "Get a winning position in 2 moves. A Discovered Attack is an attack that is revealed when one piece moves out of the way of another. Discovered Attacks can be extremely powerful, as the piece moved can make a threat independently of the piece it reveals. Like many chess tactics, they succeed because the opponent is unable to meet two threats at once. While typically the consequence of a discovered attack is the gain of material, they do not have to do this to be effective; the tactic can be used merely to gain a tempo."
        },
        {
          name: "Discovered Check #1",
          fen: "5k2/3q2pp/8/8/8/5N2/6PP/5RK1 w - - 0 1",
          info: "Get a winning position in 2 moves. When a Discovered Attack is a check, it is called a Discovered Check."
        },
        {
          name: "Discovered Attacks #2",
          fen: "r4k2/2r2pp1/7p/3P4/4B3/5N2/6PP/5RK1 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Discovered Check #2",
          fen: "r2q1bnr/pp2k1pp/3p1p2/1Bp1N1B1/8/2Pp4/PP3PPP/RN1bR1K1 w - - 0 12",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Discovered Attacks #3",
          fen: "r1b2rk1/ppqn1pbp/5np1/3p4/3BP3/1P1B1P1P/P2N2PN/R2Q1RK1 b - - 0 14",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Discovered Check #3",
          fen: "3k4/7R/p2P4/2p1b3/8/2P3rB/P4r2/1K2R3 w - - 3 41",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Discovered Attacks #4",
          fen: "8/8/4np2/4pk1p/RNr4P/P3KP2/1P6/8 w - - 1 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Discovered Check #4",
          fen: "r1bq2rk/1p1p4/p1n1pPQp/3n4/4N3/1N1Bb3/PPP3PP/R4R1K w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Discovered Attacks #5",
          fen: "8/1b1Q1ppk/p2bp2p/1p1q4/3Pp3/1P2B1P1/P6P/2R3K1 b - - 0 1",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Discovered Check #5",
          fen: "3r4/1R1P1k1p/1p1q2p1/1Pp5/2P5/6P1/4Q1KP/8 w - - 6 51",
          info: "Checkmate the opponent in 3 moves"
        },
      ]
    },
  ]
  doubleCheck = [
    {
      name: "Double Check A very powerfull tactic",
      subSections: [
        {
          name: "Double Check Introduction",
          fen: "k1q5/1pp5/8/8/N7/8/8/R5K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves. A Double Check is when two pieces are delivering check simultaneously. A Double Check is generally more powerful than a normal check, because the opponent can only respond with a king move. (The pieces that are delivering check cannot both be captured or blocked with one move.)"
        },
        {
          name: "Double Check #1",
          fen: "r3k2r/ppp2pp1/2np4/2B1p2n/2B1P1Nq/3P4/PPP2PP1/RN1Q1RK1 b kq - 0 11",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Double Check #2",
          fen: "rn2kb1r/pp2pp1p/2p2p2/8/8/3Q1N2/qPPB1PPP/2KR3R w kq - 0 13",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Double Check #3",
          fen: "r4k2/pppb1Pp1/2np3p/2b5/2B2Bnq/2N5/PP2Q1PP/4RR1K w - - 6 17",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Double Check #4",
          fen: "3r2k1/pp5p/6p1/2Ppq3/4Nr2/4B2b/PP2P2K/R1Q1R2B b - - 0 26",
          info: "Checkmate the opponent in 4 moves"
        },
        {
          name: "Double Check #5",
          fen: "r3k2r/2q1np1p/p3P1p1/1p2p3/8/2PBB3/P1PR2PP/5RK1 w kq - 0 21",
          info: "Get a winning position in 5 moves"
        },
      ]
    },
  ]
  overloadedPieces = [
    {
      name: "Overloaded Pieces They have too much work",
      subSections: [
        {
          name: "Overloaded #1",
          fen: "6k1/5pp1/4b1n1/8/8/3BR3/5PPP/6K1 w - - 0 1",
          info: "Get a winning position in 1 move. A piece is Overloaded (also known as 'overworked') if it has more than one responsibility, e.g. defending a piece, defending a square, blocking a check, and blockading a piece. In this example, the f7 pawn has at least two responsibilities; it is protecting the bishop on e6, but it is also protecting the knight on g6. Can you exploit this double responsibility?"
        },
        {
          name: "Overloaded #2",
          fen: "2r1rbk1/5pp1/3P1n2/8/8/3Q3P/2B2PPK/8 w - - 0 1",
          info: "Get a winning position in 1 move. In this example, the f6 knight has two responsibilities. One of those responsibilities is more important than the other. Can you exploit the situation?"
        },
        {
          name: "Overloaded #3",
          fen: "2b5/7p/3k2pP/1p1p1pP1/1P1P1K2/8/5P2/3B4 w - - 0 1",
          info: "Get a winning position in 4 moves"
        },
        {
          name: "Overloaded #4",
          fen: "3q3k/pp2b1pp/8/2P5/1P2RBQ1/2P5/P4rPp/7K w - - 2 29",
          info: "Get a winning position in 1 move"
        },
        {
          name: "Overloaded #5",
          fen: "8/1Q1rkpp1/p3p3/3nB1r1/8/3q3P/PP3R2/K1R5 w - - 2 34",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Overloaded #6",
          fen: "3r2k1/pb1r1pp1/1pn2q1p/3B4/6Q1/P4NP1/1P3PP1/3RR1K1 w - - 7 23",
          info: "Get a winning position in 4 moves"
        },
        {
          name: "Overloaded #7",
          fen: "2Q5/1p3p1k/p2prPq1/8/7p/8/PP3RP1/6K1 w - - 0 1",
          info: "Get a winning position in 4 moves"
        },
        {
          name: "Overloaded #8",
          fen: "5k1r/p4p2/3Np2p/3bP3/8/3RBPb1/1r4P1/2R3K1 w - - 0 1",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Overloaded #9",
          fen: "3r2k1/1pp4p/p1n1q1p1/2Q5/1P2B3/P3P1Pb/3N1R1P/6K1 b - - 1 1",
          info: "Get a winning position in 3 moves"
        },
        {
          name: "Overloaded #10",
          fen: "r7/2k1Pp1p/p1n2p2/P1b1r3/2p5/2P3P1/5P1P/1R1Q2K1 w - - 2 29",
          info: "Get a winning position in 4 moves"
        },
      ]
    },
  ]
  zwischenzug = [
    {
      name: "Zwischenzug In-between moves",
      subSections: [
        {
          name: "Zwischenzug",
          fen: "rBbqk2r/pp3ppp/5n2/8/1bpP4/8/PP2B1PP/RN1Q1KNR b kq - 0 9",
          info: "Get a winning position in 2 moves. Whether you call it Zwischenzug (from German), Intermezzo (from Italian), an intermediate move or just an in-between move, it's all the same thing. It's a very common tactic that you need to know because it happens in almost all chess games. A Zwischenzug is when a player, instead of playing the expected move, often a recapture, plays another move that makes an immediate threat that the opponent must answer, before playing the original expected move.In this Savielly Tartakower - Jose Raul Capablanca game from 1924, Tartakower just played Bxb8. Instead of recapturing immediately with Rxb8, can you find a better move that makes a strong threat?"
        },
        {
          name: "Zwischenschach",
          fen: "2r2rk1/pp1b1ppp/1q2p3/3pP3/1B3Pn1/3B1N2/P3Q1PP/RN2KR2 b Q - 0 16",
          info: "Get a winning position in 3 moves. A Zwischenzug that is also a check, is called a Zwischenschach, Zwischen-check, or simply an in-between check. Instead of recapturing with Qxb4 immediately, find the Zwischenschach in this Samuel Rosenthal - Cecil Valentine De Vere game from 1867."
        },
        {
          name: "Zwischenzug Challenge #1",
          fen: "r1b5/4kq2/p1Bbp1Qp/6p1/8/4B1P1/PPP4P/6K1 w - - 0 29",
          info: "Get a winning position in 3 moves. From Wolfgang Unzicker - Mikhail Tal, 1975."
        },
        {
          name: "Zwischenzug Challenge #2",
          fen: "2r3k1/q5pp/4p3/2rp1p2/1p1B1P2/1P1QP3/P1R3PP/6K1 w - - 2 28",
          info: "Get a winning position in 2 moves. From Alexander Kotov - Ratmir Kholmov, 1971."
        },
        {
          name: "Zwischenzug Challenge #3",
          fen: "2r2r1k/1pN1Qpbp/p4pp1/qb6/8/1B6/PP3PPP/2RR2K1 w - - 10 23",
          info: "Get a winning position in 3 moves. From Boris Gelfand - Peter Svidler, 1996."
        },
      ]
    },
  ]
  xRay = [
    {
      name: "X-Ray Attacking through an enemy piece",
      subSections: [
        {
          name: "X-Ray #1",
          fen: "1R1r2k1/2q2ppp/8/1Q6/8/6P1/5P1P/6K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves. X-Ray attacks happen when a piece attacks or defends a square, through an enemy piece."
        },
        {
          name: "X-Ray #2",
          fen: "8/6p1/5p1k/BP1B4/5P1p/r6P/2R3P1/6Kn b - - 0 1",
          info: "Checkmate the opponent in 5 moves. Peter Svidler - Boris Gelfand, 2009."
        },
        {
          name: "X-Ray #3",
          fen: "rn1qr1k1/1p2np2/2p3p1/8/1pPb4/7Q/PB1P1PP1/2KR1B1R w - - 0 1",
          info: "Checkmate the opponent in 2 moves. Max Euwe - Rudolf Loman, 1923."
        },
        {
          name: "X-Ray #4",
          fen: "3Rr1k1/p4ppp/b5q1/2Q5/1B3PP1/P7/1PP1r2P/2K5 w - - 0 1",
          info: "Checkmate the opponent in 2 moves. Mikhail Chigorin - Eugene Znosko-Borovsky, 1903."
        },
        {
          name: "X-Ray #5",
          fen: "2r5/p2kBp2/b3pP1p/3p2p1/1p6/5P2/PqQ2RPP/2R3K1 b - - 0 1",
          info: "Checkmate the opponent in 3 moves. Zandor Nilsson - Efim Geller, 1954."
        },
        {
          name: "X-Ray #6",
          fen: "r1b2rk1/4n1b1/p2p2PQ/3P4/2n1B3/2B3P1/qPP5/1NKR3R b - - 0 1",
          info: "Checkmate the opponent in 2 moves. In this example, Bxh6 is a winning move as well, but try to find a mate in 2 using the X-Ray tactic.          Sven Platzack - John van Baarle, 1967."
        },
        {
          name: "X-Ray #7",
          fen: "5n1k/2r1Rr1p/1p3P1B/pPqp4/P1np2Q1/3B4/2P3PP/R5K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves. There are multiple solutions in this example, but use the X-Ray tactic to checkmate the opponent in 3 moves. Zoltan Almasi - Viktor Korchnoi, 1996."
        },
      ]
    },
  ]
  zugzwang = [
    {
      name: "Zugzwang Being forced to move",
      subSections: [
        {
          name: "Zugzwang #1",
          fen: "3k4/8/2K5/7R/8/8/8/8 w - - 0 1",
          info: "Checkmate the opponent in 2 moves. The word 'Zugzwang' comes from German, and means 'being forced to make a move'. A player is in Zugzwang when it's their turn and every possible move makes their position worse.In the above example, if black would only move his king to c8 then Rook to the back rank would be check mate, you can force the king to c8 by simply taking away every other option.White to play, mate in 2."
        },
        {
          name: "Zugzwang #2",
          fen: "5rk1/6n1/8/7p/4q1pP/6P1/6RQ/6NK b - - 0 1",
          info: "Checkmate the opponent in 3 moves. Here you can use Zugzwang to force checkmate. How cool is that?"
        },
        {
          name: "Zugzwang #3",
          fen: "8/8/3k4/1p1p4/1P6/2P1K3/8/8 w - - 0 1",
          info: "Safely promote your pawn. Use your knowledge of Zugzwang to promote one of your pawns safely."
        },
        {
          name: "Zugzwang #4",
          fen: "1k1b4/2n5/1K6/4B3/6B1/8/8/8 w - - 0 1",
          info: "Checkmate the opponent in 4 moves. From an endgame composition by Goldberg, published in 1931."
        },
      ]
    },
  ]
  Interference = [
    {
      name: "Interference Interpose a piece to great effect",
      subSections: [
        {
          name: "Interference Introduction",
          fen: "1r2r1k1/p1pbqppp/Q2b1n2/3p4/P2P4/2P5/1P2BPPP/R1B1KN1R b KQ - 2 14",
          info: "Get a winning position in 2 moves. Interference occurs when the line between an attacked piece and its defender is interrupted by sacrificially interposing a piece - typically on a protected square.In this position, Black threatens mate on e2, but White's queen is protecting that square. Can you make a bishop move to interfere with this defense? From Adolf Jay Fink - Alexander Alekhine, 1932."
        },
        {
          name: "Interference #2",
          fen: "1k1r3r/1pp2pp1/p1p5/2Q5/7q/2Pp1Pp1/PP1N2P1/R1B1RK2 b - - 3 20",
          info: "Checkmate the opponent in 7 moves"
        },
        {
          name: "Interference #3",
          fen: "r2q2k1/pQ2bppp/4p3/8/3r1B2/6P1/P3PP1P/1R3RK1 w - - 1 17",
          info: "Get a winning position in 3 moves. From Vasily Smyslov - Alexander Kazimirovich Tolush, 1961."
        },
        {
          name: "Interference #4",
          fen: "2rqr1k1/pp1Q1pbp/2n3p1/8/4P3/4BP2/PP2B1PP/2RR2K1 b - - 0 21",
          info: "Get a winning position in 5 moves. From Ludwig Rellstab - Miguel Najdorf, 1950."
        },
        {
          name: "Interference #5",
          fen: "3B2k1/6p1/3b4/1p1p3q/3P1p2/2PQ1NPb/1P2rP1P/R5K1 b - - 5 30",
          info: "Get a winning position in 2 moves. From Viswanathan Anand - Levon Aronian, 2008."
        },
        {
          name: "Interference #6",
          fen: "2r4k/5pR1/7p/4pN1q/7P/2n1P3/2Q2P1K/8 b - - 0 36",
          info: "Get a winning position in 2 moves. From Hikaru Nakamura - Alexander Beliavsky, 2005."
        },
        {
          name: "Interference #7",
          fen: "5q2/1b4pk/1p2p1n1/1P1pPp2/P2P1P1p/rB1N1R1P/1Q4PK/8 w - - 2 46",
          info: "Get a winning position in 3 moves. From Vassily Ivanchuk - Viktor Moskalenko, 1988."
        },
      ]
    },
  ]
  greekGift = [
    {
      name: "Greek Gift Study the greek gift scrifice",
      subSections: [
        {
          name: "Greek Gift Introduction",
          fen: "rnbq1rk1/pppn1ppp/4p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQq - 0 1",
          info: "Get a winning position in 4 moves. The Greek Gift sacrifice is a common tactical theme, where one side sacrifices their bishop by capturing the rook pawn of a castled king position (white playing Bxh7+ or black playing Bxh2+) usually in order to checkmate the opponent or gain significant material advantage.Play the Greek Gift sacrifice and maintain a winning position for 4 moves to complete this exercise."
        },
        {
          name: "Greek Gift Challenge #1",
          fen: "rnb2rk1/pp1nqppp/4p3/3pP3/3p3P/2NB3N/PPP2PP1/R2QK2R w KQ - 0 10",
          info: "Checkmate the opponent in 7 moves. From Efim Bogoljubov - NN, 1952."
        },
        {
          name: "Greek Gift Challenge #2",
          fen: "r3r1k1/1b2qppp/p7/1p1Pb3/1P6/P2B4/1B2Q1PP/3R1RK1 w - - 0 21",
          info: "Get a winning position in 6 moves. Maintain a winning position for 6 moves to complete this exercise. From Carl Schlechter - Geza Maroczy, 1907."
        },
        {
          name: "Greek Gift Challenge #3",
          fen: "r2qrbk1/5ppp/pn1p4/np2P1P1/3p4/5N2/PPB2PP1/R1BQR1K1 w - - 1 20",
          info: "Get a winning position in 6 moves. Maintain a winning position for 6 moves to complete this exercise. From Boris Spassky - Efim Geller, 1965."
        },
        {
          name: "Greek Gift Challenge #4",
          fen: "3r1rk1/bpq2ppp/p1b1p3/2P5/1P2B3/P4Q2/1B3PPP/2R2RK1 w - - 3 18",
          info: "Get a winning position in 5 moves. Maintain a winning position for 6 moves to complete this exercise. From Anthony Miles - Walter Shawn Browne, 1982."
        },
        {
          name: "Defend againts the Greek Gift",
          fen: "r1b2rk1/ppqn1ppB/4p3/2pnP3/1p1P4/5N2/PP1N1PPP/R2Q1RK1 b - - 0 12",
          info: "Defend for 4 moves. The Greek Gift sacrifice does not always work. Defend accurately. From Miguel A Quinteros - Yasser Seirawan, 1985."
        },
      ]
    },
  ]
  Deflection = [
    {
      name: "Deflection Distracting a defender",
      subSections: [
        {
          name: "Deflection #1",
          fen: "R4rk1/5ppp/4b3/8/8/3B3P/5PP1/6K1 w - - 0 1",
          info: "Get a winning position in 2 moves. The deflection is a tactic that forces the opponent's piece away from defending another piece or an important square. The deflected piece is usually an overloaded piece that needs to protect more than one other piece or square."
        },
        {
          name: "Deflection #2",
          fen: "8/3P4/8/k2r4/8/6R1/5K2/8 w - - 0 1",
          info: "Get a winning position in 3 moves. In this position, white is about to promote their pawn to a queen. However, black's rook is guarding the d8 square. Therefore, white needs to deflect the rook so they can safely promote their pawn. What is the only way for white to achieve that?"
        },
        {
          name: "Deflection #3",
          fen: "4r1k1/1p1q1ppp/p2p1P2/1n1P4/1P1Q4/6P1/P4PKP/4R3 w - - 0 3",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Deflection #4",
          fen: "rnbqkb1r/pp2pppp/5n2/8/2B1P3/2N5/PPP2PPP/R1BQK2R w - - 0 1",
          info: "Get a winning position in 2 moves."
        },
        {
          name: "Deflection #5",
          fen: "2b3k1/4q2p/3r2pQ/8/8/3r3R/6PP/5RK1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Deflection #6",
          fen: "4r1k1/5p2/3q2pp/4n3/6P1/4Q1NP/5P2/4R1K1 b - - 0 1",
          info: "Get a winning position in 2 moves."
        },
        {
          name: "Deflection #7",
          fen: "r2r2k1/p4pp1/1p1q3p/8/P7/7P/1P3PP1/R2QR1K1 w - - 0 1",
          info: "Get a winning position in 2 moves."
        },
        {
          name: "Deflection #8",
          fen: "r5rk/3b2qp/p1p5/PpP3BQ/1P6/2PB2P1/5PKP/8 w - - 0 1",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Deflection #9",
          fen: "r1bk3r/pppp1pp1/1n5p/4N2n/2q5/5PQ1/PPP3PP/R3R1K1 w - - 0 1",
          info: "Get a winning position in 2 moves."
        },
        {
          name: "Deflection #10",
          fen: "6k1/1r3pp1/5q1p/Np6/8/1P1p3Q/4bPPR/2R3K1 b - - 3 4",
          info: "Get a winning position in 2 moves."
        },
      ]
    },
  ]
  Attraction = [
    {
      name: "Attraction Lure a piece to bad square",
      subSections: [
        {
          name: "Attraction #1",
          fen: "5nk1/5p1p/8/5N2/8/Q4p1q/3r4/1R4K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves. The attraction is a tactic that occurs when we force an opponent's piece to move to a bad square. ­“Decoy” is also a synonym to attraction."
        },
        {
          name: "Attraction #2",
          fen: "rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9",
          info: "Checkmate the opponent in 3 moves. Richard Reti - Savielly Tartakower, 1910."
        },
        {
          name: "Attraction #3",
          fen: "r2B3r/3n2pp/p1kbR3/1b1p1P2/1qpP4/4PQPP/2B2P1K/8 w - - 0 1",
          info: "Checkmate the opponent in 2 moves"
        },
        {
          name: "Attraction #4",
          fen: "r4Bk1/5p2/4b1p1/q7/3P4/8/P1P2Q2/K6R w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Attraction #5",
          fen: "r3r1k1/p1p2pp1/3b3p/6R1/1PB1Q3/7q/2P2R2/6K1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves"
        },
        {
          name: "Attraction #6",
          fen: "8/5pk1/4p3/1p1r4/6P1/4P2p/PR2KP2/8 b - - 0 1",
          info: "Get a winning position in 3 moves."
        },
        {
          name: "Attraction #7",
          fen: "4k1r1/R6p/4Nb2/4n3/6Pq/2P4P/3Q3K/5R2 w - - 2 2",
          info: "Checkmate the opponent in 3 moves. There are multiple winning moves for white in this position, but use the attraction tactic to checkmate the opponent in 3 moves."
        },
        {
          name: "Attraction #8",
          fen: "6k1/ppq3bp/2n2np1/5p2/2P2P2/4KBN1/PP5P/RQ6 b - - 0 23",
          info: "Get a winning position in 1 move. Robert James Fischer - Rene Letelier Martner, 1960."
        },
        {
          name: "Attraction #9",
          fen: "8/r2n1p2/1r1N1Pk1/3pP1p1/1p4P1/qPp2K2/P1R4R/8 w - - 0 1",
          info: "Checkmate the opponent in 5 moves"
        },
        {
          name: "Attraction #10",
          fen: "7r/6kp/5bp1/8/8/8/6PP/2B2RK1 w - - 0 1",
          info: "Get a winning position in 1 move."
        },
      ]
    },
  ]
  Underpromotion = [
    {
      name: "Underpromotion Promote - but not to a queen!",
      subSections: [
        {
          name: "Introduction",
          fen: "7n/r4P1k/5b2/5N1p/8/1q6/PP6/K5R1 w - - 0 1",
          info: "Checkmate the opponent in 1 move. Underpromoting means promoting a pawn to a piece with a lower value than a queen (rook, bishop and knight). Underpromoting can be useful to deliver a checkmate, prevent a stalemate, prevent a checkmate or in certain cases, gain a material advantage.We usually underpromote to a bishop or rook only to prevent stalemate since the queen can move the same way as the two pieces combined, while underpromoting to a knight can be used for all the reasons stated above."
        },
        {
          name: "Underpromotion #1",
          fen: "8/5P1k/8/7K/8/8/8/8 w - - 0 1",
          info: "Get a winning position in 1 move"
        },
        {
          name: "Underpromotion #2",
          fen: "3B4/1P6/k7/8/8/5K2/8/8 w - - 0 1",
          info: "Get a winning position in 1 move"
        },
        {
          name: "Underpromotion #3",
          fen: "5r2/6Pk/5K2/8/8/8/8/8 w - - 0 1",
          info: "Get a winning position in 1 move"
        },
        {
          name: "Underpromotion #4",
          fen: "8/5P1p/6kr/7p/7P/5K2/8/8 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
        {
          name: "Underpromotion #5",
          fen: "8/8/8/8/2n5/k7/2p5/KB6 b - - 0 1",
          info: "Checkmate the opponent in 3 moves. In this position, promoting to a queen or rook would result in an immediate stalemate, and promoting to a knight would be insignificant. Therefore, the only winning move for black is to promote to a bishop."
        },
        {
          name: "Underpromotion #6",
          fen: "4Q3/Pq4pk/5p1p/5P1K/6PP/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. Aron G Reshko - Oleg Kaminsky, 1972."
        },
        {
          name: "Underpromotion #7",
          fen: "4r1k1/3q2P1/6Q1/8/6p1/6Pp/7P/5R1K w - - 0 1",
          info: "Get a winning position in 4 moves. In this position, white has a beautiful move combination that wins material, using underpromotion. Can you find this move combination?"
        },
        {
          name: "Underpromotion #8",
          fen: "8/6PK/5k2/8/8/8/8/6r1 w - - 0 1",
          info: "Equalize in 2 moves. From Lawrence Day - Jan Timman, 1980."
        },
        {
          name: "Underpromotion #9",
          fen: "3r4/k1P5/P7/1K6/8/8/8/8 w - - 0 1",
          info: "Get a winning position in 1 move. From Iroda Khamrakulova - Ekaterina Ubiennykh, 2001."
        },
      ]
    },
  ]
  Desperado = [
    {
      name: "Desperado A piece is lost, but it can still help",
      subSections: [
        {
          name: "Desperado #1",
          fen: "r3kb1r/pp3ppp/2N1pn2/q7/3P4/2N5/PP2bPPP/R1BQ1RK1 b - - 0 1",
          info: "Get a winning position in 2 moves. A desperado occurs when a piece is threatened or trapped but captures an opponent's piece before being captured itself, to gain as much material as possible, or alternatively when both sides have hanging pieces and we sacrifice a piece in order to gain more material at the end. From Julius Perlis - Savielly Tartakower, 1907."
        },
        {
          name: "Desperado #2",
          fen: "r2q2rk/2p2p2/pb1p3p/1p1N4/3nP1nB/PB3P2/1P3P2/R2QRK2 w - - 0 1",
          info: "Get a winning position in 2 moves. From Magnus Carlsen - Levon Aronian, 2008."
        },
        {
          name: "Desperado #3",
          fen: "r5k1/ppp1p1rp/8/3P3Q/2nRPqb1/2N5/PP2N1P1/1K5R b - - 0 1",
          info: "Get a winning position in 3 moves. From Shakhriyar Mamedyarov - Igor Kurnosov, 2009."
        },
        {
          name: "Desperado #4",
          fen: "r5rk/ppN2p1p/5PpQ/5q2/1p3Rn1/1P6/P5PP/3R1K2 w - - 0 1",
          info: "Get a winning position in 4 moves. From Peter Leko - Boris Gelfand, 2009."
        },
        {
          name: "Desperado #5",
          fen: "5rk1/3b2b1/4pnQp/1p1P4/p2BN2q/6P1/PPB2P2/6K1 b - - 0 1",
          info: "Get a winning position in 3 moves. From Vitaly Sergeevich Sherbakov - Semyon Furman, 1955."
        },
      ]
    },
  ]
  CounterCheck = [
    {
      name: "Counter Check Respond to a check with a check",
      subSections: [
        {
          name: "Counter-Check #1",
          fen: "k7/q7/Q7/3N4/8/8/8/6K1 w - - 0 1",
          info: "Checkmate the opponent in 2 moves. The Counter-Check is a powerful tactic that occurs when our king is in check, and we block that check while simultaneously giving a check to the opponent's king. This tactic can be useful to gain a tempo and eventually win the game, or to force trades. Daniel Abraham Yanofsky - Harry Golombek, 1951."
        },
        {
          name: "Counter-Check #2",
          fen: "8/6P1/8/8/1q2K3/8/5Q2/k7 w - - 0 1",
          info: "Get a winning position in 1 move."
        },
        {
          name: "Counter-Check #3",
          fen: "6r1/1p1np2k/p4b1p/q1pP4/2P1N3/4B3/PPQ4P/5RK1 w - - 0 1",
          info: "Checkmate the opponent in 3 moves. Use the Counter-Check tactic to win the game. Raimundo Garcia - Eduardo Figueroa, 1963."
        },
        {
          name: "Counter-Check #4",
          fen: "8/8/8/8/8/k5R1/2rn4/K7 b - - 55 94",
          info: "Get a winning position in 2 moves. From Jes West Knudsen - Bo Garner Christensen, 2004."
        },
        {
          name: "Counter-Check #5",
          fen: "2b5/5Npp/p1P5/P1R4k/1p4r1/3r1pPK/4BP1P/7R b - - 1 31",
          info: "Get a winning position in 3 moves. Lajos Portisch - Jozsef Pinter, 1984."
        },
      ]
    },
  ]
  Undermining = [
    {
      name: "Undermining Remove the defending piece",
      subSections: [
        {
          name: "Undermining #1",
          fen: "4rrk1/R5bp/3qp1p1/3p3n/2pB1P2/6PP/1P3PB1/3QR1K1 w - - 2 24",
          info: "Get a winning position in 1 move. Undermining occurs when we remove the defender of an important piece or square (usually by sacrificing a piece) to gain a material advantage or checkmate the opponent. From Johann Carlos Alvarez Marquez - Tomi Nyback, 2002."
        },
        {
          name: "Undermining #2",
          fen: "1b3rk1/1p5p/8/1N1p4/P1nBn1q1/4P1P1/R4PKN/7Q b - - 1 30",
          info: "Checkmate the opponent in 3 moves. From Loek van Wely - Judit Polgar, 1997."
        },
        {
          name: "Undermining #3",
          fen: "3qnrk1/1p3ppp/8/p4N2/8/P5QP/1P3PP1/4R1K1 w - - 0 1",
          info: "Get a winning position in 1 move"
        },
        {
          name: "Undermining #4",
          fen: "1q3r1k/r4ppp/5n2/8/3Q1N2/p6R/PPP5/1K5R w - - 0 1",
          info: "Get a winning position in 1 move"
        },
        {
          name: "Undermining #5",
          fen: "1q2rk2/1p3ppp/p4n2/2N5/1P6/6P1/P1Q3KP/5R2 w - - 0 1",
          info: "Get a winning position in 2 moves"
        },
      ]
    },
  ]
  Clearance = [
    {
      name: "Clearance Get out of the way!",
      subSections: [
        {
          name: "Clearance #1",
          fen: "4R3/2k5/3r1Np1/1p4K1/5P2/8/1n6/8 w - - 3 57",
          info: "Get a winning position in 2 moves. Clearance is a move that clears a square, file or diagonal for a follow-up tactical idea. Veselin Topalov - Peter Leko, 2006."
        },
        {
          name: "Clearance #2",
          fen: "8/k7/p1p5/2P1p3/1P2B3/P3P3/3K2p1/6n1 b - - 1 48",
          info: "Get a winning position in 2 moves. Loek van Wely - Shakhriyar Mamedyarov, 2004."
        },
        {
          name: "Clearance #3",
          fen: "1k1r3r/ppqb4/5Ppp/3p4/P2np3/3BR1Q1/2PB1PPP/R5K1 w - - 0 23",
          info: "Get a winning position in 2 moves. Robert James Fischer - Samuel Schweber, 1970."
        },
        {
          name: "Clearance #4",
          fen: "5k1r/1p6/2b1pNpp/2q1P2N/5P1Q/pPp5/Pn4PK/4R3 w - - 0 40",
          info: "Get a winning position in 2 moves. Garry Kasparov - Evgeny Bareev, 2001."
        },
        {
          name: "Clearance #5",
          fen: "5r2/p2q1r1p/7k/3pQ1R1/5pbP/8/PP1B1PP1/4R1K1 w - - 3 28",
          info: "Checkmate the opponent in 2 moves. Louis Charles Mahe De La Bourdonnais - Alexander McDonnell, 1834."
        },
      ]
    },
  ]
  KeySquares = [
    {
      name: "Key Squares Reach the key square",
      subSections: [
        {
          name: "Pawn on the 2nd rank",
          fen: "8/8/8/1k6/8/4K3/2P5/8 w - - 0 1",
          info: "Safely promote your pawn. If the pawn is on the second, third, or fourth rank, there are three key squares – the square two squares in front of the pawn and the squares to the left and right of that square. Reach a key square with your king and win."
        },
        {
          name: "Pawn on the 3rd rank",
          fen: "4k3/8/8/8/8/1KP5/8/8 w - - 0 1",
          info: "Safely promote your pawn. If the pawn is on the second, third, or fourth rank, there are three key squares – the square two squares in front of the pawn and the squares to the left and right of that square. Reach a key square with your king and win."
        },
        {
          name: "Pawn on the 4th rank",
          fen: "8/8/k7/4K3/2P5/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. If the pawn is on the second, third, or fourth rank, there are three key squares – the square two squares in front of the pawn and the squares to the left and right of that square. Reach a key square with your king and win."
        },
        {
          name: "Pawn on the 5th rank",
          fen: "3k4/8/8/1KP5/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. If the pawn is on the fifth or sixth rank, there are six key squares: the square in front of the pawn and the squares to the left and right, as well as the square two squares in front of the pawn, and the squares to the left and right of it. Reach a key square with your king and win."
        },
        {
          name: "Pawn on the 6th rank",
          fen: "2k5/8/1KP5/8/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. If the pawn is on the fifth or sixth rank, there are six key squares: the square in front of the pawn and the squares to the left and right, as well as the square two squares in front of the pawn, and the squares to the left and right of it. Reach a key square with your king and win."
        },
        {
          name: "Knight pawn on the 6th exception #1",
          fen: "k7/2K5/8/1P6/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. There is an exception to the key squares rule when a knight pawn is on its sixth rank, and the defending king is in the corner. Avoid the stalemate trick and win."
        },
        {
          name: "Knight pawn on the 6th exception #2",
          fen: "6k1/8/6K1/6P1/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn"
        },
        {
          name: "Pawn on the 7th rank",
          fen: "8/1kP1K3/8/8/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. When the pawn is on the seventh rank, the key squares are the squares on the seventh and eighth rank that touch the pawn's square. Reach a key square with your king and win."
        },
        {
          name: "Rook pawn #1",
          fen: "8/4k3/6K1/7P/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. An advanced rook pawn generally has two key squares: the two squares on the adjacent file that touch the promotion square. Reach a key square with your king and win."
        },
        {
          name: "Rook pawn #2",
          fen: "8/8/8/8/pk6/8/3K4/8 w - - 0 1",
          info: "Hold the draw for 10 more moves. An advanced rook pawn generally has two key squares: the two squares on the adjacent file that touch the promotion square. Reach a key square and win. Prevent the black king from reaching a key square to draw the game."
        },
        {
          name: "Any Key square by any route",
          fen: "5k2/8/8/8/8/2P5/8/3K4 w - - 0 1",
          info: "Safely promote your pawn. With a king and pawn versus a lone king, it is important to get the attacking king to any key square and the path to a key square is not always direct. Reach a key square and win."
        },
      ]
    },
  ]
  Opposition = [
    {
      name: "Opposition take the opposition",
      subSections: [
        {
          name: "Direct Opposition #1",
          fen: "8/2k5/8/8/2PK4/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. Direct Opposition is a position in which the kings are on the same rank or file and they are separated by one square. In such a situation, the player not having to move is said to 'have the opposition'. The side without the opposition may have to move the king away, potentially allowing the opposing king access to important squares. Take the opposition to reach a key square and win!"
        },
        {
          name: "Direct Opposition #2",
          fen: "8/8/8/4p3/4k3/8/8/4K3 w - - 0 1",
          info: "Hold the draw for 20 more moves. Take the opposition to prevent black from reaching a key square and hold the draw."
        },
        {
          name: "Direct Opposition #3",
          fen: "8/4k3/8/8/2P1K3/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. Take the opposition to reach a key square and win!"
        },
        {
          name: "Direct Opposition #4",
          fen: "8/8/7k/8/1p6/7K/2P5/8 w - - 0 1",
          info: "Safely promote your pawn. Take the opposition to reach a key square and win!"
        },
        {
          name: "Direct Opposition #5",
          fen: "8/4R2n/4K1pk/6p1/7P/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. Use your knowledge of Direct Opposition to win the game."
        },
        {
          name: "Distant Opposition #1",
          fen: "8/8/8/5kp1/8/8/8/6K1 w - - 0 1",
          info: "Hold the draw for 20 more moves. Distant Opposition is a position in which the kings are on the same rank or file but are separated by more than one square. If there are an odd number of squares between the kings, the player not having the move has the (distant) opposition. Take the Distant Opposition to hold the draw."
        },
        {
          name: "Distant Opposition #2",
          fen: "4k3/8/8/1p5p/1P5P/8/8/4K3 w - - 0 1",
          info: "Safely promote your pawn. Take the Distant Opposition to win the game."
        },
        {
          name: "As a means to an end",
          fen: "8/8/4k3/8/2PK4/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. White can take Direct Opposition, but is that the best move? Remember the key squares."
        },
      ]
    },
  ]
  rankRookPawn = [
    {
      name: "7th-Rank Rook Pawn Versus a Queen",
      subSections: [
        {
          name: "Exercise: Queen in front = Win",
          fen: "7K/8/Q7/8/8/6k1/5p2/8 w - - 0 1",
          info: "Checkmate the opponent. In this study, we're going to look at the endgame where one side has a Queen and the other side has a pawn on the 7th rank. We're going to look at the following situations:1) Queen in front of the pawn = Win 2) Not a Bishop or Rook pawn = Win 3) Rook or Bishop pawn without King assistance = Draw 4) Rook or Bishop pawn with King assistance = Win Let's start with a simple exercise to prove a first point: If the Queen can get in front of the pawn, the side with the Queen will win. Win this game."
        },
        {
          name: "Not a Bishop or Rook pawn = Win",
          fen: "7K/8/1Q6/8/8/8/3kp3/8 w - - 0 1",
          info: "If the pawn on the 7th rank is NOT a Bishop or Rook pawn, the side with the Queen can win.The key to winning these positions is to get our King near the pawn so we can capture it safely. To do this, we must force Black to block their own pawn with their King. This will give us a free move which we can use to get our King closer."
        },
        {
          name: "Exercise: d-pawn = Win",
          fen: "7K/8/1Q6/8/8/8/3pk3/8 w - - 0 1",
          info: "Checkmate the opponent. If the pawn on the 7th rank is NOT a Bishop or Rook pawn, the side with the Queen can win.The key to winning these positions is to get our King near the pawn so we can capture it safely. To do this, we must force Black to block their own pawn with their King. This will give us a free move which we can use to get our King closer."
        },
        {
          name: "Exercise: b-pawn = Win",
          fen: "7K/8/1Q6/8/8/8/1pk5/8 w - - 0 1",
          info: "Checkmate the opponent. If the pawn on the 7th rank is NOT a Bishop or Rook pawn, the side with the Queen can win. The key to winning these positions is to get our King near the pawn so we can capture it safely. To do this, we must force Black to block their own pawn with their King. This will give us a free move which we can use to get our King closer."
        },
        {
          name: "Rook pawn, no King assistance = Draw",
          fen: "8/1K6/P7/8/3q4/8/8/7k w - - 0 1",
          info: "If the pawn on the 7th rank is a Bishop or Rook pawn, and the side with the Queen does not have their King near the pawn, the side with the pawn can draw. When it's a Rook pawn, the side with the pawn just needs to promote it if allowed, or otherwise keep their King in or near the corner. The side with the Queen won't have any time to get their King closer."
        },
        {
          name: "Bishop pawn, no King assistance = Draw",
          fen: "7K/8/4Q3/8/8/8/2p5/1k6 w - - 0 1",
          info: "If the pawn on the 7th rank is a Bishop or Rook pawn, and the side with the Queen does not have their King near the pawn, the side with the pawn can draw. When it's a Bishop pawn, the side with the pawn just needs to promote it if allowed, or threaten to promote it, or exploit the possible stalemate situation. If played correctly, the side with the Queen won't have any time to get their King closer."
        },
        {
          name: "Exercise: Bishop pawn, no King assistance",
          fen: "7K/8/8/8/8/8/2p5/1k2Q3 b - - 1 1",
          info: "Hold the draw for 20 more moves. If the pawn on the 7th rank is a Bishop or Rook pawn, and the side with the Queen does not have their King near the pawn, the side with the pawn can draw. When it's a Bishop pawn, the side with the pawn just needs to promote it if allowed, or threaten to promote it, or exploit the possible stalemate situation. If played correctly, the side with the Queen won't have any time to get their King closer."
        },
        {
          name: "Rook pawn, King assistance on short side = Win",
          fen: "8/8/8/K7/2Q5/8/p7/1k6 w - - 0 1",
          info: "If the pawn on the 7th rank is a Rook pawn, and the side with the Queen has their King on one of the green squares (or closer) on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. White can accomplish this by having their Queen on the d2 square (other squares can also work) and the King on b3 when the pawn has promoted."
        },
        {
          name: "Exercise: Rook pawn, King assistance on short side",
          fen: "8/8/8/K7/2Q5/8/p7/1k6 w - - 0 1",
          info: "Checkmate the opponent. If the pawn on the 7th rank is a Rook pawn, and the side with the Queen has their King on one of the green squares (or closer) on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. White can accomplish this by having their Queen on the d2 square (other squares can also work) and the King on b3 when the pawn has promoted."
        },
        {
          name: "Rook pawn, King assistance on long side = Win",
          fen: "8/8/8/8/2QK4/8/p7/1k6 w - - 0 1",
          info: "If the pawn on the 7th rank is a Rook pawn, and the side with the Queen has their King on one of the green squares (or closer) on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. White can accomplish this by having their Queen on the d2 square (other squares can also work) and the King on one of the orange squares (d3, d2, d1) when the pawn has promoted."
        },
        {
          name: "Exercise: Rook pawn, King assistance on long side",
          fen: "8/8/8/8/2QK4/8/p7/1k6 w - - 0 1",
          info: "Checkmate the opponent. If the pawn on the 7th rank is a Rook pawn, and the side with the Queen has their King on one of the green squares (or closer) on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. White can accomplish this by having their Queen on the d2 square (other squares can also work) and the King on one of the orange squares (d3, d2, d1) when the pawn has promoted."
        },
        {
          name: "Bishop pawn, defending King on long side, King assistance on short side = Win",
          fen: "8/8/8/1K6/4Q3/8/2pk4/8 w - - 0 1",
          info: "If the pawn on the 7th rank is a Bishop pawn, and the side with the Queen has their King on one of the green squares on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. When the attacking King is on the short side, and the defending King is on the long side, the attacker can accomplish this by having their King on b3 when the pawn promotes."
        },
        {
          name: "Bishop pawn, defending King on long side, King assistance on long side = Win",
          fen: "8/8/Q7/8/6K1/8/2pk4/8 w - - 0 1",
          info: "If the pawn on the 7th rank is a Bishop pawn, and the side with the Queen has their King on one of the green squares on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. When both Kings are on the long side, the attacker can accomplish this by having their King on one of the orange squares (f3, f2, f1) when the pawn promotes."
        },
        {
          name: "Exercise: Bishop pawn, defending King on long side, King assistance on long side",
          fen: "8/8/Q7/8/6K1/8/2pk4/8 w - - 0 1",
          info: "Checkmate the opponent. If the pawn on the 7th rank is a Bishop pawn, and the side with the Queen has their King on one of the green squares on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. When both Kings are on the long side, the attacker can accomplish this by having their King on one of the orange squares (f3, f2, f1) when the pawn promotes."
        },
        {
          name: "Bishop pawn, defending King on short side, King assistance on short side = Win",
          fen: "8/4Q3/8/8/K7/8/1kp5/8 w - - 0 1",
          info: "If the pawn on the 7th rank is a Bishop pawn, and the side with the Queen has their King on one of the green squares on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. When both Kings are on the short side, the attacker can accomplish this by having their King on b3 when the pawn promotes."
        },
        {
          name: "Bishop pawn, defending King on short side, King assistance on long side = Win",
          fen: "8/4Q3/8/8/8/8/1kp5/4K3 w - - 0 1",
          info: "If the pawn on the 7th rank is a Bishop pawn, and the side with the Queen has their King on one of the green squares on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. When the attacking King is on the long side, and the defending King is on the short side, the attacker can accomplish this by having their King on d2 when the pawn promotes."
        },
        {
          name: "Exercise: Bishop pawn, defending King on short side, King assistance on long side",
          fen: "8/4Q3/8/8/8/8/1kp5/4K3 w - - 0 1",
          info: "Checkmate the opponent. If the pawn on the 7th rank is a Bishop pawn, and the side with the Queen has their King on one of the green squares on their move, they can win the game. The side with the Queen can allow the pawn to promote and deliver checkmate. When the attacking King is on the long side, and the defending King is on the short side, the attacker can accomplish this by having their King on d2 when the pawn promotes."
        },
      ]
    },
  ]
  rankRookPawn7 = [
    {
      name: "7th-Rank Rook Pawn And Passive Rook vs Rook",
      subSections: [
        {
          name: "King on f7",
          fen: "R7/P4k2/8/8/8/r7/6K1/8 w - - 0 1",
          info: "In this Study, we're going to look at Rook endgames where both sides have a Rook, but one side has a pawn on the 7th-rank and their Rook is passive, or 'trapped', in front of the pawn. If Black's King is on any of the red squares when it's White to move, this position is a draw. With Black's King on b6 or b7, Black will simply capture the pawn on the next move. With Black's King on c6 or c7, Black will play Kb7 on the next move and be able to either capture the pawn or occupy the promotion square by playing Ka8. With Black's King on a1, a2, or a6, it's impossible for White to move their Rook away from the promotion square with tempo as no checks are available. White either has to move their Rook and lose the pawn, or move their King. The White King has nowhere to hide, so black can just check White forever. If the black King is on any square other than the red squares, it is a win for White. With Black's King on d7, e7 or f7, White can play Rh8. Black can't respond with Rxa7 due to Rh7+, winning the rook on a7. The best Black can do is to delay the eventual loss. With Black's King on any other square not mentioned, White can move their Rook away from the promotion square with a check and promote their pawn on the next move."
        },
        {
          name: "King on g7",
          fen: "R7/P5k1/8/8/8/r7/6K1/8 b - - 0 1",
          info: "If Black's King is on any of the red squares when it's White to move, this position is a draw. With Black's King on b6 or b7, Black will simply capture the pawn on the next move. With Black's King on c6 or c7, Black will play Kb7 on the next move and be able to either capture the pawn or occupy the promotion square by playing Ka8. With Black's King on a1, a2, or a6, it's impossible for White to move their Rook away from the promotion square with tempo as no checks are available. White either has to move their Rook and lose the pawn, or move their King. The White King has nowhere to hide, so black can just check White forever. If the black King is on any square other than the red squares, it is a win for White. With Black's King on d7, e7 or f7, White can play Rh8. Black can't respond with Rxa7 due to Rh7+, winning the rook on a7. The best Black can do is to delay the eventual loss. With Black's King on any other square not mentioned, White can move their Rook away from the promotion square with a check and promote their pawn on the next move."
        },
        {
          name: "King on g7, extra g-pawn",
          fen: "R7/P5k1/8/8/8/r5P1/6K1/8 w - - 0 1",
          info: "An extra pawn on g3 has been introduced. What difference does it make? Well, if we push it to g6, it takes away the h7 square from Black's King."
        },
        {
          name: "King on g7, extra b-f pawn",
          fen: "R7/P5k1/8/8/8/r4P2/6K1/8 w - - 0 1",
          info: "An extra g-pawn does not help White, but an extra b-, c-, d-, e-, or f-pawn does win for White. Why? Because we can now force Black's King away from g7 and h7."
        },
        {
          name: "Exercise: King on g7, extra c-pawn",
          fen: "R7/P5k1/8/8/8/r1PK4/8/8 w - - 0 1",
          info: "Checkmate the opponent. We know that an extra b-, c-, d-, e-, or f-pawn win for White. Prove it."
        },
        {
          name: "Exercise: King on g7, 2 vs 1 on the king-side",
          fen: "R7/P5k1/6p1/8/5P1P/8/r7/6K1 w - - 0 1",
          info: "Checkmate the opponent. We know that an extra b-, c-, d-, e-, or f-pawn win for White. Force a win."
        },
        {
          name: "Hochstrasser - Papa, 2012: Forcing an f-pawn",
          fen: "R7/8/P5k1/5pp1/8/5PKP/r7/8 w - - 1 56",
          info: "In this game, White forced an f-pawn and won the game. From [Hochstrasser - Papa, Swiss National Championship A, 2012.]"
        },
        {
          name: "Bartholomew - Thaler, 2012: Trading into a winning 4v4 pawn endgame",
          fen: "R7/P6k/5pp1/4p2p/4P2P/5P2/r5PK/8 w - - 1 43",
          info: "In this game, White did not force an e- or f-pawn, but rather sacrificed the a7 pawn to trade Rooks into a winning 4v4 pawn endgame. This is a useful concept to remember. From [Bartholomew - Thaler, 2012]"
        },
        {
          name: "Spassky - Torre, 1982: Forcing an e-pown",
          fen: "R7/P5pk/5p2/4p2p/4P2P/5P2/6PK/r7 w - - 3 46",
          info: "Due to the pawn on g7, White is unable to sacrifice the a7 pawn in order to trade Rooks. White can't force the trade of Rooks, but has to force an e- or f-pawn."
        },
      ]
    },
  ]
  basicRookEndgames = [
    {
      name: "Basic Rook Endgames Lucena and Philidor",
      subSections: [
        {
          name: "Lucena - The Bridge",
          fen: "6K1/4k1P1/8/8/8/7r/8/5R2 w - - 0 1",
          info: "Safely promote your pawn. In this Study, we're going to cover basic rook endgames such as Lucena and Philidor. We're also going to see some basic ideas such as placing our rook behind passed pawns. Finally, we'll analyze some positions with a lone rook vs a pawn. This is the classic Lucena position. White is definitely winning, but has a major problem to solve: their king stands on the pawn's promotion square and currently can't move. Furthermore, even if it could, repeated rook checks from behind will force it back in front of the pawn. The next sequence, famously called 'building a bridge', addresses those issues elegantly. The idea is to bring the rook to e4 then come to g5 with the king to be able to stop repetitive checks from behind. Analysis from B.Larsen-W.Browne, Las Palmas 1982."
        },
        {
          name: "Lucena - Alternative Wins",
          fen: "5K2/3k1P2/8/8/8/8/6r1/4R3 w - - 0 1",
          info: "Safely promote your pawn. In the case where White has a central or bishop's pawn there is an alternative winning method: to maneuver the rook to the g8-square and budge Black's rook from that file, then simply marching forward with the king until there are no checks left. Be careful to not allow the rook to skewer the king and pawn! H.Ni-N.Pert, Liverpool 2007."
        },
        {
          name: "Reaching the Lucena I",
          fen: "8/4k3/8/6P1/6K1/8/7r/5R2 w - - 0 1",
          info: "Safely promote your pawn. In this position Black is unable to stop White from reaching the Lucena Position. The idea for white is to keep black's king cut off and push the pawn in a way that they can always defend it with their king. See if you can reach the Lucena and 'build the bridge'! J.Steer-A.Szurkos, Budapest 2014"
        },
        {
          name: "Reaching the Lucena II",
          fen: "8/6R1/8/5K2/1k6/r3P3/8/8 w - - 0 1",
          info: "Safely promote your pawn. A slightly trickier example, but the idea is the same. Cut off Black's king, reach the Lucena Position, and then either 'build the bridge' or use the alternative winning method discussed in example #2. D.Andreikin-A.Korobov, Karpov Memorial 2016."
        },
        {
          name: "Philidor Position",
          fen: "1r2k3/R7/8/4PK2/8/8/8/8 b - - 0 1",
          info: "Equalize in 10 moves. The Philidor Position, named after the legendary François-André Danican Philidor, whose analysis of this position dates all the way back to 1777! The key idea here is to cut off White's king along Black's 3rd rank, leaving White with no choice but to push the pawn to make safety for his king. This allows Black to switch to checks from behind, when the pawn sadly leaves White's king no safe shelter!"
        },
        {
          name: "Avoiding the Philidor",
          fen: "4k3/7R/8/3KP1r1/8/8/8/8 w - - 0 1",
          info: "Safely promote your pawn. Try to reach a Lucena position without accidentally running into a Philidor position. You can do this!"
        },
        {
          name: "Don't Place the Cart Before the Horse!",
          fen: "2r3k1/4Rp1p/6p1/8/P7/6P1/5P1P/6K1 w - - 0 1",
          info: "We have a passed pawn, but where should the rook be placed?"
        },
        {
          name: "Put Your Opponent's Cart Before their Horse",
          fen: "2R5/5pk1/8/8/8/7P/p5PK/r7 w - - 0 1",
          info: "Equalize in 20 moves. Rooks are also better behind your opponent's passed pawn because usually the opponent pawn won't be able to promote unless it's protected along its way. Here, it is very important to keep the rook on the a-file and check black's king if it approaches the pawn to help it promote."
        },
        {
          name: "Rook vs Pawn: Cutting off the King",
          fen: "6K1/6R1/2k5/1p6/8/8/8/8 w - - 0 1",
          info: "Get a winning position in 7 moves. In this position, the key idea is to cut off the king with the rook so it can't help the pawn to promote. Then we can bring our king safely and if black pushes their pawn further the rook can catch it right in time since the king would be too far."
        },
        {
          name: "Rook vs Pawn Draw",
          fen: "8/1R6/8/8/8/p2K4/1k6/8 b - - 0 1",
          info: "In this interesting position, the main idea for black to be able to draw is to not obstruct the pawn on the a-file and be cut off by white's rook. Thus black always needs to put their king on the c-file if white check them with the rook on the b-file."
        },
      ]
    },
  ]

  constructor() { }

  getLearnings(offset = 40) {
    if (offset == 0) {
      return this.pawnArray;
    } else if (offset == 1) {
      return this.bishopArray;
    }
    else if (offset == 2) {
      return this.Knight;
    }
    else if (offset == 3) {
      return this.Rook;
    }
    else if (offset == 4) {
      return this.Queen;
    }
    else if (offset == 5) {
      return this.King;
    }
    else if (offset == 6) {
      return this.pieceCheckmate1;
    }
    else if (offset == 7) {
      return this.checkmatePatternI;
    }
    else if (offset == 8) {
      return this.checkmatePatternsII;
    }
    else if (offset == 9) {
      return this.checkmatePatternsIII;
    }
    else if (offset == 10) {
      return this.checkmatePatternIV;
    }
    else if (offset == 11) {
      return this.piececheckmatesII;
    }
    else if (offset == 12) {
      return this.knightAndBishopMate;
    }
    else if (offset == 13) {
      return this.thePin;
    }
    else if (offset == 14) {
      return this.theSkewer;
    }
    else if (offset == 15) {
      return this.theFork;
    }
    else if (offset == 16) {
      return this.discoveredAttacks;
    }
    else if (offset == 17) {
      return this.doubleCheck;
    }
    else if (offset == 18) {
      return this.overloadedPieces;
    }
    else if (offset == 19) {
      return this.zwischenzug;
    }
    else if (offset == 20) {
      return this.xRay;
    }
    else if (offset == 21) {
      return this.zugzwang;
    }
    else if (offset == 22) {
      return this.Interference;
    }
    else if (offset == 23) {
      return this.greekGift;
    }
    else if (offset == 24) {
      return this.Deflection;
    }
    else if (offset == 25) {
      return this.Attraction;
    }
    else if (offset == 26) {
      return this.Underpromotion;
    }
    else if (offset == 27) {
      return this.Desperado;
    }
    else if (offset == 28) {
      return this.CounterCheck;
    }
    else if (offset == 29) {
      return this.Undermining;
    }
    else if (offset == 30) {
      return this.Clearance;
    }
    else if (offset == 31) {
      return this.KeySquares;
    }
    else if (offset == 32) {
      return this.Opposition;
    }
    else if (offset == 33) {
      return this.rankRookPawn;
    }
    else if (offset == 34) {
      return this.rankRookPawn7;
    }
    else if (offset == 35) {
      return this.basicRookEndgames;
    }
    else if (offset == 40) {
      return this.learningsArray;
    }
  }
}