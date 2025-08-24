import { type Country } from '../typings/country';
import { Link } from 'react-router';
import { numberFmt } from '../utils/utils';
import { FLAGSTOLEFT } from '../contants/country-placehoders';

type Line = {
  title: 'Capital' | 'Region' | 'Population';
  description: string[] | string;
};

export default function Country(props: Country) {
  const { name, flags, population, capital, region, cca3 } = props;

  const bgSize = cca3 === 'NPL' ? 'contain' : undefined;
  const bgPosition = FLAGSTOLEFT.includes(cca3) ? 'left' : undefined;

  const imgStyle = {
    backgroundImage: `url(${flags.svg})`,
    backgroundSize: bgSize,
    backgroundPosition: bgPosition,
  };

  return (
    <article className="country">
      <Link to={`/country/${cca3}`} className="country__link" />
      <div className="country__img" style={imgStyle} />
      <div className="country__content">
        <h2>{name.common}</h2>
        <div>
          <Line title="Population" description={numberFmt(population)} />
          <Line title="Region" description={region} />
          <Line title="Capital" description={capital} />
        </div>
      </div>
    </article>
  );
}

// LOCAL COMPONENT

const Line = (props: Line) => {
  const { title, description } = props;

  const dd = description.length
    ? Array.isArray(description)
      ? description.join(', ')
      : description
    : 'N/A';

  return (
    <p>
      <strong>{title}</strong>: {dd}
    </p>
  );
};
