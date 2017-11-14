import { Operation, MatchOperation, EqualityOperation, OrderOperation, QueryOperation, StringOperation } from './Operations';
import { BasicValue } from './Values';
import { IQuery, QueryBuilder } from './Query';
export interface IBaseCondition {
    op: Operation;
    value: BasicValue | Array<IBaseCondition> | IQuery;
}
export interface IMatchCondition extends IBaseCondition {
    op: MatchOperation;
    value: Array<ICondition>;
}
export interface IEqualityCondition extends IBaseCondition {
    op: EqualityOperation;
    value: BasicValue;
}
export interface IOrderCondition extends IBaseCondition {
    op: OrderOperation;
    value: BasicValue;
}
export interface IStringCondition extends IBaseCondition {
    op: StringOperation;
    value: string;
}
export interface IQueryCondition extends IBaseCondition {
    op: QueryOperation;
    value: IQuery;
}
export declare type ICondition = IMatchCondition | IEqualityCondition | IOrderCondition | IStringCondition | IQueryCondition;
export declare type Condition = MatchCondition | EqualityCondition | OrderCondition | StringCondition | QueryCondition;
export declare type Value = Condition[] | BasicValue | QueryBuilder;
export declare abstract class BaseCondition {
    op: Operation;
    value: Value;
    constructor(value: Value);
    toJSON(): ICondition;
}
export declare class MatchCondition extends BaseCondition {
    op: MatchOperation;
    value: Condition[];
    toJSON(): IMatchCondition;
}
export declare class ALL extends MatchCondition {
    op: 'ALL';
    value: Condition[];
}
export declare function all(value: Condition[]): ALL;
export declare class ANY extends MatchCondition {
    op: 'ANY';
    value: Condition[];
}
export declare function any(value: Condition[]): ANY;
export declare class EqualityCondition extends BaseCondition implements IEqualityCondition {
    op: EqualityOperation;
    value: BasicValue;
}
export declare class EQ extends EqualityCondition {
    op: 'EQ';
    value: BasicValue;
}
export declare function eq(value: BasicValue): EQ;
export declare class NEQ extends EqualityCondition {
    op: 'NEQ';
    value: BasicValue;
}
export declare function neq(value: BasicValue): NEQ;
export declare class OrderCondition extends BaseCondition implements IOrderCondition {
    op: OrderOperation;
    value: BasicValue;
}
export declare class LT extends OrderCondition {
    op: 'LT';
    value: BasicValue;
}
export declare function lt(value: BasicValue): LT;
export declare class GT extends OrderCondition {
    op: 'GT';
    value: BasicValue;
}
export declare function gt(value: BasicValue): GT;
export declare class LTE extends OrderCondition {
    op: 'LTE';
    value: BasicValue;
}
export declare function lte(value: BasicValue): LTE;
export declare class GTE extends OrderCondition {
    op: 'GTE';
    value: BasicValue;
}
export declare function gte(value: BasicValue): GTE;
export declare class StringCondition extends BaseCondition implements IStringCondition {
    op: StringOperation;
    value: string;
}
export declare class PREFIX extends StringCondition {
    op: 'PREFIX';
    value: string;
}
export declare function prefix(value: string): PREFIX;
export declare class QueryCondition extends BaseCondition {
    op: QueryOperation;
    value: QueryBuilder;
    toJSON(): IQueryCondition;
}
export declare class FIND extends QueryCondition {
    op: QueryOperation;
}
export declare function find(value: QueryBuilder): FIND;
export declare class NFIND extends QueryCondition {
    op: QueryOperation;
}
export declare function nfind(value: QueryBuilder): NFIND;
export declare function conditionFromJSON(json: ICondition): Condition;
