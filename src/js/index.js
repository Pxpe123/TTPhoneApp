import '@capacitor/core';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

async function getDeviceInfo() {
  let info = await Device.getInfo();
  return info;
}

window.onload = start;

function start() {
  getDeviceInfo().then(info => {
    console.log(info);
  });
}

const hapticsVibrateMedium = async () => {
  try {
    await Haptics.vibrate({
      duration: 2000,
      style: ImpactStyle.Medium,
    });

    console.log('Vibration completed');
  } catch (error) {
    console.error('Error triggering vibration:', error);
  }
};

window.hey = triggerVibration;


function triggerVibration() {
  hapticsVibrateMedium();
  console.log("Recieved")
}

import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

function ngOnInit() {

  // Request permission to use push notifications
  // iOS will prompt the user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
      console.error('Permission to receive push notifications not granted.');
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token) => {
      console.log('Push registration success, token: ' + token.value);
      window.token = token.value
      sendTokenToServer(token.value);
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
        alert('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification) => {
      alert('Push action performed: ' + JSON.stringify(notification));  
    }
  );
}


function sendTokenToServer(token) {
  // Replace the URL with your server endpoint
  const serverUrl = 'http://141.145.202.202:3001/noti-token';
  // Send the token to your server using fetch
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message.includes('Setup Required')) {
          window.setupneeded = true
      } else {
        window.setupneeded = false
      }
    })
    .catch(error => {
      console.error('Error sending token to server:', error);
    });
}

ngOnInit();

function displayHtmlContent(htmlContent) {

  const div = document.createElement('div');
  div.innerHTML = htmlContent;

  document.body.appendChild(div);

}
