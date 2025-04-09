const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  console.log("Session Value: ", req.session);
    res.render("store/index", {
      pageTitle: "Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user,
    });
 
};

exports.getstaff = (req, res, next) => {
  console.log("Session Value: ", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/ourstaff", {
      registeredHomes: registeredHomes,
      pageTitle: "ourstaff",
      currentPage: "ourstaff",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user,
    });
  });
};



exports.staff = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/staff", {
      registeredHomes: registeredHomes,
      pageTitle: "staff",
      currentPage: "staff",
      isLoggedIn: req.isLoggedIn, 
      user: req.session.user,
    });
  });
};

exports.getFacilities = (req, res, next) => {
  res.render("store/facilities", {
    pageTitle: "facilities",
    currentPage: "facilities",
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};

exports.Appointments = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/Appointments", {
    favouriteHomes: user.favourites,
    pageTitle: "Appointments",
    currentPage: "Appointments",
    isLoggedIn: req.isLoggedIn, 
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/Appointments");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect("/Appointments");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/staff-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn, 
        user: req.session.user,
      });
    }
  });
};
