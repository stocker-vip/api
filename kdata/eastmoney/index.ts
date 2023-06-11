import { Kdata, Minute } from "../../common.ts";
import { EastmoneyKlineData } from "./type.ts";
import { klineUrl } from "./url.ts";

export const EastmoneyKline = ( count: number ) => ( minute: Minute ) => async ( code: string ) =>
{
    const res = await fetch( klineUrl( code, minute, count ) )
    const json: EastmoneyKlineData.RootObject = await res.json()
    return json.data?.klines?.map( convertKline ) ?? []
}

export const convertKline = ( data: string ) =>
{
    const [ time, open, close, high, low, volume, ] = data.split( ',' );
    return {
        time: `${ time }:00`, // eastmoney time is : YYYY-MM-DD hh:mm 补上秒数
        open: Number( open ),
        close: Number( close ),
        high: Number( high ),
        low: Number( low ),
        volume: Number( volume )
    } as Kdata
}