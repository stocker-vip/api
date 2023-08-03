import { OneMinute$ } from '../kdata/eastmoney/index.ts'

const { start ,data } = OneMinute$( '000815' )
data.subscribe( console.log )
start()
