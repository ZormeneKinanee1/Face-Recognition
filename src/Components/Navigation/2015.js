const fs = require('fs'); 



fs.readFile('./input.txt', (err,data)=>{
	console.time("fun challenge")
	if(err)
	{
		console.log('error');
	}
	console.log(data.toString('utf8')); 
	console.timeEnd("fun challenge")
})



