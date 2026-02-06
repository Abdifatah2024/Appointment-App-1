const express = require("express");
const router = express.Router();

// Controllers
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  deleteCustomerPermanent,
} = require("../../controller/Customer/customerController");
const { authMiddleware } = require("../../middlewares/auth.middleware");


router.post(
  "/",
  createCustomer
);

router.get(
  "/",
  getCustomers
);


router.get(
  "/:id",
  getCustomerById
);


router.put(
  "/:id",
  updateCustomer
);

router.delete(
  "/:id",
  deleteCustomer
);



router.delete(
  "/:id/permanent",
  authMiddleware,
  // authorize("ADMIN"), 
  deleteCustomerPermanent
);

module.exports = router;
