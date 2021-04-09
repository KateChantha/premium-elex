import React from 'react';
import PropTypes from 'prop-types'


const Rating = ({ value, text, color}) => {
  const stars = [0,1,2,3,4,];

  const displayStars = stars.map(num => (
    <span key={num}>
      <i style={{color}}
        className={
          value >= (num + 1)
            ? 'fas fa-star'
            : value >= (num + 0.5)
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        } 
      />
    </span>
  ))

  return (
    <div className='rating'>
      {displayStars}
      <span>{text && text}</span>
    </div>
  )
}

// Default Color of Star if there is no props passing
Rating.defaultProps = {
  color: '#f8e825'
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
