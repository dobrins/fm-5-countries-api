import { Link, useParams } from 'react-router';
import { useCountry } from '../hooks/useCountry';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { type Country } from '../typings/country';
import Back from './Back';
import { numberFmt } from '../utils/utils';
import { useEffect } from 'react';

type RouteParams = {
  countryId: string;
};

export default function CountryPage() {
  const { countryId = '' } = useParams<RouteParams>();
  const { data, isPending, isError, error } = useCountry(countryId);
  const borderCodes = data?.borders ?? [];

  const res = useQueries({
    queries: borderCodes.map((id) => ({
      queryKey: ['borders', id],
      enabled: !!borderCodes.length,
      queryFn: async () => {
        const res = await axios.get<Country[]>(
          `https://restcountries.com/v3.1/alpha/${id}`
        );
        if (!res.data.length) throw new Error('Country not found');
        return res.data[0];
      },
      staleTime: 5 * 60 * 1000,
    })),
  });

  const bordersData = res.map((q) => q.data).filter(Boolean) as Country[];

  useEffect(() => {
    if (data) {
      document.title = `${data.name.common}, ${data.region}`;
    }
  }, [data]);

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>An error has occurred: {(error as Error).message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      <Back />
      <article className="country-page">
        <img
          src={data.flags!.svg}
          alt={data.flags!.alt || `${data.name.common} flag`}
          className="country-page__img"
        />
        <div className="country-page__content">
          <h2 className="country-page__heading">{data.name.common}</h2>
          <div className="country-page__description">
            <div>
              <p>
                <strong>Native Name</strong>:{' '}
                {data.name.nativeName
                  ? Object.values(data.name.nativeName)[0].common || 'N/A'
                  : 'N/A'}
              </p>
              <p>
                <strong>Population</strong>: {numberFmt(data.population)}
              </p>
              <p>
                <strong>Region</strong>: {data.region}
              </p>
              <p>
                <strong>Subregion</strong>: {data.subregion}
              </p>
              <p>
                <strong>Capital</strong>: {data.capital}
              </p>
            </div>
            <div>
              <p>
                <strong>Top level domain</strong>:{' '}
                {data.tld ? Object.values(data.tld).join(', ') : 'N/A'}
              </p>
              <p>
                <strong>Currencies</strong>:{' '}
                {data.currencies ? (
                  <>
                    {Object.values(data.currencies)
                      .map((currency) => currency.name)
                      .join(', ')}
                  </>
                ) : (
                  <>N/A</>
                )}
              </p>
              <p>
                <strong>Languages</strong>:{' '}
                {data.languages
                  ? Object.values(data.languages).join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
          <div className="country-page__border-countries">
            {bordersData.length ? (
              <>
                <div>
                  <strong>
                    {bordersData.length === 1
                      ? 'Border country'
                      : 'Border countries'}
                  </strong>
                  :
                </div>
                <div>
                  {bordersData.map((item) => (
                    <Link
                      to={`/country/${item.cca3}`}
                      key={item.cca3}
                      className="btn"
                    >
                      {item.name.common}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p>
                <strong>No border countries. Only water 🌊🌊🌊</strong>
              </p>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
