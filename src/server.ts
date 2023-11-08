import dotenv from 'dotenv';
import express, { Express, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

let users: Record<string, User> = {
	'1': {
		id: '1',
		username: 'Robin Wieruch',
	},
	'2': {
		id: '2',
		username: 'Dave Davids',
	},
};

let messages: Record<string, Message> = {
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

interface CustomRequest extends Request {
	me?: User;
}

app.use((req: CustomRequest, res, next) => {
	req.me = users[1];
	next();
});

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

app.post('/messages', (req: CustomRequest, res) => {
	const id = uuidv4();
	const message = {
		id,
		text: req.body.text,
		userId: req.me?.id || '1',
	};

	messages[id] = message;

	return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
	const { [req.params.messageId]: message, ...otherMessages } = messages;

	messages = otherMessages;

	return res.send(message);
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
