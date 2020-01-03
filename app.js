const fs = require("fs");
const file = JSON.parse(fs.readFileSync("data.json").toString());
let skip = false;
const json = {};

addvalues = (json , row , matchedinberger , matchedinasain , matchedinnippon , matchedindulux) => {
  json[row.BRAND].push({
        shade: row.SHADES,
        rgb: row.RGB,
        matches: [
          {
            Berger : matchedinberger,
            Asian : matchedinasain,
            Nippon : matchedinnippon,
            Dulux : matchedindulux
          }
        ]
      });
}

file.forEach(row => {
  if (skip) {
    let matchedinberger = [];
    let matchedinasain = [];
    let matchedinnippon = [];
    let matchedindulux = [];
    let index = 5;
    for (let r in row) {
      const str = r;
      let flip = false;
      if (str.includes("in")) {
        const matchedincompany = str.split(" ")[2];
        for(let i=0;i<4;++i){
          if((index == 16) || (index == 28) || (index == 40) )index++;

          let name , rgb , acc;
        if (flip) {
          name = row[`field${index}`];
          index++;
        } else {
          flip = true;
          name = row[r];
        }
        rgb = row[`field${index}`];
        index++;
        acc = row[`field${index}`];
        index++;
           if(matchedincompany =="Berger"){
            matchedinberger.push({ name , rgb , acc });
          }
          else if(matchedincompany =="Asian"){
            matchedinasain.push({ name , rgb , acc });
          }
          else if(matchedincompany =="Nippon"){

            matchedinnippon.push({ name , rgb , acc });
          }
          else if(matchedincompany =="Dulux"){
            matchedindulux.push({ name , rgb , acc });
          }
      }
      }

  }
  if (json.hasOwnProperty(row.BRAND)) {
    addvalues(json,row,matchedinberger , matchedinasain , matchedinnippon , matchedindulux);
  } else {
    json[row.BRAND] = [];
    addvalues(json,row,matchedinberger , matchedinasain , matchedinnippon , matchedindulux);
  }
  }
  skip = true;
});

const finaljson = JSON.stringify(json , null, '\t');
fs.writeFileSync('finaldata.json', finaljson);