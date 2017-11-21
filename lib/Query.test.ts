import "mocha"
import { assert } from "chai"
import { QueryBuilder, QueryJSON } from './Query'
import { eq } from './Conditions'
describe('QueryBuilder', function(){
    const qb = new QueryBuilder()
    describe('.where', function(){
        it('updates the field condition', function(){
            let qb = new QueryBuilder()
            .where('foo', eq('bar'))

            assert.deepEqual(qb.getFieldCondition('foo'), eq('bar'))

            qb = qb.where('foo', eq('fizz'))

            qb.getFieldCondition('foo')
            assert.deepEqual(qb.getFieldCondition('foo'), eq('fizz'))
        })
    })

    describe('.getFieldIds', function(){
        it('should get the list of fields with conditions applied', function(){
            const fieldIds = new QueryBuilder()
            .where('foo', eq('bar'))
            .getFieldIds()

            assert.deepEqual(fieldIds, ['foo'])
        })
    })

    describe('.getFieldCondition', function(){
        it('should get the field condition for a field', function(){
            const condition = new QueryBuilder()
            .where('foo', eq('bar'))
            .getFieldCondition('foo')

            assert.deepEqual(condition, eq('bar'))
        })
    })

    describe('.removeFieldCondition', function(){
        it('should remove the field condition for a field', function(){
            const condition = new QueryBuilder()
            .where('foo', eq('bar'))
            .removeFieldCondition('foo')
            .getFieldCondition('foo')

            assert.notOk(condition)
        })
    })

    describe('.mapFieldConditions', function(){
        it('should remove the field condition for a field', function(){
            const output = new QueryBuilder()
            .where('foo', eq('bar'))
            .mapFieldConditions((fieldId, condition) =>
                [fieldId, condition.value])

            assert.deepEqual(output, [['foo', 'bar']])
        })
    })

    describe('.fromJSON', function(){
        it('should create a query object from json', function(){
            const json = {
                foo: {
                    op: 'EQ',
                    value: 'bar'
                }
            } as QueryJSON

            const qb = new QueryBuilder()
            .where('foo', eq('bar'))

            assert.deepEqual(QueryBuilder.fromJSON(json), qb)
        })
    })

    describe('.toJSON', function(){
        it('should create a query object from json', function(){
            const json = {
                foo: {
                    op: 'EQ',
                    value: 'bar'
                }
            } as QueryJSON

            const qb = new QueryBuilder()
            .where('foo', eq('bar'))

            assert.deepEqual(qb.toJSON(), json)
        })
    })
})