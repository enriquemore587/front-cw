export class UserToCreate {
    constructor(
        public rfc: string = '',
        public email: string = '',
        public pwd: string = '',
        public name: string = '',
        public name2: string = '',
        public last_name: string = '',
        public last_name2: string = '',
        public profile: string = ''
    ) { }

    public _READY(): boolean {
        return !(!this.rfc || !this.email || !this.pwd || !this.name || !this.name2 || !this.last_name || !this.last_name2 || !this.profile);
    }
}