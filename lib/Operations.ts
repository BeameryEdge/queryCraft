export type QueryOperation = 'FIND' | 'NFIND'
export type StringOperation = 'PREFIX'
export type MatchOperation = 'ALL' |'ANY'
export type OrderOperation = 'LT' | 'GT' | 'LTE' | 'GTE'
export type EqualityOperation = 'EQ' | 'NEQ'
export type Operation = MatchOperation | EqualityOperation | OrderOperation | StringOperation | QueryOperation