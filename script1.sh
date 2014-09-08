#!/bin/bash
echo "Killing xcode..."
killall Xcode

rm -rf platforms/ios
rm plugins/ios.json
cordova platform add ios
cordova build ios
node .cordova/hooks/after_build/copy_icons_screens.js 
## Above isn't being caught by the hook during iOS for some reason. Hook is caught by Android build
open platforms/ios/*.xcodeproj