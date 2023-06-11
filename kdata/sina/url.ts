import { Minute } from "../../common.ts";

export const Url =
    ( count: number ) =>
        ( minute: Minute ) =>
            ( code: string ) =>
                `https://quotes.sina.cn/cn/api/openapi.php/CN_MarketDataService.getKLineData?symbol=${ code }&scale=${ minute }&ma=no&datalen=${ count }`