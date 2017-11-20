# QueryCraft

[![CircleCI](https://circleci.com/gh/BeameryHQ/QueryCraft.svg?style=svg)](https://circleci.com/gh/BeameryHQ/QueryCraft)

A simple abstraction for building queries in easy way

## Installation

```sh
npm install --save 'querycraft'
```

## Examples

Suppose we have a collection of data that satisfies the interface

```ts
interface contact {
    id: string
    'list': { id: string }[]
    'vacancy.id'?: string
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    customFields: { id: string, value: number }[]
    assignedTo?: string
}
```

If we want a query the describes the logic:-
```
    first 50 items where
        fistName is bob
        lastName is doyle OR is not set
        assignedTo is anything
        list has an item where id is item1
    sorted (in ascending order) by the value property of the customField where id is custom1
    updated less than 5 days ago
```

```ts
import { FilterBuilder, eq, lt, neq, any, find, where } from 'querycraft'

const filter = new FilterBuilder()
.where('firstName', eq('bob'))
.where('list', find(where('id', eq('ite,1'))))
.where('lastName', any([
    eq('doyle'),
    eq(null)
]))
.where('updatedAt', lt({ daysAgo: 5 }))
.where('assignedTo', neq(null))
.setSortFieldId('customFields', 'custom1', 'value')
.setSortDirection('ASC')
.setLimit(50)

```
