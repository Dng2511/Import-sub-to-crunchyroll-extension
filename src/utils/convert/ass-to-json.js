const fs = require('fs').promises


async function readASS() {
  const assFile = await fs.readFile("./Scum's.Wish.S01E01.WEBRip.Netflix.vi.ass", 'utf8');
  
  const parsed = parseASS(assFile);
  await fs.writeFile('Scum.json', JSON.stringify(parsed, null, 2), 'utf8');
  console.log(parsed);
}

function toSeconds(timestamp) {
  const [h, m, s] = timestamp.split(':');
  return parseFloat(h) * 3600 + parseFloat(m) * 60 + parseFloat(s.replace(',', '.'));
}


function parseASS(content) {
  try{
    const lines = content.split(/\r?\n/);
    const result = {
      info: {},
      styles: [],
      events: [],
    };
  
    let section = '';
  
    for (const line of lines) {
      if (line.startsWith('[')) {
        section = line.trim();
      } else if (section === '[Script Info]' && line.includes(':')) {
        const [key, ...value] = line.split(':');
        result.info[key.trim()] = value.join(':').trim();
      } else if (section === '[V4+ Styles]' && line.startsWith('Style:')) {
        const styleData = line.replace('Style:', '').split(',');
        result.styles.push(styleData.map(item => item.trim()));
      } else if (section === '[Events]' && line.startsWith('Dialogue:')) {
        const dialogueData = line.replace('Dialogue:', '').split(',');
        const start = toSeconds(dialogueData[1]); // Start time
        const end = toSeconds(dialogueData[2]);   // End time
        const text = dialogueData.slice(9).join(',').trim(); // Dialogue text
        result.events.push({ start, end, text });
      }
    }
  
    return result;
  }
  catch(err){
    console.log(err);
    console.log('asd');
    
  }
}
  

readASS();