# sql-to-fauna-query-converter

Script that generates Fauna Queries from MySQL queries.

## How to use

1. Clone the repo to your local and install dependencies.

```sh
git clone git@github.com:antstackio/sql-to-fauna-query-converter.git

cd sql-to-fauna-query-converter

npm i
```

2. Add your SQL files into `input` directory and run the script using node.

```sh
node index.js
```

3. Fauna equivalent of the input SQL file will be created in the output directory. You can copy and paste them into Fauna Shell on their dashboard.

## Assumptions and Limitations

1. The Insert queries have columns specified along with table names. The logc fails without it since script needs to identify column names for FQL.
2. Currently it only generates create scripts in Fauna for provided SQL insert scripts.
