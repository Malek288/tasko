# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Install and deploy Tasko

### Deploy the web app (free)

1. Push this project to a GitHub repository.
2. Create a free project on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) and import the GitHub repository.
3. Use `npm run build` as the build command and `dist` as the output directory. The platform will publish the app and provide an HTTPS URL; use that URL to install the PWA.

### Install the PWA on Android

1. Open the deployed HTTPS URL in Chrome on your phone and wait for the first visit to finish loading.
2. Open Chrome's menu and choose **Add to Home screen** (or **Install app**, if offered).
3. Confirm the install. Task Manager will then open from its home-screen icon and will work offline after its first visit.

### Build an Android APK on Windows

Install [Android Studio](https://developer.android.com/studio), a JDK supported by the installed Android Gradle Plugin (JDK 21 for the current Capacitor 8 project), and the Android SDK. Then, from PowerShell in the project folder:

1. Run `npm install` to install the project dependencies.
2. Run `npm run cap:sync` to build the web app and sync it into the Android project.
3. Run `npm run cap:open` to open the project in Android Studio. If Android Studio does not open automatically, open the `android` folder in Android Studio.
4. In Android Studio, select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. The debug APK is created at `android\app\build\outputs\apk\debug\app-debug.apk`.
6. Copy the APK to the phone and open it. If Android blocks the installation, enable **Install unknown apps** for the app used to open the APK (such as Chrome or Files), then retry.

To regenerate the PWA icons after changing `public/favicon.svg`, run `npm run generate-pwa-assets`. Android launcher and splash assets can be generated with `npx @capacitor/assets generate --android --assetPath assets --iconBackgroundColor "#f4efe6" --splashBackgroundColor "#f4efe6"` after the platform has been added.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
