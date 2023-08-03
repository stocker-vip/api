import { EventSourceControl } from 'https://cdn.jsdelivr.net/gh/stocker-vip/utils@v0.0.5/mod.ts'
import { Subject, distinct, filter, from, map, switchMap, interval } from 'npm:rxjs'
import { Kdata, Minute } from "../../common.ts";
import { Allstocks, EastmoneyKlineData, OneMinuteStruct, Tick } from "./type.ts";
import { ListUrl, OneMinuteUrl$, TickUrl, klineUrl } from "./url.ts";

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


export const AllStocks = async () =>
{
    const url = ListUrl()
    const res = await fetch( url )
    return await res.json() as Allstocks.Root
}

export const TickFactor = ( code: string ) =>
{
    const url = TickUrl()( code )
    const { start, stop, data } = EventSourceFactor<Tick.Root>( url )
    const deal = ( str: string ) =>
    {
        const [ time, price, vol, shou, state ] = str.split( "," );
        return {
            time,
            price: Number( price ),
            vol: Number( vol ),
            shou: Number( shou ),
            state: state
        }
    }
    const data2 = () => data().pipe(
        filter( it => !!it.data ),
        map( it => it.data.details ),
        switchMap( it => from( it ) ),
        distinct(),
        map( it => deal( it ) )
    )
    return {
        start,
        stop,
        data: data2
    }
}

interface OneMineType
{
    time: string;
    open: number;
    close: number;
    high: number;
    low: number;
    vol: number;
    money: number;

}
export const OneMinute$ = ( code: string ) =>
{
    const url = OneMinuteUrl$()( code );
    const { start, stop, data } = EventSourceFactor<OneMinuteStruct.Root>( url )
    return {
        start,
        stop,
        data: data().pipe(
            filter( it => !!it.data?.trends ),
            map( it => it.data.trends ),
            map<string[], OneMineType[]>( it => it.map( item =>
            {
                const [ time, openValue, closeValue, highValue, lowValue, volValue, moneyValue ] = item.split( ',' );
                return {
                    time,
                    open: Number( openValue ),
                    close: Number( closeValue ),
                    high: Number( highValue ),
                    low: Number( lowValue ),
                    vol: Number( volValue ),
                    money: Number( moneyValue )
                }
            } ) )
        )
    }
}

export const EventSourceFactor = <T> ( url: string ) =>
{
    const subject = new Subject<T>()
    const es = new EventSourceControl( url, {
        message: ( msg ) =>
        {
            const data = JSON.parse( msg.data ) as T
            subject.next( data )
        }
    } )
    return {
        start: () => es.start(),
        stop: () => es.stop(),
        data: () => subject.asObservable()
    }
}