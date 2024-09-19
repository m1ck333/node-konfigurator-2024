import fs from "fs";
import path from "path";

function sortJsonKeys(json: any): any {
  if (Array.isArray(json)) {
    return json.map((item) => sortJsonKeys(item));
  } else if (typeof json === "object" && json !== null) {
    return Object.keys(json)
      .sort()
      .reduce((sortedObj: any, key: string) => {
        sortedObj[key] = sortJsonKeys(json[key]);
        return sortedObj;
      }, {} as Record<string, any>);
  }
  return json;
}

// Directory containing the JSON files
const localesDir: string = path.join(__dirname, "../locales");

// Read all files in the directory
fs.readdirSync(localesDir).forEach((file: string) => {
  // Only process .json files
  if (path.extname(file) === ".json") {
    const filePath: string = path.join(localesDir, file);

    try {
      // Read and parse the JSON file
      const jsonData: any = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Sort the JSON keys
      const sortedJsonData: any = sortJsonKeys(jsonData);

      // Write the sorted JSON back to the file
      fs.writeFileSync(
        filePath,
        JSON.stringify(sortedJsonData, null, 2),
        "utf8"
      );
      console.log(`JSON keys sorted and written to file: ${file}`);
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
});
