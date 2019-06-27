import {defaultToString} from './defaultToString';
import {ValuePair} from './ValuePair';

export default class Dictionary<TKey, TValue> {
    private _table: { [key: string]: ValuePair<TKey, TValue> };

    public constructor(private _toStrFn: (key: TKey) => string = defaultToString) {
        this._table = {};
    }

    public set(key: TKey, value: TValue): boolean {
        if (key != null && value != null) {
            const tableKey = this._toStrFn(key);
            this._table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    public get(key: TKey): TValue | null {
        const valuePair = this._table[this._toStrFn(key)];
        return valuePair == null ? null : valuePair.value;
    }

    public hasKey(key: TKey): boolean {
        return this._table[this._toStrFn(key)] != null;
    }

    public remove(key: TKey): boolean {
        if (this.hasKey(key)) {
            delete this._table[this._toStrFn(key)];
            return true;
        }
        return false;
    }

    public values(): TValue[] {
        return this.keyValues().map(
            (valuePair: ValuePair<TKey, TValue>) => valuePair.value
        );
    }

    public keys(): TKey[] {
        return this.keyValues().map(
            (valuePair: ValuePair<TKey, TValue>) => valuePair.key
        );
    }

    public keyValues(): ValuePair<TKey, TValue>[] {
        return Object.values(this._table);
    }

    public forEach(callbackFn: (key: TKey, value: TValue) => any): void {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public size(): number {
        return Object.keys(this._table).length;
    }

    public clear(): void {
        this._table = {};
    }

    public toString(): string {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }

    public first(): TValue | null {
        const values = this.values();
        for (const i in values) {
            if (values.hasOwnProperty(i)) {
                return values[i];
            }
        }
        return null;
    }

    public last(): TValue | null {
        let item: TValue | null = null;
        const values = this.values();
        for (const i in values) {
            if (values.hasOwnProperty(i)) {
                item = values[i];
            }
        }
        return item;
    }
}


