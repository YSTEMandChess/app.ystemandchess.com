import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
}) 
export class PuzzlesService {
    puzzleArray = [
        {
            theme: 'advantage fork long opening',
            fen: 'r2qkb1r/pQ3ppp/2p2n2/3b4/2BP4/8/PP3PPP/RNB1K2R b KQkq - 0 11',
            moves: 'd5c4 b7c6 f6d7 c6c4 a8c8 c4e2',
            rating: '1313'
        },
        {
            theme: 'crushing middlegame short',
            fen: '5rk1/2q1bppp/r1P1p3/pb1pP2P/3B4/RP3N2/2Q2PP1/R5K1 w - - 1 31',
            moves: 'a3a5 a6a5 a1a5 c7a5',
            rating: '1051'
        },
        {
            theme: 'mate mateIn1 middlegame oneMove',
            fen: '3r2k1/5p2/pp3p2/2b4b/5B1P/P4P2/1Pr5/K3R1R1 b - - 1 31',
            moves: 'g8f8 f4h6',
            rating: '944'
        }
    ]
}