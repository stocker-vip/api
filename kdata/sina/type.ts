import { Kdata } from "../../common.ts"

export interface SinaRoot
{
    result: Result
}

export interface Result
{
    status: Status
    data: Daum[]
}

export interface Status
{
    code: number
}

export interface Daum
{
    day: string
    open: string
    high: string
    low: string
    close: string
    volume: string
}

export const SinaKlineToKline = ( data: Daum ): Kdata =>
{
    return {
        time: data.day,
        open: Number( data.open ),
        high: Number( data.high ),
        low: Number( data.low ),
        close: Number( data.close ),
        volume: Number( data.volume )
    }
}
