import "mocha"
import { assert } from "chai"
import { FilterAggregation, BucketsAggregation, AbstractAggregation, AggregationJSON, BucketsJSON } from './Aggregations'
import { FilterBuilder, FilterJSON } from "./Filter";
import { gt } from "./Conditions";

describe('Aggregations', function(){
    describe('FilterAggregation', function(){
        it('should allow us to create basic filter aggregations', function(){
            const aggs: any = new FilterAggregation()
            .where('age', gt(18))

            assert.deepEqual(aggs.toJSON(), {
                type: "filter",
                statements: [[{
                    age: {
                        op: "GT",
                        value: 18
                    }
                }]],
                sortDir: "DESC",
                limit: 100,
                sortFieldId: "id"
            })
        })

        it('should allow us to create filter aggregations from json', function(){
            const json = {
                type: "filter",
                statements: [[{
                    age: {
                        op: "GT",
                        value: 18
                    }
                }]],
                sortDir: "DESC",
                limit: 100,
                sortFieldId: "id"
            } as FilterJSON & AggregationJSON
            const aggs: any = FilterAggregation.fromJSON(json)

            assert.deepEqual(aggs, new FilterAggregation().where('age', gt(18)))
        })
    })
    describe('BucketsAggregation', function(){
        it('should allow us to create basic bucket aggregations', function(){
            const aggs: any = new BucketsAggregation({ fieldId: 'lastName' })

            assert.deepEqual(aggs.toJSON(), {
                type: "buckets",
                fieldId: "lastName"
            })
        })
        it('should allow us to create bucket aggregations from json', function(){
            const json = {
                type: "buckets",
                fieldId: "lastName"
            } as BucketsJSON & AggregationJSON
            const aggs: any = BucketsAggregation.fromJSON(json)

            assert.deepEqual(aggs, new BucketsAggregation({ fieldId: "lastName" }))
        })
        it('should allow us to create nested field bucket aggregations', function(){
            const aggs: any = new BucketsAggregation({
                fieldId: 'customField',
                subFieldIds: ['gender'],
                subFieldProp: 'value'
            })

            assert.deepEqual(aggs.toJSON(), {
                type: "buckets",
                fieldId: "customField",
                subFieldIds: ['gender'],
                subFieldProp: 'value'
            })
        })
        it('should allow us to create histogram bucket aggregations', function(){
            const aggs: any = new BucketsAggregation({
                fieldId: 'age',
                interval: 5
            })

            assert.deepEqual(aggs.toJSON(), {
                type: "buckets",
                fieldId: "age",
                interval: 5
            })
        })
        it('should allow us to create date-histogram bucket aggregations', function(){
            const aggs: any = new BucketsAggregation({
                fieldId: 'age',
                dateInterval: 'month'
            })

            assert.deepEqual(aggs.toJSON(), {
                type: "buckets",
                fieldId: "age",
                dateInterval: 'month'
            })
        })
        it('should allow us to create bucket aggregations split each bucket into further buckets', function(){
            const aggs: any = new BucketsAggregation({
                fieldId: 'lastName',
                subBuckets: {
                    fieldId: 'firstName'
                }
            })

            assert.deepEqual(aggs.toJSON(), {
                type: "buckets",
                fieldId: "lastName",
                subBuckets: {
                    fieldId: 'firstName'
                }

            })
        })
    })
    it('should allow us to compose Aggregations', function(){
        const aggs: any = new FilterAggregation()
        .where('age', gt(18))
        .pipe(new BucketsAggregation({
            fieldId: 'name',
            subBuckets: {
                fieldId: 'age',
                interval: 10
            }
        }))

        assert.deepEqual(aggs.toJSON(), {
            type: "buckets",
            fieldId: "name",
            source: {
                type: "filter",
                statements: [[{
                    age: {
                        op: "GT",
                        value: 18
                    }
                }]],
                sortDir: "DESC",
                limit: 100,
                sortFieldId: "id"
            },
            subBuckets: {
                fieldId: "age",
                interval: 10
            }
        })
    })
})
