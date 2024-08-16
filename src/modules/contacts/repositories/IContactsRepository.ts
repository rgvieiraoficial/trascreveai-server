import { Contact, Prisma } from '@prisma/client';

interface IContactsRepository {
  create({ name, whatsapp_number, phone_number_id }: Prisma.ContactCreateInput): Promise<Contact | null>;
  findByPhoneNumberId(id: string): Promise<Contact | null>;
  findByWhatsAppNumber(whatsapp_number: string): Promise<Contact | null>;
  list(): Promise<Contact[]>;
}

export { IContactsRepository };