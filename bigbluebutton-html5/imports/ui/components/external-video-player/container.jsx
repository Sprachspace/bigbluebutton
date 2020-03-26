import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { getVideoUrl } from './service';
import ExternalVideo from './component';
import Service from '../actions-bar/service';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';

const POLLING_ENABLED = Meteor.settings.public.poll.enabled;
const ExternalVideoContainer = props => <ExternalVideo {...{ ...props }} />;

export default withTracker(({ isPresenter }) => {
  const inEchoTest = Session.get('inEchoTest');
  return {
    inEchoTest,
    isPresenter,
    videoUrl: getVideoUrl(),
    amIPresenter: Service.amIPresenter(),
    amIModerator: Service.amIModerator(),
    isPollingEnabled: POLLING_ENABLED,
    allowExternalVideo: Meteor.settings.public.externalVideoPlayer.enabled,
    handleTakePresenter: Service.takePresenterRole,
    stopExternalVideoShare: ExternalVideoService.stopWatching,
    isSharingVideo: Service.isSharingVideo(),
    isMeteorConnected: Meteor.status().connected,
  };
})(ExternalVideoContainer);
