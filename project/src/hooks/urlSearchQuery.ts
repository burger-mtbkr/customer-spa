// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = (location: any) => {
  return new URLSearchParams(location.search);
};
export default useQuery;
