import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color = '#ffc107' }) => (
  <div className="d-flex align-items-center gap-1">
    <span style={{ color }}>
      {[...Array(5)].map((_, i) => {
        const diff = value - i;
        if (diff >= 1) return <FaStar key={i} />;
        if (diff >= 0.5) return <FaStarHalfAlt key={i} />;
        return <FaRegStar key={i} />;
      })}
    </span>
    <span className="ms-2 text-muted">{text && `(${text})`}</span>
  </div>
);

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
