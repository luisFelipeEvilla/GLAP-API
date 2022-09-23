import express from "express";

const router = express.Router();

router.post('/', (req, res) => {
    const { ...user } = req.params;    
})

export default router;
