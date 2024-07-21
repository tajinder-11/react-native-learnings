import {PermissionsAndroid, Platform} from 'react-native';

export type mediaType =
  | 'android.permission.RECORD_AUDIO'
  | 'android.permission.CAMERA';
export interface AskMediaAccessReturn {
  result: boolean;
  mediaType: mediaType;
}

export const askMediaAccess = async (
  mediaTypes: mediaType[],
): Promise<AskMediaAccessReturn[]> => {
  let results: AskMediaAccessReturn[] = [];
  if (Platform.OS === 'android') {
    for (const mediaType of mediaTypes) {
      let result: boolean = false;
      await PermissionsAndroid.request(mediaType)
        .then(res => {
          result = res === 'granted';
        })
        .catch(error => {
          result = error;
        })
        .finally(() => {
          results.push({
            mediaType,
            result,
          });
        });
    }
  }
  return results;
};
