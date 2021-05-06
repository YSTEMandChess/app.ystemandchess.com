export class MoveIndexes {
    pIndex: number //Ply Index
    mIndex: number //Move Index
}

export class Move { 
  move: string         // The move in SAN notation eg."e4"             
  indexes: MoveIndexes
  fen: string          // The fen of the position after the move eg."rnbqkbnr/..."
}
  