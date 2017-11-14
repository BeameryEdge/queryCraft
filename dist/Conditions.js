"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./Query");
class BaseCondition {
    constructor(value) {
        this.value = value;
    }
    toJSON() { return { op: this.op, value: this.value }; }
}
exports.BaseCondition = BaseCondition;
class MatchCondition extends BaseCondition {
    toJSON() { return { op: this.op, value: this.value.map($ => $.toJSON()) }; }
}
exports.MatchCondition = MatchCondition;
class ALL extends MatchCondition {
    constructor() {
        super(...arguments);
        this.op = 'ALL';
    }
}
exports.ALL = ALL;
function all(value) { return new ALL(value); }
exports.all = all;
class ANY extends MatchCondition {
    constructor() {
        super(...arguments);
        this.op = 'ANY';
    }
}
exports.ANY = ANY;
function any(value) { return new ANY(value); }
exports.any = any;
class EqualityCondition extends BaseCondition {
}
exports.EqualityCondition = EqualityCondition;
class EQ extends EqualityCondition {
    constructor() {
        super(...arguments);
        this.op = 'EQ';
    }
}
exports.EQ = EQ;
function eq(value) { return new EQ(value); }
exports.eq = eq;
class NEQ extends EqualityCondition {
    constructor() {
        super(...arguments);
        this.op = 'NEQ';
    }
}
exports.NEQ = NEQ;
function neq(value) { return new NEQ(value); }
exports.neq = neq;
class OrderCondition extends BaseCondition {
}
exports.OrderCondition = OrderCondition;
class LT extends OrderCondition {
    constructor() {
        super(...arguments);
        this.op = 'LT';
    }
}
exports.LT = LT;
function lt(value) { return new LT(value); }
exports.lt = lt;
class GT extends OrderCondition {
    constructor() {
        super(...arguments);
        this.op = 'GT';
    }
}
exports.GT = GT;
function gt(value) { return new GT(value); }
exports.gt = gt;
class LTE extends OrderCondition {
    constructor() {
        super(...arguments);
        this.op = 'LTE';
    }
}
exports.LTE = LTE;
function lte(value) { return new LTE(value); }
exports.lte = lte;
class GTE extends OrderCondition {
    constructor() {
        super(...arguments);
        this.op = 'GTE';
    }
}
exports.GTE = GTE;
function gte(value) { return new GTE(value); }
exports.gte = gte;
class StringCondition extends BaseCondition {
}
exports.StringCondition = StringCondition;
class PREFIX extends StringCondition {
    constructor() {
        super(...arguments);
        this.op = 'PREFIX';
    }
}
exports.PREFIX = PREFIX;
function prefix(value) { return new PREFIX(value); }
exports.prefix = prefix;
class QueryCondition extends BaseCondition {
    toJSON() { return { op: this.op, value: this.value.toJSON() }; }
}
exports.QueryCondition = QueryCondition;
class FIND extends QueryCondition {
    constructor() {
        super(...arguments);
        this.op = 'FIND';
    }
}
exports.FIND = FIND;
function find(value) { return new FIND(value); }
exports.find = find;
class NFIND extends QueryCondition {
    constructor() {
        super(...arguments);
        this.op = 'NFIND';
    }
}
exports.NFIND = NFIND;
function nfind(value) { return new NFIND(value); }
exports.nfind = nfind;
function conditionFromJSON(json) {
    switch (json.op) {
        case 'ANY':
            return new ANY(json.value.map(conditionFromJSON));
        case 'ALL':
            return new ALL(json.value.map(conditionFromJSON));
        case 'EQ':
            return new EQ(json.value);
        case 'NEQ':
            return new NEQ(json.value);
        case 'LT':
            return new LT(json.value);
        case 'GT':
            return new GT(json.value);
        case 'LTE':
            return new LTE(json.value);
        case 'GTE':
            return new GTE(json.value);
        case 'PREFIX':
            return new PREFIX(json.value);
        case 'FIND':
            return new FIND(Query_1.QueryBuilder.fromJSON(json.value));
        case 'NFIND':
            return new NFIND(Query_1.QueryBuilder.fromJSON(json.value));
        default:
            throw new Error('Unknown Operation');
    }
}
exports.conditionFromJSON = conditionFromJSON;
//# sourceMappingURL=Conditions.js.map