

export default class WikiService {
 url = "https://ru.wikipedia.org/w/api.php";
 params = {
    action: 'query',
    list: 'search',
    format: 'json'
  };
 wikiSearchReturnValues = [];
 
 async getWiki(place) {

   let url = `${this.url}?origin=*&srsearch=${place}`;
    Object.keys(this.params).forEach((key) => {
      url += "&" + key + "=" + this.params[key];
    });
    await fetch(url).then(res => res.json()).then((response) => {
        for (let key in response.query.search) {
            this.wikiSearchReturnValues.push({
            queryResultPageFullURL: 'sss',
            queryResultPageID: response.query.search[key].pageid,
            queryResultPageTitle: response.query.search[key].title,
            queryResultPageSnippet: response.query.search[key].snippet
            });
        }
    }).then(async () => {
        for (let page of this.wikiSearchReturnValues) {
        // let page = this.wikiSearchReturnValues[key2];
        let pageID = page.queryResultPageID;
        let urlForRetrievingPageURLByPageID = `https://ru.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;   
        await fetch(urlForRetrievingPageURLByPageID).then(res => res.json()).then(res => page.queryResultPageFullURL = res.query.pages[pageID].fullurl); 
    }})
    return this.wikiSearchReturnValues
 }
}