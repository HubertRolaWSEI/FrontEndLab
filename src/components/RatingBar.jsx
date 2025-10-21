import React from 'react';

/**
 * @param {object} props
 * @param {number} props.rate 
 */
function RatingBar({ rate = 0 }) {
  const totalStars = 10;
  const stars = [];

  const filledStarStyle = {
    color: '#15dc0eff',
    fontSize: '1.5rem',
  };

  const emptyStarStyle = {
    ...filledStarStyle,
    color: '#ccc',
  };

  for (let i = 0; i < totalStars; i++) {
    if (i < rate) {
      stars.push(<span key={i} style={filledStarStyle}>★</span>);
    } else {
      stars.push(<span key={i} style={emptyStarStyle}>☆</span>);
    }
  }

  return (
    <div className="rating-bar" aria-label={`Rating: ${rate} out of ${totalStars}`}>
      {stars}
    </div>
  );
}

export default RatingBar;