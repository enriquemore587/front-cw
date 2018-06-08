import { IndicadorBuro } from '../models/indicadorBuro';
export class ResponseIB {
    constructor(
        public status : number,
        public message : string,
        public data : IndicadorBuro[]
    ){
        
    }
}