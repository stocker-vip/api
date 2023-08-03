import { l2Tick$,l2TickInTime } from '../kdata/index.ts';
import { filter } from 'npm:rxjs';

// l2Tick$( () => true )( "000815" ).pipe(
//     filter( it => Number( it.vol ) >= 50 * 100 )
// ).subscribe( it => console.log( it ) )


l2TickInTime( "000815" ).subscribe( it => console.log( it ) )