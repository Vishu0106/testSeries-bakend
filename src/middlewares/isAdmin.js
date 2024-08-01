import {User} from '../models/user.model.js';

const isAdmin = async (req, res, next) => { 
    try {
        const user = await User.findById(req.user.id);
        if (!user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized as an admin' });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { isAdmin };