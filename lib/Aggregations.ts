import { FilterBuilder, FilterJSON } from "./Filter";

/**
 * Mixin Decorator
 *
 * @param {Function[]} baseCtors
 * @returns
 */
function Mixin(baseCtors: Function[]) {
    return function (derivedCtor: Function) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                if (!derivedCtor.prototype[name]) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                }
            });
        });
    };
 }

/**
 * The JSON format of an aggregation object
 *
 * @export
 * @interface AggregationJSON
 */
export type AggregationJSON<T> = T & {
    /**
     * Unique string for each aggregation type
     *
     * @type {string}
     * @memberOf AggregationJSON
     */
    readonly type: string
    /**
     * The data source of the aggregation
     *
     * @type {AggregationJSON}
     * @memberOf AggregationJSON
     */
    source?: AggregationJSON<any>
}

/**
 * Basic Options for a bucket aggregation
 *
 * @export
 * @interface BasicBucketsOptions
 */
export interface BasicBucketsOptions {
    /**
     * Id of the field to bucket based on
     *
     * @type {string}
     * @memberOf BasicBucketsOptions
     */
    fieldId: string
    /**
     * The maximum number of result buckets to return
     *
     * @type {number}
     * @memberOf BasicBucketsOptions
     */
    size?: number
    /**
     * Restrict to only the buckets where the field given by the fieldId
     * have the given values
     *
     * @type {string[]}
     * @memberOf BasicBucketsOptions
     */
    values?: string[]
    /**
     * Options to apply to show
     *
     * @type {BucketsOptions}
     * @memberOf BasicBucketsOptions
     */
    subBuckets?: BucketsOptions
}

/**
 * Abstract class for aggregation sources
 */
export abstract class AbstractAggregationSource {
    /**
     *
     *
     * @template T
     * @param {AbstractAggregation[]} [aggs=[]]
     * @returns {T}
     *
     * @memberOf AbstractAggregation
     */
    abstract sink(aggs?: AbstractAggregation[]): any
    /**
     * Set a downstream aggregation
     *
     * @template T
     * @param {T} aggregation
     * @returns the aggregation for chaining
     *
     * @memberOf AbstractAggregation
     */
    pipe<T extends AbstractAggregation>(aggregation: T){
        aggregation.source = this
        return aggregation
    }
    toJSON(): any {
        return undefined
    }
}


export interface NestedFieldBucketsOptions extends BasicBucketsOptions {
    /**
     * Ids of the nested field to include in buckets
     *
     * @type {string[]}
     * @memberOf NestedFieldBucketsOptions
     */
    subFieldIds: string[]
    /**
     * The field in the nested object to use for bucketing
     *
     * @type {string}
     * @memberOf NestedFieldBucketsOptions
     */
    subFieldProp: string
}

export type ClassBucketsOptions = BasicBucketsOptions | NestedFieldBucketsOptions

export type HistogramBucketsOptions = ClassBucketsOptions & {
    /**
     * The interval size of a bucket for the histogram
     *
     * @type {number}
     */
    interval: number
}

export type DateHistogramBucketsOptions = ClassBucketsOptions & {
    /**
     * The time interval size of a bucket for the date-histogram
     *
     * @type {("year"|"month"|"day"|"hour"|"minute"|"second"|"millisecond")}
     */
    dateInterval: "year"|"month"|"day"|"hour"|"minute"|"second"|"millisecond"
}

export type IntervalBucketsOptions = HistogramBucketsOptions | DateHistogramBucketsOptions

export type BucketsOptions = ClassBucketsOptions | IntervalBucketsOptions

export type BucketsJSON = AggregationJSON<BucketsAggregation> & {
    fieldId: string
    size?: number
    values?: string[]
    interval?: number
    dateInterval?: "year"|"month"|"day"|"hour"|"minute"|"second"|"millisecond"
    subFieldIds?: string[]
    subFieldProp?: string
    subBuckets?: BucketsJSON
}

/**
 * Abstract class for an Aggregation
 * Example:-
 *
 * ```ts
 * const output = new SomeSource()
 * .pipe(new FilterAggregation())
 * .where('age', gt(18))
 * .pipe(new BucketsAggregation({
 *     fieldId: 'name',
 *     subBuckets: {
 *         fieldId: 'age',
 *         interval: 10
 *     }
 * }))
 * .sink()
 * ```
 * @export
 * @abstract
 * @class AbstractAggregation
 * @implements {AbstractAggregationSource}
 * @implements {AggregationJSON}
 */
@Mixin([AbstractAggregationSource])
export abstract class AbstractAggregation implements AbstractAggregationSource, AggregationJSON<{}> {
    pipe: <T extends AbstractAggregation>(aggregation: T) => T
    sink(aggs?: AbstractAggregation[]): any {
        if (!this.source) {
            throw new Error('Cannot sink a pipeline as ' + this.type + ' has no source')
        }
        return this.source.sink([this, ...(aggs||[])])
    }
    abstract type: string
    /**
     * The source aggregation for this aggregation to be applied to
     *
     * @type {AbstractAggregation}
     * @memberOf AbstractAggregation
     */
    source: AbstractAggregation | AbstractAggregationSource
    toJSON(){
        const json: AggregationJSON<{}> = Object.assign({}, this)
        if (json.source) {
            json.source = this.source.toJSON()
        }
        return json
    }
    static fromJSON(json: AggregationJSON<any>): Aggregation {
        switch (json.type) {
            case 'filter':
                return FilterAggregation.fromJSON(json)
            case 'buckets':
                return BucketsAggregation.fromJSON(json)
            default:
                throw new Error('Unknown aggregation type');
        }
    }
}

/**
 * An aggregator for filtering results
 *
 * @export
 * @class FilterAggregation
 * @extends {FilterBuilder}
 * @implements {AbstractAggregation}
 * @implements {FilterJSON}
 * @implements {AggregationJSON}
 */
@Mixin([AbstractAggregation])
export class FilterAggregation extends FilterBuilder implements AbstractAggregation, FilterJSON, AggregationJSON<FilterJSON> {
    sink: <T>(aggs: AbstractAggregation[]) => T
    pipe: <T extends AbstractAggregation>(aggregation: T) => T
    source: AbstractAggregation
    readonly type = 'filter'
    /**
     * The source aggregation for this aggregation to be applied to
     *
     * @type {AbstractAggregation}
     * @memberOf AbstractAggregation
     */
    toJSON(): AggregationJSON<FilterJSON> {
        const json: AggregationJSON<FilterJSON> = FilterBuilder.prototype.toJSON.apply(this)
        return Object.assign(json, { type: 'filter' })
    }
    static fromJSON(json: AggregationJSON<FilterJSON>): FilterAggregation {
        return Object.assign(new FilterAggregation(), json)
    }
}

/**
 * An aggregator for bucketing similar objects
 *
 * @export
 * @class BucketsAggregation
 * @extends {AbstractAggregation}
 * @implements {AggregationJSON<BucketsJSON>}
 */
export class BucketsAggregation extends AbstractAggregation implements AggregationJSON<BucketsJSON> {
    type = 'buckets'
    source: AbstractAggregation
    fieldId: string
    size?: number
    values?: string[]
    interval?: number
    dateInterval?: "year"|"month"|"day"|"hour"|"minute"|"second"|"millisecond"
    subFieldIds?: string[]
    subFieldProp?: string
    subBuckets?: BucketsJSON
    constructor(opts: BucketsOptions){
        super()
        Object.assign(this, opts)
    }
    static fromJSON<T extends BucketsJSON>(json: AggregationJSON<T>): BucketsAggregation {
        const aggs = new BucketsAggregation(json)
        if (json.source){
            aggs.source = AbstractAggregation.fromJSON(json.source)
        }
        return aggs
    }
}

export type Aggregation = FilterAggregation | BucketsAggregation
