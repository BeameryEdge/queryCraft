import {BasicValue} from './Values'
import {ICondition, Condition, conditionFromJSON} from './Conditions'
import {Operation} from './Operations'

type Value =  ICondition[] | BasicValue | IQuery

export interface IQuery {
    [key: string]: ICondition
}

export abstract class AbstractQueryBuilder {
    protected abstract get data(): { [P in string]?: Condition }
    protected abstract set data(condition: { [P in string]?: Condition })
    /**
     * Update the condition on a particular field by it's fieldId
     *
     * @param {string} fieldId
     * @param {(Condition | null)} condition
     * @returns {AbstractQueryBuilder}
     *
     * @memberOf AbstractQueryBuilder
     * @example
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
     * @memberOf AbstractQueryBuilder
     * @example
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
     * @memberOf AbstractQueryBuilder
     * @example
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
     * @template S
     * @param {(fieldId: string, condition: Condition) => S} mapFn
     * @returns {S[]}
     *
     * @memberOf AbstractQueryBuilder
     * @example
     *
     *```ts
     *
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
 * Builder class for {@link IQuery} object
 *
 * @export
 * @class QueryBuilder
 * @extends {AbstractQueryBuilder}
 */
export class QueryBuilder extends AbstractQueryBuilder {
    data: { [P in string]?: Condition } = {}
    /**
     * De-serializes JSON data and replaces the current query object with that data
     *
     * @static
     * @param {IQuery} data
     * @returns {this}
     *
     * @memberOf QueryBuilder
     * @example
     *
     * ```ts
     *
     * QueryBuilder
     * .fromJSON({"foo":{"op":"EQ","value":"bar"}})
     * // same as :-
     * new QueryBuilder()
     * .where('foo', eq('bar'))
     * ```
     *
     */
    static fromJSON(data: IQuery) {
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
     * @returns {IQuery}
     *
     * @memberOf QueryBuilder
     * @example
     *
     * ```ts
     *
     * new QueryBuilder()
     * .where('foo', eq('bar')).toJSON()
     * // => {"foo":{"op":"EQ","value":"bar"}}
     * ```
     *
     */
    toJSON(): IQuery {
        const res: IQuery = {} as IQuery
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
 * @export
 * @param {string} fieldId
 * @param {Condition} condition
 * @returns {QueryBuilder}
 * @example
 *
 * ```ts
 *
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