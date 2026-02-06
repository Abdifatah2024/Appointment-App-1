// const express = require("express");
// const router = express.Router();

// // Controllers
// const {
//   createCustomer,
//   getCustomers,
//   getCustomerById,
//   updateCustomer,
//   deleteCustomer,
//   deleteCustomerPermanent,
//   searchCustomers,
// } = require("../../controller/Customer/customerController");
// const { authMiddleware } = require("../../middlewares/auth.middleware");


// router.post(
//   "/",
//   createCustomer
// );

// router.get(
//   "/",
//   getCustomers
// );

// router.get("/search", searchCustomers);


// router.get(
//   "/:id",
//   getCustomerById
// );


// router.put(
//   "/:id",
//   updateCustomer
// );

// router.delete(
//   "/:id",
//   deleteCustomer
// );



// router.delete(
//   "/:id/permanent",
//   authMiddleware,
//   // authorize("ADMIN"), 
//   deleteCustomerPermanent
// );

// module.exports = router;
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
  searchCustomers,
} = require("../../controller/Customer/customerController");

const { authMiddleware } = require("../../middlewares/auth.middleware");

/* =========================
   SEARCH (MUST BE FIRST)
========================= */
router.get("/search", searchCustomers);

/* =========================
   CRUD
========================= */
router.post("/", createCustomer);
router.get("/", getCustomers);

router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

router.delete(
  "/:id/permanent",
  authMiddleware,
  deleteCustomerPermanent
);

module.exports = router;

