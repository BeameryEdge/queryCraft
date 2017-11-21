import "mocha"
import { assert } from "chai"
import { IFilter, FilterBuilder } from './Filter'
import { where } from './Query'
import { eq, find, any, all, lt, neq, Condition, MatchCondition } from './Conditions'
import * as querystring from 'querystring'


interface contact {
    id: string
    'list': { id: string }[]
    'list.id'?: string
    'vacancy.id'?: string
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    customFields: { id: string, value: number }[]
    assignedTo?: string
}

describe('FilterBuilder', function(){
    let myFilter: FilterBuilder
    let json: IFilter = {
        "statements": [
            [{
                "firstName": {
                    "op": "EQ",
                    "value": "bob"
                },
                "list": {
                    "op": "FIND",
                    "value": {
                        "id": {
                            "op": "EQ",
                            "value": "list-1"
                        }
                    }
                },
                "lastName": {
                    "op": "ANY",
                    "value": [{
                        "op": "EQ",
                        "value": "doyle"
                    }, {
                        "op": "EQ",
                        "value": null
                    }, {
                        "op": "EQ",
                        "value": "Smith"
                    }]
                },
                "assignedTo": {
                    "op": "NEQ",
                    "value": null
                },
                "updatedAt": {
                    "op": "LT",
                    "value": {
                        "daysAgo": 5
                    }
                }
            }]
        ],
        "sortFieldId": "customFields",
        "sortFieldSubId": "custom1",
        "sortFieldSubProp": "value",
        "sortDir": "ASC",
        "limit": 50
    }
    it('should allow me to create a new filter: first 50 items where fistName is bob AND (lastName is doyle OR is not set) AND is assigned to anyone, sorted by the customField with Id custom1, updated less than 5 days ago',function(){
        myFilter = new FilterBuilder()
        .where('firstName', eq('bob'))
        .where('list', find(where('id', eq('list-1'))))
        .where('lastName', any([
            eq('doyle'),
            eq(null)
        ]))
        .where('updatedAt', lt({ daysAgo: 5 }))
        .where('assignedTo', neq(null))
        .setSortFieldId('customFields', 'custom1', 'value')
        .setSortDirection('ASC')
        .setLimit(50)

        const firstNameCondition = myFilter.getFieldCondition('firstName')
        if (firstNameCondition == null){
            throw new Error('firstName Condition should be set')
        }
        assert.ok(firstNameCondition)
        assert.equal(firstNameCondition.op, 'EQ')
        assert.equal(firstNameCondition.value, 'bob')

        const lastNameCondition = myFilter.getFieldCondition('lastName') as MatchCondition
        assert.ok(lastNameCondition)
        assert.equal(lastNameCondition.op, 'ANY')
        assert(Array.isArray(lastNameCondition.value))

        assert.equal(lastNameCondition.value[0].op, 'EQ')
        assert.equal(lastNameCondition.value[0].value, 'doyle')
        assert.equal(lastNameCondition.value[1].op, 'EQ')
        assert.equal(lastNameCondition.value[1].value, null)

        assert.equal(myFilter.getSortFieldId(), 'customFields')
        assert.equal(myFilter.getSortDirection(), 'ASC')
        assert.equal(myFilter.getLimit(), 50)
    })

    it('should turn the lastName condition into and any query and add an eq("Smith") condition',function(){
        const lastNameCondition = myFilter.getFieldCondition('lastName') as MatchCondition
        const newFilter = myFilter.where('lastName',
            any(lastNameCondition.value.concat(eq('Smith')))
        )

        const newLastNameCondition = newFilter.getFieldCondition('lastName') as MatchCondition
        assert.ok(newLastNameCondition)
        assert.equal(newLastNameCondition.op, 'ANY')
        assert(Array.isArray(newLastNameCondition.value))

        assert.equal(newLastNameCondition.value[0].op, 'EQ')
        assert.equal(newLastNameCondition.value[0].value, 'doyle')
        assert.equal(newLastNameCondition.value[1].op, 'EQ')
        assert.equal(newLastNameCondition.value[1].value, null)
        assert.equal(newLastNameCondition.value[2].op, 'EQ')
        assert.equal(newLastNameCondition.value[2].value, 'Smith')

        myFilter = newFilter
    })

    describe('.toJSON', function(){
        it('should create JSON objects for saving in the DB',function(){
            assert.deepEqual(myFilter.toJSON(), json)
        })
    })

    describe('.toString.toQueryString', function(){
        it('should create query strings for making queries to the API', function(){
            assert.equal(myFilter.toString(), myFilter.toQueryString())
            const qs = querystring.parse(myFilter.toString())
            assert.equal(parseInt(qs.limit as string), json.limit)
            assert.equal(qs.sortFieldId as string, json.sortFieldId)
            assert.equal(qs.sortFieldSubId as string, json.sortFieldSubId)
            assert.equal(qs.sortFieldSubProp as string, json.sortFieldSubProp)
            assert.equal(qs.sortDir as string, json.sortDir)
            assert.deepEqual(JSON.parse(qs.statements as string), json.statements)
        })
    })

    describe('.fromJSON', function(){
        it('should create filter objects from JSON', function(){
            const newFilter = FilterBuilder.fromJSON(json)

            const firstNameCondition = newFilter.getFieldCondition('firstName') as Condition
            assert.ok(firstNameCondition)
            assert.equal(firstNameCondition.op, 'EQ')
            assert.equal(firstNameCondition.value, 'bob')

            const lastNameCondition = newFilter.getFieldCondition('lastName') as MatchCondition
            assert.ok(lastNameCondition)
            assert.equal(lastNameCondition.op, 'ANY')
            assert(Array.isArray(lastNameCondition.value))

            assert.equal(lastNameCondition.value[0].op, 'EQ')
            assert.equal(lastNameCondition.value[0].value, 'doyle')
            assert.equal(lastNameCondition.value[1].op, 'EQ')
            assert.equal(lastNameCondition.value[1].value, null)
            assert.equal(lastNameCondition.value[2].op, 'EQ')
            assert.equal(lastNameCondition.value[2].value, 'Smith')

        })
    })

    describe('.or',function(){
        it('should add a query to the current statement', function(){
            const filter = new FilterBuilder()
                .where('id', eq('this'))
                .or()
                .where('id', eq('that'))
            assert.deepEqual(filter.toJSON(), {
                "statements": [
                    [
                        {
                            "id": {
                                "op": "EQ",
                                "value": "that"
                            }
                        },
                        {
                            "id": {
                                "op": "EQ",
                                "value": "this"
                            }
                        }
                    ]
                ],
                "sortFieldId": "id",
                "sortDir": "DESC",
                "limit": 100
            })
        })
    })

    describe('.and',function(){
        it('should start a new statement with one empty query', function(){
            const filter = new FilterBuilder()
                .where('id', eq('this'))
                .or()
                .where('id', eq('that'))
            .and()
                .where('name', eq('bob'))

            assert.deepEqual(filter.toJSON(), {
                "statements": [
                    [
                        {
                            "name": {
                                "op": "EQ",
                                "value": "bob"
                            }
                        }
                    ],
                    [
                        {
                            "id": {
                                "op": "EQ",
                                "value": "that"
                            }
                        },
                        {
                            "id": {
                                "op": "EQ",
                                "value": "this"
                            }
                        }
                    ]
                ],
                "sortFieldId": "id",
                "sortDir": "DESC",
                "limit": 100
            })
        })
    })

    describe('.clone', function(){
        it('should create shallow clone', function(){
            const newFilter = FilterBuilder.fromJSON(json)
            const clonedFilter = newFilter.clone()

            assert.notEqual(newFilter, clonedFilter)
            assert.deepEqual(newFilter, clonedFilter)
        })
    })


    describe('.setStatement', function(){
        it('should be able to add statements to the filter',function(){
            myFilter.clone().setStatements([
                ...myFilter.getStatements(),
                [
                    where('list.id', eq('list-1')),
                    where('vacancy.id', eq('vacancy1')),
                ]
            ])
        })

        it('should throw if no statements are set',function(){
            assert.throws(() => {
                myFilter.clone().setStatements([])
            })
        })


        it('should throw if a statement is added with no queries',function(){
            assert.throws(() => {
                myFilter.clone().setStatements([[]])
            })
        })
    })

    describe('.createPaginatedFilter', function(){
        const newFilter = new FilterBuilder()
        .where('name', eq('something'))
        .setSortFieldId('createdAt')
        .setSortDirection('DESC')
        .setLimit(10)

        it('should return a new object', function(){
            const paginatedFilter = newFilter.createPaginatedFilter()
            assert.notEqual(newFilter, paginatedFilter)
            const paginatedFilter2 = newFilter.createPaginatedFilter({
                id: '',
                createdAt: 100
            })
            assert.notEqual(newFilter, paginatedFilter2)
        })

        it('should not modify the original filter', function(){
            const savedFilter = newFilter.clone()
            const paginatedFilter = newFilter.createPaginatedFilter()
            assert.deepEqual(newFilter.toJSON(), savedFilter.toJSON())
            const paginatedFilter2 = newFilter.createPaginatedFilter({
                id: '',
                createdAt: 100
            })
            assert.deepEqual(newFilter.toJSON(), savedFilter.toJSON())
        })

        it('should not modify filter if no object is passed in', function(){
            const paginatedFilter = newFilter.createPaginatedFilter()
            assert.deepEqual(newFilter.toJSON(), paginatedFilter.toJSON())

            const filter = newFilter.clone()
            .setSortFieldId('customFields', 'custom1', 'value')

            const paginatedFilter2 = filter.createPaginatedFilter({
                id: '!-@',
                createdAt: 100
            })
            assert.deepEqual(filter.toJSON(), paginatedFilter2.toJSON())
        })

        it('should add a statement that checks the page has been increased, checking on id when there is a clash', function(){
            const paginatedFilter = newFilter.createPaginatedFilter({
                id: '!-@',
                createdAt: 100
            })
            assert.deepEqual(paginatedFilter.statements[1], [
                {
                    "createdAt": {
                        "op": "LT",
                        "value": 100
                    }
                },
                {
                    "id": {
                        "op": "LT",
                        "value": "!-@"
                    },
                    "createdAt": {
                        "op": "EQ",
                        "value": 100
                    }
                }
            ])
        })

        it('should respect the sort order', function(){
            const filter = newFilter.clone().setSortDirection('ASC')
            const paginatedFilter = filter.createPaginatedFilter({
                id: '!-@',
                createdAt: 100
            })
            assert.deepEqual(paginatedFilter.statements[1], [
                {
                    "createdAt": {
                        "op": "GT",
                        "value": 100
                    }
                },
                {
                    "id": {
                        "op": "GT",
                        "value": "!-@"
                    },
                    "createdAt": {
                        "op": "EQ",
                        "value": 100
                    }
                }
            ])
        })

        it('should treat a nested field that doesn\'t exist as null', function(){
            const filter = newFilter.clone()
            .setSortFieldId('customFields', 'custom1', 'value')

            const paginatedFilter = filter.createPaginatedFilter({
                id: '!-@',
                createdAt: 100,
                customFields:[]
            })
            assert.deepEqual(paginatedFilter.statements[1], [
                {
                    "customFields": {
                        "op": "FIND",
                        "value": {
                            "id": {
                                "op": "EQ",
                                "value": "custom1"
                            },
                            "value": {
                                "op": "LT",
                                "value": null
                            }
                        }
                    }
                },
                {
                    "customFields": {
                        "op": "FIND",
                        "value": {
                            "id": {
                                "op": "EQ",
                                "value": "custom1"
                            },
                            "value": {
                                "op": "EQ",
                                "value": null
                            }
                        }
                    },
                    "id": {
                        "op": "LT",
                        "value": "!-@"
                    }
                }
            ])
        })

        it('should extract the value from a nested field', function(){
            const filter = newFilter.clone()
            .setSortFieldId('customFields', 'custom1', 'value')

            const paginatedFilter = filter.createPaginatedFilter({
                id: '!-@',
                createdAt: 100,
                customFields:[{
                    id: 'custom1',
                    value: 'something'
                }]
            })
            assert.deepEqual(paginatedFilter.statements[1], [
                {
                    "customFields": {
                        "op": "FIND",
                        "value": {
                            "id": {
                                "op": "EQ",
                                "value": "custom1"
                            },
                            "value": {
                                "op": "LT",
                                "value": 'something'
                            }
                        }
                    }
                },
                {
                    "customFields": {
                        "op": "FIND",
                        "value": {
                            "id": {
                                "op": "EQ",
                                "value": "custom1"
                            },
                            "value": {
                                "op": "EQ",
                                "value": 'something'
                            }
                        }
                    },
                    "id": {
                        "op": "LT",
                        "value": "!-@"
                    }
                }
            ])
        })
    })


})