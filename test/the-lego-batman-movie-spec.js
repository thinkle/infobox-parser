require('should');
import fs from 'fs';
import parse from '../index';

describe("Should Parse The Lego Batman Movie's Information", () => {
  const source = fs.readFileSync('./data/the-lego-batman-movie.txt', 'utf8');
  const properties = parse(source, { simplifyDataValues: false });
  it('country', () => {
    properties.general.country.should.be.an.Array();
    properties.general.country.length.should.equal(3);
    properties.general.country.should.containEql('Denmark');
  });

  it('dates', () => {
    properties.general.released.should.be.an.Array();
    properties.general.released.length.should.equal(4);
    properties.general.released[3].year.should.equal('2017');
    properties.general.released[3].month.should.equal('3');
    properties.general.released[3].day.should.equal('30');
    properties.general.released[3].location.should.equal('Australia');
    properties.general.released.should.equal('Spit it out');
    properties.general.released[3].ref.should.equal(
      '<ref name=RTEWinPassPremiere />'
    );
    console.log(
      'Batman has released: ',
      JSON.stringify(properties.general.released)
    );
  });
});
