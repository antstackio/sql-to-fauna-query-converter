import fs from 'fs';
import Parser from 'node-sql-parser';

try {
  const parser = new Parser.Parser();
  const data = fs.readFileSync('./input/load_employees.dump', 'utf8');
  const ast = parser.astify(data);
  ast.forEach((astElement) => {
    if (astElement.columns.length) {
      switch (astElement.type) {
        case 'insert':
          console.log('\nInsert Queries from the file');
          let insertFQL = ``;
          astElement.values.forEach((insertValue) => {
            insertFQL += `${astElement.table[0].table}.create({${insertValue.value
              .map((column, idx) => `${astElement.columns[idx]}: '${column.value}'`)
              .join(',')}})\n`;
          });
          console.log(insertFQL);
          break;
        case 'select':
          console.log('\nSelect Queries from the file');
          break;
        default:
          console.log('Not a correct type');
      }
    } else {
      console.log('Column Names are missing insert');
    }
  });
} catch (err) {
  console.error(err);
}

/*!SECTION
{
    "type": "insert",
    "table": [
        {
            "db": null,
            "table": "departments",
            "as": null
        }
    ],
    "columns": [
        "dept_no",
        "dept_name"
    ],
    "values": [
        {
            "type": "expr_list",
            "value": [
                {
                    "type": "single_quote_string",
                    "value": "d001"
                },
                {
                    "type": "single_quote_string",
                    "value": "Marketing"
                }
            ]
        },
        {
            "type": "expr_list",
            "value": [
                {
                    "type": "single_quote_string",
                    "value": "d002"
                },
                {
                    "type": "single_quote_string",
                    "value": "Finance"
                }
            ]
        }
    ],
    "partition": null,
    "prefix": "into",
    "on_duplicate_update": null
}

*/
