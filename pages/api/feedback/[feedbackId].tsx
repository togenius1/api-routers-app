import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from '.';

function handler(req: NextApiRequest, res: NextApiResponse<CustomResponse>) {
    const feedbackId = req?.query?.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
        (feedback: { id: string }) => feedback.id === String(feedbackId)
    );

    const SuccessResponse: SuccessResponse = {
        message: 'Success',
        feedback: selectedFeedback,
    };

    res.status(200).json(SuccessResponse);
}

export default handler;

//################### Type ##################
type newFeedbackType = {
    id: string;
    email: string;
    text: string;
};

type SuccessResponse = {
    message: string;
    feedback: newFeedbackType;
};

type ErrorResponse = {
    errorMessage: string;
};

type CustomResponse = SuccessResponse | ErrorResponse;
