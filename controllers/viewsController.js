const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");

exports.getOverview = catchAsync(async (req, res, next) => {
  // console.log(res.locals);
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // console.log(req.connection.remoteAddress);

  // 3) Render that template using tour data from 1

  res.status(200).render("overview", {
    // This object is called the globals
    title: "All Tours",
    tours,
    globalsTest: "LOLOLO Arian may 27 Aylin serge",
    // dangerous tools
    // ip: req.connection.remoteAddress,
    // ip2: req.headers["x-forwarded-for"],
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get  the data, for requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }

  // 2) Build template

  // 3) Render template from 1)
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview", {
    title: "My Tours",
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      // Remember, NEVER update a password
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render("account", {
    title: "Your account",
    user: updatedUser,
  });
});
