"use strict";


export class Chat {

    static all(req, res) {
        ConnectionFactory.connect();

        const { melting, left } = req.query;

        let query = {};

        if (melting) {
            if (melting.gt && !isNaN(melting.gt)) {
                query['weight.melting'] = { $gt: melting.gt }
            } else if (melting.lt) {
                query['weight.melting'] = { $lt: melting.lt }
            } else if (!isNaN(melting)) {
                query['weight.melting'] = { $eq: melting }
            }
        }
        
        if (left) {
            if (left.gt && !isNaN(left.gt)) {
                query['weight.left'] = { $gt: left.gt }
            } else if (left.lt && !isNaN(left.lt)) {
                query['weight.left'] = { $lt: left.lt }
            } else if (!isNaN(left)) {
                query['weight.left'] = { $eq: left }
            }
        }
        
        LotEntranceModel.find(query, (err, lots) => {
            if (err) return handleError(err);
            res.json(lots);
        });
    }

}
