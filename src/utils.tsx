import { PermissionsAndroid, Platform } from "react-native";
import { DRMType } from "react-native-video";

const m3u8_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/a1fb4b1b-ca13-430e-85a6-f02e5da25546/fish_-_16166_(540p).ism/manifest(format=m3u8-cmaf,encryption=cbcs-aapl)';
const mpd_url: string =
  // 'https://vodemedia-usea.streaming.media.azure.net/c4312929-fafb-4317-b529-9c5708d6bc88/Teddy.ism/manifest(format=mpd-time-csf,encryption=cenc)';
  'https://vodemedia-usea.streaming.media.azure.net/dd5d9689-b7d9-4efe-9d7f-4f53162ad1b3/Charisma_1.ism/manifest(format=mpd-time-csf,encryption=cenc)';
const assetID = '1bfbe38a-7657-44fb-acd2-2c28a37c6116';
const getLicenseUrl = () =>
  `https://fps.ezdrm.com/api/licenses/auth?pX=C56D7C&assetID=${assetID}`;
const fairplayCertificateUrl =
  'https://localvodsaudi-118668-ruby.b118668.dev.eastus.az.svc.builder.cafe/bx_block_content_management/contents_deeplink/get_fairplay.cer';



const response = {
  "data": {
    "id": "534", "type": "content", "attributes": {
      "id": 534, "title": "Charisma 1 Bad Boys",
      "description": "Bad Boys is a series of American buddy cop action comedy films created by George Gallo. It stars Will Smith and Martin Lawrence as two detectives in the Miami Police Department, Mike Lowrey and Marcus Burnett. Joe Pantoliano and Theresa Randle also appear in all three films.", "image": "https://minio.b118668.dev.eastus.az.svc.builder.cafe/sbucket/5fvxwruz71wnk446npe72qw5s5cd?response-content-disposition=inline%3B%20filename%3D%22Charisma%20_bad%20Boys.jfif%22%3B%20filename%2A%3DUTF-8%27%27Charisma%2520_bad%2520Boys.jfif&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20231221%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20231221T052057Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=222059def478183aaec0fc39d250a0d7256b72bb87c05033e7dcd4ad1185b62e", "title_image": null, "rating": 4, "feature_article": null, "feature_video": null, "status": "Active", "searchable_text": null, "publish_date": "2023-07-24T00:00:00.000Z", "view_count": 1071, "created_at": "2023-07-25T10:13:37.034Z", "updated_at": "2023-12-20T08:36:07.612Z", "asset_id": "sl_as_06033df612f3d8003c5e435a48130769", "director": "Michael Bay", "producer": "", "duration": "00:05:10", "category": { "id": "7", "type": "category", "attributes": { "id": 7, "name": "Movies", "image": "https://minio.b118668.dev.eastus.az.svc.builder.cafe/sbucket/t9hppucqmj6o3mt25ffgrbk75dqt?response-content-disposition=inline%3B%20filename%3D%22MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ%2540%2540._V1_FMjpg_UX1000_.jpg%22%3B%20filename%2A%3DUTF-8%27%27MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ%2540%2540._V1_FMjpg_UX1000_.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20231221%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20231221T052057Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=d1e959fb72e6bbe792fb3aa67900047ddb9e2651f0a8f7c5ee7dbb56bb995d24" } }, "sub_category": { "id": "54", "type": "sub_category", "attributes": { "id": 54, "name": "Action", "created_at": "2023-02-15T11:53:56.093Z", "updated_at": "2023-02-15T11:53:56.093Z", "image": null } }, "content_type": "Movie", "release_date": "2023-05-10", "age_category": null, "is_published": false, "authors": [], "player_count": 0, "screen_count": "3", "image_url": "https://localvodsaudi-118668-ruby.b118668.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0ZjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f45c20dcd1dc06487fdb340666a9c589ec404a91/Charisma%20_bad%20Boys.jfif", "audio_url": null, "content_plan": { "data": { "id": "5", "type": "content_plan", "attributes": { "id": 5, "name": "Basic", "platform": "Mobile", "resolution": "480p Resolution", "download": false } } }, "casts": [{ "data": { "id": "97", "type": "contents_cast", "attributes": { "id": 97, "name": "Will Smith ", "image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBWIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6477c37ef2aa765b8beab55fa3c5cbfed6d80a18/Will%20Smith%20as%20Detective.jfif" } } }], "genres": [{ "data": { "id": "2", "type": "genre", "attributes": { "id": 2, "name": "Action", "image": "https://minio.b118668.dev.eastus.az.svc.builder.cafe/sbucket/thn2tns5lgckjcc2xh85t5f1a6dt?response-content-disposition=attachment%3B%20filename%3D%22must-watch%20action%20movies.webp%22%3B%20filename%2A%3DUTF-8%27%27must-watch%2520action%2520movies.webp&response-content-type=image%2Fwebp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20231221%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20231221T052057Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ac7badf6a4ee61329af84e2d2bd29dc83dabf7bd74a1d5e6c06450ca93a60c8c", "image_url": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcGtEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4353668581b7fc28321111636b0b92fdd3b5c8e0/must-watch%20action%20movies.webp" } } }], "watch_history": { "id": 6107, "asset_id": "sl_as_06033df612f3d8003c5e435a48130769", "profile_id": 2452, "accout_id": null, "image_url": "https://localvodsaudi-118668-ruby.b118668.dev.eastus.az.svc.builder.cafe/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0pjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--99c083998a0109053daa999fdd9bfc9b7fd672d5/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VY21WemFYcGxYM1J2WDJ4cGJXbDBXd2RwQXBBQmFRSWNBZz09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--939789d9f006e1ff581b196f15ea7da19354e094/Charisma%20_bad%20Boys.jfif", "duration": "0", "title": "Charisma 1 Bad Boys", "content_type": "Movie", "watching_duration": "0", "is_completed": false, "created_at": "2023-10-16T18:26:02.225Z", "updated_at": "2023-12-21T05:17:47.155Z", "arabic_title": "كاريزما 1 باد بويز", "arabic_content_type": null, "arabic_duration": "0", "description": "Bad Boys is a series of American buddy cop action comedy films created by George Gallo. It stars Will Smith and Martin Lawrence as two detectives in the Miami Police Department, Mike Lowrey and Marcus Burnett. Joe Pantoliano and Theresa Randle also appear in all three films.", "description_in_arabic": "\r\nباد بويز هي سلسلة من أفلام الأكشن الكوميدية الأمريكية التي أنتجها جورج جالوز من النجوم ويل سميث ومارتن لورانس كمحققين في قسم شرطة ميامي ، مايك لوري وماركوس بورنيتز يظهر جو بانتوليانو وتيريزا راندل أيضًا في الأفلام الثلاثة\r\n", "content_id": 534, "web_series_id": null, "age_restrictions": "Universal", "sub_category_id": 54, "release_id": null }, "parts": [], "deep_link": "https://localvodsaudi-118668-ruby.b118668.dev.eastus.az.svc.builder.cafe/bx_block_content_management/contents_deeplink/dl?content_id=534", "fav_status": { "message": "Like not present" }, "age_restrictions": {
        "id": 415, "age_restrictions": "Universal", "content_id": 534, "created_at": "2023-07-25T10:13:37.037Z", "updated_at": "2023-07-25T10:13:37.037Z",
        "image": null,
        "title": null
      },
      "automate_publish": null
    }
  }, "meta": { "like": false, "subscription": true }
}


  const getWritePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED || granted === true;
    return isGranted === PermissionsAndroid.RESULTS.GRANTED
  }


  const drm =
  Platform.OS == 'android'
    ? {
        type: DRMType.WIDEVINE,
        licenseServer:
          'https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=F283BA',
      }
    : {
        type: DRMType.FAIRPLAY,
        certificateUrl: fairplayCertificateUrl,
        getLicense: async spcString => {
          try {
            const blob = Buffer.from(spcString, 'base64');
            const licenseResponse = await fetch(getLicenseUrl(), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/octet-stream',
              },
              body: blob,
            });
            const licenseBlob = await licenseResponse.blob();
            const license = await new Promise((resolve, reject) => {
              const reader = new FileReader(); // use file reader to avoid external dependencies
              reader.onload = () => {
                const dataURL = reader.result;
                resolve(
                  dataURL.replace(
                    'data:application/octet-stream;base64,',
                    '',
                  ),
                );
              };
              reader.onerror = err => {
                console.error('could not turn license data into blob', err);
                reject(err);
              };
              console.log(licenseBlob);
              reader.readAsDataURL(licenseBlob);
            });
            if (license) {
              console.log(license);
              return license;
            }
            return '';
          } catch (e) {
            console.log('error ', e);
            return '';
          }
        },
      };




  export {m3u8_url, mpd_url, assetID,drm, getLicenseUrl, fairplayCertificateUrl, getWritePermission, response};
