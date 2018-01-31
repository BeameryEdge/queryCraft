import { BasicValue } from './Values'
import { OrderOperation } from './Operations'
import { Condition, find, eq, gt, lt } from './Conditions'
import { QueryJSON, QueryBuilder, AbstractQueryBuilder, where } from './Query'
import { AbstractAggregation, AggregationJSON } from './Aggregations';

export type SortDirection = 'ASC' | 'DESC'

/**
 * Inteface for the the json representations of a statement which is conceptually
 * a list of queries of which at least one must be true
 */
export type StatementJSON = QueryJSON[]
/**
 * A Statement is a non-empty list of [QueryBuilder]{@link QueryBuilder} instances
 */
export type Statement = QueryBuilder[]

/**
 * Interface for the json representation of a filter
 * This is the structure of the json that that will be produced by the Filter Builder
 *
 * it contains information about the logic of the filter it represents and any filters
 * or sorts that should be applied.
 *
 * The filter that should be applied is described by the [statements]{@link FilterJSON.statements}
 * property which is an Array of [statements]{@link Statement} of which all the
 * statement must hold. Each statement is a list of queries of which at least one
 * must hold. If one thinks of the queries as a logical clause then we can think of
 * this structure represent a logical formula in [conjunctive normal form]{@link https://en.wikipedia.org/wiki/Conjunctive_normal_form}.
 *
 *
 * @interface FilterJSON
 * Example:-
 *
 * ```ts
 *
 *   let json: FilterJSON = {
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
export interface FilterJSON {
    /**
     * The list of statements which filter must apply
     *
     */
    statements: StatementJSON[]
    /**
     * field Id for the filter to sort on
     *
     */
    sortFieldId?: string
    /**
     * Direction of sort
     *
     */
    sortDir: SortDirection
    /**
     * If sorting on a nested field, this is the id of the nested object
     * to use for sorting
     *
     */
    sortFieldSubId?: string
    /**
     * If sorting on a nested field, this is the field in the nested object
     * to sort on
     *
     */
    sortFieldSubProp?: string
    /**
     * This is the maximum number of items the filter should allow to be
     * returned
     *
     */
    limit: number
}

export interface Datum {
    [fieldId: string]: BasicValue | Datum | Datum[]
}

/**
 * Filter builder class, used to create filter objects that can be converted into queries
 *
 * Example:-
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
export class FilterBuilder extends AbstractQueryBuilder implements FilterJSON {
    /**
     * This is the maximum number of items the filter should allow to be
     * returned
     *
     * @default 100
     */
    limit = 100

    /**
     * see [FilterJSON.sortDir]{@link FilterJSON.sortDir}
     *
     */
    sortDir: SortDirection = 'DESC'
    /**
     * see [FilterJSON.sortFieldId]{@link FilterJSON.sortFieldId}
     *
     */
    sortFieldId: string = 'id'
    /**
     * see [FilterJSON.sortFieldSubId]{@link FilterJSON.sortFieldSubId}
     *
     */
    sortFieldSubId?: string
    /**
     * see [FilterJSON.sortFieldSubProp]{@link FilterJSON.sortFieldSubProp}
     *
     */
    sortFieldSubProp?: string
    /**
     * see [FilterJSON.statements]{@link FilterJSON.statements}
     *
     * @override
     */
    get statements(): StatementJSON[] {
        return this._statements
                .map(options => options
                    .map(query => query.toJSON()))
    }
    set statements(statements: StatementJSON[]){
        this.setStatements(statements
                .map(options => options
                    .map(query => QueryBuilder.fromJSON(query))))
    }
    /**
     * Creates a shallow clone of the FilterBuilder instance
     *
     * @returns {FilterBuilder}
     *
     * Example:-
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
    clone(): FilterBuilder {
        return Object.assign(new (Object.getPrototypeOf(this).constructor)(), {
            _statements: this._statements,
            sortFieldId: this.sortFieldId,
            sortDir: this.sortDir,
            sortFieldSubId: this.sortFieldSubId,
            sortFieldSubProp: this.sortFieldSubProp,
            limit: this.limit
        })
    }

    private _statements = [[new QueryBuilder()]] as Statement[]
    /**
     *
     * @override
     * @protected
     */
    protected get data(): { [P in string]?: Condition } {
        return this._statements[0][0].data
    }

    /**
     * Extends the current active statement with a new query which becomes the active
     * query and `where` statements then apply to the new query until `.and`/`.or` is
     * called on the filter
     *
     * @returns {this} returns the current filter builder for chaining
     *
     * Example:-
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
    or(){
        this._statements[0].unshift(new QueryBuilder())
        return this
    }
    /**
     * Extends the filter with a new statement which becomes the active statement
     * and `where` statements then apply to the new statement's default query
     * until `.and`/`.or` is called on the filter
     *
     * @returns {this} returns the current filter builder for chaining
     *
     * Example:-
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
    and(){
        this._statements.unshift([new QueryBuilder()])
        return this
    }
    /**
     * Get the statement builders used for the filter
     *
     * @returns {Statements[]}
     *
     */
    getStatements(){ return this._statements }

    /**
     * Set the statements object for the filter builder
     *
     * @param {Statement[]} statements
     * @returns
     * Example:-
     *
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
    setStatements(statements: Statement[]){
        if (!Array.isArray(statements) || statements.length === 0) {
            throw new Error('A filter must have at least one statement')
        }

        this._statements = statements.map(statement => {
            if (!Array.isArray(statement) || statement.length === 0) {
                throw new Error('Each statement must contain a least one query')
            }
            return [...statement]
        })
        return this
    }
    /**
     * Add a new Statement to the class
     *
     * @param {Statement} statement
     * @returns
     *
     */
    addStatement(statement: Statement){
        return this.setStatements(this.getStatements().concat([statement]))
    }

    static fromJSON<T extends { id: string }>(json: FilterJSON){ return Object.assign(new FilterBuilder(), json) }
    getLimit(){ return this.limit }
    setLimit(limit: number){ this.limit = limit; return this }

    getSortFieldId(): string { return this.sortFieldId }
    getSortFieldSubId(): string | null { return this.sortFieldSubId || null }
    getSortFieldSubProp(): string | null { return this.sortFieldSubProp || null }
    /**
     * set the sort field
     *
     * @param {string} fieldId
     * @param {string} [sortFieldSubId] the id of the item used for sorting required if sorting on a key in a array
     * @param {string} [sortFieldSubProp] the property that needs to be sorted on
     * @returns {Filter}
     *
     */
    setSortFieldId(fieldId: string, sortFieldSubId?: string, sortFieldSubProp?: string): FilterBuilder {
        this.sortFieldId = fieldId;
        this.sortFieldSubId = sortFieldSubId;
        this.sortFieldSubProp = sortFieldSubProp;
        return this }

    getSortDirection(): SortDirection { return this.sortDir }
    setSortDirection(dir: SortDirection): FilterBuilder { this.sortDir = dir; return this }
    /**
     * return a JSON data representation in the internal data struture
     */
    toJSON(): FilterJSON {
        const json = {
            statements: this.statements,
            sortDir: this.sortDir,
            limit: this.limit
        } as FilterJSON

        if (this.sortFieldId !== undefined){
            json.sortFieldId = this.sortFieldId
        }

        if (this.sortFieldSubId !== undefined && this.sortFieldSubProp !== undefined){
            json.sortFieldSubId = this.sortFieldSubId
            json.sortFieldSubProp = this.sortFieldSubProp
        }
        return json
    }
    /**
     * return a querystring
     */
    toQueryString(): string { return this.toString() }
    /**
     * return a querystring
     */
    toString(): string { return '' +
        '&statements=' + JSON.stringify(this.statements) +
        (this.sortFieldId ?
            '&sortFieldId=' + this.sortFieldId +
            (this.sortFieldSubId && this.sortFieldSubProp ?
                '&sortFieldSubId=' + this.sortFieldSubId +
                '&sortFieldSubProp=' + this.sortFieldSubProp : '') +
            '&sortDir=' + this.sortDir : '') +
        '&limit=' + this.limit
    }

    /**
     * Return a new filter that gets the next page worth of data after a
     * a particular lastItem
     *
     * @param {T} lastItem
     * @returns {Filter}
     */
    /** */
    createPaginatedFilter(lastItem?: Datum & { id: string }): FilterBuilder {
        const sortFieldId = this.getSortFieldId()
        if (!lastItem || !sortFieldId) return this.clone()
        const sortFieldSubId = this.getSortFieldSubId()
        const sortFieldSubProp = this.getSortFieldSubProp()

        let lastItemSortFieldValue: Datum | BasicValue = lastItem;
        for (let pathComponent of sortFieldId.split(/\./g)){
            if (lastItemSortFieldValue && !(lastItemSortFieldValue as Datum)[pathComponent]) break
            lastItemSortFieldValue = (lastItemSortFieldValue as Datum)[pathComponent] as (Datum | BasicValue)
        }

        const op = { 'ASC': gt, 'DESC': lt } [this.getSortDirection()]

        if (sortFieldSubId && sortFieldSubProp){
            if (Array.isArray(lastItemSortFieldValue)) {
                const subProp = lastItemSortFieldValue
                    .find($ => $ && ($.id as string) === sortFieldSubId) as Datum | undefined
                const sortFieldSubValue = ((subProp && subProp[sortFieldSubProp]) || null) as BasicValue

                return this.clone().addStatement([
                    // filter items below list item
                    where(sortFieldId, find(
                        where('id', eq(sortFieldSubId))
                        .where(sortFieldSubProp, op(sortFieldSubValue)))
                    ),
                    // if filter value is the same ensure the id is different
                    where(sortFieldId, find(
                        where('id', eq(sortFieldSubId))
                        .where(sortFieldSubProp, eq(sortFieldSubValue))))
                    .where('id', op(lastItem.id as string))
                ])

            } else {
                return this.clone()
            }
        } else if (lastItemSortFieldValue instanceof Date ||
            typeof lastItemSortFieldValue !== 'object') {
            // If the sort value is good add the sort statement
            return this.clone().addStatement([
                // filter items below list item
                where(sortFieldId, op(lastItemSortFieldValue)),
                // if filter value is the same ensure the id is different
                where('id', op(lastItem.id as string))
                .where(sortFieldId, eq(lastItemSortFieldValue))
            ])
        } else {
            // If the value we find is not value-like then treat as null
            return this.clone()
        }
    }
}
