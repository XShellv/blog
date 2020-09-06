import { useRouter } from "next/router";

export function useQuery() {
  const router = useRouter();
  let queryString = "";

  for (let k in router.query) {
    queryString = queryString += `${k}=${router.query[k]}&`;
  }
  const query = new URLSearchParams(queryString);

  function jumpTo(query: URLSearchParams, pathname = location.pathname) {
    router.push(pathname + "?" + query.toString());
  }

  function getQuery(name: string): any {
    return query.get(name) || "";
  }

  return { query, jumpTo, getQuery };
}
