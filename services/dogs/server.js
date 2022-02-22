'use strict';

const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World1111');
});

app.get('/dogs', async (req, res) => {
	const dogs = await prisma.dog.findMany({
		orderBy: {
			id: 'asc'
		}
	});
	res.status(200).json(dogs);
});

app.post('/dog/add', async (req, res) => {
	const dog = await prisma.dog.create({ data: req.body });
	res.status(200).json(dog);
});

app.patch('/dog/update/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	
	const dog = await prisma.dog.update({
		where: { id: id },
		data: req.body,
	});
	res.status(200).json(dog);
});

app.delete('/dog/delete/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const dog = await prisma.dog.delete({
		where: { id: id }
	});
	res.status(200).json(dog);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);