// 模块一
// 黄志华 苏赞霞
// var UserSQL = {
// insert: 'INSERT INTO users(userName,passWord,Lever,userClass,Name,regTime,updataTime,Status) VALUES(?,?,?,?,?,?,?,?)',
// queryAll: 'SELECT * FROM User',
// getUserById: 'SELECT * FROM users WHERE userName = ? ',
// };
// module.exports = UserSQL;

// 模块二
// 杨二刚 动力强
// var UserSQL = {  
//     insert:'INSERT INTO Users(uid,userName) VALUES(?,?)', 
//     queryAll:'SELECT * FROM Users',  
//     getUserById:'SELECT * FROM Users WHERE uid = ? ',
//   };
// module.exports = UserSQL;

// 模块三
// 黄雄霞 何丹阳
// var UserSQL = {
// insert: 'INSERT INTO testbase(Question,Class,qOption,qLevel,Answer,Time) VALUES(?,?,?,?,?,?)',
// queryAll: 'SELECT * FROM testbase',
// queryone: 'SELECT * FROM testbase WHERE id = ? ',
// getUserByLC: 'SELECT * FROM testbase WHERE qLevel = ? AND Class =?',
// getUserByClass: 'SELECT * FROM testbase WHERE Class = ? ',
// delById: 'DELETE FROM testbase WHERE id= ?',
// update: 'update testbase set Question=?, Class=?, qOption=?, qLevel=?, Answer=? WHERE id =?',
// random: 'SELECT * FROM testbase where uid in (?,?,?,?,?)',
// selectPaper:'select * from testbase where id in (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
// paperInsert:'insert into paper(tId,Time) values(?,?)',
// paperQuery:'select * from paper'
// };

// module.exports = UserSQL;

// 用户中心
// 占志杰 包清和
var UserSQL = {
    insert: 'INSERT INTO users(userName,passWord) VALUES(?,?)',
    update: 'update users set passWord=? where userName=?',

    getUserById: 'SELECT * FROM users WHERE userName=?',

    queryQuestion: 'SELECT * FROM testbase WHERE id in (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    queryGrade: 'select * from grade where id = ?',
    queryTest: 'select * from testbase where Id in (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
};
module.exports = UserSQL;