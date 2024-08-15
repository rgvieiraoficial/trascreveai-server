import { Contact, Prisma } from '@prisma/client';

interface IContactsRepository {
  create({ name, whatsapp_number, phone_number_id }: Prisma.ContactCreateInput): Promise<Contact | null>;
  findByPhoneNumberId(id: string): Promise<Contact>;
  findByWhatsAppNumberId(whatsapp_number: string): Promise<Contact>;
  list(): Promise<Contact[]>;
}

export { IContactsRepository };