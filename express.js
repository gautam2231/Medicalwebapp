var express = require('express');
var app = express();
app.set('view-engine' , 'ejs')

const http = require("http");

const port = 5000;


var mongoose = require("mongoose");
const bodyparser = require("body-parser");
const { info } = require('console');

var urlencodedParser = bodyparser.urlencoded({ extended: false });
app.use(urlencodedParser);
mongoose.connect(
  "mongodb+srv://DARSH_GAUTAM:DARSH_GAUTAM@newcluster.xrh2tnu.mongodb.net/?retryWrites=true&w=majority"
);


var userSchema = new mongoose.Schema({
  day: String,
  date: String,
  open_time: String,
  close_time: String,
  status: String,
});

var user = mongoose.model("user", userSchema);

app.post("/4.html", (req, res) => {
  let d = req.body;
  d["Status"] = "Pending";
  var mydata = new  user(d);
  mydata
    .save()
    .then(() => {
      res.sendFile(__dirname + "/4.html");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
  //res.status(200).render('node3.js');
});

var messageSchema = new mongoose.Schema({
  UID:String,
  Name:String,
  Message:String,
  Status: String
});

var message = mongoose.model("message", messageSchema);

app.post("/3.html", (req, res) => {
  let d = req.body;
  d["Status"] = "Pending";
  var mydata = new  message(d);
  mydata
    .save()
    .then(() => {
      res.sendFile(__dirname + "/3.html");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
  //res.status(200).render('node3.js');
});

var ResponseSchema = new mongoose.Schema({
  UID:String,
  Message:String
});

var Response = mongoose.model("Response", ResponseSchema);

app.post("/aditya", (req, res) => {
  let d = req.body;
  var mydata = new  Response(d);
  mydata
    .save()
    .then(() => {
      res.sendFile(__dirname + "/3.html");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the database");
    });
  //res.status(200).render('node3.js');
});

app.get('/' , function(req , res) {
    res.sendFile(__dirname + '/1.html')
})
app.get('/2.html' , function(req , res) {
    res.sendFile(__dirname + '/2.html');
})
app.get('/4.html' , function(req , res) {
  res.sendFile(__dirname + '/4.html')
})
app.get('/3.html' , function(req , res) {
  res.sendFile(__dirname + '/3.html')
})
app.get('/medical_status.html' , function(req , res){
  res.sendFile(__dirname + '/medical_status.html')

})




// app.get("/update/:complaint_id/:new_status", function (req, res, next) {
//   Contact.findOneAndUpdate(
//     { _id: req.params.complaint_id },
//     {
//       $set: {
//         Status: req.params.new_status,
//       },
//     }
//   )
//     .then((data) => {
//       console.log("Data is: " + data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.send("done.");
// });
// // object key pair ko curly brcakets smein

app.get("/update/:complaint_id/:new_status", function (req, res, next) {
  message.findOneAndUpdate(
    { _id: req.params.complaint_id },
    {
      $set: {
        Status: req.params.new_status,
      },
    }
  )
    .then((data) => {
      console.log("Data is: " + data);
    })
    .catch((err) => {
      console.log(err);
    });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("done.");
});


app.post("/find", (req, res) => {
  console.log(req.body.date)
  user.findOne({ date: req.body.date})
    .then((data) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log(data);
      if(data != null){
      res.render('mm.ejs',{'info':[data]})
      }
      else{
          res.sendFile(__dirname + '/Available.html')
      }
    })
    .catch(() => {
      console.log("error showed ");
    });
});

app.post("/findu", (req, res) => {
  console.log(req.body.UID)
  Response.findOne({ UID: req.body.UID})
    .then((data) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log(data)
      if(data == null){
        res.sendFile(__dirname + '/Available.html')
      }
      else{
      res.render('mmm.ejs',{'info':data})
      }
    })
    .catch(() => {
      console.log("error showed ");
    });
});


app.get("/aditya", (req, res) => {
  Response.find({})
    .then((data) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch(() => {
      console.log("error showed ");
    });
});
// app.get("/find", (req, res) => {
//   user.find({})
//     .then((data) => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.send(data);
//     })
//     .catch(() => {
//       console.log("error showed ");
//     });
// });


// app.get("/findall", (req, res) => {
//   message.find({})
//     .then((data) => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.send(data);
//     })
//     .catch(() => {
//       console.log("error showed ");
//     });
// });

app.get("/findall", (req, res) => {
  message.find({})
    .then((data) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch(() => {
      console.log("error showed ");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});