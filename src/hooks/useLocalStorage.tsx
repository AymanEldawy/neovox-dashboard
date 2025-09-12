export const useLocalStorage = () => {

  const getTable = (tableName) => {
    let key = `MATEI_${tableName}_TABLES`
    const localTables = localStorage.getItem(key);
    let columns = localTables && localTables !== "undefined" ? JSON.parse(localTables) : null;
    return columns
  };

  const setTable = (tableName, columns) => {
    localStorage.setItem(`MATEI_${tableName}_TABLES`, JSON.stringify(columns));
  };

  return {
    getTable,
    setTable,
  };
};
