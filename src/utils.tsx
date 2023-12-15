import { PermissionsAndroid, Platform } from "react-native";
var Buffer = require('buffer/').Buffer;

import { DRMType } from "react-native-video";

const m3u8_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/65e5f8e9-88ba-4264-8784-be80c8cb00b5/The_Bad_Guys_2022.ism/manifest(format=m3u8-cmaf,encryption=cbcs-aapl)';
const mpd_url: string =
  'https://vodemedia-usea.streaming.media.azure.net/c4312929-fafb-4317-b529-9c5708d6bc88/Teddy.ism/manifest(format=mpd-time-csf,encryption=cenc)';
  // 'https://vodemedia-usea.streaming.media.azure.net/dd5d9689-b7d9-4efe-9d7f-4f53162ad1b3/Charisma_1.ism/manifest(format=mpd-time-csf,encryption=cenc)';
const assetID = '0377f837-a760-4917-a3c3-f6bab06ed5f7';
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
            // return `AAAAAQAAAAAFuqlOZ2i6uk8YfOle+XX5AAADQEMeV+bCjIYUTvHJxGnmEjV4Dccyl/dsWYszNKVs8QwoCxX/Of0GBAAypicVdXVfkB51NynXt3XIZMD76fKXAi+1J/xkdlZkdpSPpUvOjB3gsHvnPINwlcoDi4hbuPvn6CEbAlXFEMkI+IgFRm+MlU0mjyJSi4I61GnkJh+4gJ1CeE/rEpzfsDnndGiWRwU2JjO9GRYtYo3YVPREtfb9SBXaU+p1V3Qj7VjpPbbWmfolzJq0yLLgXP9ZqF0JnDU2zj61e4kXVkXPUW+8DukTa+wUzbUwTVnYoOuplILJLcTYiVN7TDwiE8EGIuIk19THRKrrdCBeO0yoGdliYAFZLIpfzcoWRi9zbkCMIR+3wtqfcU1AkUfctMccTKz5L3O+s+kVW6hlpj8OnQ1OnBEzKjIekAQtIUqEFJ4W+xyaKT8Wu6bGJ0+hnT+4oT5UGsi+p2A1RN0mTHiI58/BN/r+BNMpfitaTp1cGcUH13IkhbeLICssInX56QHv/7zp3VmwpDHuxurQotxeCPLv6/Mxvi/lxnj4lhJR5cBpf85cUzB5+U0blGy9tGIzGb/jOS10wktAgIuVeOZDyCwQn3MLzRvQtT76xwqZHHAUoCoHk4y3y6+Iims5TaI2ikdIcvOpcGi02ymGreljncMbs0Cgj3O/zZrDFIcOWeZo5nGncoMLYxe4N09FBteDwZFNOZk/KmGznB821dIO8OU14elGMuqBFk4JDObJAGflx+rR6Q/1gjdM0pjWVLVvmr+UU194xPiGPxc8ZtPQafGI0gi/AffIlkDp0dSvdRxiU0xhMiGy7aBBV/FT1XqvASBd7ac4DMtCA7ZpWqBU1jpzUnwZXpV15U6hWGEjIssm0p5mMimdlEgkScNe+4xE240WmavVAgAd3vKcTmv8nRKsiHQtXuV5L2zjZhtUcHddtXmauQyw1t4cCARDe9WLhH5MR8rejtWEpdLrnTM1G47A2nquRf9jrl/lSEcBahuXa9IpQj3ppPlCpP3zhrXR0r+52GkifHZJpxUL8LENyUvTzgCmbLOkHHgcyXzTro2q3ah7phJXhb30v4Q15S7as6cbqpaIgusgY9oVwT0xYvxRxVJXS3E=`;
            // return 'AAAAAQAAAADFKDFpw4bvIEUGVyLvU5lLAAAEIAZyRzghP7roGEbfmyc18lzKGe9cA06Hsx7R6A6JX0j16HCCHfT5A18EgPwm5S0d0o4t+JjIc37pcQ8NWIRa2raTwxLuc3V73vmF6XVUenMZHiPZErtT/DeMaANtycm19VdpCnNVT9cPyJtjwEnq9ZGBdbK8aEpNJBpBapkorAuUxG0k/kJHQQueYjteyrpEdPvGMI6qKP9fa93e8u81cgP56R6arudQcS709lSXxxrbn6WdJXvK5jD2NS28tzT9AuSbtwhJwq3Vq+VTbGzqwAnq22hiUsGrMtxPWCbHOrqWvjfk9csFRf4o/uie6K5iuXyaJ3J/cdXAXCwp5d4qRU5i3se/ufulnwM8cqn/fT+JiNRFmBQ+L0eFmCkixa51HI6VivM5G1H5EGiRbmX2sF1X41WMNUiIIKMxs49/2GDEF2LW3B2nDfx1N4wJ8bf8QMmoBREKtuG4rnXbJWZigf1PtdyGM8klCPlljNS1PgGmg4KKO88mZpodQfXOWEqevPtPcxY/yQY76n+04sI+xJqQPQ4DnEE2GKA3ChQYSd3Krx0KYq0+m+8RTfat6KuljaOaLq0hoaXi3BGod37ONJPuYuAd8TqUsLo1AhLI/nHJn4cgg93219kPENyZbrH21Epko4EEddo4CeUINWQJNEpXpI/7fjE8q7+BW8+ProEDMiRF4BcgyoQ0Xm/v8xdeN2m61XM6dIzijkUQ1kNHBLcAgBgBO0ysvr60a65jzPur6Dl6vTX6J2Xx1P8cVNwdRqWvRHKWaBRgPYrHk9cQTf00GujfzcZOtb5Cj9JWbec6o7Vcer7NXZbrqrl13mtISYgbuaEENxars5q8eOCczBkuE/sJkVZTTmmd9dt0Xu4t/xWdR2xeBuoT2PVqfYRQK5evHmKAiMyHXDCX33arUbpq7WGQZiIkjSy3u7QjW4TnTH7HhQ/jocIJCKT125qtvfVuVi5oUqKmNOWSyCMWHigBZ05JEvKFOicRqUyhNSjLv7WFSkoPLHxjUrTrLzz5pT26vb5hXjN0XAxon8Su0EgvH8GfhYRP0oVhS8fVBn97vS8Wk1V3YonqqCAkzqDaE9dOl7AtGRjYprWPRsfhdv+V7NiTUF9LUTm578oNwfSxdkAL9wEnncK/UE1X04Ppa1Jvo6ULhsczXdRwD8Gb9aAPFPnMH5g+vwhhQzjR30aIFXe6id0+HlGZ4fciFmVh3hxSCqXDszTY+UYJ65IRo6sp249cPw43kIKQF3MozD/KhhTcWLPs+mC8ufR1uxc1d6UgSyoEIj7tsaIPoV5O+R8/Sjfvc5YQBiiovikn6lSMHL+C/28z4udkgnwSZrE9Bffj+c8XjrrYpUI4hUWvBtrOV58y/PKkWGGhUe/S06hzuc3LHzGDZq2QkQDxs2+ECQ=='
            // return 'AAAAAQAAAADFKDFpw4bvIEUGVyLvU5lLAAAEIAZyRzghP7roGEbfmyc18lzKGe9cA06Hsx7R6A6JX0j16HCCHfT5A18EgPwm5S0d0o4t+JjIc37pcQ8NWIRa2raTwxLuc3V73vmF6XVUenMZHiPZErtT/DeMaANtycm19VdpCnNVT9cPyJtjwEnq9ZGBdbK8aEpNJBpBapkorAuUxG0k/kJHQQueYjteyrpEdPvGMI6qKP9fa93e8u81cgP56R6arudQcS709lSXxxrbn6WdJXvK5jD2NS28tzT9AuSbtwhJwq3Vq+VTbGzqwAnq22hiUsGrMtxPWCbHOrqWvjfk9csFRf4o/uie6K5iuXyaJ3J/cdXAXCwp5d4qRU5i3se/ufulnwM8cqn/fT+JiNRFmBQ+L0eFmCkixa51HI6VivM5G1H5EGiRbmX2sF1X41WMNUiIIKMxs49/2GDEF2LW3B2nDfx1N4wJ8bf8QMmoBREKtuG4rnXbJWZigf1PtdyGM8klCPlljNS1PgGmg4KKO88mZpodQfXOWEqevPtPcxY/yQY76n+04sI+xJqQPQ4DnEE2GKA3ChQYSd3Krx0KYq0+m+8RTfat6KuljaOaLq0hoaXi3BGod37ONJPuYuAd8TqUsLo1AhLI/nHJn4cgg93219kPENyZbrH21Epko4EEddo4CeUINWQJNEpXpI/7fjE8q7+BW8+ProEDMiRF4BcgyoQ0Xm/v8xdeN2m61XM6dIzijkUQ1kNHBLcAgBgBO0ysvr60a65jzPur6Dl6vTX6J2Xx1P8cVNwdRqWvRHKWaBRgPYrHk9cQTf00GujfzcZOtb5Cj9JWbec6o7Vcer7NXZbrqrl13mtISYgbuaEENxars5q8eOCczBkuE/sJkVZTTmmd9dt0Xu4t/xWdR2xeBuoT2PVqfYRQK5evHmKAiMyHXDCX33arUbpq7WGQZiIkjSy3u7QjW4TnTH7HhQ/jocIJCKT125qtvfVuVi5oUqKmNOWSyCMWHigBZ05JEvKFOicRqUyhNSjLv7WFSkoPLHxjUrTrLzz5pT26vb5hXjN0XAxon8Su0EgvH8GfhYRP0oVhS8fVBn97vS8Wk1V3YonqqCAkzqDaE9dOl7AtGRjYprWPRsfhdv+V7NiTUF9LUTm578oNwfSxdkAL9wEnncK/UE1X04Ppa1Jvo6ULhsczXdRwD8Gb9aAPFPnMH5g+vwhhQzjR30aIFXe6id0+HlGZ4fciFmVh3hxSCqXDszTY+UYJ65IRo6sp249cPw43kIKQF3MozD/KhhTcWLPs+mC8ufR1uxc1d6UgSyoEIj7tsaIPoV5O+R8/Sjfvc5YQBiiovikn6lSMHL+C/28z4udkgnwSZrE9Bffj+c8XjrrYpUI4hUWvBtrOV58y/PKkWGGhUe/S06hzuc3LHzGDZq2QkQDxs2+ECQ=='
            // return 'AAAAAQAAAABNIBWHonj828OkvRFh7fTGAAACkNHimRa6DuxGPv9Gc1j3hvHTg0a6RScZSTDgYSQ8onUK7RMBx4664eNI8yWWti6pEfXPscP/bBfbKgXRTDyD4kK9B163g0y0/o3uptCpFFD9ID6wkPAs+g6a1eGGRYHQsbfo7RbxA5PXkIvI/aum+Uv+9h3LBxWhI2D6Ub78rJa9rf90T7Irn7DhrG+27x5YQTfoiYHm5a/Rb9k88w8YNIMbdXvdoqd7gEcbIQL0pkrqXlg/U9g8jrf3vCoRsr4h+E2z6GSpQ+hiPlE2xTrs+SCOJb4qjcM09B54xCxtc4H/Yhg29zYhtTIc39/C55UAzXA5XNv9P3aue3B1hKFNzIjxNuH7ZJ9ZJtJVE2jTKti8jTvCM7gscGXONv4xZyG2GotkUQHGtOkXMp2d1oefpz8IF43TILGfR1xTHUVwdJfa84UuPwTHy+J39fAAMqNxhrScVeNeQREE8m1oderfYmWU+25T2X4OgLKqxkZ200KQkjTLNjUL9gTdAWXJDYa6ozk8PrWGZz8W/3+pIHHywqTb2vRBLcvz0Kz9s1F+TJs2kZrnR/FsXocaBWGOLDKkH0J8c+ywx5aJ+KGdxTa5X/p6fxyqJhvxxok57DeomGt7K1swCZ4Ux3KrJxCuDCNBJRIRUNLBxCM1UEY/k2RXo5D0ZR9bRT7rJZNq3E1FPrFjmdVz/ND1jw9aG6prhUuddwxV99PVSGY2ZJGdQm0GD2OUh29AWr2wUbT92vFRNsTCP9Yd+R1octZmp/qc5zJ/dLAckBrYqMSbM/Et/tj7IfkT64Q+lumC4S9r8HSs/zeEOCvpGTSlRWBm6z0Zd9ubwJ9thoPGZCP5EoDTOONN92gz+/UAso+uqJjajmnpGWGp'
            const blob = Buffer.from(spcString, 'base64');
            console.log('blob', blob)
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
