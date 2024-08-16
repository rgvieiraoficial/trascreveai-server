import { ContactsRepository } from '../../repositories/implementations/ContactsRepository';

import { ListContactsUseCaseUseCase } from './ListContactsUseCaseUseCase';

import { ListContactsController } from './ListContactsController';

const contactsRepository = new ContactsRepository();

const listContactsUseCaseUseCase = new ListContactsUseCaseUseCase(contactsRepository);

const listContactsController = new ListContactsController(listContactsUseCaseUseCase);

export { listContactsController };