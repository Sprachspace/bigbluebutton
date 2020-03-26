import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import { styles } from './styles.scss';
import CustomLogo from './custom-logo/component';
import UserContentContainer from './user-list-content/container';
import JoinVideoOptionsContainer from '../video-provider/video-button/container';
import AudioControlsContainer from '../audio/audio-controls/container';
import PresentationOptionsContainer from '../actions-bar/presentation-options/component';
import VideoProviderContainer from '/imports/ui/components/video-provider/container';

const propTypes = {
  activeChats: PropTypes.arrayOf(String).isRequired,
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  CustomLogoUrl: PropTypes.string.isRequired,
  isPublicChat: PropTypes.func.isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  showBranding: PropTypes.bool.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
  swapLayout: false,
  disableVideo: false,
  audioModalIsOpen: false,
};

class UserList extends PureComponent {
  render() {
    const {
      intl,
      activeChats,
      compact,
      setEmojiStatus,
      isPublicChat,
      isLayoutSwapped,
      enableVideo,
      handleExitVideo,
      handleJoinVideo,
      isThereCurrentPresentation,
      toggleSwapLayout,
      roving,
      swapLayout,
      disableVideo,
      audioModalIsOpen,
      CustomLogoUrl,
      showBranding,
      hasBreakoutRoom,
      requestUserInformation,
    } = this.props;

    return (
      <div className={styles.userList}>
        {showBranding && !compact && CustomLogoUrl ? (
          <CustomLogo CustomLogoUrl={CustomLogoUrl} />
        ) : null}
        {
          <UserContentContainer
            {...{
              intl,
              activeChats,
              compact,
              setEmojiStatus,
              isPublicChat,
              roving,
              hasBreakoutRoom,
              requestUserInformation,
            }}
          />
        }
        {!disableVideo && !audioModalIsOpen ? (
          <VideoProviderContainer swapLayout={swapLayout} />
        ) : null}
        <div className={styles.audVid}>
          {isLayoutSwapped ? (
            <PresentationOptionsContainer
              toggleSwapLayout={toggleSwapLayout}
              isThereCurrentPresentation={isThereCurrentPresentation}
            />
          ) : null}
          <AudioControlsContainer />
          {enableVideo ? (
            <JoinVideoOptionsContainer
              handleJoinVideo={handleJoinVideo}
              handleCloseVideo={handleExitVideo}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

UserList.propTypes = propTypes;
UserList.defaultProps = defaultProps;

export default injectWbResizeEvent(injectIntl(UserList));
