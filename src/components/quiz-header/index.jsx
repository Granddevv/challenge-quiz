import React from "react";
import "./style.scss";

const QuizHeader = props => {
  let activeStyle = {
    width: ((props.score.currentCount + 1) * 100) / props.score.totalCount + "%"
  };
  return (
    <div className="quiz-header-progress-container">
      <div className="quiz-header-progress-active" style={activeStyle} />
    </div>
  );
};

export default QuizHeader;
