const fs = require('fs');
const path = require('path');

// Embedded data (will be used as fallback or primary source)
let cachedData = null;

function getData() {
  if (cachedData) return cachedData;
  
  try {
    const dataPath = path.join(__dirname, '..', 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    cachedData = JSON.parse(rawData);
    return cachedData;
  } catch (e) {
    // Return empty structure if file not found
    return {
      mc5Experience: [],
      outsideAgencyExperience: [],
      academicExperience: [],
      asdSdExperience: [],
      writerExperience: []
    };
  }
}

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  
  const data = getData();
  res.status(200).json(data);
};
