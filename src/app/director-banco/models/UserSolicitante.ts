export class UserSolicitante {
    constructor(
        public id: string = "",
        public numero: string = "",
        public nombre: string = "",
        public gender: string = "",
        public level_study: string = "",
        public occupation: string = "",
        public ingreso_declarado: number = 0,
        public approved: boolean = false
    ) { }
}