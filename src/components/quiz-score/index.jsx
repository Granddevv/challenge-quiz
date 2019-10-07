import React from "react";
import { Button, Col } from "react-bootstrap";
import "./style.scss";

const QuizScore = props => {
  let score = Number(
    ((props.score.score * 100) / props.score.totalCount).toFixed(0)
  );
  const { handleReply } = props;
  return (
    <div className="quiz-score-container">
      <Col sm={{ span: 10, offset: 1 }}>
        <h3>{"Score: " + score + "%"}</h3>
        <Button variant="dark" onClick={() => handleReply()}>
          Reply
        </Button>
      </Col>
    </div>
  );
};

export default QuizScore;
