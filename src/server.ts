import dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.port || 3000;

interface User {
	id: string;
	username: string;
}

interface Message {
	id: string;
	text: string;
	userId: string;
}

const users: Record<string, User> = {
	'1': {
		id: '1',
		username: 'Robin Wieruch',
	},
	'2': {
		id: '2',
		username: 'Dave Davids',
	},
};

const messages: Record<string, Message> = {
	'1': {
		id: '1',
		text: 'Hello World',
		userId: '1',
	},
	'2': {
		id: '2',
		text: 'By World',
		userId: '2',
	},
};

app.get('/users', (req, res) => {
	return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
	return res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
	return res.send(Object.values(messages));
});

app.get('/messages/:messageId', (req, res) => {
	return res.send(messages[req.params.messageId]);
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
