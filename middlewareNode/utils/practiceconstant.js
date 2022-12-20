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
  {
    practice_name: "Checkmate Patterns III",
    subpractice: [
      {
        subPracticeName: "Opera Mate #1",
        startFen: "4k3/5p2/8/6B1/8/8/8/3R2K1",
        info: "The Opera Mate works by attacking the king on the back rank with a rook using a bishop to protect it. A pawn or other piece other than a knight of the enemy king's is used to restrict its movement. The checkmate was named after its implementation by Paul Morphy in 1858 at a game at the Paris opera against Duke Karl of Brunswick and Count Isouard, known as the The Opera Game",
      },
      {
        subPracticeName: "Opera Mate #2",
        startFen: "RN1K2NR/PPP3PP/3Q1PB1/1b1P4/1B1b4/2n1q3/ppp2ppp/1k2r1nr",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Opera Mate #3",
        startFen: "RN1K3R/PP2BPPP/6Q1/5q2/2bpP3/5p2/pp5p/1kr3nr",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Anderssen's Mate #1",
        startFen: "6k1/6P1/5K1R/8/8/8/8/8",
        info: "In Anderssen's mate, named for Adolf Anderssen, the rook or queen is supported by a diagonally-attacking piece such as a pawn or bishop as it checkmates the opposing king along the eighth rank.",
      },
      {
        subPracticeName: "Anderssen's Mate #2",
        startFen: "1K6R/1pP3PP/2b2P1N/2Q5/p1B1P3/8/1pp3Pp/3r2k1",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Anderssen's Mate #3",
        startFen: "2r1nrk1/p4p1p/1p2p1pQ/nPqbRN2/8/P2B4/1BP2PPP/3R2K1",
        info: "Checkmate the opponent in 4 moves",
      },
      {
        subPracticeName: "Dovetail Mate #1",
        startFen: "1r6/pk6/4Q3/3P4/8/8/8/6K1",
        info: "In the Dovetail Mate, the mating queen is one square diagonally from the mated king which escape is blocked by two friendly non-Knight pieces.",
      },
      {
        subPracticeName: "Dovetail Mate #2",
        startFen: "r2b1q1r1/ppp3kp/1bnp4/4p1B1/3PP3/2P2Q2/PP3PPP/RN3RK1",
        info: "Checkmate the opponent in 1 moves",
      },
      {
        subPracticeName: "Dovetail Mate #3",
        startFen: "5QR1/PR3N1P/2KpP1P1/qP2bP2/7p/1p2pp2/p3b1p1/1k6",
        info: "Checkmate the opponent in 4 moves",
      },
      {
        subPracticeName: "Dovetail Mate #4",
        startFen: "rR6/5k2/2p3q1/4Qpb1/2PB1Pb1/4P3/r5R1/6K1",
        info: "Checkmate the opponent in 1 moves",
      },
      {
        subPracticeName: "Cozio's Mate #1",
        startFen: "8/8/1Q6/8/6pk/5q2/8/6K1",
        info: "Cozio's Mate is an upside down version of the Dovetail Mate. It was named after a study by Carlo Cozio that was published in 1766.",
      },
      {
        subPracticeName: "Swallow's Tail Mate #1",
        startFen: "3r1r2/4k3/R7/3Q4/8/8/8/6K1",
        info: "The Swallow's Tail Mate works by attacking the enemy king with a queen that is protected by a rook or other piece. The enemy king's own pieces block its means of escape. It is also known as the Guéridon Mate.",
      },
      {
        subPracticeName: "Swallow's Tail Mate #2",
        startFen: "8/8/5q2/1p3R2/2k1K3/5P2/8/8",
        info: "Checkmate the opponent in 1 moves",
      },
      {
        subPracticeName: "Epaulette Mate #1",
        startFen: "3rkr2/8/5Q2/8/8/8/8/6K1",
        info: "The Epaulette Mate is a checkmate where two parallel retreat squares for a checked king are occupied by its own pieces, preventing its escape.",
      },
      {
        subPracticeName: "Epaulette Mate #2",
        startFen: "RKR5/6P1/3PnB2/P6P/2r2p2/2pQb3/p1B1Q1pp/4r1k1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Epaulette Mate #3",
        startFen: "5r2/pp3k2/5r2/Q1p2Q2/3P4/6R1/PPP2PP1/1K6",
        info: "Checkmate the opponent in 1 moves",
      },
      {
        subPracticeName: "Pawn Mate #1",
        startFen: "8/7R/1pkp4/2p5/1PP5/8/8/6K1",
        info: "Although the Pawn Mate can take many forms, it is generally characterized as a mate in which a pawn is the final attacking piece and where enemy pawns are nearby. The Pawn Mate is sometimes also called the David and Goliath Mate, named after the biblical account of David and Goliath.",
      },
      {
        subPracticeName: "Pawn Mate #2",
        startFen: "r1b3nr/ppp3qp/1bnpk3/4p1bQ/3PP3/2P5/PP3PPP/RN3RK1",
        info: "Checkmate the opponent in 2 moves",
      },
    ],
  },
  {
    practice_name: "Checkmate Pattern IV",
    subpractice: [
      {
        subPracticeName: "Suffocation Mate #1",
        startFen: "5rk1/5p1p/8/3N4/8/8/1B6/7K",
        info: "The Suffocation Mate works by using the knight to attack the enemy king and the bishop to confine the king's escape routes.",
      },
      {
        subPracticeName: "Suffocation Mate #2",
        startFen: "r4k1r/1q3p1p/p1N2p2/1pp5/8/1PPP4/1P3PPP/R1B1R1K1",
        info: "Checkmate the opponent in 4 moves",
      },
      {
        subPracticeName: "Greco's Mate #1",
        startFen: "7k/6p1/6Q1/8/8/1B6/8/6K1",
        info: "Greco's Mate is named after the famous Italian checkmate cataloguer Gioachino Greco. It works by using the bishop to contain the black king by use of the black g-pawn and subsequently using the queen or a rook to checkmate the king by moving it to the edge of the board.",
      },
      {
        subPracticeName: "Greco's Mate #2",
        startFen: "r4r1k/ppn1NBpp/4b3/4P3/3p1R2/1P6/P1P3PP/R5K1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Greco's Mate #3",
        startFen: "r2q1rk1/pbp3pp/1p1b4/3N1p2/2B5/P3PPn1/1P3P1P/2RQK2R",
        info: "Checkmate the opponent in 4 moves",
      },
      {
        subPracticeName: "Max Lange's Mate #1",
        startFen: "2Q5/5Bpk/7p/8/8/8/8/6K1",
        info: "Max Lange's Mate is named after German chess player and problem composer Max Lange. It works by using the bishop and queen in combination to checkmate the king.",
      },
      {
        subPracticeName: "Max Lange's Mate #1",
        startFen: "K4BNR/1P2PPPP/2Q1p1B1/3q4/P2Ppb2/8/1pp2ppp/3k3r",
        info: "Checkmate the opponent in 5 moves",
      },
      {
        subPracticeName: "Blackburne's Mate #1",
        startFen: "5rk1/7p/8/6N1/8/8/1BB5/6K1",
        info: "Blackburne's Mate is named for Joseph Henry Blackburne. This checkmate utilizes an enemy rook (or bishop or queen) to confine the black king's escape to the f8 square. One of the bishops confines the black king's movement by operating at a distance, while the knight and the other bishop operate within close range.",
      },
      {
        subPracticeName: "Reti's Mate #1",
        startFen: "1nb5/1pk5/2P5/8/7B/8/8/3R3K",
        info: "Réti's Mate is named after Richard Réti, who delivered it in an 11-move game against Savielly Tartakower in 1910 in Vienna. It works by trapping the enemy king with four of its own pieces that are situated on flight squares and then attacking it with a bishop that is protected by a rook or queen.",
      },
      {
        subPracticeName: "Legal's Mate #1",
        startFen: "3q1b2/k4B2/3p4/4N3/8/2N5/8/6K1",
        info: "In Légal's Mate, the knight moves into a position to check the king. The bishop is guarded by the other knight, and the enemy pieces block the king's escape.",
      },
      {
        subPracticeName: "Kill Box Mate #1",
        startFen: "2kr4/8/1Q6/8/8/8/5PPP/3R1RK1",
        info: "The Kill Box Mate occurs when a rook is next to the enemy king and supported by a queen that also blocks the king's escape squares. The rook and the queen catch the enemy king in a 3 by 3 kill box.",
      },
      {
        subPracticeName: "Triangle Mate #1",
        startFen: "8/3p4/3k4/2R4Q/8/4K3/8/8",
        info: "A Triangle Mate is delivered by a queen attacking an enemy king, while it is supported by a rook. The queen and rook are one square away from the enemy king. They are on the same rank or file, separated by one square, with the enemy king being between them one square away, forming a triangle. The king must be restricted from escaping to the middle square behind it away from the queen and rook, by the edge of the board, a piece blocking it, or by controlling that square with a third piece.",
      },
      {
        subPracticeName: "Vukovic Mate #1",
        startFen: "4k3/R7/4N3/3r4/8/B7/4K3/8",
        info: "In the Vukovic Mate, a rook and knight team up to mate the king on the edge of the board. The rook delivers mate while supported by a third piece, and the knight is used to block the king's escape squares.",
      },
      {
        subPracticeName: "Vukovic Mate #2",
        startFen: "2K5/4r3/1k6/1n6/p7/8/8/7R",
        info: "Checkmate the opponent in 3 moves",
      },
      {
        subPracticeName: "Vukovic Mate #3",
        startFen: "2r5/8/8/5K1k/4N1R1/7P/8/8",
        info: "Checkmate the opponent in 2 moves",
      },
    ],
  },
  {
    practice_name: "Piece checkmates II",
    subpractice: [
      {
        subPracticeName: "Queen vs bishop mate",
        startFen: "8/83kb3/8/8/3KQ3/8/8",
        info: "Keep your pieces on the opposite color squares from the enemy bishop to stay safe. Use your queen to encroach on the king and look for double attacks. Mate in 10 if played perfectly.",
      },
      {
        subPracticeName: "Queen vs knight mate",
        startFen: "8/8/3kn3/8/8/3KQ/8/8",
        info: "Force the enemy king to the edge of the board while avoiding tricky knight forks. Mate in 12 if played perfectly.",
      },
      {
        subPracticeName: "Queen vs rook mate",
        startFen: "8/3kr3/8/3KQ3/8/8/8/8",
        info: "Normally the winning process involves the queen first winning the rook by a fork and then checkmating with the king and queen, but forced checkmates with the rook still on the board are possible in some positions or against incorrect defense.",
      },
      {
        subPracticeName: "Two bishop mate",
        startFen: "8/8/3k4/8/8/2BBK3/8/8",
        info: "When trying to checkmate with two bishops, there are two important principles to follow. One, the bishops are best when they are near the center of the board and on adjacent diagonals. This cuts off the opposing king. Two, the king must be used aggressively, in conjunction with the bishops. Mate in 13 if played perfectly.",
      },
      {
        subPracticeName: "Knight and bishop mate #1",
        startFen: "8/8/1k1K4/8/2BN4/8/8/8",
        info: "Of the basic checkmates, this is the most difficult one to force, because the knight and bishop cannot form a linear barrier to the enemy king from a distance. The checkmate can be forced only in a corner that the bishop controls. The mating process often requires accurate play, since a few errors could result in a draw either by the fifty-move rule or stalemate.Mate in 10 if played perfectly.",
      },
      {
        subPracticeName: "Knight and bishop mate #2",
        startFen: "8/8/3k4/3B4/3K4/8/3N4/8",
        info: "Of the basic checkmates, this is the most difficult one to force, because the knight and bishop cannot form a linear barrier to the enemy king from a distance. The checkmate can be forced only in a corner that the bishop controls. The mating process often requires accurate play, since a few errors could result in a draw either by the fifty-move rule or stalemate. Mate in 19 if played perfectly.",
      },
      {
        subPracticeName: "Two knights vs pawn",
        startFen: "6k1/6p1/8/4K3/4NN2/8/8/8",
        info: "Two knights can't force checkmate by themselves, but if the enemy has a pawn, we can avoid stalemate and force mate. Mate in 15 if played perfectly.",
      },
    ],
  },
  {
    practice_name: "Knight and Bishop Mate",
    subpractice: [
      {
        subPracticeName: "Introduction",
        startFen: "8/8/4k3/8/4K3/8/8/4BN1",
        info: "In this Study, we will look at how to checkmate a lone King with a Knight and Bishop.The first thing to note, is that we can only checkmate the King in the corner of the board which is the same color as our Bishop, which in this example is a8 and h1. If we had a dark squared Bishop, we could only checkmate Black on a1 or h8.Black will therefore try to stay in the center of the board, and if they can't, then they will move towards the wrong corner, meaning a corner in which we can't checkmate the King.White however, wants to force Black's King to a8 or h1. To accomplish this, there are two well-known methods that can be used. One is called Delétang's triangle method and the other is called the W method. You only have to know one of these methods. In this Study, we will learn the first one.The basic idea is to restrict Blacks King to smaller and smaller areas of the board.",
      },
      {
        subPracticeName: "Epic Failure",
        startFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
        info: "KBN vs K is a fairly rare endgame. A 2001 study showed that it happens in about 0.02% of games. Even so, it can be useful to study because the technique is hard to find OTB as this game shows.This game took place in Geneva, Switzerland in 2013. It was Round 4 in a FIDE Women Grand Prix tournament. The Women's World Chess Champion, Anna Ushenina, failed to mate with Knight and Bishop and her opponent claimed a draw due to the 50 move rule.The relevant part of the game starts at 72. Nxc3. Scroll through the moves and watch the video below. Move on to the next chapter when you're ready.",
      },
      {
        subPracticeName: "Restricting the king to the first triangle",
        startFen: "4k3/8/8/8/8/8/8/4KBN1",
        info: "You will have to use all of your pieces to push Black's king to a corner. Black will first try to stay in the center. Continue the lesson by moving your King towards the center.",
      },
      {
        subPracticeName: "Exercise: Restricting the king to the first triangle",
        startFen: "6k1/5N2/5K2/8/2B5/8/8/8",
        info: "In the previous chapter, Black replied to Nf7+ with Kh7. Here, Black replies Kg8 instead. Based on what we have learned so far, what move should White now play?",
      },
      {
        subPracticeName: "Restricting the king to the second triangle",
        startFen: "8/4k3/6K1/8/8/1B1N4/8/8",
        info: "Before we can transition our Bishop to the second triangle by playing Ba4, we must further restrict the Black King. Start by taking away the f8 square.",
      },
      {
        subPracticeName:
          "Exercise: Restricting the king to the second triangle",
        startFen: "8/4k1K1/8/8/2B5/3N4/8/8",
        info: "What would you play in this position?",
      },
      {
        subPracticeName: "Exercise: Restricting the king to the third triangle",
        startFen: "8/k3K3/8/1B1N4/8/8/8/8",
        info: "Before you can safely transition your Bishop to the third triangle by playing Ba6, you must further restrict the Black King. Restrict the Black King further in a way that does not allow Black to take the opposition.",
      },
      {
        subPracticeName: "Delivering Mate",
        startFen: "2B5/k1K5/8/3N4/8/8/8/8",
        info: "When we reach the third triangle, our King and Bishop is restricting the enemy King which frees up our Knight to deliver mate.",
      },
      {
        subPracticeName: "Exercise: Delivering Mate",
        startFen: "2B5/k1K5/8/3N4/8/8/8/8",
        info: "In this position, the King is on a7 instead of a8 which means you must checkmate Black slightly differently. Mate in three.",
      },
      {
        subPracticeName: "Exercise: Checkmate the Engine",
        startFen: "4k3/8/8/8/8/8/8/4KBN1",
        info: "Checkmate the opponent",
      },
      {
        subPracticeName: "Exercise: Checkmate the Engine- DSB Edition",
        startFen: "4k3/8/8/8/8/8/8/4KNB1",
        info: "Checkmate the opponent",
      },
      {
        subPracticeName: "Exercise: Checkmate the Engine- Rotated Edition",
        startFen: "1NBK4/8/8/8/8/8/8/3k4",
        info: "Checkmate the opponent",
      },
    ],
  },
  {
    practice_name: "The Pin",
    subpractice: [
      {
        subPracticeName: "Set up an absolute pin #1",
        startFen: "7k/8/8/4n3/4P3/8/8/6BK",
        info: "An absolute pin is when a piece is pinned to its king and can't move without exposing its king to a check from an opposing piece on the same line or diagonal. Pin the knight to win it.",
      },
      {
        subPracticeName: "Set up an absolute pin #2",
        startFen: "5k2/p1p2pp1/7p/2r5/8/1P3P2/PBP3PP/1K6",
        info: "Get a winning position in 2 moves",
      },
      {
        subPracticeName: "Set up an relative pin #1",
        startFen: "1k6/ppp3q1/8/4r3/8/8/3b1PPP/R4QK1",
        info: "A relative pin is one where the piece shielded by the pinned piece is a piece other than the king, but it's typically more valuable than the pinned piece. Moving such a pinned piece is legal but may not be prudent, as the shielded piece would then be vulnerable to capture. Do you see the immediate relative pin?",
      },
      {
        subPracticeName: "Exploit the pin #1",
        startFen: "4k3/6p1/5p1p/4n3/8/7P/5PP1/4R1K1",
        info: "Get a winning position in 2 moves",
      },
      {
        subPracticeName: "Exploit the pin #2",
        startFen: "r4rk1/pp1p1ppp/1qp2n2/8/4P3/1P1P2Q1/PBP2PPP/R4RK1",
        info: "Get a winning position in 1 moves",
      },
      {
        subPracticeName: "Exploit the pin #3",
        startFen: "4r1r1/2p5/1p1kn3/p1p1R1p1/P6p/5N1P/1PP1R1PK/8",
        info: "Get a winning position in 1 moves",
      },
      {
        subPracticeName: "Exploit the pin #4",
        startFen: "1r1n1rk1/ppq2p2/2b2bp1/2pB3p/2P4P/4P3/PBQ2PP1/1R3RK1",
        info: "Checkmate the opponent in 2 moves",
      },
      {
        subPracticeName: "Exploit the pin #5",
        startFen: "K1R3N1/1QP3P1/P1r2P2/p4p2/3P1bp1/8/1pp5/1k5q",
        info: "Get a winning position in 3 moves",
      },
    ],
  },
  {
    practice_name: "The Skewer",
    subpractice: [
      {
        subPracticeName: "Relative skewer #1",
        startFen: "8/1r3k2/2q1ppp1/8/5PB1/4P3/4QK2/5R2",
        info: "Get a winning position in 2 moves",
      },
      {
        subPracticeName: "Relative skewer #2",
        startFen: "r2r2k1/2p2ppp/5n2/4p3/pB2P3/P2q3P/2R2PP1/2RQ2K1",
        info: "Get a winning position in 2 moves",
      },
      {
        subPracticeName: "Relative skewer #3",
        startFen: "R2K3R/3NBQ2/1P4PP/P1PBpP2/2n2p2/4b3/1p2bqpp/k1rr4",
        info: "Get a winning position in 3 moves",
      },
      {
        subPracticeName: "Absolute skewer #1",
        startFen: "8/8/2Q5/2BK4/8/8/2bkq3/8",
        info: "Get a winning position in 2 moves",
      },
      {
        subPracticeName: "Absolute skewer #2",
        startFen: "2Q5/1p4q1/p4k2/6p1/P3b3/6BP/5PP1/6K1",
        info: "Get a winning position in 3 moves",
      },
      {
        subPracticeName: "Absolute skewer #3",
        startFen: "5Q2/2k2p2/3bqP2/R2p4/3P1p2/2p4P/2P3P1/7K",
        info: "Get a winning position in 3 moves",
      },
      {
        subPracticeName: "Absolute skewer #4",
        startFen: "5k2/pp1b4/3N1pp1/3P4/2p5/q1P1QP2/5KP1/8",
        info: "Get a winning position in 4 moves",
      },
      {
        subPracticeName: "Absolute skewer #5",
        startFen: "6Q1/6p1/2k4p/R6B/p7/8/2P3P1/2K5",
        info: "Get a winning position in 3 moves",
      },
    ],
  },
];
module.exports = practiceLessons;
