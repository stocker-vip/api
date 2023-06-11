// deno-lint-ignore-file prefer-namespace-keyword
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