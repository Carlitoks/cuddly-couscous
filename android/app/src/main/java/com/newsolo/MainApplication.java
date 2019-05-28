package com.newsolo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.microsoft.codepush.react.CodePush;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import com.gettipsi.stripe.StripeReactPackage;
import com.opentokreactnative.OTPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
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
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;

import java.util.Arrays;
import java.util.List;
// import Branch and RNBranch
import io.branch.rnbranch.RNBranchPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new RNAnalyticsPackage(),
            new RNBranchPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            		new RNInstabugReactnativePackage.Builder("1ef778fa18d0379f12f7ebaed42eba02",MainApplication.this)
							.setInvocationEvent("shake")
							.setPrimaryColor("#1D82DC")
							.setFloatingEdge("left")
							.setFloatingButtonOffsetFromTop(250)
							.build(),
            new StripeReactPackage(),
            new OTPackage(),
            new RNSoundPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
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
            new LinearGradientPackage(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage()
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
