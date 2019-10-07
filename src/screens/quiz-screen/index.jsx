import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {
  QuizHeader,
  QuizContent,
  QuizFooter,
  QuizScore
} from "../../components";
import questions from "../../assets/const/questions.json";
import "./style.scss";

class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentCount: 0,
      totalCount: questions.length,
      correctIndex: 0,
      processStatus: false
    };
  }

  handleStatus = flag => {
    let { score, currentCount, totalCount } = this.state;

    if (flag) {
      score++;
    }

    currentCount++;

    if (currentCount >= totalCount) {
      this.setState({ score, processStatus: true, currentCount });
    } else {
      let correctIndex =
        Math.floor(
          Math.random() * (questions[currentCount].incorrect_answers.length + 1)
        ) %
        (questions[currentCount].incorrect_answers.length + 1);
      this.setState({ score, currentCount, correctIndex });
    }
  };

  handleReply = () => {
    this.setState({
      score: 0,
      currentCount: 0,
      totalCount: questions.length,
      correctIndex: 0,
      processStatus: false
    });
  };

  render() {
    return (
      <Container className="quiz-screen-container">
        <QuizHeader score={this.state} />
        {!this.state.processStatus && (
          <QuizContent
            item={questions[this.state.currentCount]}
            correctIndex={this.state.correctIndex}
            score={this.state}
            updateStatus={this.handleStatus}
          />
        )}
        {this.state.processStatus && (
          <QuizScore score={this.state} handleReply={this.handleReply} />
        )}
        <QuizFooter score={this.state} />
      </Container>
    );
  }
}

export default QuizScreen;
