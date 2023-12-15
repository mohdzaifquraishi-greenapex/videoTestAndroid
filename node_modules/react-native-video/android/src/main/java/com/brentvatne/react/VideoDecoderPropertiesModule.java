package com.brentvatne.react;

import android.annotation.SuppressLint;
import android.media.MediaCodecList;
import android.media.MediaDrm;
import android.media.MediaFormat;
import android.media.UnsupportedSchemeException;
import android.net.Uri;
import android.os.Build;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.brentvatne.common.DemoUtil;
import com.brentvatne.exoplayer.DefaultReactExoplayerConfig;
import com.brentvatne.exoplayer.ReactExoplayerView;
import com.brentvatne.exoplayer.ReactExoplayerViewManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.exoplayer2.Format;
import com.google.android.exoplayer2.RenderersFactory;
import com.google.android.exoplayer2.drm.DrmSessionEventListener;
import com.google.android.exoplayer2.drm.OfflineLicenseHelper;
import com.google.android.exoplayer2.source.dash.DashUtil;
import com.google.android.exoplayer2.source.dash.manifest.DashManifest;
import com.google.android.exoplayer2.upstream.DataSource;

import java.io.IOException;
import java.util.UUID;

@RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
public class VideoDecoderPropertiesModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;

    @NonNull
    @Override
    public String getName() {
        return "VideoDecoderProperties";
    }

    @SuppressLint("ObsoleteSdkInt")
    @ReactMethod
    public void getWidevineLevel(Promise p) {
        int widevineLevel = 0;

        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.JELLY_BEAN_MR2) {
            p.resolve(widevineLevel);
            return;
        }
        final UUID WIDEVINE_UUID = new UUID(0xEDEF8BA979D64ACEL, 0xA3C827DCD51D21EDL);
        final String WIDEVINE_SECURITY_LEVEL_1 = "L1";
        final String WIDEVINE_SECURITY_LEVEL_2 = "L2";
        final String WIDEVINE_SECURITY_LEVEL_3 = "L3";
        final String SECURITY_LEVEL_PROPERTY = "securityLevel";

        String securityProperty = null;
        try {
            MediaDrm mediaDrm = new MediaDrm(WIDEVINE_UUID);
            securityProperty = mediaDrm.getPropertyString(SECURITY_LEVEL_PROPERTY);
        } catch (UnsupportedSchemeException e) {
            e.printStackTrace();
        }
        if (securityProperty == null) {
            p.resolve(widevineLevel);
            return;
        }

        switch (securityProperty) {
            case WIDEVINE_SECURITY_LEVEL_1: {
                widevineLevel = 1;
                break;
            }
            case WIDEVINE_SECURITY_LEVEL_2: {
                widevineLevel = 2;
                break;
            }
            case WIDEVINE_SECURITY_LEVEL_3: {
                widevineLevel = 3;
                break;
            }
            default: {
                // widevineLevel 0
                break;
            }
        }
        p.resolve(widevineLevel);
    }

    @SuppressLint("ObsoleteSdkInt")
    @ReactMethod
    public void isCodecSupported(String mimeType, int width, int height, Promise p) {
        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.LOLLIPOP) {
            p.resolve(false);
            return;
        }
        MediaCodecList mRegularCodecs = new MediaCodecList(MediaCodecList.REGULAR_CODECS);
        MediaFormat format = MediaFormat.createVideoFormat(mimeType, width, height);
        String codecName = mRegularCodecs.findDecoderForFormat(format);
        if (codecName == null) {
            p.resolve(false);
        } else {
            p.resolve(true);
        }
    }


    @ReactMethod
    public void isHEVCSupported(Promise p) {
        isCodecSupported("video/hevc", 1920, 1080, p);
    }

    public VideoDecoderPropertiesModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

        public static String arrayToStringConversion(byte[] inputArray) {
            StringBuilder output = new StringBuilder();
            for (int value : inputArray) {
                output.append((char) value);
            }
            return output.toString();
        }
    @ReactMethod
    public void downloadDRM(String manifestUrl, String licenceUrl, Promise p) throws IOException {
        DataSource.Factory datasourceFactory = DemoUtil.getDataSourceFactory(reactContext);
        DataSource dataSource = datasourceFactory.createDataSource();
        DashManifest dashManifest =
                DashUtil.loadManifest(dataSource, Uri.parse(manifestUrl));
        Format format = DashUtil.loadFormatWithDrmInitData(dataSource, dashManifest.getPeriod(0));
        OfflineLicenseHelper offlineLicenseHelper =
                OfflineLicenseHelper.newWidevineInstance(
                        licenceUrl,
                        true,
                        datasourceFactory,
                        null,
                        new DrmSessionEventListener.EventDispatcher());
        byte[] keySetId = offlineLicenseHelper.downloadLicense(format);
        p.resolve( arrayToStringConversion(keySetId));
    }
}
