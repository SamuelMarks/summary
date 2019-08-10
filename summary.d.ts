declare type NumberCollections = number[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export declare class Summary {
    _data: NumberCollections;
    _sorted: NumberCollections | undefined;
    _length: number;
    _cache_sum: number | undefined;
    _cache_mode: number | undefined;
    _cache_mean: number | undefined;
    _cache_quartiles: {
        [q: number]: number;
    };
    _cache_constiance: number | undefined;
    _cache_sd: number | undefined;
    _cache_max: number | undefined;
    _cache_min: number | undefined;
    _cache_variance: number | undefined;
    constructor(_data: NumberCollections, sorted?: boolean);
    static _(_data: NumberCollections, sorted?: boolean): Summary;
    init(_data: NumberCollections, sorted?: boolean): void;
    data(): NumberCollections;
    sort(): NumberCollections;
    size(): number;
    sum(): number;
    mode(): number;
    mean(): number;
    quartile(prob: number): number;
    median(): number;
    constiance(): number;
    sd(): number;
    max(): number;
    min(): number;
    variance(): number;
}
interface SummaryConstructor {
    new (_data: NumberCollections, sorted?: boolean): Summary;
    (_data: NumberCollections, sorted?: boolean): Summary;
}
export declare const summary: SummaryConstructor;
export {};
