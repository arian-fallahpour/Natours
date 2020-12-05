const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/checkout-session/:tourId",
  authController.protect,
  bookingController.getCheckoutSession
);

router.use(authController.protect);

router.route("/").get(bookingController.getAllBookings);

router.use(authController.restrictTo("admin", "lead-guide"));

router
  .route("/:id")
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking)
  .get(bookingController.getBooking);
module.exports = router;
