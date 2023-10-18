const fs = require('fs');

function checkFileForDuplicates(filename, ids, duplicates) {
  // Load the JSON file
  const data = JSON.parse(fs.readFileSync(filename));

  // Flatten the data into a single array
  const flattenedData = data.flat();

  // Check each entry for duplicate IDs
  // for (const entry of flattenedData) {
  //   if (ids.has(entry.product_id)) {
  //     console.error(`Duplicate ID found in ${filename}: ${entry.product_id}`);
  //     duplicates.add(entry.product_id);
  //   } else {
  //     ids.add(entry.product_id);
  //   }
  // }
  for (const entry of flattenedData) {
    if (ids.has(entry.product_name)) {
      console.error(`Duplicate name found in ${filename}: ${entry.product_name}`);
      duplicates.add(entry.product_name);
    } else {
      ids.add(entry.product_name);
    }
  }
}

function checkFilesForDuplicates(filenames) {
  const ids = new Set();
  const duplicates = new Set();

  for (const filename of filenames) {
    checkFileForDuplicates(filename, ids, duplicates);
  }

  // Write the duplicate IDs to a file
  if (duplicates.size > 0) {
    const outputFilename = `duplicates_name.txt`;
    fs.writeFileSync(outputFilename, Array.from(duplicates).join('\n'));
    console.log(`Duplicate IDs written to ${outputFilename}`);
  }
}

checkFilesForDuplicates(['./finalWaitrose2/waitroseData_900.json', './finalWaitrose2/waitroseData_1800.json', './finalWaitrose2/waitroseData_2700.json', './finalWaitrose2/waitroseData_3600.json', './finalWaitrose2/waitroseData_4500.json', './finalWaitrose2/waitroseData_5400.json', './finalWaitrose2/waitroseData_6300.json', './finalWaitrose2/waitroseData_7200.json', './finalWaitrose2/waitroseData_8100.json', './finalWaitrose2/waitroseData_9000.json', './finalWaitrose2/waitroseData_9900.json', './finalWaitrose2/waitroseData_10800.json', './finalWaitrose2/waitroseData_11700.json', './finalWaitrose2/waitroseData_12600.json', './finalWaitrose2/waitroseData_13500.json', './finalWaitrose2/waitroseData_14400.json', './finalWaitrose2/waitroseData_15300.json', './finalWaitrose2/waitroseData_16200.json', './finalWaitrose2/waitroseData_17100.json']);
