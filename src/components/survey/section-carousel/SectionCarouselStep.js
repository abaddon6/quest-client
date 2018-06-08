import React, { Component } from 'react';
import {ProgressBar} from 'primereact/components/progressbar/ProgressBar';

class SectionCarouselStep extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}
           className={"ui-g-2 " + (this.props.onClick ? 'sc-step' : 'sc-step-disabled')}>
        <div className="sc-step-number">
          {this.props.sectionNumber}
        </div>
        <ProgressBar value={this.props.status}
                     showValue={false} />
        <div className="sc-step-title">
          <div className="sc-step-name">
            {this.props.name}
          </div>
          <div className="sc-step-section-number">
            ({this.props.number})
          </div>
        </div>
      </div>
    );
  }
}

export default SectionCarouselStep;
