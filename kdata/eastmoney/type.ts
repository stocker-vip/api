// deno-lint-ignore-file prefer-namespace-keyword no-namespace
export declare module EastmoneyKlineData {

    export interface Data {
        code: string;
        market: number;
        name: string;
        decimal: number;
        dktotal: number;
        preKPrice: number;
        klines: string[];
    }

    export interface RootObject {
        rc: number;
        rt: number;
        svr: number;
        lt: number;
        full: number;
        dlmkts: string;
        data: Data;
    }
}

export namespace Allstocks {
    export interface Root {
        rc: number
        rt: number
        svr: number
        lt: number
        full: number
        dlmkts: string
        data: Data
      }
      
      export interface Data {
        total: number
        diff: Diff[]
      }
      
      export interface Diff {
        f2:number;
        f3:number;
        f17:number;
        f12: string
        f14: string
        f20:number;
        f21:number;
      }
}

export namespace Tick {
    export interface Root {
        rc: number
        rt: number
        svr: number
        lt: number
        full: number
        dlmkts: string
        data: Data
      }
      
      export interface Data {
        code: string
        market: number
        decimal: number
        prePrice: number
        details: string[]
      }
}

export namespace OneMinuteStruct {
  export interface Root {
    rc: number
    rt: number
    svr: number
    lt: number
    full: number
    dlmkts: string
    data: Data
  }
  
  export interface Data {
    code: string
    market: number
    type: number
    status: number
    name: string
    decimal: number
    preSettlement: number
    preClose: number
    beticks: string
    trendsTotal: number
    time: number
    kind: number
    prePrice: number
    hisPrePrices: HisPrePrice[]
    trends: string[]
  }
  
  export interface HisPrePrice {
    date: number
    prePrice: number
  }
}