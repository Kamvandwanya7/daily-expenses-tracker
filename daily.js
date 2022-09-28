module.exports = function DailyExpense(db) {

  async function setNames(name, sname, email) {
    await db.none('INSERT INTO usernames(first_name, last_name, email) values($1, $2, $3)', [name, sname, email])
  }


  async function getNames() {
    let result = await db.oneOrNone('SELECT first_name FROM usernames WHERE first_name = $1')
    console.log(result)
    return result;
  }


  async function setExpense(expense, amount, date) {
    await db.none('INSERT INTO expenses(category_des, amount, expense_date) values($1, $2, $3)', [expense, amount, date])
  }

 
  async function usersExpense(name){
    await db.none("select * from expense where first_name = $1", [name])

  }
  async function getExpense() {
    let result = await db.manyOrNone('SELECT id, category_des, amount, expense_date FROM expenses ORDER BY expense_date')
    // console.log(result)
    return result
  }

  async function showAll(){
    let result= await db.manyOrNone('SELECT * FROM expenses')
    console.log(result)
    return result;
  }


  return {
    setNames,
    getNames,
    setExpense,
    setExpense,
    usersExpense,
    getExpense,
    showAll
  }
}