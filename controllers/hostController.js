const Home = require("../models/home");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-doctor", {
    pageTitle: "Add Docor at Hospital",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Dr not found for editing.");
      return res.redirect("/host/host-dr-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-doctor", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-dr-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  console.log(houseName, price, location, rating, description);
  console.log(req.file);

  if (!req.file) {
    return res.status(422).send("No image provided");
  }

  const photo = req.file.path;

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  home.save().then(() => {
    console.log("DR Saved successfully");
  });

  res.redirect("/host/host-dr-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.description = description;

      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error while deleting file ", err);
          }
        });
        home.photo = req.file.path;
      }

      home
        .save()
        .then((result) => {
          console.log("Home updated ", result);
        })
        .catch((err) => {
          console.log("Error while updating ", err);
        });
      res.redirect("/host/host-dr-list");
    })
    .catch((err) => {
      console.log("Error while finding home ", err);
    });
};

// exports.postDeleteHome = (req, res, next) => {
//   const homeId = req.params.homeId;
//   console.log("Came to delete ", homeId);
//   Home.findByIdAndDelete(homeId)
//     .then(() => {
//       res.redirect("/host/host-dr-list");
//     })
//     .catch((error) => {
//       console.log("Error while deleting ", error);
//     });
// };
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then((home) => {
      if (home && home.photo) {
        // Delete the associated photo file
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error while deleting file: ", err);
          }
        });
      }
      console.log("Doctor deleted successfully.");
      res.redirect("/host/host-dr-list");
    })
    .catch((err) => {
      console.log("Error while deleting doctor: ", err);
      res.redirect("/host/host-dr-list");
    });
};