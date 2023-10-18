const fs = require('fs');

function removeDuplicateIds(filename) {
  // Load the JSON file
  const data = JSON.parse(fs.readFileSync(filename));

  // Keep track of the IDs we've seen so far
  const ids = new Set();

  // Keep track of the entries to remove
  const entriesToRemove = [];

  // Check each entry for duplicate IDs
  for (const entry of data) {
    if (ids.has(entry.product_id)) {
      console.error(`Duplicate ID found in ${filename}: ${entry.product_id}`);
      entriesToRemove.push(entry);
    } else {
      ids.add(entry.product_id);
    }
  }

  // Remove the duplicate entries
  for (const entry of entriesToRemove) {
    const index = data.indexOf(entry);
    data.splice(index, 1);
  }

  // Write the updated data to the file
  fs.writeFileSync(filename, JSON.stringify(data));
}

removeDuplicateIds('./output2.json');