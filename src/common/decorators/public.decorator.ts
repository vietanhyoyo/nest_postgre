import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_PUBLIC_HEALTHY_KEY = 'isPublicHealthy';
export const PublicHealthy = () => SetMetadata(IS_PUBLIC_HEALTHY_KEY, true);
