import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import Country from './Country';
import { REGIONS } from '../contants/country-placehoders';
import axios from 'axios';
import CountryPlaceholder from './CountryPlaceholder';
import { type Country as CountryInterface } from '../typings/country';
import Dropdown from './Dropdown';
import { capitalize } from '../utils/utils';

export default function Countries() {
  const [region, setRegion] = useState(() => {
    const saved = localStorage.getItem('region');
    return saved ? saved : 'all';
  });
  const [q, setQ] = useState('');

  const {
    data = [],
    isPending,
    error,
  } = useQuery<CountryInterface[]>({
    queryKey: ['countries', region],
    queryFn: async () => {
      const endpoint = region === 'all' ? 'all' : `region/${region}`;
      const res = await axios.get<CountryInterface[]>(
        `https://restcountries.com/v3.1/${endpoint}`,
        {
          params: {
            fields: 'cca3,name,flag,flags,population,capital,region',
          },
        }
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const countries = useMemo(
    () => [...data].sort((a, b) => a.name.common.localeCompare(b.name.common)),
    [data]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return countries;
    const res = countries.filter((c) =>
      c.name.common.toLowerCase().includes(term)
    );
    return res;
  }, [q, countries]);

  useEffect(() => {
    document.title = `${capitalize(region)} countries`;
  }, [region]);

  const countriesList = isPending ? (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <CountryPlaceholder key={i} />
      ))}
    </>
  ) : filtered.length > 0 ? (
    <>
      {filtered.map((item) => (
        <Country key={item.cca3} {...item} />
      ))}
    </>
  ) : (
    <NothingFound />
  );

  if (error instanceof Error) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <>
      <div className="filter">
        <div className="input-container">
          <svg className="input-container__icon" aria-hidden="true">
            <use href="/icons.svg#icon-search"></use>
          </svg>
          <input
            className="input"
            type="text"
            placeholder="Search countries…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Dropdown
          label="Filter by region"
          options={REGIONS}
          active={region}
          onSelect={(value) => {
            setRegion(value);
            localStorage.setItem('region', value);
          }}
        />
      </div>
      <div className="countries">{countriesList}</div>
    </>
  );
}

// LOCAL COMPONENT

const NothingFound = () => {
  return <p>Nothing is found!</p>;
};
