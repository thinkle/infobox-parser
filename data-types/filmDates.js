const filmDateGlobalPattern = /\{\{film\sdate([^\}\}]+)\}\}/gi;
//const filmDatePattern = /(\d+)\|(\d+)\|(\d+)\|?([^|\}]*)\|?(\d+)\|(\d+)\|(\d+)\|?([^|\}]*)/;
const filmDatePattern = /(\d\d\d\d)\|?(\d\d?)\|?(\d\d?)\|?([^\d\|\}]*)(\|ref1=(.*))?[\}\|]/;

// Format documented here:
// https://en.wikipedia.org/wiki/Template:Film_date/doc
// Target:
// Year required, month day etc. optional...
// {{Film date|year1|month1|day1|location1|ref1=<ref name="xxxxx" />|year2|month2|day2|location2|ref2=<ref name="yyyy" />}}

export default {
  globalPattern: filmDateGlobalPattern,
  parsePattern: filmDatePattern,
  parse: (results) => {
    const [fullMatch, year, month, day, location, refGroup, ref] = results;
    const date = new Date(year, month && month - 1, day);
    let releaseLocations = [
      { date, location, ref, year, month, day, fullMatch, refGroup },
    ];
    let keepSearching = true;
    while (keepSearching) {
      let restOfString = results.input.substr(results.index + fullMatch.length);
      results = restOfString.match(filmDatePattern);
      if (results) {
        const [fullMatch, year, month, day, location, refGroup, ref] = results;
        const date = new Date(year, month && month - 1, day);
        releaseLocations.push({
          date,
          location,
          ref,
          year,
          month,
          day,
          fullMatch,
          refGroup,
        });
      } else {
        keepSearching = false;
      }
    }
    console.log('Parsed releaseLocations: ', JSON.stringify(releaseLocations));
    return releaseLocations;
  },
  variable: 'FILM_DATES',
  name: 'filmDates',
};
