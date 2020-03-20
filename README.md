# chittr-assignment ReadMe

## Installation

To run Chittr, requires downloading the zip (chittr-tym).
Next the zip files should be extracted.
Finally navigate to the root folder chittr/chittr and rune the command NPM install to aquire the node_moduels
npm install --s
Following this, open Android Studio, and open the Project inside the chittr-tym, chittr/android.iml

Wait for the project to build (May take upto 15 minutes on slower/older machines)

Generate a new android emulator, running API 23 or later. This app was designed for the Google Pixel, it is highly reccomended you use this emulator.

*Run the Emulator*

Once the emulator is loaded, return to the chittr application and run the command;
npx react-native run-android
The application will now be running on the emulator.




## Functions

Currently, the application allows:

* A user to create an account (Register)
* A user to log in/out
* A user can post a chit (When logged in)
* A user may view the newsfeed without being logged in
* A user may search the users list without being logged in
* A user can view their followers and who they follow (When logged in)
* A user can edit their profile and add a profile picture from their camera (When logged in)


## Troubleshooting
1. Occasionally when restarting the app in the emulator, the emulator may crash, this can generally only be resolved by restarting the emulator. It is quite rare for Android Studio to crash, but the emulator may crash often if the PC you are using has limited resources.

2. There is also the risk that the node server may crash, this can easily be resolved by simply pressing the up arrow within the terminal.

3. If the app ever crashes and is shown to be running within the node but isn't displaying on the emulator, the node maybe hanging and waiting for the emulator, this can be overridden by manually re-opening the app from within the emulator. 


## Contributions
This application is reliant one server code written by the ever brilliant Ashley Williams, without him none of this would have been possible. If anything is broken you can reach him at A.Williams@email.com