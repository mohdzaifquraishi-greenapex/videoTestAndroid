import { PermissionsAndroid, Platform } from "react-native";
var Buffer = require('buffer/').Buffer;

import { DRMType } from "react-native-video";

const m3u8_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/65e5f8e9-88ba-4264-8784-be80c8cb00b5/The_Bad_Guys_2022.ism/manifest(format=m3u8-cmaf,encryption=cbcs-aapl)';
const mpd_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/c4312929-fafb-4317-b529-9c5708d6bc88/Teddy.ism/manifest(format=mpd-time-csf,encryption=cenc)';
  // 'https://vodemedia-usea.streaming.media.azure.net/dd5d9689-b7d9-4efe-9d7f-4f53162ad1b3/Charisma_1.ism/manifest(format=mpd-time-csf,encryption=cenc)';
const assetID = '0377f837-a760-4917-a3c3-f6bab06ed5f7';
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NTk5MiwiZXhwIjoxNzAyODI0OTgyLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.Tw7bUfb8cVFjEI3XKXqxtMkKip28PvivTuL6gdxc2QjaXPJThgjcplzI2xOFexSVjsP3Smz_rMGjJprLEbsXPQ';
const getLicenseUrl = () => // 'https://5ded-20-204-187-16.ngrok.io/bx_block_content_management/contents/ezdrm_auth_callback';
  `https://fps.ezdrm.com/api/licenses/auth?pX=C56D7C&assetID=${assetID}`;
const fairplayCertificateUrl =
  'https://localvodsaudi-118668-ruby.b118668.dev.eastus.az.svc.builder.cafe/bx_block_content_management/contents_deeplink/get_fairplay.cer';
  const asset_id = 'sl_as_06033df612f3d8003c5e435a48130769';

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
        certificateUrl: `http://192.168.0.102:8080/${asset_id}/get_fairplay.cer`,
        getLicense: async spcString => {
          try {
            // return 'AAAAAQAAAADRc8RXTyLTy4AvZ2mjC5DPAAAFAOL0+7Sjhp186a4RIE3WHljJ/oiB1zQRwVUN5pDxfOOOMtyCaMhucpZaVeH5QyhJ7LrqY9HdVySa0WmUn9DFgVdbCHl54s21DUChSN0RfMArAyCrqsTBz3DFdzhdThrFkd995RKmFDmunLS5TdYUlI32DK+UE3Ro2X01x4uUUebT6mU9alGvod9h5BErwzYGUF8xKPh5LxL622TiQX595M+HKXGIK0SJUwMw4CNYdOOvMWK04uFmophP2hgwkwW/sJrI2VnyAWWpCGgZjTHjtIpfqiKlg/cYJue6Ttk+PfwFxAUTGABdDRtalXmH+BGwE+oHJI2m4jQ0iakaOpEMi7Q5b4AwtqJA3mT1tVs+QXzQjstHIXlKtXyNDOLrQ6WPLl7EffhK1gVsglRJ1nsSOF0CM08ZG2FUuXWo/nEF41TBsAvz5XlEKm9KFc6R2hiEprcgoKWOV973mkW9GxMEWq3N0zhr8B4fkwlxGH3lyi0GhnlclmjhWaOHbsSQPTfMn8ziyYE9J+OgEBbmH0XBdta7uMEyXjjAkzbIj+RBAFqxFKBkdObAppH2SWAb8B7uRigYNL6XoJiwH2GDLQtGzqvct5O/zNKy3RSEIAs7LYfXcgQiF8riifTjGtd+fdgLDQ1VTYi4JZ6fWJUZgxWtWssq5QLFy/oxPxDmHwn0GaSyMLgKmCqOo8cZbRJMAjEu+83fB5cpgQNNIbjrBmz7GJa/bL0Ghc/59H5uqPGGXSOobdjhUvdy1Vvul8FnuJeFrdTejnA7Zzr86yHn3DJZBJVA6PTO3WJs0Sq80Ku/A2FS0mLDI+Db4zMKKYhIYrDaJ+v8apZD6oW/MRW8x2SGc16YxzH6ri1M0wrEBTuI/gain0hW0b+lpJUhw6ag6bLJ1r/K0fdjCDEntafFTiTYijttTUlNAS73KKGP7EMyAjMCE1bVLK5mI0Gi/1W1S+MgUJtrKwZdHGRPdY6nZhhigE31lW89lGHOoEB8O4ZV+oAVkWZorR7yPAqRhvprxMBvcLapHvhb2srzyQovR7lsFPob9m3a7nyB8jLMJrIWnEZYlsljdQwWMsBawTZ0pS1DICfsY7XrR2Rzr8QtmpSVTpLbhUchj44BETyv0vpbgIcsfIVq77au47KaSzTjYDkswZ8wjCYzOYaIKxeP7fKMbW7YbQE9VF3okPTvsOSuAA5XmelqLPEm32/BU8qfyf75un9sO7Ie/v0POk1aGdXWfvBrUyEKc0yTk3EK0aDx42XnceQtIk6+VtyMftA9NMMkdf8m59U0b1IHQR755Ysbht1MBgg0YnfxU+xNq82m4E4YQ4hzwFECr7M6aHaTxOseoqbRTCcaCyOjmiCGrVJ+0Fu+7E+aS+BiR6al5A6YyYHaC2Ey/jWKukP4S36y30K035GQsSm3XITMe4Lhqi+KPnevGDI5551aiARYAR3ONXFZOZNKL7a6nSNV2h0r38pN1vXn8fFj+GmIohc1iYEefe8obKZuxRl46pBs6PSWbaxrRokio+8SKWKFyi8yhHNNlfsys4O0fR/CuKmGC5xgxzkp7ytEGuCJBj7qXa13uxi+QUMvxZHtTWs5opL5DH6ZmYmkTe6pebFOwDFUtyOB2w5XJVpPdEVir8ylAIA3UwaVZzFo5dnRp6xyxzqZVRHhBhv/whMnU+ZeyHLk7FGMnBxsLIVpvNGrnl6xyokDSB73';
            const blob = Buffer.from(spcString, 'base64');
            const licenseResponse = await fetch(getLicenseUrl(), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/octet-stream',
              },
              body: blob,
            });
            console.log(licenseResponse)
            const licenseBlob = await licenseResponse.blob();
            console.log(licenseBlob)
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
              console.log("licenseBlob",licenseBlob);
              reader.readAsDataURL(licenseBlob);
            });
            if (license) {
              console.log("license", license);
              //data:application/json;base64,eyJNZXNzYWdlIjoiQW4gZXJyb3IgaGFzIG9jY3VycmVkLiJ9
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
