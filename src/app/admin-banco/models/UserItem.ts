export class UserItem {
    constructor(
        public id: string = "",
        public mail: string = "",
        public registration: Date = new Date(),
        public profile: string = "",
        public num_client: string = ""
    ) { }
}