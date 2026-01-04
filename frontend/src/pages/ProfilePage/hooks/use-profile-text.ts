// import { useQuery } from '@tanstack/react-query';
// import { trpc } from '../utils/trpc'

// export const useProfileTexts = () => {
//   return useQuery({
//     queryKey: ['profileTexts'],
//     queryFn: async () => {
//       const response = await trpc.profileTexts.getProfileTexts.query();
//       return response;
//     },
//     // Опциональные настройки:
//     staleTime: 1000 * 60 * 5, // 5 минут
//     gcTime: 1000 * 60 * 10, // 10 минут
//   });
// };