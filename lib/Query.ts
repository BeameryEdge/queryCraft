import { BasicValue } from './Values'
import { ConditionJSON, Condition, conditionFromJSON } from './Conditions'
import { Operation } from './Operations'

type Value =  ConditionJSON[] | BasicValue | QueryJSON

/**
 * Interface for the JSON representation of a query that is built by the
 * [QueryBuilder]{@link QueryBuilder} class
 *
 *
 * @interface QueryJSON
 */
export interface QueryJSON {
    [key: string]: ConditionJSON
}

/**
 * Abstract Class to represent a component that can build queries
 *
 *
 * @abstract
 * @class AbstractQueryBuilder
 */
export abstract class AbstractQueryBuilder {
    protected abstract get data(): { [P in string]?: Condition }
    /**
     * Update the condition on a particular field by it's fieldId
     *
     * @param {string} fieldId
     * @param {(Condition | null)} condition
     * @returns {AbstractQueryBuilder}
     *
     * Example:-
     *
     * ```ts
     *
     * const qb = new QueryBuilder()
     * .where('foo', eq('bar'))
     *
     * qb.getFieldCondition('foo')
     * // => eq('bar')
     *
     * qb.where('foo', eq('fizz'))
     * .getFieldCondition('foo')
     * // => eq('fizz')
     * ```
     */
    where(fieldId: string, condition: Condition): this {
        this.data[fieldId] = condition
        return this
    }
    /**
     * Return a list of the fieldIds which have conditions set.
     *
     * @returns {(string)[]}
     *
     * Example:-
     *
     * ```ts
     *
     * new QueryBuilder()
     * .where('foo', eq('bar'))
     * .getFieldIds()
     * // => ['foo']
     * ```
     */
    getFieldIds(): (string)[] { return Object.keys(this.data) as (string)[] }
    getFieldCondition(fieldId: string): Condition | null { return this.data[fieldId] || null }
    /**
     * Removes the condition on a particular field
     *
     * @param {string} fieldId
     * @returns
     *
     * Example:-
     *
     * ```ts
     *
     * new QueryBuilder().where('foo', eq('bar'))
     * .removeFieldCondition('foo')
     * .getFieldIds()
     * // => []
     * ```
     */
    removeFieldCondition(fieldId: string){
        delete this.data[fieldId]
        return this
    }
    /**
     * Maps of the fields with conditions set and returns the result of applying
     * the mapFn to the fieldId-Condition pairs.
     *
     * @template S map function return type
     * @param {(fieldId: string, condition: Condition) => S} mapFn
     * @returns {S[]}
     *
     * Example:-
     *
     *```ts
     * new QueryBuilder()
     * .where('foo', eq('bar'))
     * .mapFieldConditions((fieldId, condition) =>
     *     [fieldId, condition.value])
     * // => [['foo', 'bar']]
     * ```
     */
    mapFieldConditions<S>(mapFn: (fieldId: string, condition: Condition) => S): S[]{
        return this.getFieldIds()
            .map<S>(fieldId =>
                mapFn(fieldId, this.getFieldCondition(fieldId) as Condition))
    }
}

/**
 * Builder class for {@link QueryJSON} object
 *
 *
 * @class QueryBuilder
 * @extends {AbstractQueryBuilder}
 */
export class QueryBuilder extends AbstractQueryBuilder {
    data: { [P in string]?: Condition } = {}
    /**
     * De-serializes JSON data and replaces the current query object with that data
     *
     * @static
     * @param {QueryJSON} data
     * @returns {this}
     *
     * Example:-
     *
     * ```ts
     * QueryBuilder
     * .fromJSON({"foo":{"op":"EQ","value":"bar"}})
     * // same as :-
     * new QueryBuilder()
     * .where('foo', eq('bar'))
     * ```
     *
     */
    static fromJSON(data: QueryJSON) {
        const query = new QueryBuilder()
        query.data = {} as { [P in string]: Condition }
        for (let fieldId in data){
            query.data[fieldId.replace(/\//g,'.') as string] = conditionFromJSON(data[fieldId])
        }
        return query
    }
    /**
     * Serializes the query data into a JSON object
     *
     * @returns {QueryJSON}
     *
     * Example:-
     *
     * ```ts
     * new QueryBuilder()
     * .where('foo', eq('bar')).toJSON()
     * // => {"foo":{"op":"EQ","value":"bar"}}
     * ```
     *
     */
    toJSON(): QueryJSON {
        const res: QueryJSON = {} as QueryJSON
        for (let fieldId in this.data){
            if (this.data[fieldId]){
                res[fieldId.replace(/\./g,'/')] = (this.data[fieldId] as Condition).toJSON()
            }
        }
        return res
    }
}

/**
 * Create a new QueryBuilder with a condition already set
 *
 *
 * @param {string} fieldId
 * @param {Condition} condition
 * @returns {QueryBuilder}
 * Example:-
 *
 * ```ts
 * where('foo', eq('bar'))
 * // alias for :-
 * new QueryBuilder()
 * .where('foo', eq('bar'));
 * ```
 *
 */
export function where(fieldId: string, condition: Condition){
    return new QueryBuilder().where(fieldId, condition);
}
