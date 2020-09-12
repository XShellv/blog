"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
function useQuery() {
    const router = router_1.useRouter();
    let queryString = "";
    for (let k in router.query) {
        queryString = queryString += `${k}=${router.query[k]}&`;
    }
    const query = new URLSearchParams(queryString);
    function jumpTo(query, pathname = location.pathname) {
        router.push(pathname + "?" + query.toString());
    }
    function getQuery(name) {
        return query.get(name) || "";
    }
    return { query, jumpTo, getQuery };
}
exports.useQuery = useQuery;
//# sourceMappingURL=useQuery.jsx.map