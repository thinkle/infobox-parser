import small from './small';
import flag from './flag';
import coords from './coords';
import instances from './instances';
import unbulletedLists from './unbulletedLists';
import unmarkedLists from './unmarkedLists';
import plainLists from './plainLists';
import marriages from './marriages';
import nbay from './nbay';
import other from './other';
import hlist from './hlist';
import birthDates from './birthDates';
import filmDates from './filmDates';
import labeledDates from './labeledDates';
import deathDates from './deathDates';
import url from './url';
import website from './website';
import convert from './convert';
import createDataTypeHandler from './dataType';

const dataTypes = [
  // Order is very important here...
  instances,
  small,
  flag,
  coords,
  marriages,
  birthDates,
  filmDates,
  labeledDates,
  deathDates,
  unbulletedLists,
  website,
  hlist,
  url,
  convert,
  nbay,
  // other needs to always be after specific data dypes
  other,
  // Lists should be last
  plainLists,
  unmarkedLists,
];

export default dataTypes.map((type) => {
  return {
    handler: createDataTypeHandler(type),
    name: type.name,
    pattern: new RegExp(`\\$${type.variable}_(\\d+)`),
  };
});
