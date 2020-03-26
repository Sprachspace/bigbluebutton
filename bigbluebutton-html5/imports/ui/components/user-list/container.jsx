import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import getFromUserSettings from '/imports/ui/services/users-settings';
import { Meteor } from 'meteor/meteor';
import Service from './service';
import UserList from './component';
import VideoService from '../video-provider/service';
import Presentations from '/imports/api/presentations';
import Auth from '/imports/ui/services/auth';

import MediaService, {
  getSwapLayout,
  shouldEnableSwapLayout,
} from '../media/service';

const propTypes = {
  activeChats: PropTypes.arrayOf(String).isRequired,
  isPublicChat: PropTypes.func.isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
};

const UserListContainer = props => <UserList {...props} />;

UserListContainer.propTypes = propTypes;

export default withTracker(({ chatID, compact }) => ({
  hasBreakoutRoom: Service.hasBreakoutRoom(),
  activeChats: Service.getActiveChats(chatID),
  isPublicChat: Service.isPublicChat,
  setEmojiStatus: Service.setEmojiStatus,
  roving: Service.roving,
  CustomLogoUrl: Service.getCustomLogoUrl(),
  compact,
  getGroupChatPrivate: Service.getGroupChatPrivate,
  handleEmojiChange: Service.setEmojiStatus,
  handleExitVideo: () => VideoService.exitVideo(),
  handleJoinVideo: () => VideoService.joinVideo(),
  enableVideo: getFromUserSettings(
    'bbb_enable_video',
    Meteor.settings.public.kurento.enableVideo,
  ),
  isLayoutSwapped: getSwapLayout() && shouldEnableSwapLayout(),
  toggleSwapLayout: MediaService.toggleSwapLayout,
  isThereCurrentPresentation: Presentations.findOne(
    { meetingId: Auth.meetingID, current: true },
    { fields: {} },
  ),
  getEmojiList: Service.getEmojiList(),
  getEmoji: Service.getEmoji(),
  showBranding: getFromUserSettings(
    'bbb_display_branding_area',
    Meteor.settings.public.app.branding.displayBrandingArea,
  ),
  hasPrivateChatBetweenUsers: Service.hasPrivateChatBetweenUsers,
  toggleUserLock: Service.toggleUserLock,
  requestUserInformation: Service.requestUserInformation,
}))(UserListContainer);
