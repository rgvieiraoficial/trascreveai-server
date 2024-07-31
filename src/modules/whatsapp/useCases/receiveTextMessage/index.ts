import { ReceiveTextMessageUseCase } from './ReceiveTextMessageUseCase';

import { ReceiveTextMessageController } from './ReceiveTextMessageController';

const receiveTextMessageUseCase = new ReceiveTextMessageUseCase();

const receiveTextMessageController = new ReceiveTextMessageController(receiveTextMessageUseCase);

export { receiveTextMessageController };