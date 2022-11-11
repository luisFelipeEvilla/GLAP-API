import { Router } from "express";
import { getUsers } from "../../controllers/userController";

const router = Router();

router.get("/", async (req, res, next) => {
    const { index , offset} = req.query as { index: string, offset: string};

    try {
        const result = await getUsers({role: 0}, parseInt(index), offset ? parseInt(offset) : undefined);
        
        result.forEach(user => {
            user.password = "";
        });

        res.json(result);;
    } catch (error) {
        next(error);
    }
});

export default router;