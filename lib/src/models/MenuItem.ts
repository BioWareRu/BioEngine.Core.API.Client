export class MenuItem {
    constructor(public label: string, public url: string, public items: Array<MenuItem> = []) {
    }
}
