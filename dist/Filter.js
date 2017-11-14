"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Conditions_1 = require("./Conditions");
const Query_1 = require("./Query");
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
class FilterBuilder extends Query_1.AbstractQueryBuilder {
    constructor() {
        super(...arguments);
        this.limit = 100;
        this._statements = [[new Query_1.QueryBuilder()]];
        this.sortFieldId = 'id';
        this.sortDir = 'DESC';
    }
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
    clone() {
        return Object.assign(new FilterBuilder(), {
            _statements: this._statements,
            sortFieldId: this.sortFieldId,
            sortDir: this.sortDir,
            sortFieldSubId: this.sortFieldSubId,
            sortFieldSubProp: this.sortFieldSubProp,
            limit: this.limit
        });
    }
    /**
     *
     * @override
     * @protected
     * @type {{ [P in string]?: Condition }}
     * @memberOf FilterBuilder
     */
    get data() {
        return this._statements[0][0].data;
    }
    set data(data) {
        this._statements[0][0].data = data;
    }
    /**
     *
     * @override
     * @type {IStatement[]}
     * @memberOf FilterBuilder
     */
    get statements() {
        return this._statements
            .map(options => options
            .map(query => query.toJSON()));
    }
    set statements(statements) {
        this.setStatementBuilders(statements
            .map(options => options
            .map(query => Query_1.QueryBuilder.fromJSON(query))));
    }
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
    or() {
        this._statements[0].unshift(new Query_1.QueryBuilder());
        return this;
    }
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
    and() {
        this._statements.unshift([new Query_1.QueryBuilder()]);
        return this;
    }
    /**
     * Get the statement builders used for the filter
     *
     * @returns {Statements[]}
     *
     * @memberOf FilterBuilder
     */
    getStatementBuilders() { return this._statements; }
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
    setStatementBuilders(statements) {
        if (!Array.isArray(statements) || statements.length === 0) {
            throw new Error('A filter must have at least one statement');
        }
        this._statements = statements.map(statement => {
            if (!Array.isArray(statement) || statement.length === 0) {
                throw new Error('Each statement must contain a least one query');
            }
            return [...statement];
        });
        return this;
    }
    /**
     * Add a new StatementBuilder to the class
     *
     * @param {StatementBuilder} sb
     * @returns
     *
     * @memberOf FilterBuilder
     */
    addStatementBuilder(sb) {
        return this.setStatementBuilders(this.getStatementBuilders().concat([sb]));
    }
    static fromJSON(json) { return Object.assign(new FilterBuilder(), json); }
    getLimit() { return this.limit; }
    setLimit(limit) { this.limit = limit; return this; }
    getSortFieldId() { return this.sortFieldId; }
    getSortFieldSubId() { return this.sortFieldSubId || null; }
    getSortFieldSubProp() { return this.sortFieldSubProp || null; }
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
    setSortFieldId(fieldId, sortFieldSubId, sortFieldSubProp) {
        this.sortFieldId = fieldId;
        this.sortFieldSubId = sortFieldSubId;
        this.sortFieldSubProp = sortFieldSubProp;
        return this;
    }
    getSortDirection() { return this.sortDir; }
    setSortDirection(dir) { this.sortDir = dir; return this; }
    /**
     * return a JSON data representation in the internal data struture
     */
    toJSON() {
        const json = {
            statements: this.statements,
            sortDir: this.sortDir,
            limit: this.limit
        };
        if (this.sortFieldId !== undefined) {
            json.sortFieldId = this.sortFieldId;
        }
        if (this.sortFieldSubId !== undefined && this.sortFieldSubProp !== undefined) {
            json.sortFieldSubId = this.sortFieldSubId;
            json.sortFieldSubProp = this.sortFieldSubProp;
        }
        return json;
    }
    /**
     * return a querystring
     */
    toQueryString() { return this.toString(); }
    /**
     * return a querystring
     */
    toString() {
        return '' +
            '&statements=' + JSON.stringify(this.statements) +
            (this.sortFieldId ?
                '&sortFieldId=' + this.sortFieldId +
                    (this.sortFieldSubId && this.sortFieldSubProp ?
                        '&sortFieldSubId=' + this.sortFieldSubId +
                            '&sortFieldSubProp=' + this.sortFieldSubProp : '') +
                    '&sortDir=' + this.sortDir : '') +
            '&limit=' + this.limit;
    }
    /**
     * Return a new filter that gets the next page worth of data after a
     * a particular lastItem
     *
     * @param {T} lastItem
     * @returns {Filter}
     */
    /** */
    createPaginatedFilter(lastItem) {
        const sortFieldId = this.getSortFieldId();
        if (!lastItem || !sortFieldId)
            return this.clone();
        const sortFieldSubId = this.getSortFieldSubId();
        const sortFieldSubProp = this.getSortFieldSubProp();
        let lastItemSortFieldValue = lastItem;
        for (let pathComponent of sortFieldId.split(/\./g)) {
            if (lastItemSortFieldValue && !lastItemSortFieldValue[pathComponent])
                break;
            lastItemSortFieldValue = lastItemSortFieldValue[pathComponent];
        }
        const op = { 'ASC': Conditions_1.gt, 'DESC': Conditions_1.lt }[this.getSortDirection()];
        if (sortFieldSubId && sortFieldSubProp) {
            if (Array.isArray(lastItemSortFieldValue)) {
                const subProp = lastItemSortFieldValue
                    .find($ => $ && $.id === sortFieldSubId);
                const sortFieldSubValue = ((subProp && subProp[sortFieldSubProp]) || null);
                return this.clone().addStatementBuilder([
                    // filter items below list item
                    Query_1.where(sortFieldId, Conditions_1.find(Query_1.where('id', Conditions_1.eq(sortFieldSubId))
                        .where(sortFieldSubProp, op(sortFieldSubValue)))),
                    // if filter value is the same ensure the id is different
                    Query_1.where(sortFieldId, Conditions_1.find(Query_1.where('id', Conditions_1.eq(sortFieldSubId))
                        .where(sortFieldSubProp, Conditions_1.eq(sortFieldSubValue))))
                        .where('id', op(lastItem.id))
                ]);
            }
            else {
                return this.clone();
            }
        }
        else if (lastItemSortFieldValue instanceof Date ||
            typeof lastItemSortFieldValue !== 'object') {
            // If the sort value is good add the sort statement
            return this.clone().addStatementBuilder([
                // filter items below list item
                Query_1.where(sortFieldId, op(lastItemSortFieldValue)),
                // if filter value is the same ensure the id is different
                Query_1.where('id', op(lastItem.id))
                    .where(sortFieldId, Conditions_1.eq(lastItemSortFieldValue))
            ]);
        }
        else {
            // If the value we find is not value-like then treat as null
            return this.clone();
        }
    }
}
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=Filter.js.map