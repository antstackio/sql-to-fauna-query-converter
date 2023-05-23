import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Parser from 'node-sql-parser';

try {
  const parser = new Parser.Parser();
  const inputDir = path.resolve(`${__dirname}/input`);
  const outputDir = path.resolve(path.join(__dirname, './output'));

  const sqlFileList = fs.readdirSync(inputDir, (err, files) =>
    files.filter((e) => path.extname(e).toLowerCase() === '.sql')
  );
  sqlFileList.forEach((sqlFile) => {
    const data = fs.readFileSync(`${inputDir}/${sqlFile}`, 'utf8');
    const ast = parser.astify(data);
    ast.forEach((astElement) => {
      if (astElement.columns.length) {
        let FQLOutput = ``;
        switch (astElement.type) {
          case 'insert':
            astElement.values.forEach((insertValue) => {
              FQLOutput += `${astElement.table[0].table}.create({${insertValue.value
                .map((column, idx) => `${astElement.columns[idx]}: '${column.value}'`)
                .join(',')}})\n`;
            });
            // console.log(insertFQL);
            break;
          case 'select':
            console.log('\nSelect Queries from the file');
            break;
          default:
            console.log('Not a correct type');
        }
        // Write the output to file in Output Directory
        fs.writeFileSync(`${outputDir}/${sqlFile.replace('.sql', '.fql')}`, FQLOutput);
      } else {
        console.log('Column Names are missing insert');
      }
    });
  });
} catch (err) {
  console.error(err);
}
