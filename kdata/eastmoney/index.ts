import { EventSourceControl} from 'https://cdn.jsdelivr.net/gh/stocker-vip/utils@v0.0.5/mod.ts'
import { Subject } from 'npm:rxjs'
import { Kdata, Minute } from "../../common.ts";
import { Allstocks, EastmoneyKlineData } from "./type.ts";
import { ListUrl, TickUrl, klineUrl } from "./url.ts";

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


export const AllStocks = async ()=>{
    const url = ListUrl()
    const res = await fetch(url)
    return  await res.json() as Allstocks.Root
}

export const TickFactor =(code:string)=>{
    const url = TickUrl()(code)
    const subject = new Subject<string>()
    const es = new EventSourceControl(url,{
        message: (msg)=>{
            subject.next(msg.data)
        }
    })
    return {
        start:()=> es.start(),
        stop:()=> es.stop(),
        data:()=> subject.asObservable()
    }
}