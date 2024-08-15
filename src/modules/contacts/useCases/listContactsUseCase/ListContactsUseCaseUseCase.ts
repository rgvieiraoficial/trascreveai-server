import { Contact } from '@prisma/client';

import { IContactsRepository } from '../../repositories/IContactsRepository';

class ListContactsUseCaseUseCase {

  constructor(
    private contactsRepository: IContactsRepository
  ) { }

  async execute(): Promise<Contact[]> {
    const contacts = await this.contactsRepository.list();

    return contacts;
  }
}

export { ListContactsUseCaseUseCase };