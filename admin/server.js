var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var queue = [];

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

app.get('/test', function(request, response){
   response.json({a: '1', b:'2', c:'hello world local'})
});


app.get('/queue', function(request, response){
   response.json(queue);
});

app.get('/queue/:id', function(request, response){
    let id = request.params.id;
    response.json(getFromQueueByID(id));
});

app.post('/queue', function(request, response) {
   var newRequest = request.body;
   if (checkIdInQueue(newRequest.id)) {
     response.status(405).send({ error: "User already registered." });
     return; 
   };
   newRequest.registrationTime = new Date();
   queue.push(newRequest);
   response.json(newRequest);
});


app.delete('/queue/:id', function(request, response){
   let id = request.params.id;
    for (index in queue) {
        if (queue[index].id === id) {
            queue.splice(index,1);
            break;
        }
    }
   response.json({});
});

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
Notify a specific user to come to the monitor
*/
app.put('/queue/notify/:id', function(request, response){
   let id = request.params.id;
});
/*
Pop from the queue and notify the user
*/
app.put('/queue/notify', function(request, response){
   let id = request.params.id;
});

function notifyUser(user) {
    // set notification time and start timer
    // send notification
}

function getFromQueueByID(id) {
   for (index in queue) {
      if (queue[index].id === id) {
         return queue[index];
      }
   }
   return null;
}

function checkIdInQueue(id) {
   for (index in queue) {
      if (queue[index].id === id) {         
         return true;
      }
   }
   return false;
}
