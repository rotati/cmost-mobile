# CMOST

COMST Mobile Application

# Getting Started

## Setup
### Install Git and Guide
[Installing and Using](http://rogerdudler.github.io/git-guide/)

### Dependencies for all

You will need to install Android Studio to run the app in the Android Emulator.

### Dependencies for Linux

You will need node.js, the React Native command line tools, Watchman, and Android Studio.

Follow the [installation instructions for your Linux distribution](https://nodejs.org/en/download/package-manager/) to install Node.js 4 or newer.

Node comes with npm, which lets you install the React Native command line interface.

```
npm install -g react-native-cli
```

### Dependencies for Mac

You will need Xcode, node.js, the React Native command line tools, and Watchman.

We recommend installing node and watchman via [Homebrew](http://brew.sh/)

```
    brew install node
    brew install watchman
```

__[Install React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)__
 ```
 Node comes with npm, which lets you install the React Native command line interface.
 npm install -g react-native-cli
 ```

If you get a permission error, try with sudo: `sudo npm install -g react-native-cli`.

If you get error Cannot find module 'npmlog', try this before: curl -0 -L http://npmjs.org/install.sh | sudo sh.


### Install dependencies

 ```
  npm install
 ```

### [Link dependencies](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)

* Install rnpm

```
  npm install rnpm -g
```
* Use this command when add new dependencies and with native dependencies only
 ```
  rnpm link
 ```

### Running On Device Android

```
  cd android && ./gradlew installRelease
```

## Testing your React Native Installation:

* For Android: assuming you have an emulator or device attached.

```
react-native run-android
```

* A common issue is that the packager is not started automatically when you run react-native run-android. You can start it manually using:

```
react-native start
```

* For IOS: assuming you have an emulator or device attached.

```
react-native run-ios
```

* If everything is set up correctly, you should see your new app running in your emulator shortly.


* To run Tests

```
npm test
```

## NOTE (If the app show cannot connect to the development server)

#### Make sure your computer and your device connect on same network connection

* Shake phone device
* Chooses Dev Settings
* Chooses Debug server host & port for device
* type in your network ip with the fProvisioning APNs SSL Certificatesollowing port

 ```
ex: 192.168.0.1:8081
 ```

### Setup Fastlane

* For macOS or Linux with Ruby 2.0.0 or above

 ```
sudo gem install fastlane -NV
 ```
 
 * Copy json_key.json into android/fastlane directory
 
 ## To deploy app to playstore
 
 * For Alpha Release
 ```
fastlane alpha
 ```
 
 * For Beta Release
 ```
fastlane beta
 ```
 
 * For Production Release
 ```
fastlane deploy
 ```