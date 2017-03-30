var express = require('express');
var bodyParser = require('body-parser');
var smsClient = require('twilio')(
	'ACd787fd89ceb7d642dd3b739cb72f935c',
	'31d6775f34be5b66790c87687efa4270'
);

var sendNotification = require('./fireBase/notification.js');

var app = express();
app.use(bodyParser.json());

var queue = [];
var notificationTimers = [];
var numberOfMonitors = 5;
var notificationTimeoutInMinutes = 5;

app.set('port', (process.env.PORT || 5000));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/notify', function(request, response) {
    sendNotification(request.body.token);
    response.json({a: 'hello'});
});

app.get('/testInitData', function(request, response){
    for (var i=0;i < (numberOfMonitors+2);i++) {
        requestMonitor({
            id: '3300876' + i + i + i,
            phone: '050777877' + i + i + i,
            fullName: 'Pregnant lady ' +i
        });
    }
   response.json(queue);
});

/*
Get entire queue ordered by who is called next
 */
app.get('/queue', function(request, response){
   response.json(queue);
});

/*
 Return indication whether there is an available chair
 */
app.get('/queue/status', function(request, response){
	let isAvailable = { isAvailable: (queue.length-1 < numberOfMonitors)};
	response.json(isAvailable);
});

/*
Add a new user to the end of the queue
 */
app.post('/queue', function(request, response) {
	var newRequest = request.body;
	if (getFromQueueByID(newRequest.id) !== null) {
		response.status(405).send({ error: "User " + newRequest.id+ " already registered." });
		return;
	};
	requestMonitor(newRequest);
	response.json(newRequest);
});
/*
 Clears the entire queue and all timers.
 */
app.delete('/queue', function(request, response){
	queue = [];
	for (id in notificationTimers) {
		clearTimeout(notificationTimers[id]);
		delete notificationTimers[id];
	}
	notificationTimers = [];
	response.json(queue);
});

/*
Update the queue configuration. Set the numberOfMonitors and notificationTimeoutInMinutes parameters
 */
app.put('/queue/config', function(request, response){
	let configData = request.body;
	if(configData.numberOfMonitors !== undefined) {
		numberOfMonitors = configData.numberOfMonitors;
	}
	if(configData.notificationTimeoutInMinutes !== undefined) {
		notificationTimeoutInMinutes = configData.notificationTimeoutInMinutes;
	}
	response.json({});
});
/*
Removes a user from the queue
 */
app.delete('/queue/:id', function(request, response){
   let id = request.params.id;
   deleteUser(id);
   response.json({});
});
/*
Move user a place up in the queue
 */
app.put('/queue/up/:id', function(request, response){
   let id = request.params.id;
   for (index in queue) {
      if (queue[index].id === id) {
         if (index == 0) {
             break;
            } else {
             let user = queue[index];
            // remove from queue
             queue.splice(index,1);
             // add back to queue
            queue.splice(index-1, 0, user);
         }
      }
   }
   response.json(queue);
});
/*
Move user to the top of the queue
 */
app.put('/queue/top/:id', function(request, response){
	let id = request.params.id;
	for (index in queue) {
		if (queue[index].id === id) {
			if (index == 0) {
				break;
			} else {
				let user = queue[index];
				// remove from queue
				queue.splice(index,1);
				// add back to queue
				queue.splice(0, 0, user);
			}
		}
	}
	response.json(queue);
});
/*
Move user down in queue
 */
app.put('/queue/down/:id', function(request, response){
    let id = request.params.id;
    for (index in queue) {
        if (queue[index].id === id) {
            if (index == queue.length-1) {
               break;
            } else {
                let user = queue[index];
                // remove from queue
                queue.splice(index,1);
                // add back to queue
                queue.splice(index+1, 0, user);
            }
        }
    }
   response.json(queue);
});

/*
Get first user that has not been notified from queue queue and notify
*/
app.put('/queue/notify', function(request, response){
    // find first user without notification time
    let user = {};
    for (index  in queue) {
        if (queue[index].notificationTime === undefined) {
            user = queue[index];
	        notifyUser(user);
	        break;
        }
    }
    response.json(queue);
});
/****************************************************************************
 * M E T H O D S
*****************************************************************************/

/*
Send a request for a monitor, returns true if available and false if queued
 */
function requestMonitor(user) {
	user.registrationTime = new Date();
	queue.push(user);
	if (queue.length-1 < numberOfMonitors) {
		startTimerUser(user);
        return true;
    }
    return false;
}
/*
Removes the user properly, both the timeout of the notification and from the queue
 */
function deleteUser(id) {
	// removing timeout in case we have it
	if (notificationTimers[id]) {
		clearTimeout(notificationTimers[id]);
	    delete notificationTimers[id];
	}
	for (index in queue) {
		if (queue[index].id === id) {
			queue.splice(index,1);
			break;
		}
	}
}
/*
Starts the timer for the user to get to the monitor. sets the end time on the user objectp
 */
function startTimerUser(user) {
	let endTime = new Date();
	user.notificationTime = new Date(endTime.setMinutes(endTime.getMinutes() + 5));
	let timeout  = setTimeout(timeOutDelete, notificationTimeoutInMinutes * 60 * 1000, user.id);
	notificationTimers[user.id] = timeout;
}
/*
// TODO - use for push notification
 */
function notifyUser(user) {
    startTimerUser(user);
    console.log('notifying user ' + JSON.stringify(user) + '...');
	sendSms(user.phone);
}
/*
Send SMS to number
 */
function sendSms(phone) {
	let intlPhoneNo = "+972" + phone.substring(1);
	smsClient.messages.create({
		from: '+18058521995',
		to: intlPhoneNo,
		body: "Moni-tor. It's your turn!"
	}, function(err, message) {
		if(err) {
			console.error(err.message);
		}
	});
}
/*
Callback from the timeout
 */
function timeOutDelete(id) {
    deleteUser(id);
}
/*
Get the user from the queue by ID
 */
function getFromQueueByID(id) {
   for (index in queue) {
      if (queue[index].id === id) {
         return queue[index];
      }
   }
   return null;
}
