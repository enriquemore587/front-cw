export class Solicitud {
  constructor(
    public id: number,
    public nacionalidad: string,
    public ingresoDeclarado: number,
    public topeMen: number,
    public BCscore: number,
    public gastoICC: number,
    public alertasH: string,
    public MOPmayor: number,
    public Saldovencido: number,
    public tasa: number,
    public edad: number,
    public pagosBuro: number,
    public plazoSolicitado: number,
    public montoSolicitado: number,
    public plazoDisponible : number,
    public mensualidad:number,
    public plazo:number,
    public linea_aprobada:number,
    public _tasa:number
  ) {

  }
}