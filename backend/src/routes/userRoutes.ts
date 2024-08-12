import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// router.post('/create', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = new User({ email, password });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(400).json({ error: error.message });
//   }
// })

export default router;