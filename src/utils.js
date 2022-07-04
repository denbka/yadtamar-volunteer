export const getQueryParams = () => {
  const searchQuery = window.location.search;
  if (!searchQuery.length) {
    return;
  }
  return searchQuery
    .slice(1, searchQuery.length)
    .split("&")
    .reduce((state, current) => {
      const [key, value] = current.split("=");
      return {
        ...state,
        [key]: value,
      };
    }, {});
};
