# sql-to-fauna-query-converter

Script that generates Fauna Queries from MySQL queries.

## Assumptions

1. The Insert queries have columns specified along with table names. The logc fails without it since script needs to identify column names for FQL.
