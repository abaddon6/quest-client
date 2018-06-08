import React, { Component } from 'react';
import {Panel} from 'primereact/components/panel/Panel';
import {Button} from 'primereact/components/button/Button';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';

class SectionSlider extends Component {
  render() {
    if(!this.props.question || !this.props.question.answers){
      return "";
    }

    let answers = this.props.question.answers.map(function(answer, i){
      return <div key={i} className="ui-g-12">
               <RadioButton inputId="rb_{answer.answerId}"
                            value={answer.answerId}
                            onChange={this.props.onAnswered}
                            checked={answer.response && answer.response.answerId === answer.answerId}>
               </RadioButton>
               <label htmlFor="rb_{answer.answerId}">{answer.content}</label>
             </div>;
    }, this);

    return (
      <Panel>
          <div className="ui-g">
            <div>Question {this.props.question.orderNumber}/{this.props.section.numberOfQuestions}</div>
            <div className="ui-g-12">
              <span>{this.props.question.content}</span>
            </div>
          </div>
          <div className="ui-g">
            {answers}
          </div>
          <hr className="ui-widget-content"
              style={{ borderTop: 0 }} />
          <div className="text-center">
            <Button label="Prev question"
                    icon="fa-angle-left"
                    disabled={!this.props.question.previous}
                    onClick={this.props.onPreviousQuestion} />
            <Button label={this.props.allAnswered ? "Done" : "Save unfinished"}
                    icon={this.props.allAnswered ? "fa-check success" : ""}
                    onClick={this.props.onDone}
                    className={this.props.allAnswered ? "success" : ""} />
            <Button label="Next question"
                    icon="fa-angle-right"
                    iconPos="right"
                    disabled={!this.props.question.next}
                    onClick={this.props.onNextQuestion} />
          </div>
        </Panel>
    );
  }
}

export default SectionSlider;
