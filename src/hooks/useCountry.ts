import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type Country } from '../typings/country';

export const useCountry = (countryId: string) => {
  return useQuery<Country>({
    queryKey: ['country', countryId],
    enabled: !!countryId,
    queryFn: async () => {
      const res = await axios.get<Country[]>(
        `https://restcountries.com/v3.1/alpha/${countryId}`
      );
      if (!res.data.length) throw new Error('Country not found');
      return res.data[0];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
