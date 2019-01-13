var user = {
	queryPaper:'select * from testbase where Id in (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
	queryAll: 'select * from paper',
	queryTest: 'select * from testbase',
	updateGrade:'INSERT INTO grade(userName,userClass,tId,Grade,Time,userAnswer) VALUES(?,?,?,?,?,?)',
	allPaper: 'select * from paper'
};
 
module.exports = user;