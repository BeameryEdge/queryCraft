[![NPM](https://nodei.co/npm/querycraft.png)](https://npmjs.org/package/querycraft)

[![npm version](https://badge.fury.io/js/querycraft.svg)](https://badge.fury.io/js/querycraft)
[![CircleCI](https://circleci.com/gh/BeameryHQ/QueryCraft.svg?style=shield)](https://circleci.com/gh/BeameryHQ/QueryCraft)
[![codecov](https://codecov.io/gh/BeameryHQ/QueryCraft/branch/master/graph/badge.svg)](https://codecov.io/gh/BeameryHQ/QueryCraft)
[![David deps](https://david-dm.org/BeameryHQ/QueryCraft.svg)](https://david-dm.org/BeameryHQ/QueryCraft)
[![Known Vulnerabilities](https://snyk.io/test/github/beameryhq/querycraft/badge.svg)](https://snyk.io/test/github/beameryhq/querycraft)

## What are we trying to solve?
The role of data in the digital age is very much like gold in the wild west. It has the potential to bring untold benefits to those with the wit, wile and determination to find the nuggets of valuable information among the, large expanse of unordered mess; but also hold the potential to attract the overly enthusiastic optimist to invest large amount of time and money rifling through mud.

Here at [Beamery](http://beamery.com) data is what we do, in particular we have had to deal with one incredibly difficult hurdle, namely the disconnect between what we often call the hustlers and the hackers.

The **hustlers** are those with the domain knowledge in a field that allows them to understand what are the important features about the data they have and what sort of questions we want to ask about our data sets.

This could be a hiring manager who understands what the best indicators for a valuable employee look like from a candidate’s profile; or, a sales manager who can deduce that the ads they have been running work better in red states than blue by looking a sales growth grouped by area; or even a police inspector who, when shown the locations of recent drug offences, would use their own understanding of the areas and the way criminal organisations work to pick the best locations to spend police resources.

The **hackers** on the other hand are your engineers the people with the know how to build scalable, fault-tolerant systems which can house and surface, and aggregate vast amounts of data. This includes the systems engineers tweaking the performance of the machines and connections between them to squeeze every last ounce of speed from them using every state of the art tool available to shave of those precious milliseconds from each computation. The API developers creating efficient structured methods for accessing that data and the UI developers creating beautiful and intuitive interfaces for presenting that data in ways the hackers can easily digest.

## Proposal

The solution we came up with was to abstract out the layers between the data and those who understand the data into plug and play components that allow developers to pick, choose and extend functionality without having to fall into lower levels of concerns such as what the underlying database you are querying is.

 - **QueryCraft**: A database agnostic API in javascript
 - **ReportCraft**: Extends QueryCraft to enable aggregations that extract the trends in data (coming soon).
 - **SentenceCraft**: A react UI Component for building rich UIs that enables complex configurable user input in a natural way (coming soon).
 - **ReportSelector**: Uses sentence crafter to offer UI components that allow users to  build ReportCraft queries in a natural language format (coming soon).

# Query Craft

Query Craft is a database agnostic API to analyze your data and construct queries, filters, aggregations, etc. It abstracts the analytical operations and uses the databases connector to run those against your MongoDB collections, ElasticSearch indices or your MySQL tables. 


## Installation

```sh
npm install --save 'querycraft'
```

## Examples

To be able to use Query Craft you will need to define your schemas/collections/tables as TypeScript interfaces. For example:

```ts
interface contact {
    id: string
    'list': { id: string }[]
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    customFields: { id: string, value: number }[]
    assignedTo?: string
}
```

Then, if we want a query the describes the logic: 

```
    first 50 items where
        fistName is bob
        lastName is doyle OR is not set
        assignedTo is anything
        list has an item where id is item1
    sorted (in ascending order) by the value property of the customField where id is custom1
    created less than 5 days ago
```

We can build build it as easily as:

```ts
import { FilterBuilder, eq, lt, neq, any, find, where } from 'querycraft'

const filter = new FilterBuilder()
.where('firstName', eq('bob'))
.where('list', find(where('id', eq('item1'))))
.where('lastName', any([
    eq('doyle'),
    eq(null)
]))
.where('createdAt', lt({ daysAgo: 5 }))
.where('assignedTo', neq(null))
.setSortFieldId('customFields', 'custom1', 'value')
.setSortDirection('ASC')
.setLimit(50)
```

## API Docs

Query Craft API docs can be found [here](https://beameryhq.github.io/QueryCraft)
