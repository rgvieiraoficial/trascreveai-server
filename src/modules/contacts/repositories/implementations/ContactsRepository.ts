import { Contact, Prisma } from '@prisma/client';

import { IContactsRepository } from '../IContactsRepository';

import { prisma } from '../../../../lib/prisma';

class ContactsRepository implements IContactsRepository {

  async create({ name, whatsapp_number }: Prisma.ContactCreateInput): Promise<Contact> {
    const contact = await prisma.contact.create({
      data: {
        name,
        whatsapp_number,
      }
    });

    prisma.$disconnect();

    return contact;
  }

  async findByWhatsAppNumber(whatsapp_number: string): Promise<Contact | null> {
    const contact = await prisma.contact.findFirst({
      where: {
        whatsapp_number: whatsapp_number
      }
    })

    prisma.$disconnect();

    return contact;
  }

  async list(): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany();

    prisma.$disconnect();

    return contacts;
  }
}

export { ContactsRepository };