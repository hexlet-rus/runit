import { SetMetadata } from '@nestjs/common';

export const Role = (role: string) => SetMetadata('roles', role);
