import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "webext-redux";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import { renderToString } from "react-dom/server";
import "./EditScrape.css";

const store = new Store({
  portName: "COUNTING"
});

class EditScrape extends Component {
  state = {
    fields: this.props.fieldsToUpdate,
    scrapedFields: []
  };

  async componentDidMount() {
    for (let i = 0; i < this.state.fields.length; i++) {
      console.log("for start", i, this.state);
      await this.setState(prevState => ({
        scrapedFields: [...prevState.scrapedFields, { text: "", field: "" }]
      }));
      console.log("for end", i, this.state);
    }

    this.state.fields.map((val, idx) => {
      let name = this.state.fields[idx].name;

      if (name == "Name") {
        let scrapedFields = [...this.state.scrapedFields];
        scrapedFields[idx].text = this.props.linkedinInfo.name;
        scrapedFields[idx].field = name;
        this.setState({ scrapedFields }, () =>
          console.log(this.state.scrapedFields)
        );
      }
      if (name == "Job Title") {
        let scrapedFields = [...this.state.scrapedFields];

        scrapedFields[idx].text = this.props.linkedinInfo.jobTitle;
        scrapedFields[idx].field = name;

        this.setState({ scrapedFields }, () =>
          console.log(this.state.scrapedFields)
        );
      }
      if (name == "Location") {
        let scrapedFields = [...this.state.scrapedFields];

        scrapedFields[idx].text = this.props.linkedinInfo.location;
        scrapedFields[idx].field = name;

        this.setState({ scrapedFields }, () =>
          console.log(this.state.scrapedFields)
        );
      }
      if (name == "Skills") {
        let scrapedFields = [...this.state.scrapedFields];

        scrapedFields[idx].text = this.props.linkedinInfo.skills;
        scrapedFields[idx].field = name;

        this.setState({ scrapedFields }, () =>
          console.log(this.state.scrapedFields)
        );
      }
      if (name == "Jobs") {
        let scrapedFields = [...this.state.scrapedFields];

        scrapedFields[idx].text = this.props.linkedinInfo.jobs;
        scrapedFields[idx].field = name;

        this.setState({ scrapedFields }, () =>
          console.log(this.state.scrapedFields)
        );
      }
      if (name == "Degrees") {
        let scrapedFields = [...this.state.scrapedFields];

        scrapedFields[idx].text = this.props.linkedinInfo.degrees;
        scrapedFields[idx].field = name;

        this.setState({ scrapedFields }, () =>
          console.log(this.state.scrapedFields)
        );
      }
    });
  }

  handleChangeField = e => {
    let scrapedFields = [...this.state.scrapedFields];
    scrapedFields[e.target.dataset.id].text = e.target.value;
    this.setState({ scrapedFields }, () =>
      console.log(this.state.scrapedFields)
    );
  };

  print = e => {
    let lMargin = 15; //left margin in mm
    let rMargin = 15; //right margin in mm
    let pdfInMM = 210; // width of A4 in mm

    var doc = new jsPDF();
    doc.text("Resume:", 10, 10);

    for (let i = 0; i < this.state.scrapedFields.length; i++) {
      let yaxis = 30 + 30 * i;
      let line = doc.splitTextToSize(
        `${this.state.scrapedFields[i].field}: ${
          this.state.scrapedFields[i].text
        } `,
        pdfInMM - lMargin - rMargin
      );
      doc.text(lMargin, yaxis, line);

      // doc.text(
      //   `${this.state.scrapedFields[i].field}: ${
      //     this.state.scrapedFields[i].text
      //   } `,
      //   20,
      //   yaxis
      // );
    }

    doc.save(`Info.pdf`);
    this.props.history.push("/forms");
  };

  render() {
    if (this.state.scrapedFields.length != this.state.fields.length) {
      return <div> Loading</div>;
    } else {
      return (
        <div className="esContainer">
          <div className="esInnerContainer">
            <header>
              {/* <span onClick={() => this.props.history.push("/scrape")}>
              {" "}
              Cancel{" "}
            </span> */}
              <Link className="editLink" to="/">
                {"< Back to forms"}
              </Link>
            </header>
            <h3>Resume: </h3>
            <form className="esForm">
              {this.state.fields.map((val, idx) => {
                let nameId = `name-${idx}`;
                return (
                  <div key={idx}>
                    <label htmlFor={nameId}>{`${
                      this.state.fields[idx].name
                    }`}</label>
                    <div className={"esInput"}>
                      <input
                        type="text"
                        name={nameId}
                        data-id={idx}
                        id={nameId}
                        value={this.state.scrapedFields[idx].text}
                        className="name"
                        onChange={this.handleChangeField}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="exportDiv">
                <button className="exportBtn" onClick={e => this.print(e)}>
                  Export
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    fieldsToUpdate: state.formReducer.fieldsToUpdate,
    linkedinInfo: state.linkInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(EditScrape);
