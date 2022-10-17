const practiceLessons = [
  {
    practice_name: "piece checkmate 1",
    subpractice: [
      {
        subPracticeName: "Queen and rook mate",
        startFen: "8/8/3k4/8/8/4K3/8/Q6R",
        info: "Use your queen and rook to restrict the king and deliver checkmate.Mate in 3 if played perfectly.",
      },
      {
        subPracticeName: "Two rook mate",
        startFen: "8/8/3k4/8/8/4K3/8/R6R",
        info: "Use your rooks to restrict the king and deliver checkmate. Mate in 4 if played perfectly",
      },
      {
        subPracticeName: "Queen and bishop mate",
        startFen: "8/8/3k4/8/8/2QBK3/8/8",
        info: "Use your queen and bishop to restrict the king and deliver checkmate.Mate in 5 if played perfectly.",
      },
      {
        subPracticeName: "Queen and knight mate",
        startFen: "8/8/3k4/8/8/2QNK3/8/8",
        info: "Use your queen and knight to restrict the king and deliver checkmate.Mate in 5 if played perfectly",
      },
      {
        subPracticeName: "Queen mate",
        startFen: "8/8/3k4/8/8/4K3/8/4Q3",
        info: "Use your queen to restrict the king, force it to the edge of the board and deliver checkmate. The queen can't do it alone, so use your king to help. Mate in 6 if played perfectly.",
      },
      {
        subPracticeName: "Rook mate",
        startFen: "8/8/3k4/8/8/4K3/8/4R3",
        info: "Use your rook to restrict the king,force it to the edge of the board and deliver checkmate. The rook can't do it alone, so use your king to help.Mate in 11 if played perfectly.",
      },
    ],
  },
  {
    practice_name: "checkmate pattern I",
    subpractice: [
      {
        subPracticeName: "Back-Rank  Mate #1",
        startFen: "6k1/4Rppp/8/8/8/8/5PPP/6K1",
        info: "A Back-Rank Mate is a checkmate delivered by a rook or queen along the back rank in which the mated king is unable to move up the board because the king is blocked by friendly pieces (usually pawns) on the second rank.",
      },
      {
        subPracticeName: "Back-Rank  Mate #2",
        startFen: "2r1r1k1/5ppp/8/8/Q7/8/5PPP/4R1K1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Back-Rank  Mate #2",
        startFen: "2r1r1k1/5ppp/8/8/Q7/8/5PPP/4R1K1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Back-Rank  Mate #3",
        startFen: "8/1p6/kp7/1p6/8/8/5PPP/5RK1",
        info: "Checkmate the opponent in 1 move",
      },
      {
        subPracticeName: "Back-Rank  Mate #4",
        startFen: "6k1/3qb1pp/4p3/ppp1P3/8/2PP1Q2/PP4PP/5RK1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Hook mate #1",
        startFen: "R7/4kp2/5N2/4P3/8/8/8/6K1",
        info: "The Hook Mate involves the use of a rook, knight, and pawn along with one blockading piece to limit the opponent's king's escape. In this mate, the rook is protected by the knight and the knight is protected by the pawn.",
      },
      {
        subPracticeName: "Hook mate #2",
        startFen: "5r1b/2R1R3/P4r2/2p2Nkp/2b3pN/6P1/4PP2/6K1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Hook mate #3",
        startFen: "2b1Q3/1kp6/p1Nb4/3P4/1P5p/p6P/K3R1P1/5q2",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Anastasia’s mate #1",
        startFen: "5r2/1b2Nppk/8/2R5/8/8/5PPP/6K1",
        info: "In Anastasia's Mate, a knight and rook team up to trap the opposing king between the side of the board on one side and a friendly piece on the other. This checkmate got its name from the novel Anastasia und das Schachspiel by Johann Jakob Wilhelm Heinse.",
      },
      {
        subPracticeName: "Anastasia’s mate #2",
        startFen: "5r1k/1b2Nppp/8/2R5/4Q3/8/5PPP/6K1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Anastasia’s mate #3",
        startFen: "5rk1/1b3ppp/8/2RN4/8/8/2QPPP/6K1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Anastasia’s mate #4",
        startFen: "1KRN3R/PPP5/5P2/2nB2P1/qb3Q1P/4rp2/pp6/k5r1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Blind swine mate #1",
        startFen: "5rk1/1R2R1pp/8/8/8/8/8/1K6",
        info: "The name of this pattern was coined by Polish master Dawid Janowski, 			referring to coupled rooks on a player's 7th rank as swine For this 				type of mate, the rooks on white's 7th rank can start out on any two of 			the files from a to e, and although black pawns are commonly present, 			they are not necessary to affect the mate",
      },
      {
        subPracticeName: "Blind swine mate #2",
        startFen: "r4rk1/2R5/1n2N1pp/2Rp4/p2P4/P4P2P/qP3PPK/8",
        info: "Checkmate the opponent in 6 moves",
      },
      {
        subPracticeName: "Blind swine mate #3",
        startFen: "5rk1/1R1R1p1p/4N1p1/p7/5p2/1P4P1/r2nP1KP/8",
        info: "Checkmate the opponent in 5 moves",
      },
      {
        subPracticeName: "Smothered Mate #1",
        startFen: "6rk/6pp/8/6N1/8/8/8/7K",
        info: "Smothered Mate occurs when a knight checkmates a king that is smothered (surrounded) by his friendly pieces and he has nowhere to move nor is there any way to capture the knight It is also known as Philidor's Legacy after François-André Danican Philidor,though its documentation predates Philidor by several hundred years",
      },
      {
        subPracticeName: "Smothered Mate #2",
        startFen: "6rk/6pp/6q1/6N1/8/7Q/6PP/6K1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Smothered Mate #3",
        startFen: "3r3k/1p1b1Qbp/1n2B1p1/p5N1/Pq6/8/1P4PP/R6K",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Smothered Mate #4",
        startFen: "r1k4r/ppp1bq1p/2n1N3/6B1/3p2Q1/8/PPP2PPP/R5K1",
        info: "Checkmate the opponent in 6 moves",
      },
    ],
  },
  {
    practice_name: "Checkmate Patterns II",
    subpractice: [
      {
        subPracticeName: "Double Bishop Mate #1",
        startFen: "7k/5B1p/8/8/8/8/8/5KB1",
        info: "Checkmate the opponent in 1 move",
      },
      {
        subPracticeName: "Double Bishop Mate #2",
        startFen: "r1bq3k/pp2R2p/3B2p1/2pBbp2/2Pp4/3P4/P1P3PP/6K1",
        info: "Checkmate the opponent in 1 move",
      },
      {
        subPracticeName: "Double Bishop Mate #3",
        startFen: "K3RBNR/P3P1PP/q1P1pPQ1/8/2PPBb2/6p1/ppp1ppbp/r2k3r",
        info: "Checkmate the opponent in 2 move",
      },
      {
        subPracticeName: "Boden's Mate #1",
        startFen: "2kr4/3p4/8/8/5B2/8/8/5BK1",
        info: "Checkmate the opponent in 1 move",
      },
      {
        subPracticeName: "Boden's Mate #2",
        startFen: "R3RK2/P1P1N1PP/2QB1P2/2P5/2b1B3/2q2n2/pp3ppp/r1br1k2",
        info: "Checkmate the opponent in 2 move",
      },
      {
        subPracticeName: "Boden's Mate #3",
        startFen: "2kr1b1r/pp1npppp/2p1bn2/7q/5B2/2NB1Q1P/PPP1N1P1/2KR3R",
        info: "Checkmate the opponent in 2 move",
      },
      {
        subPracticeName: "Balestra Mate #1",
        startFen: "5k2/8/6Q1/8/8/6B1/8/6K1",
        info: "Checkmate the opponent in 1 move",
      },
      {
        subPracticeName: "Arabian Mate #1",
        startFen: "7k/5R2/5N2/8/8/8/8/7K",
        info: "In the Arabian Mate, the knight and the rook team up to trap the opposing king on a corner of the board. The rook sits on a square adjacent to the king both to prevent escape along the diagonal and to deliver checkmate while the knight sits two squares away diagonally from the king to prevent escape on the square next to the king and to protect the rook.",
      },
      {
        subPracticeName: "Arabian Mate #2",
        startFen: "r4nk1/pp2r1p1/2p1P2p/3p1P1N/8/8/PPPK4/6RR",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Arabian Mate #3",
        startFen: "3qrk2/p1r2pp1/1p2pb2/nP1bN2Q/3PN3/P6R/5PPP/R5K1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Corner Mate #1",
        startFen: "7k/7p/8/7N1/8/8/8/6RK",
        info: "The Corner Mate works by confining the king to the corner using a rook or queen and using a knight to engage the checkmate.",
      },
      {
        subPracticeName: "Corner Mate #2",
        startFen: "K1R5/P7/B7/3n1q1R/1r5P/1p6/2p1Q3/1kr5",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Morphy's Mate #1",
        startFen: "6k/5p1p/8/8/7B/8/8/6RK",
        info: "Morphy's Mate is named after Paul Morphy. It works by using the bishop to attack the enemy king while your rook and an enemy pawn helps to confine it.",
      },
      {
        subPracticeName: "Morphy's Mate #2",
        startFen: "5rk1/p4p1p/1p1rpp2/3qB3/3PR3/7P/PP3PP1/6K1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Morphy's Mate #3",
        startFen: "2r2rk1/5ppp/pp6/2q5/2P2P2/2pP1RP/P5P1/B1R3K1",
        info: "Checkmate the opponent in 6 moves",
      },
      {
        subPracticeName: "Pillsbury's Mate #1",
        startFen: "5rk1/5p1p/8/8/8/8/1B6/4K2R",
        info: "Pillsbury's Mate is named for Harry Nelson Pillsbury and is a variation of Morphy's Mate. The rook delivers checkmate while the bishop prevents the King from fleeing to the corner square.",
      },
      {
        subPracticeName: "Pillsbury's Mate #2",
        startFen: "2rqnrk1/pp3ppp/1b1p4/3p2Q1/2n1P3/3B1P2/PB2NP1P/R5RK",
        info: "Checkmate the opponent in 5 moves",
      },
      {
        subPracticeName: "Damiano's Mate #1",
        startFen: "5rk1/6p1/6P1/7Q/8/8/8/6K1",
        info: "Damiano's Mate is a classic method of checkmating and one of the oldest. It works by confining the king with a pawn or bishop and using a queen to initiate the final blow. Damiano's mate is often arrived at by first sacrificing a rook on the h-file, then checking the king with the queen on the h-file, and then moving in for the mate. The checkmate was first published by Pedro Damiano in 1512.",
      },
      {
        subPracticeName: "Damiano's Mate #2",
        startFen: "4rk2/1p1q1p2/3p1Bn1/p1pP1p2/P1P5/1PK3Q1/8/7R",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Damiano's Mate #3",
        startFen: "1KRQ3R/1P4P1/1pPBB3/3P1Np1/5b1P/3p3p/1ppk2b1/r4r1q",
        info: "Checkmate the opponent in 5 moves",
      },
      {
        subPracticeName: "Lolli's Mate #1",
        startFen: "6k1/5p2/5PPQ/8/8/8/8/6K1",
        info: "Lolli's Mate involves infiltrating Black's fianchetto position using both a pawn and queen. The queen often gets to the h6 square by means of sacrifices on the h-file. It is named after Giambattista Lolli.",
      },
      {
        subPracticeName: "Lolli's Mate #2",
        startFen: "r4r2/1q3pkp/p1b1p1n1/1p4QP/4P3/1BP3P1/P4P2/R2R2K1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Lolli's Mate #3",
        startFen: "4r1qk/5p1p/pp2rPpR/2pbP1Q1/3pR3/2P5/P5PP/2B3K1",
        info: "Checkmate the opponent in 6 moves",
      },
    ],
  },
];
module.exports = practiceLessons;
