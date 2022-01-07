import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest } from '../middlewares/validate-request';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { checkDateFormat, toDateFromYYYYMMDD } from '../util/utils';
import { Record } from '../models/record';

const router = express.Router();

router.post(
    '/api/challenge',
    [
        body('startDate').custom((value, {req}) => checkDateFormat(value)).withMessage('Date format is not valid.'),
        body('endDate').custom((value, {req}) => checkDateFormat(value)).withMessage('End Date is not valid.'),
        body('minCount').not().isEmpty().withMessage('Min Count is required'),
        body('maxCount').not().isEmpty().withMessage('Max Count is required'),
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { startDate, endDate, minCount, maxCount } = req.body;
        try {
            let results = await Record.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: toDateFromYYYYMMDD(startDate), $lte: toDateFromYYYYMMDD(endDate)
                        }
                    }
                },
                {
                    $project: {
                        key: 1,
                        createdAt: 1,
                        counts: 1
                    }
                }
            ]);
    
            let minCountInt = parseInt(minCount);
            let maxCountInt = parseInt(maxCount);
            let records: object[] = [];
            results.forEach((result) => {
                var totalCount: number = 0;
                if (result.counts) {
                    result.counts.forEach((count: number) => {
                        if (count > minCountInt && count < maxCountInt) {
                            totalCount += count;
                        }
                    });
                }
                
                if (totalCount > 0) {
                    records.push({
                        key: result.key,
                        createdAt: result.createdAt,
                        totalCount: totalCount
                    });
                }
            });
            
            res.send({
                code: '0',
                msg: 'Success',
                records: records
            });
        } catch(e) {
            res.send({
                code: '1',
                msg: 'error',
                records: []
            });
        }
    }
)

export { router as challengeRouter }