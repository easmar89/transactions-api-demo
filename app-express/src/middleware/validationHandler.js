const isUuid = require("is-uuid");

function validateParamUuid(req, res, next) {
  const { account_id } = req.params;
  if (account_id && !isUuid.v4(account_id)) {
    return res.status(400).json({ error: "Invalid UUID" });
  }
  next();
}

function validateTransactionId(req, res, next) {
  const { transaction_id } = req.params;
  if (transaction_id && !isUuid.v4(transaction_id)) {
    return res.status(400).json({ error: "Invalid UUID" });
  }
  next();
}

function validateBodyUuid(req, res, next) {
  const { account_id } = req.body;
  if (account_id && !isUuid.v4(account_id)) {
    return res.status(400).json({ error: "Invalid UUID" });
  }
  next();
}

function validateAmount(req, res, next) {
  const { amount } = req.body;
  if (amount && isNaN(amount)) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  next();
}

module.exports = {
  validateParamUuid,
  validateTransactionId,
  validateBodyUuid,
  validateAmount,
};
