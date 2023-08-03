import { codeWithSymbol } from "https://cdn.jsdelivr.net/gh/stocker-vip/utils@v0.0.5/mod.ts";
import { Minute } from "../../common.ts";

export const Url =
    ( count: number ) =>
        ( minute: Minute ) =>
            ( code: string ) =>
                `https://quotes.sina.cn/cn/api/openapi.php/CN_MarketDataService.getKLineData?symbol=${ code }&scale=${ minute }&ma=no&datalen=${ count }`


export const l2TickUrl = (code:string)=>`https://quotes.sina.cn/cn/api/openapi.php/CN_TransactionsService.getTransList?symbol=${codeWithSymbol(code)}&num=100&type=lv2`