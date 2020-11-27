const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user")
const anniv = require('./anniv')

const port = 3000;

mongoose.connect("mongodb://localhost:27017/authentication_exercise",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const app = express();

// Express configuration

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable session management
app.use(
  expressSession({
    secret: "konexioasso07",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// enable Passport
app.use(passport.initialize());
app.use(passport.session());



// Passport configuration
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},User.authenticate()));
passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID

app.get("/", (req, res) => {
  console.log("GET /");
  res.render("home");
});

// app.get("/login", (req, res) => {
//   console.log("GET /");
//   console.log("votre mp ou mailest incorrect !")
//   res.render("login");
// });


app.get("/admin", async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('Vous etes connectez');
    //1er methode 
    const users = await User.find().lean()
   

    res.render('admin', {
      users,
      date: anniv(req.user.date)

    })
    //2 éme methode possible de lydia
    // res.render('admin', {
    //     surname: req.user.surname,
    //     username: req.user.username,
    //     firstName: req.user.firstName
    // })

  } else {
    res.redirect('/')
  }
  //next() au cas où si ça tourne en illimité sur google
});

app.get("/signup", (req, res) => {
  console.log("GET /signup");
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("signup");
  }
});


app.post("/signup", (req, res) => {
  console.log("POST /signup");
  console.log("will signup");
  const { username, firstName, surname, email, confirm_password, password, date } = req.body
  console.log('confirm_password:', confirm_password)
  console.log('password', password)

  User.register(new User({ username, firstName, surname, email, date }), password, (err, user) => {
    if (err) {
      console.log('err dans post signup :', err)
      return res.status(400).send('signup erreur !!')
    }

    let params = req.body.password;
    let cofpasw = req.body.confirm_password;

    if (cofpasw === params){
      console.log('ok ok ok ')
      passport.authenticate("local")(req, res, () => {
        console.log('coucou')
        res.redirect("/admin");

      });
      //       passport.authenticate('local',  { successFlash: 'Welcome !' }), (req, res)=> {

      //         console.log('coucou')
      //          res.redirect('/admin');
      // };
    } else {
      console.log("/signup user register err", err);
      return res.render("signup");
    }


  }
  );
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("login");
    console.log("non connected")
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
})

);

app.get("/logout", (req, res) => {
  console.log("GET /logout");
  req.logout();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port: ${port} ! `);
});

