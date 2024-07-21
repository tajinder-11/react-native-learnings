import React, {ReactElement, useEffect, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import {
  ClientRoleType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  RtcSurfaceView,
  RtcTextureView,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSwitch,
} from '../component/ui';
import {enumToItems} from '../utils';
import * as log from '../utils/log';
import {BaseComponent} from '../component/BaseComponent';
import BaseRenderChannel from '../component/BaseRenderChannel';
import BaseRenderUsers from '../component/BaseRenderUsers';
import useInitRtcEngine from '../component/useInitRtcEngine';

export default function JoinChannelVideo() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } = useInitRtcEngine(enableVideo);
  const [_, setSwitchCamera] = useState(false);
  const [renderByTextureView, setRenderByTextureView] = useState(false);
  const [setupMode, setSetupMode] = useState(
    VideoViewSetupMode.VideoViewSetupReplace,
  );

  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }

    engine.current.joinChannel(token, channelId, uid, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const _switchCamera = () => {
    engine.current.switchCamera();
    setSwitchCamera(prev => !prev);
  };

  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  useEffect(() => {
    engine.current.addListener(
      'onVideoDeviceStateChanged',
      (deviceId: string, deviceType: number, deviceState: number) => {
        log.info(
          'onVideoDeviceStateChanged',
          'deviceId',
          deviceId,
          'deviceType',
          deviceType,
          'deviceState',
          deviceState,
        );
      },
    );

    engine.current.addListener(
      'onLocalVideoStateChanged',
      (
        source: VideoSourceType,
        state: LocalVideoStreamState,
        error: LocalVideoStreamReason,
      ) => {
        log.info(
          'onLocalVideoStateChanged',
          'source',
          source,
          'state',
          state,
          'error',
          error,
        );
      },
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine]);

  return (
    <BaseComponent
      name={'JoinChannelVideo'}
      renderConfiguration={renderConfiguration}
      renderChannel={() => (
        <BaseRenderChannel
          channelId={channelId}
          joinChannel={joinChannel}
          leaveChannel={leaveChannel}
          joinChannelSuccess={joinChannelSuccess}
          onChannelIdChange={setChannelId}
        />
      )}
      renderUsers={() => (
        <BaseRenderUsers
          enableVideo={enableVideo}
          renderVideo={renderVideo}
          startPreview={startPreview}
          joinChannelSuccess={joinChannelSuccess}
          remoteUsers={remoteUsers}
        />
      )}
      renderAction={renderAction}
    />
  );

  function renderVideo(user: VideoCanvas): ReactElement | undefined {
    return (
      <>
        {renderByTextureView ? (
          <RtcTextureView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            canvas={{...user, setupMode}}
          />
        ) : (
          <RtcSurfaceView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            zOrderMediaOverlay={user.uid !== 0}
            canvas={{...user, setupMode}}
          />
        )}
        <View style={{backgroundColor: 'white', height: 40, width: '100%'}}>
          <Text style={{textAlign: 'center', color: 'black'}}>Scores</Text>
          <Text style={{textAlign: 'center', color: 'black'}}>
            Real Madrid 0 - 0 FC Barcelona
          </Text>
        </View>
      </>
    );
  }

  function renderConfiguration(): ReactElement | undefined {
    return (
      <>
        <AgoraSwitch
          disabled={
            (!startPreview && !joinChannelSuccess) || Platform.OS !== 'android'
          }
          title={`renderByTextureView`}
          value={renderByTextureView}
          onValueChange={value => {
            setRenderByTextureView(value);
          }}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'setupMode'}
          items={enumToItems(VideoViewSetupMode)}
          value={setupMode}
          onValueChange={value => {
            setSetupMode(value);
          }}
        />
        {setupMode === VideoViewSetupMode.VideoViewSetupAdd ? (
          <>
            <AgoraDivider />
            {renderByTextureView ? (
              <RtcTextureView
                style={AgoraStyle.videoSmall}
                canvas={{uid: 0, setupMode}}
              />
            ) : (
              <RtcSurfaceView
                style={AgoraStyle.videoSmall}
                canvas={{uid: 0, setupMode}}
              />
            )}
          </>
        ) : undefined}
        <AgoraDivider />
      </>
    );
  }

  function renderAction(): ReactElement | undefined {
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={_switchCamera}
        />
      </>
    );
  }
}
