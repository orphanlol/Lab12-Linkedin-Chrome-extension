import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "webext-redux";
import "./UpdateForm.css";

const store = new Store({
  portName: "COUNTING"
});

class UpdateIndivForm extends Component {
  state = {
    form: [],
    fields: [],
    fieldOptions: ["Job Title", "Name", "Location", "Skills", "Jobs", "Degrees"]
  };

  async componentDidMount() {
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    console.log("url", url_string);
    console.log("url2", url);
    console.log("urlid", id);
    await this.props.getIndivForm(id);
    await this.setState({ form: this.props.formToUpdate });
    console.log("after set state", this.state.form);
    await this.props.getField(this.props.formToUpdate.id);
    await this.setState({ fields: this.props.fieldsToUpdate });
  }

  handleChangeForm = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };

  handleChangeField = e => {
    let fields = [...this.state.fields];
    fields[e.target.dataset.key].name = e.target.value;
    this.setState({ fields }, () => console.log(this.state.fields));
  };

  deleteField = e => {
    e.preventDefault();
    this.props.deleteField(e.target.value);
  };

  updateForm = async (e, id) => {
    e.preventDefault();
    await this.props.updateForm(this.state.form, this.state.fields);
    this.props.history.push("/forms");
  };

  render() {
    console.log(this.state.form);
    return (
      <div className="PageWrapperEF">
        <div className="FormWrapperEF">
          <div className="Header">
            <div className="CancelEF" onClick={this.cancel}>
              {"< Back to templates"}
            </div>
          </div>
          <form className="formBoxEF">
            <input
              type="text"
              name="name"
              value={this.state.form.name}
              onChange={this.handleChangeForm}
              className="NameEF"
            />
            {this.state.fields.map((val, idx) => {
              let nameId = `name-${idx}`;
              return (
                <div className="FieldBoxEF" key={idx}>
                  <label htmlFor={nameId}>{`Field #${idx + 1}`}</label>
                  <div className="FieldSelectDeleteEF">
                    <div className="SelectFieldEF">
                      <select
                        data-key={idx}
                        value={this.state.fields[idx].name}
                        onChange={this.handleChangeField}
                      >
                        <option value="" disabled>
                          {"Select Field"}
                        </option>
                        {this.state.fieldOptions.map(option => {
                          return (
                            <option
                              type="text"
                              name={nameId}
                              data-key={idx}
                              id={nameId}
                              value={option}
                              className="name"
                            >
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* <input
                  type="text"
                  name={nameId}
                  data-id={idx}
                  id={nameId}
                  value={this.state.fields[idx].name}
                  className="name"
                  onChange={this.handleChangeField}
                /> */}
                    <button
                      onClick={e => this.deleteField(e)}
                      value={this.state.fields[idx].id}
                      className="DeleteFieldEF"
                    >
                      Delete Field
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="submitDiv">
              <button className="SubmitBtnEF" onClick={e => this.updateForm(e)}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // getIndivForm: state.formReducer.getIndivForm,
    // updateForm: state.formReducer.updateForm,
    // isUpdating: state.formReducer.isUpdating,
    formToUpdate: state.formReducer.formToUpdate,
    fieldsToUpdate: state.formReducer.fieldsToUpdate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIndivForm: id =>
      store.dispatch({ type: "alias@GET_INDIV_FORM", id: id }),
    updateForm: (form, field) =>
      store.dispatch({ type: "alias@UPDATE_FORM", form: form, field: field }),
    getField: formId =>
      store.dispatch({ type: "alias@GET_FIELD", formId: formId }),
    deleteField: target =>
      store.dispatch({ type: "alias@DELETE_FIELD", target: target })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateIndivForm);
