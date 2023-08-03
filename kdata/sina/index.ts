import { isWorkingTime } from "https://cdn.jsdelivr.net/gh/stocker-vip/utils@v0.0.5/mod.ts";
import {interval,filter,switchMap, map, from, distinct} from 'npm:rxjs'

import { Minute } from "../../common.ts";
import { Fetch } from "../../fetch.ts";
import { L2Tick, SinaKlineToKline, SinaRoot } from "./type.ts";
import { Url, l2TickUrl } from "./url.ts";
// import { }

export const SinaKline =
    ( count: number ) =>
        ( minute: Minute ) =>
            async ( code: string ) =>
            {
                const url = Url( count )( minute )( code );
                const response = await fetch( url );
                const sd = await response.json() as SinaRoot;
                return sd.result?.data?.map( SinaKlineToKline ) ?? []
            }

export const l2Tick = (code:string) =>Fetch<L2Tick.Root>(l2TickUrl(code))

export const l2Tick$ = (fil:()=>boolean)=> (code:string)=>{
   return  interval(1000).pipe(
        filter(fil),
        switchMap(()=>l2Tick(code)),
        map(it=>it.result.data.data),
        switchMap(it=>from(it.reverse())),
        distinct(it=>it.id)
    )
}

export const l2TickInTime = l2Tick$(isWorkingTime)