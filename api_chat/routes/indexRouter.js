"use strict";


import express from 'express';
const router = express.Router();


/* GET lotOutgoing listing. */
router.get('/', (req, res) => {
    res.json("Successfully connect to chat api")
});

/* POST Create lotOutgoing */
// router.post('/',            LotOutgoingController.create);

/* PUT Update lotOutgoing */
// router.put('/:id',          LotOutgoingController.update);

/* DELETE lotOutgoing */
// router.delete('/:id',       LotOutgoingController.delete);

export default router;
