import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: 'MY SECRET VALUE. SHOULD BE A COMPLEX SECRET KEPT SAFE OUTSIDE OF THE SOURCE CODE.',
  };

  
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);