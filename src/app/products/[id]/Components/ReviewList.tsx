import type { Review } from "@/domain/api/Types";
import RatingStars from "@/app/SharedComponents/RatingStars";
import dayjs from "dayjs";
import './ReviewList.scss';


const ReviewList = ({ reviews = [] }: { reviews: Review[]; }) => {
  return (
    <div className="ReviewListMainContainer">
      {reviews.map((review, index) => <Review key={index} review={review} />)}
    </div>
  );
};

export default ReviewList;


const Review = ({ review }: { review: Review; }) => {
  return (
    <>
      <h4 className="text-xl font-semibold">{review.reviewerName}</h4>
      <div className="ReviewListItemContainer">
        <div className="flex flex-row items-center gap-2.5">
          <h5 className="text-base">{dayjs(review.date).format('DD.MM.YYYY HH:mm')}</h5>
          <RatingStars rating={review.rating} size={16} />
        </div>
        <h5 className="text-base">{review.comment}</h5>
      </div>
    </>
  );
};
