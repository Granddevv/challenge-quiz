import React, { Component } from "react";
import urlencode from "urlencode";
import StarRatingComponent from "react-star-rating-component";
import { Button, Col } from "react-bootstrap";
import "./style.scss";

class QuizContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
      answeredIndex: -1
    };
  }

  handleCorrect = () => {
    const { updateStatus } = this.props;
    updateStatus(true);
  };

  handleWrong = () => {
    const { updateStatus } = this.props;
    updateStatus(false);
  };

  handleDifficulty = difficulty => {
    switch (difficulty) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 0;
    }
  };

  handleTest = index => {
    this.setState({ answeredIndex: index, answered: true });
  };

  handleNext = () => {
    const { updateStatus } = this.props;
    let flag =
      this.props.correctIndex === this.state.answeredIndex ? true : false;
    updateStatus(flag);
    this.setState({ answered: false, answeredIndex: -1 });
  };

  render() {
    let { score, item } = this.props;
    let rate = this.handleDifficulty(item.difficulty);
    let answers = item.incorrect_answers.map(item => urlencode.decode(item));
    answers.splice(
      this.props.correctIndex,
      0,
      urlencode.decode(item.correct_answer)
    );
    let flagCheck =
      this.state.answeredIndex === this.props.correctIndex
        ? "Correct!"
        : "Sorry!";
    return (
      <div className="quiz-content-container">
        <Col sm={{ span: 10, offset: 1 }}>
          <h2>
            Question {score.currentCount + 1} of {score.totalCount}
          </h2>
          <p>{urlencode.decode(this.props.item.category)}</p>
          <StarRatingComponent name="rate1" starCount={5} value={rate} />
          <h5>{urlencode.decode(item.question)}</h5>
          <div className="answer-container">
            {answers.map((answer, index) => {
              let itemStatus =
                this.state.answered && this.props.correctIndex === index
                  ? "item-correct"
                  : this.state.answeredIndex === index
                  ? "item-answered"
                  : "item-normal";
              return (
                <div key={"key-answer-" + index} className="quiz-item">
                  <Button
                    variant="outline-secondary"
                    className={itemStatus}
                    disabled={this.state.answered}
                    onClick={() => this.handleTest(index)}
                  >
                    {answer}
                  </Button>
                </div>
              );
            })}
          </div>
          {this.state.answered && (
            <div className="calc-container">
              <h4>{flagCheck}</h4>
              <Button variant="dark" onClick={this.handleNext}>
                Next Question
              </Button>
            </div>
          )}
        </Col>
      </div>
    );
  }
}

export default QuizContent;
