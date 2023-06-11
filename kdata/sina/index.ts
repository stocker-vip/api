import { Minute } from "../../common.ts";
import { SinaKlineToKline, SinaRoot } from "./type.ts";
import { Url } from "./url.ts";

export const klineFetch =
    ( count: number ) =>
        ( minute: Minute ) =>
            async ( code: string ) =>
            {
                const url = Url( count )( minute )( code );
                const response = await fetch( url );
                const sd = await response.json() as SinaRoot;
                return sd.result?.data?.map( SinaKlineToKline ) ?? []
            }