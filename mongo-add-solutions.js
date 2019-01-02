'use strict'
const log = console.log

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

// // Object 'destructuring'
// const student = {name: 'Jimmy', year: 3}
// const {name} = student
// log(name)
const Solutions = require('../models/solution');

/// Connect to the local mongo database

MongoClient.connect('mongodb://test:csc309@ec2-35-183-8-133.ca-central-1.compute.amazonaws.com:27017/', (error, client) => {
	if (error) {
		return log('error connecting')
	} else {
		log('Connected to mongo server')
	}

	const db = client.db('test_db')

	// db.collection.createIndex(_id, options)
	// // Create a student collection and insert a document into it
	// db.collection('solutions').insertOne({

	// 	dept: 'CSC',
	// 	courseNumber: 309,
	// 	year: 2016,
	// 	term: 'Fall',
	// 	type: 'Midterm',
	// 	professor: 'Ken Jackson',
	// 	author: 'jellycsc',
	// 	fileId: 'Solution1.pdf'
	// }, (error, result) => {
	// 	if (error) {
	// 		log("can't insert solution")
	// 	} else {
	// 		log(result.ops) // .ops has all the documents added
	// 		log(result.ops[0]._id.getTimestamp())
	// 	}
	// })

	db.collection('solutions').insertOne({

		dept: 'CSC',
		courseNumber: 309,
		year: 2017,
		term: 'Fall',
		type: 'Final',
		professor: 'Ken Jackson',
		author: 'Cosmos',
		fileId: 'Solution2.pdf'
	}, (error, result) => {
		if (error) {
			log("can't insert solution")
		} else {
			log(result.ops) // .ops has all the documents added
			log(result.ops[0]._id.getTimestamp())
		}
	})


	// db.collection('solutions').insertOne({

	// 	dept: 'CSC',
	// 	courseNumber: 309,
	// 	year: 2017,
	// 	term: 'Winter',
	// 	type: 'Midterm',
	// 	professor: 'David Liu',
	// 	author: 'Claire',
	// 	fileId: 'Solution3.pdf'
	// }, (error, result) => {
	// 	if (error) {
	// 		log("can't insert solution")
	// 	} else {
	// 		log(result.ops) // .ops has all the documents added
	// 		log(result.ops[0]._id.getTimestamp())
	// 	}
	// })

	// db.collection('solutions').insertOne({

	// 	dept: 'CSC',
	// 	courseNumber: 309,
	// 	year: 2016,
	// 	term: 'Winter',
	// 	type: 'Midterm',
	// 	professor: 'Ken Jackson',
	// 	author: '17Singer',
	// 	fileId: 'Solution4.pdf'
	// }, (error, result) => {
	// 	if (error) {
	// 		log("can't insert solution")
	// 	} else {
	// 		log(result.ops) // .ops has all the documents added
	// 		log(result.ops[0]._id.getTimestamp())
	// 	}
	// })

	// // close the connection
	client.close()


})