package com.unifi;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;

import com.clover.sdk.v1.Intents;
import com.clover.sdk.v3.scanner.BarcodeResult;
import com.clover.sdk.v3.scanner.BarcodeScanner;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

class CloverPackage extends ReactContextBaseJavaModule {

  private Callback mCallback;
  private ReactContext mContext;
  private BarcodeScanner mBarcodeScanner;

  private BroadcastReceiver barcodeReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      BarcodeResult barcodeResult = new BarcodeResult(intent);
      if (barcodeResult.isBarcodeAction()) {
        String barcode = barcodeResult.getBarcode();
        mContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit("onBarcode", barcode);
      }
    }
  };

  public CloverPackage(ReactApplicationContext reactContext) {
    super(reactContext);

    mBarcodeScanner = new BarcodeScanner(reactContext);
    mContext = reactContext;

    reactContext.registerReceiver(barcodeReceiver, new IntentFilter(BarcodeResult.INTENT_ACTION));
  }

  @Override
  public String getName() {
    return "Clover";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  @ReactMethod
  public void show() {
    Bundle extras = new Bundle();
    extras.putBoolean(Intents.EXTRA_LED_ON, false);
    extras.putBoolean(Intents.EXTRA_SCAN_QR_CODE, true);
    mBarcodeScanner.executeStartScan(extras);
  }
}