import React, { Component } from 'react';
import './AttemptSummary.css';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Chart} from 'primereact/components/chart/Chart';
import {Panel} from 'primereact/components/panel/Panel';
import {Message} from 'primereact/components/message/Message';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import {Button} from 'primereact/components/button/Button';
import {Growl} from 'primereact/components/growl/Growl';

class AttemptSummary extends Component {

  constructor(props){
    super(props);
    this.actionTemplate = this.actionTemplate.bind(this);
    this.showPdfInfo = this.showPdfInfo.bind(this);
  }

  actionTemplate(rowData, column) {
    return <div className={column.field===rowData.selected ? "as-selected-maturity" : "as-maturity"}>
             {rowData[column.field]}
           </div>;
  }

  percentage(first, from){
    return (from > 0 ? (first/from*100) : 0) | 0;
  }

  showPdfInfo(){
    this.growl.show({severity: 'info',
                     summary: 'This is future functionality.',
                     detail: 'Not yet available' });
  }

  render(){
    if(!this.props.mode){
      return(
        <div className="text-center">
          <hr className="ui-widget-content"
              style={{ borderTop: 0 }} />
          <ProgressSpinner />
        </div>
      );
    }

    let tableSections = [];
    let radarSections = [];
    for(var sec in this.props.sections){
      if(this.props.sections[sec].options.onRadar){
        radarSections.push(this.props.sections[sec]);
      }
      else{
        tableSections.push(this.props.sections[sec]);
      }
    }

    let maxMaturityLevel = 0;
    let tableSectionsDataScore = 0;
    let tableSectionsDataMaxScore = 0;
    let tableSectionsData = tableSections.map(function(section){
      let result =  {};
      result.name = section.title + ": " + this.percentage(section.score, section.maxScore) + "%";
      for(var i in section.maturities){
        result['level' + (Number(i) + 1)] = section.maturities[i].content;
      }
      if(section.maturityNumber){
        result.selected = 'level' + section.maturityNumber;
      }
      if(section.maturities.length > maxMaturityLevel){
        maxMaturityLevel = section.maturities.length;
      }
      tableSectionsDataScore += section.score;
      tableSectionsDataMaxScore += section.maxScore;
      return result;
    }, this);

    var dynamicColumns = [];
    dynamicColumns[0] = <Column key="0"
                                field="name"
                                header="" />;
    for(var j = 1; j <= maxMaturityLevel; j++){
      dynamicColumns[j] = <Column key={j}
                                  body={this.actionTemplate}
                                  field={"level"+Number(j)}
                                  header={"00"+Number(j)} />
    }

    let labels = [];
    let data = [];
    let radarSectionsDataScore = 0;
    let radarSectionsDataMaxScore = 0;
    for(var i in radarSections){
      labels.push(radarSections[i].title + " " + this.percentage(radarSections[i].score, radarSections[i].maxScore) + "%");
      data.push(radarSections[i].maturityNumber);
      radarSectionsDataScore += radarSections[i].score;
      radarSectionsDataMaxScore += radarSections[i].maxScore;
    }

    let radarData = {
      labels: labels,
      datasets: [
        {
          label: 'Maturity',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: data
        }
      ]
    };

    let notFinished = "";
    if(!this.props.finished){
      notFinished = <div className="text-center"
                         style={{marginBottom: '20px' }}>
                        <Message severity="warn"
                                 text="Not all answers for questions were responded." />
                    </div>;
    }

    return(
      <div>
        <div className="ui-g"
             style={{marginBottom: '15px' }}>
                  <Growl ref={(el) => { this.growl = el; }}></Growl>
          <div className="ui-g-12 text-right">
            <div>
              <Button label="Back to answer"
                      icon="fa fa-angle-left primary"
                      onClick={this.props.onBackToAnswer} />
              <Button label="Home Page"
                      onClick={this.props.onGoToHomePage} />
              <Button label="Export to PDF"
                      icon="fa fa-file primary"
                      onClick={this.showPdfInfo} />
            </div>
          </div>
        </div>
        {notFinished}
        <Panel header={"DevOps Maturity: " + this.percentage(tableSectionsDataScore, tableSectionsDataMaxScore) + "%"}>
          <div>
            <DataTable value={tableSectionsData}>
              {dynamicColumns}
            </DataTable>
          </div>
        </Panel>
        <div style={{height:'20px'}} />
        <Panel header={"Automation Maturity: " + this.percentage(radarSectionsDataScore, radarSectionsDataMaxScore) + "%"}>
          <div className="as-radar">
            <Chart type="radar"
                   data={radarData} />
          </div>
        </Panel>
      </div>
    );
  }
}

export default AttemptSummary;
