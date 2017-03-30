var admin = require("firebase-admin");

var serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moni-tor.firebaseio.com"
    });

    // This registration token comes from the client FCM SDKs.
//var registrationToken = "fmH08v1XQOo:APA91bH1ZmAQEsKQGlw9gKWwZ_Ryrr1ZCFlkbIOI7VPuaoTbA5tzSVM5RwyZRFKpkDZfjs-5tn_cNQHXWAQyNMmdwI8MkTGZOmkOJCXjjcq_BWRKsag80_wAFR9HbQll_aNRLSTB4-7n";

function sendNotification(token) {

    //var token = 'fmH08v1XQOo:APA91bH1ZmAQEsKQGlw9gKWwZ_Ryrr1ZCFlkbIOI7VPuaoTbA5tzSVM5RwyZRFKpkDZfjs-5tn_cNQHXWAQyNMmdwI8MkTGZOmkOJCXjjcq_BWRKsag80_wAFR9HbQll_aNRLSTB4-7n';

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
    data: {
        title: "MONI-TOR",
        msg: "It's time to go to monitor",
        sub_text: ""
    }
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    if (typeof token === 'undefined' ) {
        return false;
    }
    admin.messaging().sendToDevice(token, payload)
    .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
        console.log("Error sending message:", error);
    });
}

module.exports = sendNotification;
