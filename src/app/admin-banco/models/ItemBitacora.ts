export class ItemBitacora {
    constructor(
        public id: number = 0,
        public responsable: string = '',
        public date_movement: Date = new Date(),
        public tipo_movimiento: string = '',
        public nombre: string = ''
    ) { }
}