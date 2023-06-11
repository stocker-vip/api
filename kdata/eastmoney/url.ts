// deno-lint-ignore-file no-inferrable-types
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


//  获取Tick实时信息
 export const TickUrl =(param:string="f51,f52,f53,f54,f55")=> (code:string) => `http://12.push2.eastmoney.com/api/qt/stock/details/sse?fields1=f1,f2,f3,f4&fields2=${param}&mpi=2000&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&pos=-0&secid=${ codeWithNumber( code ) }&wbp2u=6084345704571452|0|1|0|web`


//  获取列表
 export const ListUrl =(param:string="f20,f21,f12,f14,f3,f17,f2") => `http://89.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=8000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&wbp2u=6084345704571452|0|1|0|web&fid=f3&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048&fields=${param}`
