const express = require('express');
const { MongoClient } = require('mongodb');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const uri = 'mongodb+srv://commentsfb:yI1bCB1LuGAcT8AZ@cluster0.vluc0bi.mongodb.net/?retryWrites=true&w=majority'; 


app.get('/api/comments', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('commentsbox');
    const collection = db.collection('comments');

    const comments = await collection.find().toArray();
    console.log(comments);
    res.json({ comments });

    await client.close();
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get('/api/comments/count', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('commentsbox');
    const collection = db.collection('comments');

    const commentCount = await collection.countDocuments();
    res.json({ count: commentCount });

    await client.close();
  } catch (error) {
    console.error('Ошибка при получении количества комментариев:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.get('/api/comments/pending-count', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('commentsbox');
    const collection = db.collection('comments');

    const pendingCount = await collection.countDocuments({ replied: false });
    
    res.json({ count: pendingCount });

    await client.close();
  } catch (error) {
    console.error('Ошибка при получении количества неотвеченных комментариев:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/check-comment-replied', async (req, res) => {
  const { commentId, replyText } = req.body;

  try {
    if (!commentId || !replyText) {
      res.json({ replied: false });
      console.log('Отсутствует идентификатор комментария или текст ответа');
      return;
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('commentsbox');
    const collection = db.collection('comments');
    const existingComment = await collection.findOne({ commentId });

    if (existingComment) {
      res.json({ replied: true });
      console.log('Комментарий уже существует');
    } else {
      await collection.insertOne({ commentId, replyText, replied: true });
      res.json({ replied: false });
      console.log('Новый комментарий добавлен');
    }

    await client.close();
  } catch (error) {
    console.error('Ошибка при проверке комментария:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(443, () => {
  console.log('Сервер запущен на порту 3000');
});