/* eslint-disable react-hooks/exhaustive-deps */
import {m3u8Parser} from 'mpd-m3u8-to-json';
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
import {drm, getWritePermission, m3u8_url, mpd_url} from './src/utils';
var Buffer = require('buffer/').Buffer;
const xml2json = require('react-native-xml2js');
const asset_id = 'sl_as_06033df612f3d8003c5e435a48130769';

const isIOS = () => Platform.OS == 'ios';
const onBuffer = buffer => {
  console.log(buffer);
};
const onError = err => {
  console.log('err', err);
};
const onLoad = data => {
  console.log('data', data);
};

export default function App() {
  const videoRef = useRef(null);
  let activeDownloads = {};
  const [len, setLen] = useState(-2);
  const [l, setL] = useState(len);
  const percentage = useMemo(() => {
    return parseInt(((l - len) / (l * 0.01)) * 1000);
  }, [len, l]);
  const [ifAssetExists, setIfAssetExists] = useState(false);
  useEffect(() => {
    let a = async () => {
      let videocache = isIOS()
        ? RNFS.MainBundlePath.concat(`files/${asset_id}`)
        : RNFS.ExternalCachesDirectoryPath.replace(
            'cache',
            `files/${asset_id}`,
          );
      let ifexits = await RNFS.exists(videocache);
      console.log(ifexits);
      setIfAssetExists(ifexits);
    };
    a();
  }, [percentage > 100, percentage == 0]);
  const source = useMemo(
    () => ({
      uri: isIOS()
        ? !ifAssetExists
          ? m3u8_url
          : `${RNFS.MainBundlePath.concat(`files/${asset_id}`)}/manifest.m3u8`
        : !ifAssetExists
        ? mpd_url
        : `${RNFS.ExternalCachesDirectoryPath.replace(
            'cache',
            `files/${asset_id}`,
          )}/manifest.mpd`,
      type: isIOS() ? 'm3u8' : 'mpd',
    }),
    [percentage == 0, percentage > 100],
  );

  const download = () => {
    // let manifest = `#EXTM3U
    // #EXT-X-VERSION:7
    // #EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="aac_und_2_128027_2_1",LANGUAGE="und",CHANNELS="2",URI="QualityLevels(128027)/Manifest(aac_und_2_128027_2_1,format=m3u8-cmaf,encryption=cbcs-aapl)"
    // #EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="aac_und_2_128020_3_1",LANGUAGE="und",DEFAULT=YES,CHANNELS="2",URI="QualityLevels(128020)/Manifest(aac_und_2_128020_3_1,format=m3u8-cmaf,encryption=cbcs-aapl)"
    // #EXT-X-STREAM-INF:BANDWIDTH=460332,RESOLUTION=320x180,CODECS="avc1.64000d,mp4a.40.2",AUDIO="audio"
    // QualityLevels(306428)/Manifest(video,format=m3u8-cmaf,encryption=cbcs-aapl)
    // #EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=460332,RESOLUTION=320x180,CODECS="avc1.64000d",URI="QualityLevels(306428)/Manifest(video,format=m3u8-cmaf,type=keyframes,encryption=cbcs-aapl)"
    // #EXT-X-STREAM-INF:BANDWIDTH=732214,RESOLUTION=480x270,CODECS="avc1.640015,mp4a.40.2",AUDIO="audio"
    // QualityLevels(572457)/Manifest(video,format=m3u8-cmaf,encryption=cbcs-aapl)
    // #EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=732214,RESOLUTION=480x270,CODECS="avc1.640015",URI="QualityLevels(572457)/Manifest(video,format=m3u8-cmaf,type=keyframes,encryption=cbcs-aapl)"
    // #EXT-X-STREAM-INF:BANDWIDTH=1080851,RESOLUTION=640x360,CODECS="avc1.64001e,mp4a.40.2",AUDIO="audio"
    // QualityLevels(913590)/Manifest(video,format=m3u8-cmaf,encryption=cbcs-aapl)
    // #EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=1080851,RESOLUTION=640x360,CODECS="avc1.64001e",URI="QualityLevels(913590)/Manifest(video,format=m3u8-cmaf,type=keyframes,encryption=cbcs-aapl)"
    // #EXT-X-STREAM-INF:BANDWIDTH=1935070,RESOLUTION=960x540,CODECS="avc1.64001f,mp4a.40.2",AUDIO="audio"
    // QualityLevels(1749420)/Manifest(video,format=m3u8-cmaf,encryption=cbcs-aapl)
    // #EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=1935070,RESOLUTION=960x540,CODECS="avc1.64001f",URI="QualityLevels(1749420)/Manifest(video,format=m3u8-cmaf,type=keyframes,encryption=cbcs-aapl)"
    // #EXT-X-STREAM-INF:BANDWIDTH=2969567,RESOLUTION=1280x720,CODECS="avc1.64001f,mp4a.40.2",AUDIO="audio"
    // QualityLevels(2761648)/Manifest(video,format=m3u8-cmaf,encryption=cbcs-aapl)
    // #EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=2969567,RESOLUTION=1280x720,CODECS="avc1.64001f",URI="QualityLevels(2761648)/Manifest(video,format=m3u8-cmaf,type=keyframes,encryption=cbcs-aapl)"
    // #EXT-X-STREAM-INF:BANDWIDTH=5636919,RESOLUTION=1920x1080,CODECS="avc1.640028,mp4a.40.2",AUDIO="audio"
    // QualityLevels(5371582)/Manifest(video,format=m3u8-cmaf,encryption=cbcs-aapl)
    // #EXT-X-I-FRAME-STREAM-INF:BANDWIDTH=5636919,RESOLUTION=1920x1080,CODECS="avc1.640028",URI="QualityLevels(5371582)/Manifest(video,format=m3u8-cmaf,type=keyframes,encryption=cbcs-aapl)"`;
    // var path = isIOS()
    //   ? RNFS.MainBundlePath.concat('files')
    //   : RNFS.ExternalCachesDirectoryPath.replace('cache', 'files');
    // var videocache = path + '/' + asset_id;
    // return _downloadIOS(manifest, videocache);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(isIOS() ? m3u8_url : mpd_url, requestOptions)
      .then(response => response.text())
      .then(async _manifest => {
        let grant = !isIOS && (await getWritePermission());
        var path = isIOS()
          ? RNFS.MainBundlePath.concat('files')
          : RNFS.ExternalCachesDirectoryPath.replace('cache', 'files');
        var videocache = path + '/' + asset_id;
        let isDir = await RNFS.exists(videocache);
        if (!isDir) {
          await RNFS.mkdir(videocache)
            .then(() => {
              console.log('Create videocache success');
            })
            .catch(err => console.log('Create videocache err'));
        }
        isIOS()
          ? _downloadIOS(_manifest, videocache)
          : _download(_manifest, videocache);
      })
      .catch(error => console.log('error', error));
  };
  const downloadDRM = () => {
    NativeModules.VideoDecoderProperties.downloadDRM(
      mpd_url,
      drm?.licenseServer,
    ).then(key => console.log({key}));
  };
  const _download = async (manifest, videocache) => {
    try {
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
        RNFS.writeFile(videocache + '/manifest.mpd', local_manifest, 'utf8'); // download manifest
        // RNFS.downloadFile({
        //   fromUrl: "<poster url>",
        //   toFile: videocache + '/images.png',
        // }); // download poster
        setLen(a_segTime.r + segTime.r + 2);
        setL(a_segTime.r + segTime.r + 2);
        walk(a_bandwidth, a_template, a_segTime, videocache, 'a_');
        walk(bandwidth, template, segTime, videocache);
      });
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
      var res = downloadVideo(url, dirs);
    });
  };
  const downloadVideo = (fromUrl, toFile) => {
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
        .promise.then(res => {
          console.log('res1', res, res.statusCode != 200 ? fromUrl : '');
          res.statusCode == 200 && setLen(l => l - 1);
        })
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

  const _downloadIOS = async (manifest, _path) => {
    var baseurl = m3u8_url.split('/manifest')[0];
    let local_manifest = manifest
      .replace(/(QualityLevels.*video.*\))/g, 'video')
      .replace(/(QualityLevels.*aac.*\))/g, 'audio')
      .replace(/(QualityLevels.*subt.*\))/g, 'subt');
    RNFS.writeFile(_path + '/manifest.m3u8', local_manifest, 'utf8'); // download manifest
    let result = parsem3u8(manifest);
    // console.log(result,`${baseurl}/${result.levels[result.levels.length - 1].uri}`);
    // return
    if (result.iFrameStreamInf) {
      try {
        let video_url = `${baseurl}/${
          result.levels[result.levels.length - 1].url
        }`;
        let audio_url = `${baseurl}/${result.medias[0].uri}`;
        let v_baseurl = video_url.split('/Manifest')[0];
        let a_baseurl = audio_url.split('/Manifest')[0];
        let video_manifest = await fetchManifest(video_url);
        let audio_manifest = await fetchManifest(audio_url);
        RNFS.writeFile(_path + '/video', video_manifest, 'utf8'); // download manifest
        RNFS.writeFile(_path + '/audio', audio_manifest, 'utf8'); // download manifest
        let segments = [...parsem3u8(video_manifest).segments];
        asyncForEach(segments.length, async (x, i) => {
          let ar =
            i > -1 ? segments[i] : {url: segments[0].url.replace('=0,', '=i,')};
          let dirs = _path + '/' + ar.url;
          let url = v_baseurl + '/' + ar.url;
          downloadVideo(url, dirs);
        });
        let a_segments = [...parsem3u8(audio_manifest).segments];
        asyncForEach(a_segments.length, async (x, i) => {
          let ar =
            i > -1
              ? a_segments[i]
              : {url: a_segments[0].url.replace('=0,', '=i,')};
          let dirs = _path + '/' + ar.url;
          let url = a_baseurl + '/' + ar.url;
          downloadVideo(url, dirs);
        });
      } catch (e) {
        console.log('here', e);
      }
    } else {
      console.log('failed to download');
    }
  };

  const parsem3u8 = manifest =>
    m3u8Parser(manifest, '...', (tagInfo, result) => result);

  const fetchManifest = url => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    return fetch(url, requestOptions).then(response => response.text());
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Video
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
          // keySetId={'ksid17DCAD04'}
        />
        <TouchableOpacity onPress={download} style={styles.btn}>
          <Text>
            {ifAssetExists
              ? 'Downloaded'
              : len == 0
              ? 'Downloaded'
              : len < 0
              ? 'Download'
              : 'Downloading'}
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
