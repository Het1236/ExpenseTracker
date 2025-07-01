import React, { useEffect, useState } from 'react';
import './ExpenseTracker.css'; // Link to external dark-theme CSS

function ExpenseTracker() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    amount: '',
    category: '',
    remark: ''
  });

  // Recalculate total balance whenever transactions update
  useEffect(() => {
    let balance = 0;
    for (let i = 0; i < transactions.length; i++) {
      const amount = parseInt(transactions[i].amount);
      if (transactions[i].category === "Credit") balance += amount;
      else balance -= amount;
    }
    setTotalBalance(balance);
  }, [transactions]);

  // Handle changes in input fields
  const handleChange = (e) => {
    setCurrentInput({ ...currentInput, [e.target.name]: e.target.value });
  };

  // Add or update transaction
  const handleSubmit = () => {
    const { amount, category, remark } = currentInput;
    const updatedTransactions = [...transactions];
    if (amount && category && remark) {
      if (editIndex != null) {
        updatedTransactions[editIndex] = currentInput;
        setEditIndex(null);
      } else {
        updatedTransactions.push(currentInput);
      }
      setTransactions(updatedTransactions);
      setCurrentInput({ amount: '', category: '', remark: '' });
    } else {
      alert('Please fill all fields!');
    }
  };

  // Delete transaction by index
  const handleDelete = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  // Populate fields for editing
  const handleEdit = (index) => {
    const selectedTransaction = transactions[index];
    setCurrentInput(selectedTransaction);
    setEditIndex(index);
  };

  return (
    <div className="dark-theme">
      <center>
        <h1 className="fs-1 bg-body-secondary heading">Expense Tracker</h1>
      </center>

      <div className="container text-center my-5">
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="card card-dark">
              <h5 className="card-header">Manage Your Expense</h5>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                    name="amount"
                    value={currentInput.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    name="category"
                    value={currentInput.category}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="Debit">Debit</option>
                    <option value="Credit">Credit</option>
                  </select>
                </div>

                <div className="input-group">
                  <span className="input-group-text">Remark</span>
                  <textarea
                    className="form-control"
                    name="remark"
                    value={currentInput.remark}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-light my-3 submit-btn"
                  onClick={handleSubmit}
                >
                  {editIndex !== null ? 'Update Transaction' : 'Add Transaction'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-12">
            <div className="card card-dark">
              <h5 className="card-header">Transactions</h5>
              <div className="card-body">
                <h4 className="mb-3 text-warning">Total Balance: ₹{totalBalance}</h4>
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Amount (₹)</th>
                      <th>Category</th>
                      <th>Remark</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((val, index) => (
                        <tr key={index}>
                          <td>{val.amount}</td>
                          <td>{val.category}</td>
                          <td>{val.remark}</td>
                          <td>
                            <button
                              className="btn btn-outline-info m-2 action-btn"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger action-btn"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No transactions added yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
