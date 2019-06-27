export class ValuePair<TKey, TValue> {
    constructor(public key: TKey, public value: TValue) { }
    public toString(): string {
        return `[#${this.key}: ${this.value}]`;
    }
}
