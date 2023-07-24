import { User } from '@prisma/client';

export type UserSanitized = Omit<User, 'password'>;
