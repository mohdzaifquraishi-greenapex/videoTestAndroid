import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import {
  drm,
  getWritePermission,
  m3u8_url,
  mpd_url,
  response,
} from './src/utils';
var Buffer = require('buffer/').Buffer;
const xml2json = require('react-native-xml2js');
const asset_id = 'sl_as_06033df612f3d8003c5e435a48130769';
const onBuffer = buffer => {
  console.log(buffer);
};
const onError = err => {
  console.log('err', err);
};
const onLoad = data => {
  console.log('data', data);
};
const BYTE = 1049;
export default function App() {
  const videoRef = useRef(null);
  let activeDownloads = {};
  const [len, setLen] = useState(-2);
  const [l, setL] = useState(len);
  const [ifAssetExists, setIfAssetExists] = useState(false);
  const [manifest, setManifest] = useState({});
  const [bandwidth, setBandwidth] = useState(0);
  const [Downloaded, setDownloaded] = useState(0);
  const percentage = useMemo(() => {
    console.log((Downloaded*100/bandwidth).toFixed(2), bandwidth);
    return (Downloaded*100/bandwidth).toFixed(2);
  }, [Downloaded]);
  const predownload = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(mpd_url, requestOptions)
      .then(response => response.text())
      .then(manifest => {
        let bandwidth = [],
          template = {},
          segTime = {},
          a_template = {},
          a_segTime = {},
          a_bandwidth = [],
          a_label = '';
        xml2json.parseString(manifest, (a, data) => {
          // ['AdaptationSet'][0] is audio
          let a_rep = data.MPD.Period[0].AdaptationSet[0].Representation;
          a_rep.forEach(d => a_bandwidth.push(d.$.bandwidth));
          let a_seg = data.MPD.Period[0].AdaptationSet[0].SegmentTemplate;
          a_template = a_seg[0].$;
          a_segTime = a_seg[0].SegmentTimeline[0].S.filter(d => d.$.r)[0].$;
          a_label = data.MPD.Period[0].AdaptationSet[0].Label[0];
          // ['AdaptationSet'][1] is video
          let rep = data.MPD.Period[0].AdaptationSet[1].Representation;
          rep.forEach(d => bandwidth.push(d.$.bandwidth));
          let seg = data.MPD.Period[0].AdaptationSet[1].SegmentTemplate;
          template = seg[0].$;
          segTime = seg[0].SegmentTimeline[0].S.filter(d => d.$.r)[0].$;
          let local_manifest = manifest
            .replace(
              `QualityLevels($Bandwidth$)/Fragments(${a_label}=$Time$,format=mpd-time-csf,encryption=cenc)`,
              'a_$Time$',
            )
            .replace(
              `QualityLevels($Bandwidth$)/Fragments(${a_label}=i,format=mpd-time-csf,encryption=cenc)`,
              'a_i',
            )
            .replace(
              'QualityLevels($Bandwidth$)/Fragments(video=$Time$,format=mpd-time-csf,encryption=cenc)',
              '$Time$',
            )
            .replace(
              'QualityLevels($Bandwidth$)/Fragments(video=i,format=mpd-time-csf,encryption=cenc)',
              'i',
            );
          setLen(a_segTime.r + segTime.r + 2);
          setL(a_segTime.r + segTime.r + 2);
          setManifest({
            asset_id,
            string_manifest: manifest,
            local_manifest,
            audio: {
              a_bandwidth,
              a_template,
              a_segTime,
              prefix: 'a_',
            },
            video: {bandwidth, template, segTime},
            bandwidth: parseInt(bandwidth[0]) + parseInt(a_bandwidth[0]),
            bandwidth_text: (
              (parseInt(bandwidth[0]) + parseInt(a_bandwidth[0])) /
              (BYTE * BYTE)
            ).toFixed(2),
          });
          setBandwidth(parseInt(bandwidth[0]) + parseInt(a_bandwidth[0]));
        });
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    let a = async () => {
      let videocache = RNFS.ExternalCachesDirectoryPath.replace(
        'cache',
        `files/${asset_id}`,
      );
      setIfAssetExists(await RNFS.exists(videocache));
    };
    a();
    predownload();
  }, []);
  const source = useMemo(
    () => ({
      uri: !ifAssetExists
        ? Platform.OS == 'ios'
          ? m3u8_url
          : mpd_url
        : `${RNFS.ExternalCachesDirectoryPath.replace(
            'cache',
            `files/${asset_id}`,
          )}/manifest.mpd`,
      // Platform.OS == 'ios' ? m3u8_url : mpd_url,
      type: Platform.OS == 'ios' ? 'm3u8' : 'mpd',
    }),
    [percentage == 0, percentage > 100],
  );

  const downloadDRM = () => {
    NativeModules.VideoDecoderProperties.downloadDRM(
      mpd_url,
      drm?.licenseServer,
    ).then(key => console.log({key}));
  };
  const _download = async manifest => {
    try {
      let grant = await getWritePermission();
      var path = RNFS.ExternalCachesDirectoryPath.replace('cache', 'files');
      var videocache = path + '/' + asset_id;
      let isDir = await RNFS.exists(videocache);
      if (!isDir) {
        await RNFS.mkdir(videocache)
          .then(() => {
            console.log('Create videocache success');
          })
          .catch(err => {
            console.log('Create videocache err');
          });
      }
      RNFS.writeFile(
        videocache + '/manifest.mpd',
        manifest.local_manifest,
        'utf8',
      ); // download manifest
      let {a_bandwidth, a_template, a_segTime} = manifest.audio;
      let {bandwidth, template, segTime} = manifest.video;
      walk(a_bandwidth, a_template, a_segTime, videocache, 'a_');
      walk(bandwidth, template, segTime, videocache);
    } catch (e) {
      console.log(e);
    }
  };
  const walk = async (bandwidth, template, {d, r}, videocache, prefix = '') => {
    asyncForEach(r, async (x, i) => {
      var chunkUrl = mpd_url.split('/manifest')[0];
      let dirs = videocache + '/' + prefix + (i == -1 ? 'i' : i * d);
      let url =
        chunkUrl +
        '/' +
        template.media
          .replace('$Bandwidth$', bandwidth[0])
          .replace('$Time$', i == -1 ? 'i' : i * d);
      var res = downloadContent(url, dirs);
      // console.log(res)
    });
  };
  const downloadContent = (fromUrl, toFile) => {
    activeDownloads[toFile] = new Promise((resolve, reject) => {
      RNFS.downloadFile({
        fromUrl: fromUrl,
        toFile: toFile,
        background: true,
        progress(res) {
          let progress = (res.bytesWritten * 100) / res.contentLength;
          // console.log(progress.toFixed(0));
        },
      })
        .promise.then(
          res =>
            res.statusCode == 200 &&
            setDownloaded(Downloaded + parseInt(res.bytesWritten)),
        )
        .catch(err => {
          console.log('err', err);
        });
    });
    return activeDownloads[toFile];
  };

  const asyncForEach = async (l, callback) => {
    for (let index = -1; index < l; index++) {
      await callback(l, index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/* <Video
          // Can be a URL or a local file.
          source={source}
          // Store reference
          drm={drm}
          ref={videoRef}
          // Callback when remote video is buffering
          onBuffer={onBuffer}
          // Callback when video cannot be loaded
          onError={onError}
          style={styles.backgroundVideo}
          onLoad={onLoad}
          controls
          keySetId={'ksid17DCAD04'}
        /> */}
        <TouchableOpacity
          onPress={() => _download(manifest)}
          style={styles.btn}>
          <Text>
            {ifAssetExists
              ? 'Downloaded'
              : len == 0
              ? 'Downloaded'
              : len < 0
              ? 'Download'
              : 'Downloading'}{' '}
            {manifest.bandwidth_text} MB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={downloadDRM} style={styles.btn}>
          <Text>Download drm</Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundVideo: {
    height: 300,
    width: '100%',
  },
  btn: {
    height: 30,
    width: 150,
    backgroundColor: '#eee',
    padding: 6,
    margin: 10,
    alignItems: 'center',
  },
});
