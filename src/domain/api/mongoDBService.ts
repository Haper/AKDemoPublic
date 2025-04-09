import clientPromise from "@/infrastructure/mongodb";
import type { Message, NewMessage } from "./Types";

const LAST_MESSAGES_COUNT = 10;

export const selectMessages = async (): Promise<Message[]> => {
  const client = await clientPromise;
  const db = client.db('demo');
  const messages = db.collection('messages');
  const result = await messages.find<Message>({}).toArray();
  return result;
};

export const selectLastMessages = async (lastMessagesCount = LAST_MESSAGES_COUNT): Promise<Message[]> => {
  const client = await clientPromise;
  const db = client.db('demo');
  const messages = db.collection('messages');
  const count = await messages.countDocuments();
  const result = await messages.find<Message>({}).skip(Math.max(0, count - lastMessagesCount)).toArray();
  return result;
};

export const insertMessage = async (message: NewMessage) => {
  const client = await clientPromise;
  const db = client.db('demo');
  const messages = db.collection('messages');
  const result = await messages.insertOne(message);
  return result;
};

const MongoDBService = {
  selectMessages,
  selectLastMessages,
  insertMessage,
};

export default MongoDBService;
