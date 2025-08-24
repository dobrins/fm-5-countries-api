import { Link } from 'react-router';

export default function Back() {
  return (
    <div className="back">
      <Link to={'/'} className="btn btn--l">
        <svg className="btn__icon" aria-hidden="true">
          <use href="/icons.svg#icon-arrow-left2"></use>
        </svg>
        Back
      </Link>
    </div>
  );
}
