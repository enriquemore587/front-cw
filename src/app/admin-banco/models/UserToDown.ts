export class UserToDown {
    constructor(
        public user_id: string = '',
        public up_down: boolean = false,
        public reason: string = '',
        public commentary: string = ''
    ) { }

    public _READY(): boolean {
        return (!this.user_id || this.up_down || !this.reason || !this.commentary);
    }
}