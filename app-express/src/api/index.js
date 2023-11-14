const express = require("express");
const transactionController = require("../controllers/transactionController");
const accountController = require("../controllers/accountController");
const {
  validateParamUuid,
  validateTransactionId,
  validateBodyUuid,
  validateAmount,
} = require("../middleware/validationHandler");

const router = express.Router();

router
  .route("/transactions")
  .get(transactionController.getTransactions)
  .post(validateBodyUuid, validateAmount, transactionController.addTransaction);

router
  .route("/transactions/:transaction_id")
  .get(validateTransactionId, transactionController.getTransactionById);

router
  .route("/accounts/:account_id")
  .get(validateParamUuid, accountController.getAccount);

router.get("/ping", (req, res) => res.send("pong"));

module.exports = router;
