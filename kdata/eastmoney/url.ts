import { codeWithNumber } from 'https://cdn.jsdelivr.net/gh/stocker-vip/utils@v0.0.4/mod.ts'
import { Minute } from "../../common.ts"


const eastmoneyMinuteKey = ( m: Minute ) =>
{
    switch ( m )
    {
        case Minute.M1:
            return '1'
        case Minute.M5:
            return '5'
        case Minute.M15:
            return '15'
        case Minute.M30:
            return '30'
        case Minute.M60:
            return '60'
        case Minute.M120:
            return '60'
        case Minute.D:
            return '101'
        case Minute.M:
            return '102'
        case Minute.W:
            return '103'
    }
}
export const klineUrl = (code: string, minute: Minute,count:number) =>{
    return `http://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${codeWithNumber(code)}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56&klt=${eastmoneyMinuteKey(minute)}&fqt=0&end=20500101&lmt=${count}`
 }
