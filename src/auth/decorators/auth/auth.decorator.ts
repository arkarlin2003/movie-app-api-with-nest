import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constant';
import { AuthType } from 'src/auth/enums/auth.enum';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
