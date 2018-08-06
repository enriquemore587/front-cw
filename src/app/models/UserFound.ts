export class UserFound {
    constructor(
        public user_id: string = '',
        public rfc: string = '',
        public paterno: string = '',
        public materno: string = '',
        public nombre: string = '',
        public curp: string = '',
        public direccion: string = '',
        public status_request: string = '',
        public monto: string = '',
        public plazo: string = '',
        public tasa: string = '',
        public mensualidad: string = '',
        public producto: string = ''
    ) { }
}