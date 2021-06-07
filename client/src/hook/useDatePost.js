import moment from "moment";
import { useState } from "react";

const useDatePost = () => {
  const [datePost, setDatePost] = useState(null);
  let string = "";
  const handleDatePost = ({ createdAt, updatedAt }) => {
    if (
      moment(createdAt).format("MMM D YYYY") !==
      moment(updatedAt).format("MMM D YYYY")
    ) {
      string += `Updated: `;
    }

    if (moment(updatedAt).format("YYYY") !== moment().year()) {
      string += moment(updatedAt).format("MMM D");
    } else {
      string += moment(updatedAt).format("MMM D YYYY");
    }

    setDatePost(string);
  };

  return [datePost, handleDatePost];
};

export default useDatePost;
