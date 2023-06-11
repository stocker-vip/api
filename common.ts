
export type Kdata = {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export type Tick = {
    time: string;
    price: number;
    volume: number;
    direction: Direction;
}

export enum Direction
{
    Buy,
    Sell,
}

export enum Minute
{
    M1 = 1,
    M5 = 5,
    M15 = 15,
    M30 = 30,
    M60 = 60,
    M120 = 120,
    D = 240,
    W = 1200,
    M = 10000,
}