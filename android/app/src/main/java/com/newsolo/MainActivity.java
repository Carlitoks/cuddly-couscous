package com.newsolo;

import android.os.Bundle; // here

import com.facebook.react.ReactActivity;

import io.branch.rnbranch.*; // <-- add this
import android.content.Intent; // <-- and this
import org.devio.rn.splashscreen.SplashScreen; // import this

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "NewSolo";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);  // here
        super.onCreate(savedInstanceState);
    }

    // Override onStart, onNewIntent:
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
