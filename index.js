class Account {

  constructor(username) {
    this.username = username;
    // have the account balance start at $0 since that makes more sense.
    //this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    // calculate balance using transaction objects..
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    //this.account.balance += this.value;
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction..
    this.time = new Date();
    // Add the transaction to the account..
    this.account.addTransaction(this);
    return true;
  }
}


class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');
//const myAccount = new Account();

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(150.00, myAccount);
console.log('Commit result:', t1.commit());
//t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(50.00, myAccount);
console.log('Commit result:', t2.commit());
//t2.commit();
console.log('Transaction 2:', t2);

console.log('Ending Balance:', myAccount.balance);
console.log('Account Transaction History:', myAccount.transactions);
