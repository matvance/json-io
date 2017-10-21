const express = require('express');
const fs = require('fs');
const app = express();
let database = {};

function printUsers () {
	for(let i = 0; i < database.users.length; i++){
		console.log("User " + database.users[i].name + " with password " + database.users[i].password);
	}	
};

function loadDatabase (callback) {
	fs.readFile('./db.json', 'utf8', function (err, data) {
		if (err) console.log(err);
		callback(JSON.parse(data));
		
	});
};

function writeDatabase (callback) {
	fs.writeFile('./db.json', JSON.stringify(database), function (err) {
		if (err) console.log(err);
		callback();
	});
}

function addUser (name, password) {
	database.users.push({
		"name": name,
		"password": password
	});
}

loadDatabase(function (data) {
	database = data;
	printUsers();
	addUser("User" + (database.users.length + 1), "Password123");
	writeDatabase(function () {
		console.log('DB written');
	});
});
