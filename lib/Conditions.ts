import {
    Operation,
    MatchOperation,
    EqualityOperation,
    OrderOperation,
    QueryOperation,
    StringOperation
} from './Operations'
import { BasicValue } from './Values'
import { QueryJSON, QueryBuilder } from './Query'

/**
 * Base Interface for the JSON representation of a Condition
 *
 * @private
 * @interface BaseConditionJSON
 * Example:-
 *
 * ```json
 * {
 *     "op": "EQ",
 *     "value": "foo"
 * }
 * ```
 */
export interface BaseConditionJSON {
    op: Operation
    value: BasicValue | Array<BaseConditionJSON> | QueryJSON
}

/**
 * Interface for the JSON representation of a match condition
 *
 * These are the conditions that are derived from a list of condtions
 * such as the {@link AnyCondition} condition
 * Example:-
 *
 * ```json
 * {
 *     "op": "ALL",
 *     "value": [{
 *          "op": "EQ",
 *          "value": "foo"
 *      }]
 * }
 * ```
 *
 * @private
 * @interface MatchConditionJSON
 * @extends {BaseConditionJSON}
 */
export interface MatchConditionJSON extends BaseConditionJSON {
    op: MatchOperation
    value: Array<ConditionJSON>
}

/**
 * Interface for the JSON representation of an equality condition
 *
 * These are the conditions that compare against a precise value
 *
 * @private
 * @interface EqualityConditionJSON
 * @extends {BaseConditionJSON}
 * Example:-
 *
 * ```json
 * {
 *     "op": "EQ",
 *     "value": "foo"
 * }
 * ```
 */
export interface EqualityConditionJSON extends BaseConditionJSON {
    op: EqualityOperation
    value: BasicValue
}

/**
 * Interface for the JSON representation of an order condition
 *
 * These are the conditions the
 *
 * @private
 * @interface OrderConditionJSON
 * @extends {BaseConditionJSON}
 * Example:-
 *
 * ```json
 * {
 *     "op": "LT",
 *     "value": 100
 * }
 * ```
 */
export interface OrderConditionJSON extends BaseConditionJSON {
    op: OrderOperation
    value: BasicValue
}

/**
 * Interface for the JSON representation of a string condition
 *
 * @private
 * @interface StringConditionJSON
 * @extends {BaseConditionJSON}
 * Example:-
 *
 * ```json
 * {
 *     "op": "PREFIX",
 *     "value": "feature/"
 * }
 * ```
 */
export interface StringConditionJSON extends BaseConditionJSON {
    op: StringOperation
    value: string
}

/**
 * Interface for the JSON representation of an query condition
 *
 * @private
 * @interface QueryConditionJSON
 * @extends {BaseConditionJSON}
 * Example:-
 *
 * ```json
 * {
 *     "op": "FIND",
 *     "value": {}
 * }
 * ```
 */
export interface QueryConditionJSON extends BaseConditionJSON {
    op: QueryOperation
    value: QueryJSON
}

/**
 * The precise type of valid condition JSON
 * @private
 */
export type ConditionJSON =
    | MatchConditionJSON
    | EqualityConditionJSON
    | OrderConditionJSON
    | StringConditionJSON
    | QueryConditionJSON

/**
 * The type of a valid condition:-
 * ```ts
 * type Condition = MatchCondition | EqualityCondition | OrderCondition | StringCondition | QueryCondition
 * ```
 *
 * Note these are instances of the  [BaseCondition]{@link BaseCondition} class and not just json data
 * @private
 */
export type Condition = MatchCondition | EqualityCondition | OrderCondition | StringCondition | QueryCondition
export type Value = Condition[] | BasicValue | QueryBuilder

/**
 * Abstract class representing a condition, used to export JSON data via it's `toJSON` method
 * this takes advantage of the fact the `toJSON` function will be called whenever JSON.stringify
 * is being applied to the object.
 *
 * This class just represents the structure condition, and any actual condition class must
 * extend this class
 *
 * @private
 * @abstract
 * @class BaseCondition
 */
export abstract class BaseCondition {
    readonly abstract op: Operation
    readonly value: Value
    constructor(value: Value) {
        this.value = value
    }
    toJSON(): ConditionJSON { return <ConditionJSON>{ op: this.op, value: this.value } }
}

/**
 * Abstract class for 'Match' conditions - the conditions that are base on a set
 * of conditions
 * @private
 */
export abstract class MatchCondition extends BaseCondition {
    readonly op: MatchOperation
    /**
     * list of sub-conditions
     * @type {Condition[]}
     */
    readonly value: Condition[]
    toJSON(): MatchConditionJSON { return { op: this.op, value: this.value.map($ => $.toJSON()) } }
}

/**
 * Condition that is satisfied when all the sub conditions are satisfied
 * @private
 */
export class AllCondition extends MatchCondition {
    readonly op: 'ALL' = 'ALL'
}

/**
 * Condition that is satisfied when any the sub conditions are satisfied
 * @private
 */
export class AnyCondition extends MatchCondition {
    readonly op: 'ANY' = 'ANY'
}

/**
 * Abstract class for 'Equality' conditions - the conditions that are based of
 * checking equivalence to a specific value
 * @private
 */
export abstract class EqualityCondition extends BaseCondition implements EqualityConditionJSON {
    readonly op: EqualityOperation
    readonly value: BasicValue
}


/**
 * Condition that is satisfied when the field has the given value
 *
 * Note: `null` is treated equivalently to no value being set
 * @private
 */
export class EqualsCondition extends EqualityCondition {
    readonly op: 'EQ' = 'EQ'
    readonly value: BasicValue
}

/**
 * Condition that is satisfied when the field has a value different to the given
 * value.
 *
 * Note: `null` is treated equivalently to no value being set
 * @private
 */
export class NotEqualsCondition extends EqualityCondition {
    readonly op: 'NEQ' = 'NEQ'
    readonly value: BasicValue
}

/**
 * Abstract class for 'Order' conditions - the conditions that are based of
 * checking for values in a range
 * @private
 */
export abstract class OrderCondition extends BaseCondition implements OrderConditionJSON {
    readonly op: OrderOperation
    readonly value: BasicValue
}

/**
 * Condition that is satisfied when the field has a value less than the given
 * value.
 * @private
 */
export class LessThanCondition extends OrderCondition {
    op: 'LT' = 'LT'
    value: BasicValue
}

/**
 * Condition that is satisfied when the field has a value greater than the given
 * value.
 * @private
 */
export class GreaterThanCondition extends OrderCondition {
    op: 'GT' = 'GT'
    value: BasicValue
}

/**
 * Condition that is satisfied when the field has a value less than or equal to
 * the given value.
 * @private
 */
export class LessThanOrEqualCondition extends OrderCondition {
    readonly op: 'LTE' = 'LTE'
    readonly value: BasicValue
}

/**
 * Condition that is satisfied when the field has a value greater than or equal
 * to the given value.
 * @private
 */
export class GreaterThanOrEqualCondition extends OrderCondition {
    op: 'GTE' = 'GTE'
    value: BasicValue
}

/**
 * Abstract class for 'String' conditions - the conditions that are based of
 * checking specific properties of a string
 * @private
 */
export class StringCondition extends BaseCondition implements StringConditionJSON {
    op: StringOperation
    value: string
}

/**
 * Condition that is satisfied when the field is a string that starts with the
 * given string
 * @private
 */
export class PrefixCondition extends StringCondition {
    op: 'PREFIX' = 'PREFIX'
    value: string
}

/**
 * Abstract class for 'Query' conditions - the conditions that are based of
 * checking properties of items in a nested field (an array-valued field)
 * @private
 */
export abstract class QueryCondition extends BaseCondition {
    op: QueryOperation
    value: QueryBuilder
    toJSON(): QueryConditionJSON { return { op: this.op, value: this.value.toJSON() } }
}

/**
 * Condition that is satisfied when you can find an item in the nested array
 * that satisfies the given query
 * @private
 */
export class FindCondition extends QueryCondition {
    op: QueryOperation = 'FIND'
}

/**
 * Condition that is satisfied when you there is no item in the nested array
 * that satisfies the given query
 * @private
 */
export class CannotFindCondition extends QueryCondition {
    op: QueryOperation = 'NFIND'
}

/**
 * Get a condition object from a JSON condition
 *
 * @private
 * @param {ConditionJSON} json
 * @returns {Condition}
 */
export function conditionFromJSON(json: ConditionJSON): Condition {
    switch (json.op) {
        case 'ANY':
            return new AnyCondition(json.value.map(conditionFromJSON))
        case 'ALL':
            return new AllCondition(json.value.map(conditionFromJSON))
        case 'EQ':
            return new EqualsCondition(json.value)
        case 'NEQ':
            return new NotEqualsCondition(json.value)
        case 'LT':
            return new LessThanCondition(json.value)
        case 'GT':
            return new GreaterThanCondition(json.value)
        case 'LTE':
            return new LessThanOrEqualCondition(json.value)
        case 'GTE':
            return new GreaterThanOrEqualCondition(json.value)
        case 'PREFIX':
            return new PrefixCondition(json.value)
        case 'FIND':
            return new FindCondition(QueryBuilder.fromJSON(json.value))
        case 'NFIND':
            return new CannotFindCondition(QueryBuilder.fromJSON(json.value))
        default:
            throw new Error('Unknown Operation')
    }
}


/**
 * Creates a condition that is satisfied when all the sub-conditions are
 * satisfied
 *
 * Example:-
 * ```
 * all([
 *     gt(50),
 *     lt(100)
 * ])
 * // => between 50 and 100
 *
 * ```
 *
 *
 * @param {Condition[]} value Array of sub-conditions that must be satisfied
 * @returns
 */
export function all(value: Condition[]){ return new AllCondition(value) }

/**
 * Creates a condition that is satisfied when any the sub-conditions are
 * satisfied
 *
 * Example:-
 *
 * ```
 * any([
 *     eq('this'),
 *     eq('that')
 * ])
 * // => equal to 'this' or 'that'
 *
 * ```
 *
 *
 * @param {Condition[]} value Array of sub-conditions that must be satisfied
 * @returns
 */
export function any(value: Condition[]){ return new AnyCondition(value) }

/**
 * Creates a condition that is satisfied when the field has the given value
 *
 * Note: `null` is treated equivalently to no value being set
 *
 * Example:-
 * ```
 * eq('this')
 * // => field must be equal to 'this'
 * eq(null)
 * // => field must not have a value set
 *
 * ```
 *
 *
 * @param {BasicValue} value the value to compare fields against
 * @returns
 */
export function eq(value: BasicValue){ return new EqualsCondition(value) }
/**
 * Creates a condition that is satisfied when the field has a value that is not
 * the given value
 *
 * Note: `null` is treated equivalently to no value being set
 *
 * Example:-
 * ```
 * neq('this')
 * // => field must be not-equal to 'this', or not set
 * neq(null)
 * // => field must have some value set
 * ```
 *
 *
 * @param {BasicValue} value the value to compare fields against
 * @returns
 */
export function neq(value: BasicValue){ return new NotEqualsCondition(value) }
/**
 * Creates a condition that is satisfied when the field has a value strictly
 * less than the given value.
 *
 * Example:-
 * ```
 * lt('this')
 * // => field must be strictly less than 'this' (lexicographically ordered) e.g. 'thin'
 * lt(100)
 * // => field must be strictly less than 100 e.g. 99 but not 100
 * ```
 *
 *
 * @param {BasicValue} value
 * @returns
 */
export function lt(value: BasicValue){ return new LessThanCondition(value) }
/**
 * Creates a condition that is satisfied when the field has a value strictly
 * greater than the given value.
 *
 * Example:-
 * ```
 * gt('this')
 * // => field must be strictly greater than 'this' (lexicographically ordered) e.g. 'those'
 * gt(100)
 * // => field must be strictly greater than 100 e.g. 101 but not 100
 * ```
 *
 *
 * @param {BasicValue} value
 * @returns
 */
export function gt(value: BasicValue){ return new GreaterThanCondition(value) }
/**
 * Creates a condition that is satisfied when the field has a value
 * less than the given value.
 *
 * Example:-
 * ```
 * lte('this')
 * // => field must be less than 'this' (lexicographically ordered) e.g. 'thin'
 * lte(100)
 * // => field must be less than 100 e.g. 99 and 100
 * ```
 *
 *
 * @param {BasicValue} value
 * @returns
 */
export function lte(value: BasicValue){ return new LessThanOrEqualCondition(value) }
/**
 * Creates a condition that is satisfied when the field has a value
 * greater than or equal to the given value.
 *
 * Example:-
 * ```
 * gte('this')
 * // => field must be greater than or equal to 'this' (lexicographically ordered) e.g. 'those'
 * gte(100)
 * // => field must be greater than or equal to 100 e.g. 101 but not 100
 * ```
 *
 *
 * @param {BasicValue} value
 * @returns
 */
export function gte(value: BasicValue){ return new GreaterThanOrEqualCondition(value) }
/**
 * Creates a condition that is satisfied when the field is a string that starts
 * with the given string
 *
 * Example:-
 * ```
 * prefix('th')
 * // => field must start with 'th' e.g. 'this', 'that', 'those' ...
 * ```
 *
 *
 * @param {string} prefixString prefix string
 * @returns
 */
export function prefix(prefixString: string){ return new PrefixCondition(prefixString) }
/**
 * Creates a condition that is satisfied when you can find an item in the nested
 * array that satisfies the given query
 *
 * Example:-
 * ```
 * find(
 *     where('firstName', eq('bob'))
 *     .where('lastName', prefix('Mc'))
 * )
 * // => field must contain an item with firstName 'bob' and lastName starting
 * with 'Mc'
 * ```
 *
 *
 * @param {QueryBuilder} queryBuilder
 * @returns
 */
export function find(queryBuilder: QueryBuilder){
    return new FindCondition(queryBuilder)
}
/**
 * Creates a condition that is satisfied when there is no item in the nested
 * array that satisfies the given query
 *
 * Example:-
 * ```
 * find(where('firstName', eq('bob')))
 * // => field must not contain an item with firstName 'bob'
 * ```
 *
 *
 * @param {QueryBuilder} queryBuilder
 * @returns
 */
export function nfind(queryBuilder: QueryBuilder){
    return new CannotFindCondition(queryBuilder)
}