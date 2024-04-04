# Demo Login Credentials 
User ID : +91 5656565656
Password : 123456

# Solution of "Android build failed: Can't determine type for tag '<macro name="m3_comp_assist_chip_container_shape">?attr/shapeAppearanceCornerSmall</macro>'"

go to node_modules/react-native-screens/android/build.gradle file and

dependencies {
...
implementation 'com.google.android.material:material:1.9.0' => 1.6.0 (change version)
...
}

https://github.com/stripe/stripe-react-native/issues/1471

# Solution of "This request is missing a valid app identifier, meaning that neither safetyNet checks nor reCAPTCHA checks succeeded"
1. Open android studio and click on gradle in right corner > click your project > select app > select tasks > select android > click on signing report > copy our SHA1 and SHA-256 from there.
2. Add SHA1 and SHA-256 in your new firebase account .
3. Add dependency in build.gradle(:app)
implementation 'androidx.browser:browser:1.3.0'
4. Go to google cloud console , select your project .
5. Click on navigation menu and select APis & services and then select Dashboard .
6. Click on enable api and services and enable api "Google Play Integrity API".
7. Download and replace the latest google-services.json file in your project.
8. Clean and rebuild project.
Reference : This request is missing a valid app identifier, meaning that neither safetyNet checks nor reCAPTCHA checks succeeded