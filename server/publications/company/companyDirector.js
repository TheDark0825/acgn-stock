import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { dbDirectors } from '/db/dbDirectors';
import { limitSubscription } from '/server/imports/rateLimit';
import { publishTotalCount } from '/server/imports/publishTotalCount';
import { debug } from '/server/imports/debug';

Meteor.publish('companyDirector', function(companyId, offset) {
  debug.log('publish companyDirector', {companyId, offset});
  check(companyId, String);
  check(offset, Match.Integer);

  const filter = { companyId };

  const totalCountObserver = publishTotalCount('totalCountOfCompanyDirector', dbDirectors.find(filter), this);

  // TODO 移進 publishTotalCount 以簡化程式
  this.onStop(() => {
    totalCountObserver.stop();
  });

  const directorsCursor = dbDirectors.find(filter, {
    sort: { stocks: -1 },
    skip: offset,
    limit: 10,
    disableOplog: true
  });

  // TODO 需要反應分頁中 directors 的變動？
  const usersCursor = Meteor.users.find({
    _id: {
      $in: directorsCursor.map(({ userId }) => {
        return userId;
      })
    }
  }, {
    fields: { 'profile.isInVacation': 1 },
    disableOplog: true
  });

  return [directorsCursor, usersCursor];
});
//一分鐘最多20次
limitSubscription('companyDirector');