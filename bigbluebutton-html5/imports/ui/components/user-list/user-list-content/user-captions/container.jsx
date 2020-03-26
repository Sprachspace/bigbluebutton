import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserCaptionsItem from './component';
import CaptionsService from '/imports/ui/components/captions/service';
import UserListService from '/imports/ui/components/user-list/service';
import { meetingIsBreakout } from '/imports/ui/components/app/service';
import Service from '../../service';
import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';

const UserCaptionsItemContainer = props => <UserCaptionsItem {...props} />;

export default withTracker(() => ({
  ownedLocales: CaptionsService.getOwnedLocales(),
  setEmojiStatus: Service.setEmojiStatus,
  users: UserListService.getUsers(),
  meetingIsBreakout: meetingIsBreakout(),
  currentUser: Users.findOne(
    { userId: Auth.userID },
    {
      fields: {
        userId: 1,
        role: 1,
        locked: 1,
        presenter: 1,
      },
    },
  ),
}))(UserCaptionsItemContainer);
