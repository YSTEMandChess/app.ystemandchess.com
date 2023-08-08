import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
}) 
export class PuzzlesService {
    puzzleArray = [
        {
          "PuzzleId": "lliIw",
          "FEN": "r2qkb1r/pQ3ppp/2p2n2/3b4/2BP4/8/PP3PPP/RNB1K2R b KQkq - 0 11",
          "Moves": "d5c4 b7c6 f6d7 c6c4 a8c8 c4e2",
          "Rating": 1313,
          "RatingDeviation": 74,
          "Popularity": 95,
          "NbPlays": 11404,
          "Themes": "advantage fork long opening",
          "GameUrl": "https://lichess.org/06Fl2Wl7/black#22"
        },
        {
          "PuzzleId": "zDU1R",
          "FEN": "5rk1/2q1bppp/r1P1p3/pb1pP2P/3B4/RP3N2/2Q2PP1/R5K1 w - - 1 31",
          "Moves": "a3a5 a6a5 a1a5 c7a5",
          "Rating": 1051,
          "RatingDeviation": 84,
          "Popularity": 84,
          "NbPlays": 54,
          "Themes": "crushing middlegame short",
          "GameUrl": "https://lichess.org/b9o5RCFX#61"
        },
        {
          "PuzzleId": "Hvcp5",
          "FEN": "3r2k1/5p2/pp3p2/2b4b/5B1P/P4P2/1Pr5/K3R1R1 b - - 1 31",
          "Moves": "g8f8 f4h6",
          "Rating": 944,
          "RatingDeviation": 75,
          "Popularity": 100,
          "NbPlays": 268,
          "Themes": "mate mateIn1 middlegame oneMove",
          "GameUrl": "https://lichess.org/N0PSnsZY/black#62"
        },
        {
          "PuzzleId": "5JRb0",
          "FEN": "6r1/3kbp2/nqp1p3/1p1pPn2/r2P1Bpp/1NNP4/2Q2PPP/1RR3K1 b - - 3 30",
          "Moves": "f5d4 c3a4 d4c2 a4b6",
          "Rating": 1702,
          "RatingDeviation": 85,
          "Popularity": 29,
          "NbPlays": 38,
          "Themes": "crushing middlegame short",
          "GameUrl": "https://lichess.org/0hNBhyCu/black#60"
        },
        {
          "PuzzleId": "pxPqp",
          "FEN": "r2qr1k1/p1p2ppp/1bpp4/8/4P3/2N1B3/PP2QP2/R4RK1 w - - 2 17",
          "Moves": "e3b6 d8g5 g1h1 e8e6 f2f4 e6h6",
          "Rating": 2176,
          "RatingDeviation": 77,
          "Popularity": 89,
          "NbPlays": 100,
          "Themes": "crushing long middlegame",
          "GameUrl": "https://lichess.org/PDpIr0su#33"
        },
        {
          "PuzzleId": "SJkwc",
          "FEN": "5rk1/pp4p1/2p2r2/2b5/5BpP/P1N5/1P5K/R4R2 w - - 2 29",
          "Moves": "h2g2 f6f4 f1f4 f8f4",
          "Rating": 728,
          "RatingDeviation": 87,
          "Popularity": 64,
          "NbPlays": 177,
          "Themes": "advantage middlegame short",
          "GameUrl": "https://lichess.org/H2eIxMDs#57"
        },
        {
          "PuzzleId": "Vaxe1",
          "FEN": "2r3k1/ppq2pp1/7p/4R3/2Np4/PPnP3P/3Q1PP1/6K1 w - - 7 30",
          "Moves": "d2f4 c3e2 e5e2 c7f4",
          "Rating": 728,
          "RatingDeviation": 76,
          "Popularity": 100,
          "NbPlays": 452,
          "Themes": "crushing endgame kingsideAttack short",
          "GameUrl": "https://lichess.org/PArZrooz#59"
        },
        {
          "PuzzleId": "Oxsgx",
          "FEN": "r3k2r/ppp2ppp/2pbb3/8/7q/5BP1/PPP2P1P/R1BQR1K1 b kq - 0 12",
          "Moves": "h4h3 f3g4 h3g4 d1g4",
          "Rating": 1700,
          "RatingDeviation": 79,
          "Popularity": 92,
          "NbPlays": 118,
          "Themes": "crushing middlegame pin short",
          "GameUrl": "https://lichess.org/FFcMQvIU/black#24"
        },
        {
          "PuzzleId": "edyfO",
          "FEN": "3r1rk1/1p3ppp/p1np4/4q3/4P1b1/1N1B4/PPPQ2PP/1R3RK1 b - - 1 16",
          "Moves": "g4h5 f1f5 e5e7 f5h5",
          "Rating": 1321,
          "RatingDeviation": 73,
          "Popularity": 95,
          "NbPlays": 13156,
          "Themes": "advantage interference middlegame short",
          "GameUrl": "https://lichess.org/5ZwZ6nxb/black#32"
        },
        {
          "PuzzleId": "IVF6h",
          "FEN": "8/8/8/2kB1Rpp/2Pb4/8/r4PK1/8 b - - 1 44",
          "Moves": "c5d6 c4c5 d4c5 d5a2",
          "Rating": 1588,
          "RatingDeviation": 74,
          "Popularity": 92,
          "NbPlays": 3336,
          "Themes": "crushing discoveredAttack endgame short",
          "GameUrl": "https://lichess.org/Df2Ufy8x/black#88"
        }
      ]
}