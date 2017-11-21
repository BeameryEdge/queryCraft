﻿var typedoc = typedoc || {};
            typedoc.search = typedoc.search || {};
            typedoc.search.data = {"kinds":{"64":"Function","128":"Class","256":"Interface","512":"Constructor","1024":"Property","2048":"Method","65536":"Type literal","262144":"Accessor","4194304":"Type alias"},"rows":[{"id":0,"kind":256,"name":"QueryJSON","url":"interfaces/queryjson.html","classes":"tsd-kind-interface"},{"id":1,"kind":128,"name":"AbstractQueryBuilder","url":"classes/abstractquerybuilder.html","classes":"tsd-kind-class"},{"id":2,"kind":262144,"name":"data","url":"classes/abstractquerybuilder.html#data","classes":"tsd-kind-get-signature tsd-parent-kind-class tsd-is-protected","parent":"AbstractQueryBuilder"},{"id":3,"kind":2048,"name":"where","url":"classes/abstractquerybuilder.html#where","classes":"tsd-kind-method tsd-parent-kind-class","parent":"AbstractQueryBuilder"},{"id":4,"kind":2048,"name":"getFieldIds","url":"classes/abstractquerybuilder.html#getfieldids","classes":"tsd-kind-method tsd-parent-kind-class","parent":"AbstractQueryBuilder"},{"id":5,"kind":2048,"name":"getFieldCondition","url":"classes/abstractquerybuilder.html#getfieldcondition","classes":"tsd-kind-method tsd-parent-kind-class","parent":"AbstractQueryBuilder"},{"id":6,"kind":2048,"name":"removeFieldCondition","url":"classes/abstractquerybuilder.html#removefieldcondition","classes":"tsd-kind-method tsd-parent-kind-class","parent":"AbstractQueryBuilder"},{"id":7,"kind":2048,"name":"mapFieldConditions","url":"classes/abstractquerybuilder.html#mapfieldconditions","classes":"tsd-kind-method tsd-parent-kind-class tsd-has-type-parameter","parent":"AbstractQueryBuilder"},{"id":8,"kind":128,"name":"QueryBuilder","url":"classes/querybuilder.html","classes":"tsd-kind-class"},{"id":9,"kind":1024,"name":"data","url":"classes/querybuilder.html#data","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"QueryBuilder"},{"id":10,"kind":65536,"name":"__type","url":"classes/querybuilder.html#data.__type","classes":"tsd-kind-type-literal tsd-parent-kind-property tsd-is-not-exported","parent":"QueryBuilder.data"},{"id":11,"kind":2048,"name":"fromJSON","url":"classes/querybuilder.html#fromjson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-static","parent":"QueryBuilder"},{"id":12,"kind":2048,"name":"toJSON","url":"classes/querybuilder.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class","parent":"QueryBuilder"},{"id":13,"kind":2048,"name":"where","url":"classes/querybuilder.html#where","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"QueryBuilder"},{"id":14,"kind":2048,"name":"getFieldIds","url":"classes/querybuilder.html#getfieldids","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"QueryBuilder"},{"id":15,"kind":2048,"name":"getFieldCondition","url":"classes/querybuilder.html#getfieldcondition","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"QueryBuilder"},{"id":16,"kind":2048,"name":"removeFieldCondition","url":"classes/querybuilder.html#removefieldcondition","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"QueryBuilder"},{"id":17,"kind":2048,"name":"mapFieldConditions","url":"classes/querybuilder.html#mapfieldconditions","classes":"tsd-kind-method tsd-parent-kind-class tsd-has-type-parameter tsd-is-inherited","parent":"QueryBuilder"},{"id":18,"kind":4194304,"name":"Value","url":"globals.html#value","classes":"tsd-kind-type-alias tsd-is-not-exported"},{"id":19,"kind":64,"name":"where","url":"globals.html#where","classes":"tsd-kind-function"},{"id":20,"kind":256,"name":"BaseConditionJSON","url":"interfaces/baseconditionjson.html","classes":"tsd-kind-interface tsd-is-private"},{"id":21,"kind":1024,"name":"op","url":"interfaces/baseconditionjson.html#op","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"BaseConditionJSON"},{"id":22,"kind":1024,"name":"value","url":"interfaces/baseconditionjson.html#value","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"BaseConditionJSON"},{"id":23,"kind":256,"name":"MatchConditionJSON","url":"interfaces/matchconditionjson.html","classes":"tsd-kind-interface tsd-is-private"},{"id":24,"kind":1024,"name":"op","url":"interfaces/matchconditionjson.html#op","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"MatchConditionJSON"},{"id":25,"kind":1024,"name":"value","url":"interfaces/matchconditionjson.html#value","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"MatchConditionJSON"},{"id":26,"kind":256,"name":"EqualityConditionJSON","url":"interfaces/equalityconditionjson.html","classes":"tsd-kind-interface tsd-is-private"},{"id":27,"kind":1024,"name":"op","url":"interfaces/equalityconditionjson.html#op","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"EqualityConditionJSON"},{"id":28,"kind":1024,"name":"value","url":"interfaces/equalityconditionjson.html#value","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"EqualityConditionJSON"},{"id":29,"kind":256,"name":"OrderConditionJSON","url":"interfaces/orderconditionjson.html","classes":"tsd-kind-interface tsd-is-private"},{"id":30,"kind":1024,"name":"op","url":"interfaces/orderconditionjson.html#op","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"OrderConditionJSON"},{"id":31,"kind":1024,"name":"value","url":"interfaces/orderconditionjson.html#value","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"OrderConditionJSON"},{"id":32,"kind":256,"name":"StringConditionJSON","url":"interfaces/stringconditionjson.html","classes":"tsd-kind-interface tsd-is-private"},{"id":33,"kind":1024,"name":"op","url":"interfaces/stringconditionjson.html#op","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"StringConditionJSON"},{"id":34,"kind":1024,"name":"value","url":"interfaces/stringconditionjson.html#value","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"StringConditionJSON"},{"id":35,"kind":256,"name":"QueryConditionJSON","url":"interfaces/queryconditionjson.html","classes":"tsd-kind-interface tsd-is-private"},{"id":36,"kind":1024,"name":"op","url":"interfaces/queryconditionjson.html#op","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"QueryConditionJSON"},{"id":37,"kind":1024,"name":"value","url":"interfaces/queryconditionjson.html#value","classes":"tsd-kind-property tsd-parent-kind-interface tsd-is-overwrite","parent":"QueryConditionJSON"},{"id":38,"kind":128,"name":"BaseCondition","url":"classes/basecondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":39,"kind":1024,"name":"op","url":"classes/basecondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class","parent":"BaseCondition"},{"id":40,"kind":1024,"name":"value","url":"classes/basecondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class","parent":"BaseCondition"},{"id":41,"kind":512,"name":"constructor","url":"classes/basecondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"BaseCondition"},{"id":42,"kind":2048,"name":"toJSON","url":"classes/basecondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class","parent":"BaseCondition"},{"id":43,"kind":128,"name":"MatchCondition","url":"classes/matchcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":44,"kind":1024,"name":"op","url":"classes/matchcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"MatchCondition"},{"id":45,"kind":1024,"name":"value","url":"classes/matchcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"MatchCondition"},{"id":46,"kind":2048,"name":"toJSON","url":"classes/matchcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-overwrite","parent":"MatchCondition"},{"id":47,"kind":512,"name":"constructor","url":"classes/matchcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"MatchCondition"},{"id":48,"kind":128,"name":"AllCondition","url":"classes/allcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":49,"kind":1024,"name":"op","url":"classes/allcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"AllCondition"},{"id":50,"kind":1024,"name":"value","url":"classes/allcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"AllCondition"},{"id":51,"kind":2048,"name":"toJSON","url":"classes/allcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"AllCondition"},{"id":52,"kind":512,"name":"constructor","url":"classes/allcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"AllCondition"},{"id":53,"kind":128,"name":"AnyCondition","url":"classes/anycondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":54,"kind":1024,"name":"op","url":"classes/anycondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"AnyCondition"},{"id":55,"kind":1024,"name":"value","url":"classes/anycondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"AnyCondition"},{"id":56,"kind":2048,"name":"toJSON","url":"classes/anycondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"AnyCondition"},{"id":57,"kind":512,"name":"constructor","url":"classes/anycondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"AnyCondition"},{"id":58,"kind":128,"name":"EqualityCondition","url":"classes/equalitycondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":59,"kind":1024,"name":"op","url":"classes/equalitycondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"EqualityCondition"},{"id":60,"kind":1024,"name":"value","url":"classes/equalitycondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"EqualityCondition"},{"id":61,"kind":512,"name":"constructor","url":"classes/equalitycondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"EqualityCondition"},{"id":62,"kind":2048,"name":"toJSON","url":"classes/equalitycondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"EqualityCondition"},{"id":63,"kind":128,"name":"EqualsCondition","url":"classes/equalscondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":64,"kind":1024,"name":"op","url":"classes/equalscondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"EqualsCondition"},{"id":65,"kind":1024,"name":"value","url":"classes/equalscondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"EqualsCondition"},{"id":66,"kind":512,"name":"constructor","url":"classes/equalscondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"EqualsCondition"},{"id":67,"kind":2048,"name":"toJSON","url":"classes/equalscondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"EqualsCondition"},{"id":68,"kind":128,"name":"NotEqualsCondition","url":"classes/notequalscondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":69,"kind":1024,"name":"op","url":"classes/notequalscondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"NotEqualsCondition"},{"id":70,"kind":1024,"name":"value","url":"classes/notequalscondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"NotEqualsCondition"},{"id":71,"kind":512,"name":"constructor","url":"classes/notequalscondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"NotEqualsCondition"},{"id":72,"kind":2048,"name":"toJSON","url":"classes/notequalscondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"NotEqualsCondition"},{"id":73,"kind":128,"name":"OrderCondition","url":"classes/ordercondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":74,"kind":1024,"name":"op","url":"classes/ordercondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"OrderCondition"},{"id":75,"kind":1024,"name":"value","url":"classes/ordercondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"OrderCondition"},{"id":76,"kind":512,"name":"constructor","url":"classes/ordercondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"OrderCondition"},{"id":77,"kind":2048,"name":"toJSON","url":"classes/ordercondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"OrderCondition"},{"id":78,"kind":128,"name":"LessThanCondition","url":"classes/lessthancondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":79,"kind":1024,"name":"op","url":"classes/lessthancondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"LessThanCondition"},{"id":80,"kind":1024,"name":"value","url":"classes/lessthancondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"LessThanCondition"},{"id":81,"kind":512,"name":"constructor","url":"classes/lessthancondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"LessThanCondition"},{"id":82,"kind":2048,"name":"toJSON","url":"classes/lessthancondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"LessThanCondition"},{"id":83,"kind":128,"name":"GreaterThanCondition","url":"classes/greaterthancondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":84,"kind":1024,"name":"op","url":"classes/greaterthancondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"GreaterThanCondition"},{"id":85,"kind":1024,"name":"value","url":"classes/greaterthancondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"GreaterThanCondition"},{"id":86,"kind":512,"name":"constructor","url":"classes/greaterthancondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"GreaterThanCondition"},{"id":87,"kind":2048,"name":"toJSON","url":"classes/greaterthancondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"GreaterThanCondition"},{"id":88,"kind":128,"name":"LessThanOrEqualCondition","url":"classes/lessthanorequalcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":89,"kind":1024,"name":"op","url":"classes/lessthanorequalcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"LessThanOrEqualCondition"},{"id":90,"kind":1024,"name":"value","url":"classes/lessthanorequalcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"LessThanOrEqualCondition"},{"id":91,"kind":512,"name":"constructor","url":"classes/lessthanorequalcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"LessThanOrEqualCondition"},{"id":92,"kind":2048,"name":"toJSON","url":"classes/lessthanorequalcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"LessThanOrEqualCondition"},{"id":93,"kind":128,"name":"GreaterThanOrEqualCondition","url":"classes/greaterthanorequalcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":94,"kind":1024,"name":"op","url":"classes/greaterthanorequalcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"GreaterThanOrEqualCondition"},{"id":95,"kind":1024,"name":"value","url":"classes/greaterthanorequalcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"GreaterThanOrEqualCondition"},{"id":96,"kind":512,"name":"constructor","url":"classes/greaterthanorequalcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"GreaterThanOrEqualCondition"},{"id":97,"kind":2048,"name":"toJSON","url":"classes/greaterthanorequalcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"GreaterThanOrEqualCondition"},{"id":98,"kind":128,"name":"StringCondition","url":"classes/stringcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":99,"kind":1024,"name":"op","url":"classes/stringcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"StringCondition"},{"id":100,"kind":1024,"name":"value","url":"classes/stringcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"StringCondition"},{"id":101,"kind":512,"name":"constructor","url":"classes/stringcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"StringCondition"},{"id":102,"kind":2048,"name":"toJSON","url":"classes/stringcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"StringCondition"},{"id":103,"kind":128,"name":"PrefixCondition","url":"classes/prefixcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":104,"kind":1024,"name":"op","url":"classes/prefixcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"PrefixCondition"},{"id":105,"kind":1024,"name":"value","url":"classes/prefixcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"PrefixCondition"},{"id":106,"kind":512,"name":"constructor","url":"classes/prefixcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"PrefixCondition"},{"id":107,"kind":2048,"name":"toJSON","url":"classes/prefixcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"PrefixCondition"},{"id":108,"kind":128,"name":"QueryCondition","url":"classes/querycondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":109,"kind":1024,"name":"op","url":"classes/querycondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"QueryCondition"},{"id":110,"kind":1024,"name":"value","url":"classes/querycondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"QueryCondition"},{"id":111,"kind":2048,"name":"toJSON","url":"classes/querycondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-overwrite","parent":"QueryCondition"},{"id":112,"kind":512,"name":"constructor","url":"classes/querycondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"QueryCondition"},{"id":113,"kind":128,"name":"FindCondition","url":"classes/findcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":114,"kind":1024,"name":"op","url":"classes/findcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"FindCondition"},{"id":115,"kind":1024,"name":"value","url":"classes/findcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"FindCondition"},{"id":116,"kind":2048,"name":"toJSON","url":"classes/findcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"FindCondition"},{"id":117,"kind":512,"name":"constructor","url":"classes/findcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"FindCondition"},{"id":118,"kind":128,"name":"CannotFindCondition","url":"classes/cannotfindcondition.html","classes":"tsd-kind-class tsd-is-private"},{"id":119,"kind":1024,"name":"op","url":"classes/cannotfindcondition.html#op","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite","parent":"CannotFindCondition"},{"id":120,"kind":1024,"name":"value","url":"classes/cannotfindcondition.html#value","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"CannotFindCondition"},{"id":121,"kind":2048,"name":"toJSON","url":"classes/cannotfindcondition.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-overwrite tsd-is-inherited","parent":"CannotFindCondition"},{"id":122,"kind":512,"name":"constructor","url":"classes/cannotfindcondition.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class tsd-is-inherited","parent":"CannotFindCondition"},{"id":123,"kind":4194304,"name":"ConditionJSON","url":"globals.html#conditionjson","classes":"tsd-kind-type-alias tsd-is-private"},{"id":124,"kind":4194304,"name":"Condition","url":"globals.html#condition","classes":"tsd-kind-type-alias tsd-is-private"},{"id":125,"kind":64,"name":"conditionFromJSON","url":"globals.html#conditionfromjson","classes":"tsd-kind-function tsd-is-private"},{"id":126,"kind":64,"name":"all","url":"globals.html#all","classes":"tsd-kind-function"},{"id":127,"kind":64,"name":"any","url":"globals.html#any","classes":"tsd-kind-function"},{"id":128,"kind":64,"name":"eq","url":"globals.html#eq","classes":"tsd-kind-function"},{"id":129,"kind":64,"name":"neq","url":"globals.html#neq","classes":"tsd-kind-function"},{"id":130,"kind":64,"name":"lt","url":"globals.html#lt","classes":"tsd-kind-function"},{"id":131,"kind":64,"name":"gt","url":"globals.html#gt","classes":"tsd-kind-function"},{"id":132,"kind":64,"name":"lte","url":"globals.html#lte","classes":"tsd-kind-function"},{"id":133,"kind":64,"name":"gte","url":"globals.html#gte","classes":"tsd-kind-function"},{"id":134,"kind":64,"name":"prefix","url":"globals.html#prefix","classes":"tsd-kind-function"},{"id":135,"kind":64,"name":"find","url":"globals.html#find","classes":"tsd-kind-function"},{"id":136,"kind":64,"name":"nfind","url":"globals.html#nfind","classes":"tsd-kind-function"},{"id":137,"kind":256,"name":"IFilter","url":"interfaces/ifilter.html","classes":"tsd-kind-interface"},{"id":138,"kind":1024,"name":"statements","url":"interfaces/ifilter.html#statements","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IFilter"},{"id":139,"kind":1024,"name":"sortFieldId","url":"interfaces/ifilter.html#sortfieldid","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IFilter"},{"id":140,"kind":1024,"name":"sortDir","url":"interfaces/ifilter.html#sortdir","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IFilter"},{"id":141,"kind":1024,"name":"sortFieldSubId","url":"interfaces/ifilter.html#sortfieldsubid","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IFilter"},{"id":142,"kind":1024,"name":"sortFieldSubProp","url":"interfaces/ifilter.html#sortfieldsubprop","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IFilter"},{"id":143,"kind":1024,"name":"limit","url":"interfaces/ifilter.html#limit","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IFilter"},{"id":144,"kind":256,"name":"Datum","url":"interfaces/datum.html","classes":"tsd-kind-interface"},{"id":145,"kind":128,"name":"FilterBuilder","url":"classes/filterbuilder.html","classes":"tsd-kind-class"},{"id":146,"kind":1024,"name":"limit","url":"classes/filterbuilder.html#limit","classes":"tsd-kind-property tsd-parent-kind-class","parent":"FilterBuilder"},{"id":147,"kind":1024,"name":"sortDir","url":"classes/filterbuilder.html#sortdir","classes":"tsd-kind-property tsd-parent-kind-class","parent":"FilterBuilder"},{"id":148,"kind":1024,"name":"sortFieldId","url":"classes/filterbuilder.html#sortfieldid","classes":"tsd-kind-property tsd-parent-kind-class","parent":"FilterBuilder"},{"id":149,"kind":1024,"name":"sortFieldSubId","url":"classes/filterbuilder.html#sortfieldsubid","classes":"tsd-kind-property tsd-parent-kind-class","parent":"FilterBuilder"},{"id":150,"kind":1024,"name":"sortFieldSubProp","url":"classes/filterbuilder.html#sortfieldsubprop","classes":"tsd-kind-property tsd-parent-kind-class","parent":"FilterBuilder"},{"id":151,"kind":262144,"name":"statements","url":"classes/filterbuilder.html#statements","classes":"tsd-kind-accessor tsd-parent-kind-class","parent":"FilterBuilder"},{"id":152,"kind":2048,"name":"clone","url":"classes/filterbuilder.html#clone","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":153,"kind":1024,"name":"_statements","url":"classes/filterbuilder.html#_statements","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"FilterBuilder"},{"id":154,"kind":262144,"name":"data","url":"classes/filterbuilder.html#data","classes":"tsd-kind-get-signature tsd-parent-kind-class tsd-is-overwrite tsd-is-protected","parent":"FilterBuilder"},{"id":155,"kind":2048,"name":"or","url":"classes/filterbuilder.html#or","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":156,"kind":2048,"name":"and","url":"classes/filterbuilder.html#and","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":157,"kind":2048,"name":"getStatements","url":"classes/filterbuilder.html#getstatements","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":158,"kind":2048,"name":"setStatements","url":"classes/filterbuilder.html#setstatements","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":159,"kind":2048,"name":"addStatement","url":"classes/filterbuilder.html#addstatement","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":160,"kind":2048,"name":"fromJSON","url":"classes/filterbuilder.html#fromjson","classes":"tsd-kind-method tsd-parent-kind-class tsd-has-type-parameter tsd-is-static","parent":"FilterBuilder"},{"id":161,"kind":2048,"name":"getLimit","url":"classes/filterbuilder.html#getlimit","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":162,"kind":2048,"name":"setLimit","url":"classes/filterbuilder.html#setlimit","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":163,"kind":2048,"name":"getSortFieldId","url":"classes/filterbuilder.html#getsortfieldid","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":164,"kind":2048,"name":"getSortFieldSubId","url":"classes/filterbuilder.html#getsortfieldsubid","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":165,"kind":2048,"name":"getSortFieldSubProp","url":"classes/filterbuilder.html#getsortfieldsubprop","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":166,"kind":2048,"name":"setSortFieldId","url":"classes/filterbuilder.html#setsortfieldid","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":167,"kind":2048,"name":"getSortDirection","url":"classes/filterbuilder.html#getsortdirection","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":168,"kind":2048,"name":"setSortDirection","url":"classes/filterbuilder.html#setsortdirection","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":169,"kind":2048,"name":"toJSON","url":"classes/filterbuilder.html#tojson","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":170,"kind":2048,"name":"toQueryString","url":"classes/filterbuilder.html#toquerystring","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":171,"kind":2048,"name":"toString","url":"classes/filterbuilder.html#tostring","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":172,"kind":2048,"name":"createPaginatedFilter","url":"classes/filterbuilder.html#createpaginatedfilter","classes":"tsd-kind-method tsd-parent-kind-class","parent":"FilterBuilder"},{"id":173,"kind":2048,"name":"where","url":"classes/filterbuilder.html#where","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"FilterBuilder"},{"id":174,"kind":2048,"name":"getFieldIds","url":"classes/filterbuilder.html#getfieldids","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"FilterBuilder"},{"id":175,"kind":2048,"name":"getFieldCondition","url":"classes/filterbuilder.html#getfieldcondition","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"FilterBuilder"},{"id":176,"kind":2048,"name":"removeFieldCondition","url":"classes/filterbuilder.html#removefieldcondition","classes":"tsd-kind-method tsd-parent-kind-class tsd-is-inherited","parent":"FilterBuilder"},{"id":177,"kind":2048,"name":"mapFieldConditions","url":"classes/filterbuilder.html#mapfieldconditions","classes":"tsd-kind-method tsd-parent-kind-class tsd-has-type-parameter tsd-is-inherited","parent":"FilterBuilder"},{"id":178,"kind":4194304,"name":"SortDirection","url":"globals.html#sortdirection","classes":"tsd-kind-type-alias"},{"id":179,"kind":4194304,"name":"StatementJSON","url":"globals.html#statementjson","classes":"tsd-kind-type-alias"},{"id":180,"kind":4194304,"name":"Statement","url":"globals.html#statement","classes":"tsd-kind-type-alias"}]};