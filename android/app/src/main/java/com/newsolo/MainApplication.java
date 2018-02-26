package com.newsolo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.rnfs.RNFSPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnopentok.RNOpenTokPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SvgPackage(),
            new FIRMessagingPackage(),
            new BackgroundTimerPackage(),
            new ReactNativePushNotificationPackage(),
            new KCKeepAwakePackage(),
            new RCTCameraPackage(),
            new RNI18nPackage(),
            new InCallManagerPackage(),
            new RNFetchBlobPackage(),
            new RNDeviceInfo(),
            new ImageResizerPackage(),
            new RNFSPackage(),
            new LinearGradientPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new RNOpenTokPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
