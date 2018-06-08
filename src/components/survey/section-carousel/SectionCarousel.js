import React, { Component } from 'react';
import './SectionCarousel.css';
import SectionCarouselStep from './SectionCarouselStep.js';

class SectionCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {firstVisibleSection: 0, numberOfVisibleSections: 6};
    this.decreaseSection = this.decreaseSection.bind(this);
    this.increaseSection = this.increaseSection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.section){
      for(var i in props.sections){
        if(props.sections[i].sectionId === props.section.sectionId){
          if(props.sections.length - i < state.numberOfVisibleSections){
            state = {firstVisibleSection: (i - (state.numberOfVisibleSections - (props.sections.length - i)))};
          }
          else{
            state = {firstVisibleSection: i};
          }
        }
      }
    }
    return state;
  }

  decreaseSection() {
    this.setState({firstVisibleSection: this.state.firstVisibleSection - 1});
  }

  increaseSection() {
    this.setState({firstVisibleSection: this.state.firstVisibleSection + 1});
  }

  render() {
    let sections = this.props.sections.map(function(section, index) {
      let currentProgress = 0;
      if(section.sectionId === this.props.section.sectionId){
        currentProgress = (this.props.currentQuestion.orderNumber / section.numberOfQuestions) * 100;
      }
      if(section.numberOfQuestions > 0) {
        return <SectionCarouselStep key={index}
                                    onClick={() => this.props.onChangeSection(section.sectionId)}
                                    status={currentProgress}
                                    name={section.title}
                                    number={"" + section.numberOfResponses + "/" + section.numberOfQuestions}
                                    sectionNumber={section.orderNumber}  />
      }
      else{
        return <SectionCarouselStep key={index}
                                    status={currentProgress}
                                    name={section.title}
                                    number="0/0"
                                    sectionNumber={section.orderNumber} />
      }
    }, this);

    let decreaseSection = "";
    if(this.state.firstVisibleSection > 0) {
      decreaseSection = <div className="sc-navigation"
                             onClick={this.decreaseSection}>
                          <i id="left"
                             className="fa fa-angle-left fa-4x primary" />
                        </div>
    }
    else{
      decreaseSection = <div className="sc-navigation-disabled">
                          <i id="left"
                             className="fa fa-angle-left fa-4x primary" />
                        </div>
    }

    let increaseSection = "";
    if(this.state.firstVisibleSection + this.state.numberOfVisibleSections < this.props.sections.length) {
      increaseSection = <div className="sc-navigation"
                             onClick={this.increaseSection}>
                          <i id="right"
                             className="fa fa-angle-right fa-4x primary" />
                        </div>
    }
    else{
      increaseSection = <div className="sc-navigation-disabled">
                          <i id="right"
                             className="fa fa-angle-right fa-4x primary" />
                        </div>
    }

    let visibleSections = sections.slice(this.state.firstVisibleSection, this.state.firstVisibleSection + this.state.numberOfVisibleSections);

    if(sections.length <= 1){
      return "";
    }
    return(
      <div className="ui-steps-custom ui-g text-center">
        <div className="ui-g-1">
          {decreaseSection}
        </div>
        <div className="ui-g-10">
          <div className="ui-g">
            {visibleSections}
          </div>
        </div>
        <div className="ui-g-1">
          {increaseSection}
        </div>
      </div>
    );
  }
}

export default SectionCarousel;
