import PropTypes from "prop-types";
import React from "react";
import { formatDate } from "../utils";
import { Rating } from "@mui/material";

function Review({ review }) {
  const { rating, comment, date, reviewerName } = review;

  return (
    <div className="border-b border-b-slate-200 pb-4">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
        <h3>{reviewerName}</h3>
        <p>|</p>
        <p>{formatDate(date)}</p>
      </div>
      <div className="mt-2">
        <Rating value={rating} />
        <p>{comment}</p>
      </div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.objectOf({
    rating: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reviewerName: PropTypes.string.isRequired,
  }),
};

export default Review;
