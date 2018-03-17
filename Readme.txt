Saarthi a real time translation technology that converts sign language to spoken language.

Saarthi solves communication challenges between people with hard of hearing and mute with recent developments in gesture recognition and machine learning technology.

It includes features such as:-

Sign To Speech
-----------------

Communicate with your peers in a whole new way. Saarthi uses a specalized camera to track hands and fingers with incredible speed.

Speech To Text
-----------------

Making life a little easier with the voice recognition software out there used by millions to translate speech into text. Watch our video for a demo.


Static and Dynamic Gesture in one Go
----------------------------------------

We have two types of gesture, static and Dynamic. Static gestures include alphabets like a,b,c and Dynamic Gesture include Sorry, How, My, Hi.
We have developed our product such that it can recognize and display both static and dynamic gestures at the same time.



Dependencies
---------------
Active internet connection
Python 3
Modern Browser such as Google Chrome or firefox
Leap Motion Sensor



Starting the Project
-------------------------
Connect Leap Motion to your system.
You need to perform Gesture infront of this sensor.

Go into pyscript directory and run server.py file

python server.py

Now the server is running and a websocket is created.

Now open index.html file in your brower.
It connects to the websocket created by python server

Now you'll see 2 buttons. Start and Close.
Click on Start to perform a Gesture
Perform your Gesturre. Once you are done click on close button.
You'll see the text written on the screen and been spoken through speech api present in browsers.


Trobuleshooting
-----------------

Remove the smudge from the Leap Motion Sensor and wipe it with a clean cloth if the gestures are not recognized.

Try refresing the browser window if the system gets stuck.

Use Python 3 for the python script and not python2.7.

Check if you have a active internet connection.