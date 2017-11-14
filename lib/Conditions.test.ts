import "mocha"
import { assert } from "chai"
import { any, all, eq, neq, lt, gt, lte, gte, prefix, find, nfind, conditionFromJSON, ICondition, Condition  } from './Conditions'
import { QueryBuilder } from "./Query";

const cases: {name: string, condition: Condition, json: ICondition}[] = [{
    name: 'any',
    condition: any([]),
    json: { op: 'ANY', value: [] }
}, {
    name: 'all',
    condition: all([]),
    json: { op: 'ALL', value: [] }
}, {
    name: 'eq',
    condition: eq('x'),
    json: { op: 'EQ', value: 'x' }
}, {
    name: 'neq',
    condition: neq('x'),
    json: { op: 'NEQ', value: 'x' }
}, {
    name: 'lt',
    condition: lt(20),
    json: { op: 'LT', value: 20 }
}, {
    name: 'gt',
    condition: gt(20),
    json: { op: 'GT', value: 20 }
}, {
    name: 'lte',
    condition: lte(20),
    json: { op: 'LTE', value: 20 }
}, {
    name: 'gte',
    condition: gte(20),
    json: { op: 'GTE', value: 20 }
}, {
    name: 'prefix',
    condition: prefix('pre'),
    json: { op: 'PREFIX', value: 'pre' }
}, {
    name: 'find',
    condition: find(new QueryBuilder()),
    json: { op: 'FIND', value: {} }
}, {
    name: 'nfind',
    condition: nfind(new QueryBuilder()),
    json: { op: 'NFIND', value: {} }
}]

describe('Conditions', function(){
    for (let {name, condition, json} of cases) {
        describe(name, function(){
            it('should be converted to json', function(){
                assert.deepEqual(condition.toJSON(), json)
            })
            it('should be converted from json', function(){
                assert.deepEqual(conditionFromJSON(json), condition)
            })
        })
    }
    describe('conditionFromJSON', function(){
        it('should throw if op doesn\'t exist', function(){
            assert.throws(() => {
                conditionFromJSON({
                    op: 'something',
                    value: ''
                } as any)
            })
        })
    })
})