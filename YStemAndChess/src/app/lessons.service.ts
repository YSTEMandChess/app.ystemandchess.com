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
      name: 'Capture - Take The Enemy Pieces ',
      subSections: [
        {
          name: 'The Basic',
          fen: '8/2p2p2/8/8/8/2R5/8/8 w - - 0 1',
          info: 'Take The Black Pieces.',
        },
        {
          name: 'Training 1',
          fen: '8/2r2p2/8/8/5Q2/8/8/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Training 2',
          fen: '8/5r2/8/1r3p2/8/3B4/8/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Training 3',
          fen: '8/5b2/5p2/3n2p1/8/6Q1/8/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Final',
          fen: '8/3b4/2p2q2/8/3p1N2/8/8/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
      ],
    },
    {
      name: 'Protection - Keep Your Pieces Safe ',
      subSections: [
        {
          name: 'Basic',
          fen: '8/8/8/4bb2/8/8/P2P4/R2K4 w - - 0 1',
          info: 'Escape',
        },
        {
          name: 'Training 1',
          fen: '8/8/2q2N2/8/8/8/8/8 w - - 0 1',
          info: 'Escape',
        },
        {
          name: 'Training 2',
          fen: '8/N2q4/8/8/8/8/6R1/8 w - - 0 1',
          info: 'No Escape',
        },
        {
          name: 'Training 3',
          fen: '8/8/1Bq5/8/2P5/8/8/8 w - - 0 1',
          info: 'No Escape',
        },
        {
          name: 'Training 4',
          fen: '1r6/8/5b2/8/8/5N2/P2P4/R1B5 w - - 0 1',
          info: 'No Escape',
        },
        {
          name: 'Training 5',
          fen: '8/1b6/8/8/8/3P2P1/5NRP/r7 w - - 0 1',
          info: `Don't Let Them Take Any Undefended Piece`,
        },
        {
          name: 'Training 6',
          fen: 'rr6/3q4/4n3/4P1B1/7P/P7/1B1N1PP1/R5K1 w - - 0 1',
          info: `Don't Let Them Take Any Undefended Piece`,
        },
        {
          name: 'Final',
          fen: '8/3q4/8/1N3R2/8/2PB4/8/8 w - - 0 1',
          info: `Don't Let Them Take Any Undefended Piece`,
        },
      ],
    },
    {
      name: 'Combat - Capture And Defend Pieces ',
      subSections: [
        {
          name: 'Basic',
          fen: '8/8/8/8/P2r4/6B1/8/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Training 1',
          fen: '2r5/8/3b4/2P5/8/1P6/2B5/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Training 2',
          fen: '1r6/8/5n2/3P4/4P1P1/1Q6/8/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Training 3',
          fen: '2r5/8/3N4/5b2/8/8/PPP5/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
        {
          name: 'Final',
          fen: '8/6q1/8/4P1P1/8/4B3/r2P2N1/8 w - - 0 1',
          info: `Take The Black Pieces And Don't Lose Yours`,
        },
      ],
    },
    {
      name: 'Check In One - Attack The Opponents King ',
      subSections: [
        {
          name: 'Basic',
          info: 'Check In One Goal',
          fen: '4k3/8/2b5/8/8/8/8/R7 w - - 0 1',
        },
        {
          name: 'Training 1',
          info: 'Check In One Goal',
          fen: '8/8/4k3/3n4/8/1Q6/8/8 w - - 0 1',
        },
        {
          name: 'Training 2',
          info: 'Check In One Goal',
          fen: '3qk3/1pp5/3p4/4p3/8/3B4/6r1/8 w - - 0 1',
        },
        {
          name: 'Training 3',
          info: 'Check In One Goal',
          fen: '2r2q2/2n5/8/4k3/8/2N1P3/3P2B1/8 w - - 0 1',
        },
        {
          name: 'Training 4',
          info: 'Check In One Goal',
          fen: '8/2b1q2n/1ppk4/2N5/8/8/8/8 w - - 0 1',
        },
        {
          name: 'Training 5',
          info: 'Check In One Goal',
          fen: '6R1/1k3r2/8/4Q3/8/2n5/8/8 w - - 0 1',
        },
        {
          name: 'Final',
          info: 'Check In One Goal',
          fen: '7r/4k3/8/3n4/4N3/8/2R5/4Q3 w - - 0 1',
        },
      ],
    },
    {
      name: 'Out Of Check - Defend Your King ',
      subSections: [
        {
          name: 'Basic',
          fen: '8/8/8/4q3/8/8/8/4K3 w - - 0 1',
          info: 'Escape With The King',
        },
        {
          name: 'Training 1',
          fen: '8/2n5/5b2/8/2K5/8/2q5/8 w - - 0 1',
          info: 'Escape With The King',
        },
        {
          name: 'Training 2',
          fen: '8/7r/6r1/8/R7/7K/8/8 w - - 0 1',
          info: 'The King Cannot Escape But Block',
        },
        {
          name: 'Training 3',
          fen: '8/8/8/3b4/8/4N3/KBn5/1R6 w - - 0 1',
          info: 'You Can Get Out Of Check By Taking',
        },
        {
          name: 'Training 4',
          fen: '4q3/8/8/8/8/5nb1/3PPP2/3QKBNr w - - 0 1',
          info: 'This Knight Is Checking Through Your Defenses',
        },
        {
          name: 'Training 5',
          fen: '8/8/7p/2q5/5n2/1N1KP2r/3R4/8 w - - 0 1',
          info: 'Escape Or Block',
        },
        {
          name: 'Final',
          fen: '8/6b1/8/8/q4P2/2KN4/3P4/8 w - - 0 1',
          info: 'Escape Or Block',
        },
      ],
    },
    {
      name: 'Mate In One - Defeat The Opponents King ',
      subSections: [
        {
          // rook
          name: 'Basic',
          fen: '3qk3/3ppp2/8/8/2B5/5Q2/8/5K2 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
        {
          // smothered
          name: 'Training 1',
          fen: '6rk/6pp/7P/6N1/8/8/8/8 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
        {
          // rook
          name: 'Training 2',
          fen: 'R7/8/7k/2r5/5n2/8/6Q1/8 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
        {
          // Q+N
          name: 'Training 3',
          fen: '2rb4/2k5/5N2/1Q6/8/8/8/8 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
        {
          // discovered
          name: 'Training 4',
          fen: '1r2kb2/ppB1p3/2P2p2/2p1N3/B7/8/8/3R4 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
        {
          // tricky
          name: 'Training 5',
          fen: '8/pk1N4/n7/b7/6B1/1r3b2/8/1RR5 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
        {
          // tricky
          name: 'Final',
          fen: 'r1b5/ppp5/2N2kpN/5q2/8/Q7/8/4B3 w - - 0 1',
          info: 'Attack Your Opponents King',
        },
      ],
    },
    {
      name: 'Board Setup - Board Setup Intro ',
      subSections: [
        {
          name: 'Basic',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1',
          info: 'This Is The Initial Position',
        },
        {
          name: 'Training 1',
          fen: 'r6r/pppppppp/8/8/8/8/8/2RR4 w - - 0 1',
          info: 'First Place The Rooks',
        },
        {
          name: 'Training 2',
          fen: 'rn4nr/pppppppp/8/8/8/8/2NN4/R6R w - - 0 1',
          info: 'Then Place The Knights',
        },
        {
          name: 'Training 3',
          fen: 'rnb2bnr/pppppppp/8/8/4BB2/8/8/RN4NR w - - 0 1',
          info: 'Place The Bishops',
        },
        {
          name: 'Training 4',
          fen: 'rnbq1bnr/pppppppp/8/8/5Q2/8/7P/RNB2BNR w - - 0 1',
          info: 'Place The Queen',
        },
        {
          name: 'Training 5',
          fen: 'rnbqkbnr/pppppppp/8/8/5K2/8/8/RNBQ1BNR w - - 0 1',
          info: 'Place The King',
        },
        {
          name: 'Final',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1',
          info: 'Pawns Form The FrontLine',
        },
      ],
    },
    {
      name: 'Castling - The Special King Move ',
      subSections: [
        {
          name: 'Basic',
          fen: 'rnbqkbnr/pppppppp/8/8/2B5/4PN2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          info: 'Castle King Side',
        },
        {
          name: 'Training 1',
          fen: 'rnbqkbnr/pppppppp/8/8/4P3/1PN5/PBPPQPPP/R3KBNR w KQkq - 0 1',
          info: 'Castle Queen Side',
        },
        {
          name: 'Training 2',
          fen: 'rnbqkbnr/pppppppp/8/8/8/4P3/PPPPBPPP/RNBQK1NR w KQkq - 0 1',
          info: 'The Knight Is In The Way',
        },
        {
          name: 'Training 3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          info: 'Castle KingSide Move Pieces First',
        },
        {
          name: 'Training 4',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          info: 'Castle QueenSide Move Pieces First',
        },
        {
          name: 'Training 5',
          fen: 'rnbqkbnr/pppppppp/8/8/3P4/1PN1PN2/PBPQBPPP/R3K1R1 w Qkq - 0 1',
          info: 'You Cannot Castle If Moved',
        },
        {
          name: 'Training 6',
          fen: 'rn1qkbnr/ppp1pppp/3p4/8/2b5/4PN2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          info: 'You Cannot Castle If Attacked',
        },
        {
          name: 'Training 7',
          fen: 'rnb2rk1/pppppppp/8/8/8/4Nb1n/PPPP1P1P/RNB1KB1R w KQkq - 0 1',
          info: 'Find A Way To Castle KingSide',
        },
        {
          name: 'Final',
          fen: '1r1k2nr/p2ppppp/7b/7b/4P3/2nP4/P1P2P2/RN2K3 w Q - 0 1',
          info: 'Find A Way To Castle QueenSide',
        },
      ],
    },
    {
      name: 'EnPassant - The Special Pawn Move ',
      subSections: [
        {
          name: 'Basic',
          fen: 'rnbqkbnr/pppppppp/8/2P5/8/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1',
          info: 'Black Just Moved The Pawn By Two Squares',
          color: 'white' as const,
        },
        {
          name: 'Training 1',
          fen: 'rnbqkbnr/ppp1pppp/8/2Pp3P/8/8/PP1PPPP1/RNBQKBNR b KQkq - 0 1',
          info: 'EnPassant Only Works Immediately',
          color: 'white' as const,
        },
        {
          name: 'Training 2',
          fen: 'rnbqkbnr/pppppppp/P7/2P5/8/8/PP1PPPP1/RNBQKBNR b KQkq - 0 1',
          info: 'EnPassant Only Works On Fifth Rank',
          color: 'white' as const,
        },
        {
          name: 'Final',
          fen: 'rnbqkbnr/pppppppp/8/2PPP2P/8/8/PP1P1PP1/RNBQKBNR b KQkq - 0 1',
          info: 'Take All The Pawns EnPassant',
          color: 'white' as const,
        },
      ],
    },
    {
      name: 'Stalemate - The Game Is A Draw ',
      subSections: [
        {
          name: 'Basic',
          fen: 'k7/8/8/6B1/8/1R6/8/8 w - - 0 1',
        },
        {
          name: 'Training 1',
          fen: '8/7p/4N2k/8/8/3N4/8/1K6 w - - 0 1',
        },
        {
          name: 'Training 2',
          fen: '4k3/6p1/5p2/p4P2/PpB2N2/1K6/8/3R4 w - - 0 1',
        },
        {
          name: 'Training 3',
          fen: '8/6pk/6np/7K/8/3B4/8/1R6 w - - 0 1',
        },
        {
          name: 'Final',
          fen: '7R/pk6/p1pP4/K7/3BB2p/7p/1r5P/8 w - - 0 1',
        },
      ],
    },
    {
      name: 'Check In Two - Two Moves To Give Check ',
      subSections: [
        {
          name: 'Basic',
          fen: '2k5/2pb4/8/2R5/8/8/8/8 w - - 0 1',
          info: 'Check In Two Goal',
        },
        {
          name: 'Training 1',
          fen: '8/8/5k2/8/8/1N6/5b2/8 w - - 0 1',
          info: 'Check In Two Goal',
        },
        {
          name: 'Training 2',
          fen: '6k1/2r3pp/8/1N6/8/8/4B3/8 w - - 0 1',
          goal: 'Check In Two Goal',
        },
        {
          name: 'Training 3',
          fen: 'r3k3/7b/8/4B3/8/8/4N3/4R3 w - - 0 1',
          info: 'Check In Two Goal',
        },
        {
          name: 'Training 4',
          fen: 'r1bqkb1r/pppp1p1p/2n2np1/4p3/2B5/4PN2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
          info: 'Check In Two Goal',
        },
        {
          name: 'Training 5',
          fen: '8/8/8/2k5/q7/4N3/3B4/8 w - - 0 1',
          goal: 'Check In Two Goal',
        },
        {
          name: 'Final',
          fen: 'r6r/1Q2nk2/1B3p2/8/8/8/8/8 w - - 0 1',
          goal: 'Check In Two Goal',
        },
      ],
    },
    {
      name: 'Piece Value - Piece Value Intro ',
      subSections: [
        {
          name: 'Basic',
          fen: '8/8/2qrbnp1/3P4/8/8/8/8 w - - 0 1',
          info: 'Queen Over Bishop',
        },
        {
          name: 'Training 1',
          fen: '8/8/4b3/1p6/6r1/8/4Q3/8 w - - 0 1',
          info: 'Piece Value Exchange',
        },
        {
          name: 'Training 2',
          fen: '5b2/8/6N1/2q5/3Kn3/2rp4/3B4/8 w - - 0 1',
          info: 'Piece Value Legal',
        },
        {
          name: 'Training 3',
          info: 'Take The Piece With The Highest Value',
          fen: '1k4q1/pp6/8/3B4/2P5/1P1p2P1/P3Kr1P/3n4 w - - 0 1',
        },
        {
          name: 'Final',
          fen: '7k/3bqp1p/7r/5N2/6K1/6n1/PPP5/R1B5 w - - 0 1',
          info: 'Take The Piece With The Highest Value',
        },
      ],
    },
  ];
  constructor() {}

  getLearnings() {
    return this.learningsArray;
  }
}
