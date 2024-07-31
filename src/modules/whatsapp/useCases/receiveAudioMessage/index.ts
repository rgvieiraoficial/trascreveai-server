import { ReceiveAudioMessageUseCase } from './ReceiveAudioMessageUseCase';

import { ReceiveAudioMessageController } from './ReceiveAudioMessageController';

const receiveAudioMessageUseCase = new ReceiveAudioMessageUseCase();

const receiveAudioMessageController = new ReceiveAudioMessageController(receiveAudioMessageUseCase);

export { receiveAudioMessageController };