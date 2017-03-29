var admin = require("firebase-admin");

var serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moni-tor.firebaseio.com"
    });

    // This registration token comes from the client FCM SDKs.

function sendNotification(token) {

   

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
        data: {
            score: "850",
            time: "2:45"
        }
    };

    // Send a message to the device corresponding to the provided
    // registration token.
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