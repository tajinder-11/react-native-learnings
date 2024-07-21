import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  RtcSurfaceView,
} from 'react-native-agora';

const LiveStreaming = () => {
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [isHost, setIsHost] = useState(true);
  const [message, setMessage] = useState('');

  function makeid(length: number) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  let options = {
    appId: '7c90601208a846acbf2ebd8fbe445cc4',
    channel: 'test',
    token:
      '007eJxTYGhcMHPh4pVP1QLche14e098sHVeUCRftnhjXvcyrn9rdmgoMJgnWxqYGRgaGVgkWpiYJSYnpRmlJqVYpCWlmpiYJiebzN7YlNYQyMhwbMdBZkYGCATxWRhKUotLGBgAbLog2Q==',
    uid: makeid(5),
  };

  useEffect(() => {
    setupVideoSDKEngine();
  });

  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel: ' + options.channel);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user ' + Uid + ' has joined');
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user ' + Uid + ' has left the channel');
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: options.appId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    setIsJoined(true);
    if (!isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      if (isHost) {
        agoraEngineRef.current?.enableAudio();
        agoraEngineRef.current?.enableVideo();
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannelWithUserAccount(
          options.token,
          options.channel,
          options.uid,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          },
        );
      } else {
        agoraEngineRef.current?.enableAudio();
        agoraEngineRef.current?.enableVideo();
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannelWithUserAccount(
          options.token,
          options.channel,
          options.uid,
          {
            clientRoleType: ClientRoleType.ClientRoleAudience,
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('Left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>Agora Video SDK Quickstart</Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join channel
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave channel
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Text>Audience</Text>
        <Switch
          onValueChange={switchValue => {
            setIsHost(switchValue);
            if (isJoined) {
              leave();
            }
          }}
          value={isHost}
        />
        <Text>Host</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        <Text>Local user uid: {options.uid}</Text>
        <Text style={styles.info}>{message}</Text>
        {isJoined && isHost && (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
          </React.Fragment>
        )}
        {isJoined && !isHost && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>
            {isJoined && !isHost ? 'Waiting for remote users to join' : ''}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  function showMessage(msg: string) {
    setMessage(msg);
  }
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 600},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});

export default LiveStreaming;
