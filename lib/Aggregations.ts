import { FilterBuilder, FilterJSON } from "./Filter";

/**
 * The JSON format of an aggregation object
 *
 * @export
 * @interface AggregationJSON
 */
export interface AggregationJSON {
    /**
     * Unique string for each aggregation type
     *
     * @type {string}
     * @memberOf AggregationJSON
     */
    type: string
    /**
     * The data source of the aggregation
     *
     * @type {AggregationJSON}
     * @memberOf AggregationJSON
     */
    source?: AggregationJSON
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
     * @type {("year"|"month"|"day"|"dayOfMonth"|"hour"|"minute"|"second"|"millisecond")}
     */
    dateInterval: "year"|"month"|"day"|"dayOfMonth"|"hour"|"minute"|"second"|"millisecond"
}

export type IntervalBucketsOptions = HistogramBucketsOptions | DateHistogramBucketsOptions

export type BucketsOptions = ClassBucketsOptions | IntervalBucketsOptions

export interface BucketsJSON extends AggregationJSON {
    fieldId: string
    size?: number
    values?: string[]
    interval?: number
    dateInterval?: "year"|"month"|"day"|"dayOfMonth"|"hour"|"minute"|"second"|"millisecond"
    subFieldIds?: string[]
    subFieldProp?: string
    subBuckets?: BucketsJSON
}

export interface AbstractAggregation extends AggregationJSON {}
/**
 * Abstract class for an Aggregation
 *
 * @export
 * @abstract
 * @class AbstractAggregation
 * @implements {AggregationJSON}
 */
export abstract class AbstractAggregation implements AggregationJSON {
    /**
     * The source aggregation for this aggregation to be applied to
     *
     * @type {AbstractAggregation}
     * @memberOf AbstractAggregation
     */
    source: AbstractAggregation
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
    toJSON(){
        const json: AggregationJSON = Object.assign({}, this)
        if (json.source) {
            json.source = this.source.toJSON()
        }
        return json
    }
}
export interface FilterAggregation extends AggregationJSON {}
/**
 * An aggregator for filtering results
 *
 * @export
 * @class FilterAggregation
 * @extends {FilterBuilder}
 * @implements {FilterJSON}
 * @implements {AggregationJSON}
 */
export class FilterAggregation extends FilterBuilder implements FilterJSON, AggregationJSON {
    type = 'filter'
    /**
     * The source aggregation for this aggregation to be applied to
     *
     * @type {AbstractAggregation}
     * @memberOf AbstractAggregation
     */
    source: AbstractAggregation
    /**
     * Set a downstream aggregation
     *
     * @template T
     * @param {T} aggregation
     * @returns
     *
     * @memberOf AbstractAggregation
     */
    pipe<T extends AbstractAggregation>(aggregation: T){
        aggregation.source = this
        return aggregation
    }
    toJSON() {
        const json = super.toJSON() as FilterJSON & AggregationJSON
        json.type = this.type
        return json
    }
    static fromJSON(json: FilterJSON & AggregationJSON){
        return Object.assign(new FilterAggregation(), json)
    }
}


export interface BucketsAggregation extends BucketsJSON {}
export class BucketsAggregation extends AbstractAggregation implements BucketsJSON {
    type = 'buckets'
    source: AbstractAggregation
    constructor(opts: BucketsOptions){
        super()
        Object.assign(this, opts)
    }
    static fromJSON(json: FilterJSON & AggregationJSON){
        return Object.assign(new FilterAggregation(), json)
    }
}

