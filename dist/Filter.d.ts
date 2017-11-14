import { BasicValue } from './Values';
import { Condition } from './Conditions';
import { IQuery, QueryBuilder, AbstractQueryBuilder } from './Query';
export declare type SortDirection = 'ASC' | 'DESC';
/**
 * Inteface for the the json representations of a statement which is conceptually
 * a list of queries of which at least one must be true
 */
export declare type Statement = IQuery[];
/**
 * A StatementBuilder is a non-empty list of [QueryBuilder]{@link QueryBuilder} instances
 */
export declare type StatementBuilder = QueryBuilder[];
/**
 * Interface for the json representation of a filter
 * This is the structure of the json that that will be produced by the Filter Builder
 *
 * it contains information about the logic of the filter it represents and any filters
 * or sorts that should be applied.
 *
 * The filter that should be applied is described by the [statements]{@link IFilter#statements}
 * property which is an Array of [statements]{@link Statement} of which all the
 * statement must hold. Each statement is a list of queries of which at least one
 * must hold. If one thinks of the queries as a logical clause then we can think of
 * this structure represent a logical formula in [conjunctive normal form]{@link https://en.wikipedia.org/wiki/Conjunctive_normal_form}.
 *
 * @export
 * @interface IFilter
 * @example
 *
 * ```ts
 *
 *   let json: IFilter = {
 *       "statements": [
 *           [{
 *               "firstName": {
 *                   "op": "EQ",
 *                   "value": "bob"
 *               },
 *               "list": {
 *                   "op": "FIND",
 *                   "value": {
 *                       "id": {
 *                           "op": "EQ",
 *                           "value": "list-1"
 *                       }
 *                   }
 *               },
 *               "lastName": {
 *                   "op": "ANY",
 *                   "value": [{
 *                       "op": "EQ",
 *                       "value": "doyle"
 *                   }, {
 *                       "op": "EQ",
 *                       "value": null
 *                   }, {
 *                       "op": "EQ",
 *                       "value": "Smith"
 *                   }]
 *               },
 *               "assignedTo": {
 *                   "op": "NEQ",
 *                   "value": null
 *               },
 *               "updatedAt": {
 *                   "op": "LT",
 *                   "value": {
 *                       "daysAgo": 5
 *                   }
 *               }
 *           }]
 *       ],
 *       "sortFieldId": "customFields",
 *       "sortFieldSubId": "custom1",
 *       "sortFieldSubProp": "value",
 *       "sortDir": "ASC",
 *       "limit": 50
 *   }
 *   ```
 */
export interface IFilter {
    /**
     * The list of statements which filter must apply
     *
     * @type {IStatement[]}
     * @memberOf IFilter
     */
    statements: Statement[];
    /**
     * field Id for the filter to sort on
     *
     * @type {string}
     * @memberOf IFilter
     */
    sortFieldId?: string;
    /**
     * Direction of sort
     *
     * @type {SortDirection}
     * @memberOf IFilter
     */
    sortDir: SortDirection;
    /**
     * If sorting on a nested field, this is the id of the nested object
     * to use for sorting
     *
     * @type {string}
     * @memberOf IFilter
     */
    sortFieldSubId?: string;
    /**
     * If sorting on a nested field, this is the field in the nested object
     * to sort on
     *
     * @type {string}
     * @memberOf IFilter
     */
    sortFieldSubProp?: string;
    /**
     * This is the maximum number of items the filter should allow to be
     * returned
     *
     * @type {number}
     * @memberOf IFilter
     */
    limit: number;
}
export interface Datum {
    [fieldId: string]: BasicValue | Datum | Datum[];
}
/**
 * Filter builder class, used to create filter objects that can be converted into queries
 *
 * @export
 * @class FilterBuilder
 * @extends {AbstractQueryBuilder}
 * @implements {IFilter}
 * @example
 *
 * ```ts
 *
 * const filter = new FilterBuilder()
 * .where('id', eq('this'))
 * .or()
 * .where('id', eq('that'))
 * .and()
 * .where('name', eq('bob'))
 * ```
 *
 */
export declare class FilterBuilder extends AbstractQueryBuilder implements IFilter {
    limit: number;
    /**
     * Creates a shallow clone of the FilterBuilder instance
     *
     * @returns {FilterBuilder}
     *
     * @memberOf FilterBuilder
     * @example
     *
     * ```ts
     *
     * describe('.clone', function(){
     *     it('should create shallow clone', function(){
     *         const newFilter = FilterBuilder.fromJSON(json)
     *         const clonedFilter = newFilter.clone()
     *
     *         assert.notEqual(newFilter, clonedFilter)
     *         assert.deepEqual(newFilter, clonedFilter)
     *     })
     * })
     * ```
     */
    clone(): FilterBuilder;
    private _statements;
    /**
     *
     * @override
     * @protected
     * @type {{ [P in string]?: Condition }}
     * @memberOf FilterBuilder
     */
    protected data: {
        [P in string]?: Condition;
    };
    /**
     *
     * @override
     * @type {IStatement[]}
     * @memberOf FilterBuilder
     */
    statements: Statement[];
    /**
     * Extends the current active statement with a new query which becomes the active
     * query and `where` statements then apply to the new query until `.and`/`.or` is
     * called on the filter
     *
     * @returns {this} returns the current filter builder for chaining
     *
     * @memberOf FilterBuilder
     * @example
     *
     * ```ts
     *
     * new FilterBuilder()
     * .where('id', eq('this'))
     * .or()
     * .where('id', eq('that'))
     * .and()
     * .where('name', eq('bob'))
     * // =>  (id is 'this' OR id is that) AND name is 'bob'
     *
     * new FilterBuilder()
     * .where('id', eq('this'))
     * .and()
     * .where('id', eq('that'))
     * .or()
     * .where('name', eq('bob'))
     * // =>  id is 'this' AND (id is that OR name is 'bob')
     * ```
     */
    or(): this;
    /**
     * Extends the filter with a new statement which becomes the active statement
     * and `where` statements then apply to the new statement's default query
     * until `.and`/`.or` is called on the filter
     *
     * @returns {this} returns the current filter builder for chaining
     *
     * @memberOf FilterBuilder
     * @example
     *
     * ```ts
     *
     * new FilterBuilder()
     * .where('id', eq('this'))
     * .or()
     * .where('id', eq('that'))
     * .and()
     * .where('name', eq('bob'))
     * // =>  (id is 'this' OR id is that) AND name is 'bob'
     *
     * new FilterBuilder()
     * .where('id', eq('this'))
     * .and()
     * .where('id', eq('that'))
     * .or()
     * .where('name', eq('bob'))
     * // =>  id is 'this' AND (id is that OR name is 'bob')
     * ```
     */
    and(): this;
    /**
     * Get the statement builders used for the filter
     *
     * @returns {Statements[]}
     *
     * @memberOf FilterBuilder
     */
    getStatementBuilders(): QueryBuilder[][];
    /**
     * Set the statements object for the filter builder
     *
     * @param {QueryBuilder[][]} statements
     * @returns
     * @example
     *
     * @memberOf FilterBuilder
     *
     * ```ts
     *
     * describe('.setStatements', function(){
     *     it('should be able to add statements to the filter',function(){
     *         myFilter.clone().setStatements([
     *             ...myFilter.getStatements(),
     *             [
     *                 where('list.id', eq('list-1')),
     *                 where('vacancy.id', eq('vacancy1')),
     *             ]
     *         ])
     *     })
     *
     *     it('should throw if no statements are set',function(){
     *         assert.throws(() => {
     *             myFilter.clone().setStatements([])
     *         })
     *     })
     *
     *
     *     it('should throw if a statement is added with no queries',function(){
     *         assert.throws(() => {
     *             myFilter.clone().setStatements([[]])
     *         })
     *     })
     * })
     *
     * ```
     */
    setStatementBuilders(statements: StatementBuilder[]): this;
    /**
     * Add a new StatementBuilder to the class
     *
     * @param {StatementBuilder} sb
     * @returns
     *
     * @memberOf FilterBuilder
     */
    addStatementBuilder(sb: StatementBuilder): this;
    static fromJSON<T extends {
        id: string;
    }>(json: IFilter): FilterBuilder & IFilter;
    getLimit(): number;
    setLimit(limit: number): this;
    sortFieldId: string;
    sortFieldSubId?: string;
    sortFieldSubProp?: string;
    getSortFieldId(): string;
    getSortFieldSubId(): string | null;
    getSortFieldSubProp(): string | null;
    /**
     * set the sort field
     *
     * @param {string} fieldId
     * @param {string} [sortFieldSubId] the id of the item used for sorting required if sorting on a key in a array
     * @param {string} [sortFieldSubProp] the property that needs to be sorted on
     * @returns {Filter}
     *
     * @memberOf Filter
     */
    setSortFieldId(fieldId: string, sortFieldSubId?: string, sortFieldSubProp?: string): FilterBuilder;
    sortDir: SortDirection;
    getSortDirection(): SortDirection;
    setSortDirection(dir: SortDirection): FilterBuilder;
    /**
     * return a JSON data representation in the internal data struture
     */
    toJSON(): IFilter;
    /**
     * return a querystring
     */
    toQueryString(): string;
    /**
     * return a querystring
     */
    toString(): string;
    /**
     * Return a new filter that gets the next page worth of data after a
     * a particular lastItem
     *
     * @param {T} lastItem
     * @returns {Filter}
     */
    /** */
    createPaginatedFilter(lastItem?: Datum & {
        id: string;
    }): FilterBuilder;
}
