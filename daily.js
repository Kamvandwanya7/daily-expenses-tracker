module.exports = function DailyExpense(db) {

  async function setNames(name, sname, email, code) {
    await db.none('INSERT INTO usernames(first_name, last_name, email, user_code) values($1, $2, $3, $4)', [name, sname, email, code])
  }


  async function getNames() {
    let result = await db.oneOrNone('SELECT first_name FROM usernames WHERE first_name = $1')
    console.log(result)
    return result;
  }


  async function setExpense(category_id, amount, date) {
    await db.none('INSERT INTO expenses(category_id, amount, expense_date) values($1, $2, $3)', [category_id, amount, date])
  }

 
  async function usersExpense(name){
    await db.none("select * from expense where first_name = $1", [name])

  }
  async function getExpense() {
    let result = await db.manyOrNone('SELECT category_id, amount, expense_date FROM expenses ORDER BY expense_date')
    // console.log(result)
    return result
  }

  async function showAll(){
    let result= await db.manyOrNone('SELECT * FROM expenses')
    console.log(result)
    return result;
  }

  async function getCategories(){
    let result = await db.manyOrNone('SELECT * FROM categories')
    return result;
  }

  async function getTotal(){
  let result = await db.manyOrNone ('SELECT SUM(amount) as Total Vlaue FROM expenses WHERE category_id=1');
  return result;
  }

  return {
    setNames,
    getNames,
    setExpense,
    setExpense,
    usersExpense,
    getExpense,
    showAll,
    getCategories,
    getTotal
  }
}