import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import WhiteboardToolbarService from './service';
import WhiteboardToolbar from './component';
import Presentations from '/imports/api/presentations';
import Auth from '/imports/ui/services/auth';
import MediaService, {
  getSwapLayout,
  shouldEnableSwapLayout,
} from '../../media/service';
import Service from '../../actions-bar/service';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';

const POLLING_ENABLED = Meteor.settings.public.poll.enabled;
const WhiteboardToolbarContainer = props => <WhiteboardToolbar {...props} />;

export default withTracker((params) => {
  const { whiteboardId } = params;
  const data = {
    actions: {
      undoAnnotation: WhiteboardToolbarService.undoAnnotation,
      clearWhiteboard: WhiteboardToolbarService.clearWhiteboard,
      changeWhiteboardMode: WhiteboardToolbarService.changeWhiteboardMode,
      setInitialWhiteboardToolbarValues:
        WhiteboardToolbarService.setInitialWhiteboardToolbarValues,
      getCurrentDrawSettings: WhiteboardToolbarService.getCurrentDrawSettings,
      setFontSize: WhiteboardToolbarService.setFontSize,
      setTool: WhiteboardToolbarService.setTool,
      setThickness: WhiteboardToolbarService.setThickness,
      setColor: WhiteboardToolbarService.setColor,
      setTextShapeObject: WhiteboardToolbarService.setTextShapeObject,
    },
    textShapeActiveId: WhiteboardToolbarService.getTextShapeActiveId(),
    multiUser: WhiteboardToolbarService.getMultiUserStatus(whiteboardId),
    isPresenter: WhiteboardToolbarService.isPresenter(),
    amIPresenter: Service.amIPresenter(),
    amIModerator: Service.amIModerator(),
    isPollingEnabled: POLLING_ENABLED,
    allowExternalVideo: Meteor.settings.public.externalVideoPlayer.enabled,
    handleTakePresenter: Service.takePresenterRole,
    stopExternalVideoShare: ExternalVideoService.stopWatching,
    isSharingVideo: Service.isSharingVideo(),
    isMeteorConnected: Meteor.status().connected,
    annotations: WhiteboardToolbarService.filterAnnotationList(),
    isMeteorConnected: Meteor.status().connected,
    isLayoutSwapped: getSwapLayout() && shouldEnableSwapLayout(),
    toggleSwapLayout: MediaService.toggleSwapLayout,
    isThereCurrentPresentation: Presentations.findOne(
      { meetingId: Auth.meetingID, current: true },
      { fields: {} },
    ),
  };

  return data;
})(WhiteboardToolbarContainer);
