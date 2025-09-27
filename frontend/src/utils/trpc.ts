import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '../../../src/router';

export const { useTRPC, TRPCProvider, useTRPCClient } = createTRPCContext<AppRouter>();
