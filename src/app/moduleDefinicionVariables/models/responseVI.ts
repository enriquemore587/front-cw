import { VariableIndicador } from './variableIndicador';
export class ResponseVI {
    constructor(
        public status: number,
        public message: string,
        public data: any[]
    ) { }
}