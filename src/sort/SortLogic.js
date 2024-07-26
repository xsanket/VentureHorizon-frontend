
export const getSort = (string) =>
    ["ASC", "asc", "DESC", "desc"].includes(string) ? string : "desc";
  
  export const getQuery = (value) => {
    if (!value) {
      value = "";
    }
    return value;
  };
