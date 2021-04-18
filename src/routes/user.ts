import { Router } from 'express';
import { authByToken } from '../middleware/auth';
import { getUserByEmail } from '../controllers/users';

const route = Router();

// GET /user
route.get('/', authByToken, async (req, res) => {
	try {
		const user = await getUserByEmail((req as any).user.email);
		if (!user) throw new Error('No such user found');
		return res.status(200).json(user);
	} catch (e) {
		return res.status(404).json({
			error: { body: [e.message] },
		});
	}
});

// PATCH /user
route.patch('/',authByToken, async (req, res, next) => {});

export const userRoute = route;
