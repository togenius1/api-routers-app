// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath: string) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());

    return data;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CustomResponse>
) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback: FeedbackType = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText,
        };

        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(newFeedback);

        fs.writeFileSync(filePath, JSON.stringify(data));

        const successResponse: SuccessResponse = {
            message: 'Success',
            feedback: newFeedback,
        };

        res.status(201).json(successResponse);
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        const response: CustomResponse = {
            message: 'This works!',
            feedback: data,
        };

        res.status(200).json(response);
    }
}

//################### Type ##################
export type FeedbackType = {
    id: string;
    email: string;
    text: string;
};

type SuccessResponse = {
    message: string;
    feedback: FeedbackType;
};

type ErrorResponse = {
    errorMessage: string;
};

type CustomResponse = SuccessResponse | ErrorResponse;
