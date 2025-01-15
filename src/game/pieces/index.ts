import { Piece } from '@boardzilla/core';
import { Tradeoffs } from '../index.ts';

export class Token extends Piece<Tradeoffs> {
    type: 'Data' | 'Method' | 'User' | 'Aim';
    quality: number; // 1, 2, or 3
    side: 'up' | 'down';
}


export class ScoreCounter extends Piece<Tradeoffs> {
    value: number; // 1-10
}

