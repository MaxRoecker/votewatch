export interface Equals {
  (value: unknown, old: unknown): boolean;
}

const equals: Equals = (a, b) => a === b || (a !== a && b !== b);

abstract class SearchParamParser<T> {
  public readonly defaultValue: T;
  public readonly equals: Equals;

  constructor(defaultValue: T, hasChanged: Equals = equals) {
    this.defaultValue = defaultValue;
    this.equals = hasChanged;
  }

  abstract fromSearchParam(param: string | null): T;

  abstract toSearchParam(value: T): string | null;
}

export class IntSearchParamParser extends SearchParamParser<number> {
  fromSearchParam(param: string | null): number {
    if (param == null) return this.defaultValue;
    const value = Number.parseInt(param);
    if (Number.isNaN(value)) return this.defaultValue;
    if (!Number.isFinite(value)) return this.defaultValue;
    return Math.trunc(value);
  }

  toSearchParam(value: number): string | null {
    if (this.equals(value, this.defaultValue)) return null;
    if (Number.isNaN(value)) return null;
    if (!Number.isFinite(value)) return null;
    return Math.trunc(value).toString();
  }
}
