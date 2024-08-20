import { getCheerioObject } from './utils'
import $ from 'cheerio'
import { jsonrepair } from 'jsonrepair'

export default function (html, config = {}) {
  const $html = getCheerioObject(html)
  let jsonldData = {}

  $html('script[type="application/ld+json"]').each((index, item) => {
    try {
      let rawJson = $(item).text();
      let repairedJson = rawJson;

      try{
        repairedJson = jsonrepair(rawJson);        
      } 
      catch(error) {  // Include an error variable
        console.log("jsonld parser error: " + error.messsage);
      }   

      let parsedJSON = JSON.parse(repairedJson);
      if (!Array.isArray(parsedJSON)) {
        parsedJSON = [parsedJSON]
      }
      parsedJSON.forEach(obj => {
        const type = obj['@type']
        jsonldData[type] = jsonldData[type] || []
        jsonldData[type].push(obj)
      })
    } catch (e) {
      console.log(`Error in jsonld parse - ${e}`)
    }
  })

  return jsonldData
}
