const fs = require("fs");
const { parse } = require("csv-parse");

async function readCsv(dbName, tableName) {
  const result = [];

  const parser = fs
    .createReadStream(`./database/data/${dbName}/${tableName}.csv`)
    .pipe(
      parse({
        columns: true,
        skip_records_with_empty_values: true,
        cast: (value) => (value === "NULL" ? null : value),
      })
    );

  for await (const row of parser) {
    result.push(row);
  }

  return result;
}

module.exports = readCsv;
