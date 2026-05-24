# Couple Budget Android App

This folder contains a native Android WebView wrapper for the local Couple Budget website.

## Build

1. Install Android Studio with JDK 17.
2. Open the `android` folder in Android Studio.
3. Let Android Studio sync Gradle.
4. Run the `app` configuration on an emulator or phone.
5. To build an APK, use Android Studio: `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

## Sync Web Changes

After editing `index.html`, `app.js`, `styles.css`, or `media`, run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-android-assets.ps1
```

The Android app loads:

```text
file:///android_asset/web/index.html
```

## Notes

- Login, expense data, themes, wallpapers, and media still work through browser storage inside the Android WebView.
- GPS and image upload are enabled in the native wrapper.
- Live currency conversion uses the existing web code and requires internet access.
