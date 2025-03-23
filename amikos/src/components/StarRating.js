import React from "react";
import { FaStar } from "react-icons/fa";
import "../styles/StarRating.css";

const StarRating = ({ rating, onChange }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "star filled" : "star"}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
