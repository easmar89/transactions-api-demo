const transactionController = require("../controllers/transactionController");
const transactionModel = require("../models/transactionModel");

jest.mock("../models/accountModel", () => ({
  updateBalance: jest.fn(),
}));

describe("Transaction Controller", () => {
  describe("getTransactions", () => {
    test("should return 200 status code", () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      transactionController.getTransactions(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    test("should return correct transactions array", () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockTransactions = [
        { id: "1", amount: 100 },
        { id: "2", amount: 200 },
      ];

      jest
        .spyOn(transactionModel, "getTransactions")
        .mockReturnValue(mockTransactions);

      transactionController.getTransactions(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockTransactions);
    });
  });

  describe("getTransactionById", () => {
    test("should return 200 when transaction is found", () => {
      const mockReq = { params: { transaction_id: "id" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockTransaction = { id: "someId", amount: 100 };

      jest
        .spyOn(transactionModel, "findTransactionById")
        .mockReturnValue(mockTransaction);

      transactionController.getTransactionById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTransaction);
    });

    test("should return 404 when no transaction is found", () => {
      const mockReq = { params: { transaction_id: "id" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(transactionModel, "findTransactionById").mockReturnValue(null);

      transactionController.getTransactionById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Transaction not found",
      });
    });
  });

  const { updateBalance } = require("../models/accountModel");

  describe("addTransaction", () => {
    test("should return 201 and add transaction", () => {
      const mockReq = { body: { account_id: "account_id", amount: 100 } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockNewTransaction = {
        transaction_id: "id",
        account_id: "account_id",
        amount: 100,
      };

      jest
        .spyOn(transactionModel, "addTransaction")
        .mockReturnValue(mockNewTransaction);

      transactionController.addTransaction(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNewTransaction);
    });

    test("should update account balance correctly", () => {
      const mockReq = { body: { account_id: "account_id", amount: 100 } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      transactionController.addTransaction(mockReq, mockRes);

      expect(updateBalance).toHaveBeenCalledWith("account_id", 100);
    });
  });
});
