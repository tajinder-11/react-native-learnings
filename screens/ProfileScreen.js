import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useRef, useState} from 'react';
import Button from '../component/ui/Button';
import FlatButton from '../component/ui/FlatButton';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import CustomHeader from '../component/customHeader/CustomHeader';
import {Colors} from '../constants/Colors';

function ProfileScreen({navigation}) {
  const [profilePhoto, setProfilePhoto] = useState();
  const actionSheetRef = useRef();

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function takePhotoFromCamera() {
    requestCameraPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Camera Image', image.path);
      setProfilePhoto(image.path);
    });
  }

  function choosePhotoFromGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('Gallery Image', image.path);
        setProfilePhoto(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function showActionSheet() {
    actionSheetRef.current?.show();
  }
  function cancelHandler() {
    return actionSheetRef.current?.hide();
  }

  const flashMessageHandler = () => {
    showMessage({
      message: 'Message Sent',
      type: 'info',
    });
  };

  return (
    <View style={styles.parentViewPersonalInfo}>
      <CustomHeader
        title="Profile"
        navigation={navigation}
        showLeftIcon={true}
        showTitle={true}
        showRightIcon={true}
      />
      <View style={styles.box1}>
        <View style={styles.imageView}>
          <Pressable onPress={showActionSheet}>
            <Image
              style={styles.image}
              source={
                profilePhoto
                  ? {uri: profilePhoto}
                  : require('../assets/blackProfile.png')
              }
            />
          </Pressable>
          <Text style={styles.text}>Catherine Massey</Text>
          <Text>UI/UX Designer | Daily UI</Text>

          <View style={styles.pressableView}>
            <Pressable style={styles.pressable1}>
              <Image
                style={styles.image2}
                source={require('../assets/Whatsapp.png')}
              />
            </Pressable>
            <Pressable style={styles.pressable2}>
              <Image
                style={styles.image2}
                source={require('../assets/Facebook.png')}
              />
            </Pressable>
            <Pressable style={styles.pressable3}>
              <Image
                style={styles.image2}
                source={require('../assets/Instagram.jpeg')}
              />
            </Pressable>
            <Pressable style={styles.pressable4}>
              <Image
                style={styles.image2}
                source={require('../assets/LinkedIn.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.box2}>
        <View style={styles.ParentViewFollowersInfo}>
          <View style={styles.postsView}>
            <Text style={styles.PostFollowersNoText}>80</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.postsView}>
            <Text style={styles.PostFollowersNoText}>110</Text>
            <Text>Following</Text>
          </View>
          <View style={styles.postsView}>
            <Text style={styles.PostFollowersNoText}>152</Text>
            <Text>Followers</Text>
          </View>
        </View>

        <View style={styles.buttonView}>
          <View style={styles.buttons}>
            <FlatButton onPress={flashMessageHandler}>Message</FlatButton>
          </View>
          <View style={styles.buttons}>
            <Button>Follow</Button>
          </View>
        </View>
      </View>

      <View style={styles.box3}>
        <View style={styles.imagesFirstView}>
          <Image
            style={[styles.post1, styles.images]}
            source={require('../assets/posts/ball.jpeg')}
          />
          <Image
            style={[styles.post1, styles.images]}
            source={require('../assets/posts/beach.jpeg')}
          />
          <Image
            style={[styles.post1, styles.images]}
            source={require('../assets/posts/butterflies.jpeg')}
          />
          <Image
            style={[styles.post1, styles.images]}
            source={require('../assets/posts/lake.jpeg')}
          />
          <Image
            style={[styles.post1, styles.images]}
            source={require('../assets/posts/mountains.jpeg')}
          />
          <Image
            style={[styles.post1, styles.images]}
            source={require('../assets/posts/tree.jpeg')}
          />
        </View>
      </View>
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetTextView}>
          <Text style={styles.actionSheetText}>Upload a Photo</Text>
          <Text>Choose Your Profile Photo</Text>
        </View>

        <View style={styles.actionSheetbuttonContainer}>
          <Button onPress={takePhotoFromCamera}>Take Photo From Camera</Button>
        </View>

        <View style={styles.actionSheetbuttonContainer}>
          <Button onPress={choosePhotoFromGallery}>
            Take Photo From Gallery
          </Button>
        </View>

        <View style={styles.actionSheetbuttonContainer}>
          <Button onPress={cancelHandler}>Cancel</Button>
        </View>
      </ActionSheet>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  parentViewPersonalInfo: {
    flex: 1,
  },
  ParentViewFollowersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
  },
  box1: {
    flex: 2.5,
    backgroundColor: Colors.white1,
  },
  box2: {
    flex: 1,
    backgroundColor: Colors.white1,
  },
  box3: {
    flex: 2,
    backgroundColor: Colors.white1,
  },
  imageView: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  text: {
    marginTop: 12,
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    color: Colors.primary40,
  },
  pressableView: {
    flexDirection: 'row',
    marginTop: 16,
  },
  pressable1: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary10,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable2: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary20,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable3: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary30,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable4: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary20,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    height: 30,
    width: 30,
    borderRadius: 8,
  },
  PostFollowersNoText: {
    fontSize: 24,
    color: Colors.primary40,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  buttons: {
    height: 100,
    width: 170,
  },
  button1: {
    backgroundColor: 'transparent',
  },
  imagesFirstView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  images: {
    width: '33.3',
    height: '46.9%',
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: 'white',
    color: 'blue',
  },
  postsView: {
    alignItems: 'center',
  },
  actionSheetText: {
    fontSize: 36,
    color: Colors.primary40,
  },
  actionSheetTextView: {
    alignItems: 'center',
    margin: 12,
  },
  actionSheetbuttonContainer: {
    margin: 12,
  },
});
