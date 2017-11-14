"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Conditions_1 = require("./Conditions");
class AbstractQueryBuilder {
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
    where(fieldId, condition) {
        this.data[fieldId] = condition;
        return this;
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
    getFieldIds() { return Object.keys(this.data); }
    getFieldCondition(fieldId) { return this.data[fieldId] || null; }
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
    removeFieldCondition(fieldId) {
        delete this.data[fieldId];
        return this;
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
    mapFieldConditions(mapFn) {
        return this.getFieldIds()
            .map(fieldId => mapFn(fieldId, this.getFieldCondition(fieldId)));
    }
}
exports.AbstractQueryBuilder = AbstractQueryBuilder;
/**
 * Builder class for {@link IQuery} object
 *
 * @export
 * @class QueryBuilder
 * @extends {AbstractQueryBuilder}
 */
class QueryBuilder extends AbstractQueryBuilder {
    constructor() {
        super(...arguments);
        this.data = {};
    }
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
    static fromJSON(data) {
        const query = new QueryBuilder();
        query.data = {};
        for (let fieldId in data) {
            query.data[fieldId.replace(/\//g, '.')] = Conditions_1.conditionFromJSON(data[fieldId]);
        }
        return query;
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
    toJSON() {
        const res = {};
        for (let fieldId in this.data) {
            if (this.data[fieldId]) {
                res[fieldId.replace(/\./g, '/')] = this.data[fieldId].toJSON();
            }
        }
        return res;
    }
}
exports.QueryBuilder = QueryBuilder;
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
function where(fieldId, condition) {
    return new QueryBuilder().where(fieldId, condition);
}
exports.where = where;
//# sourceMappingURL=Query.js.map