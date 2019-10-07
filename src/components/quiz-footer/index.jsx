import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./style.scss";

const QuizFooter = props => {
  let currentScore = Number(
    (props.score.currentCount === 0
      ? 0
      : (props.score.score * 100) / props.score.currentCount
    ).toFixed(0)
  );
  let maxScore = Number(
    ((props.score.totalCount - props.score.currentCount + props.score.score) *
      100) /
      props.score.totalCount
  ).toFixed(0);
  let minScore = Number(
    (props.score.score * 100) / props.score.totalCount
  ).toFixed(0);

  return (
    <div className="quiz-footer-progress-container">
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <div className="title-container">
              <span>{"Score: " + currentScore + "%"}</span>
              <span>{"Max Score: " + maxScore + "%"}</span>
            </div>
            <div className="back-container">
              <div
                className="max-score-container"
                style={{ width: maxScore + "%" }}
              />
              <div
                className="score-container"
                style={{ width: currentScore + "%" }}
              />
              <div
                className="min-score-container"
                style={{ width: minScore + "%" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuizFooter;
