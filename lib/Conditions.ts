import {
    Operation,
    MatchOperation,
    EqualityOperation,
    OrderOperation,
    QueryOperation,
    StringOperation
} from './Operations'
import { BasicValue } from './Values'
import { IQuery, QueryBuilder } from './Query'
export interface IBaseCondition {
    op: Operation
    value: BasicValue | Array<IBaseCondition> | IQuery
}

export interface IMatchCondition extends IBaseCondition {
    op: MatchOperation
    value: Array<ICondition>
}

export interface IEqualityCondition extends IBaseCondition {
    op: EqualityOperation
    value: BasicValue
}

export interface IOrderCondition extends IBaseCondition {
    op: OrderOperation
    value: BasicValue
}

export interface IStringCondition extends IBaseCondition {
    op: StringOperation
    value: string
}

export interface IQueryCondition extends IBaseCondition {
    op: QueryOperation
    value: IQuery
}

export type ICondition = IMatchCondition | IEqualityCondition | IOrderCondition | IStringCondition | IQueryCondition

export type Condition = MatchCondition | EqualityCondition | OrderCondition | StringCondition | QueryCondition
export type Value = Condition[] | BasicValue | QueryBuilder
export abstract class BaseCondition {
    op: Operation
    value: Value
    constructor(value: Value) {
        this.value = value
    }
    toJSON(): ICondition { return <ICondition>{ op: this.op, value: this.value } }
}

export class MatchCondition extends BaseCondition {
    op: MatchOperation
    value: Condition[]
    toJSON(): IMatchCondition { return { op: this.op, value: this.value.map($ => $.toJSON()) } }
}

export class ALL extends MatchCondition {
    op: 'ALL' = 'ALL'
    value: Condition[]
}
export function all(value: Condition[]){ return new ALL(value) }

export class ANY extends MatchCondition {
    op: 'ANY' = 'ANY'
    value: Condition[]
}
export function any(value: Condition[]){ return new ANY(value) }


export class EqualityCondition extends BaseCondition implements IEqualityCondition {
    op: EqualityOperation
    value: BasicValue
}

export class EQ extends EqualityCondition {
    op: 'EQ' = 'EQ'
    value: BasicValue
}
export function eq(value: BasicValue){ return new EQ(value) }

export class NEQ extends EqualityCondition {
    op: 'NEQ' = 'NEQ'
    value: BasicValue
}
export function neq(value: BasicValue){ return new NEQ(value) }

export class OrderCondition extends BaseCondition implements IOrderCondition {
    op: OrderOperation
    value: BasicValue
}

export class LT extends OrderCondition {
    op: 'LT' = 'LT'
    value: BasicValue
}
export function lt(value: BasicValue){ return new LT(value) }

export class GT extends OrderCondition {
    op: 'GT' = 'GT'
    value: BasicValue
}
export function gt(value: BasicValue){ return new GT(value) }

export class LTE extends OrderCondition {
    op: 'LTE' = 'LTE'
    value: BasicValue
}
export function lte(value: BasicValue){ return new LTE(value) }

export class GTE extends OrderCondition {
    op: 'GTE' = 'GTE'
    value: BasicValue
}
export function gte(value: BasicValue){ return new GTE(value) }

export class StringCondition extends BaseCondition implements IStringCondition {
    op: StringOperation
    value: string
}

export class PREFIX extends StringCondition {
    op: 'PREFIX' = 'PREFIX'
    value: string
}
export function prefix(value: string){ return new PREFIX(value) }

export class QueryCondition extends BaseCondition {
    op: QueryOperation
    value: QueryBuilder
    toJSON(): IQueryCondition { return { op: this.op, value: this.value.toJSON() } }
}

export class FIND extends QueryCondition {
    op: QueryOperation = 'FIND'
}
export function find(value: QueryBuilder){ return new FIND(value) }

export class NFIND extends QueryCondition {
    op: QueryOperation = 'NFIND'
}
export function nfind(value: QueryBuilder){ return new NFIND(value) }

export function conditionFromJSON(json: ICondition): Condition {
    switch (json.op) {
        case 'ANY':
            return new ANY(json.value.map(conditionFromJSON))
        case 'ALL':
            return new ALL(json.value.map(conditionFromJSON))
        case 'EQ':
            return new EQ(json.value)
        case 'NEQ':
            return new NEQ(json.value)
        case 'LT':
            return new LT(json.value)
        case 'GT':
            return new GT(json.value)
        case 'LTE':
            return new LTE(json.value)
        case 'GTE':
            return new GTE(json.value)
        case 'PREFIX':
            return new PREFIX(json.value)
        case 'FIND':
            return new FIND(QueryBuilder.fromJSON(json.value))
        case 'NFIND':
            return new NFIND(QueryBuilder.fromJSON(json.value))
        default:
            throw new Error('Unknown Operation')
    }
}