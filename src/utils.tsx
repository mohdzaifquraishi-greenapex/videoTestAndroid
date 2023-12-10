import { PermissionsAndroid, Platform } from "react-native";
import { DRMType } from "react-native-video";

const m3u8_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/a1fb4b1b-ca13-430e-85a6-f02e5da25546/fish_-_16166_(540p).ism/manifest(format=m3u8-cmaf,encryption=cbcs-aapl)';
  const mpd_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/dd5d9689-b7d9-4efe-9d7f-4f53162ad1b3/Charisma_1.ism/manifest(format=mpd-time-csf,encryption=cenc)';
const assetID = '1bfbe38a-7657-44fb-acd2-2c28a37c6116';
const getLicenseUrl = () =>
  `https://fps.ezdrm.com/api/licenses/auth?pX=C56D7C&assetID=${assetID}`;
const fairplayCertificateUrl =
  'https://localvodsaudi-118668-ruby.b118668.dev.eastus.az.svc.builder.cafe/bx_block_content_management/contents_deeplink/get_fairplay.cer';


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




  export {m3u8_url, mpd_url, assetID,drm, getLicenseUrl, fairplayCertificateUrl, getWritePermission};
