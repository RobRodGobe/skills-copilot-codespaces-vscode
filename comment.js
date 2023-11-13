const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Simulated database (in-memory data)
const comments = [
  { id: 1, text: 'This is a great post!' },
  { id: 2, text: 'I have a comment too!' },
];

// Comment Controller
const commentController = {
  getAllComments: (req, res) => {
    res.json(comments);
  },
  getCommentById: (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find((c) => c.id === id);

    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  },
  createComment: (req, res) => {
    const { text } = req.body;
    const newComment = { id: comments.length + 1, text };
    comments.push(newComment);
    res.status(201).json(newComment);
  },
};

// Routes
const router = express.Router();

router.get('/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);
router.post('/comments', commentController.createComment);

// Use the router for all routes starting with /api
app.use('/api', router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
