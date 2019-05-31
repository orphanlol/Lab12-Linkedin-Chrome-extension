import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "webext-redux";
import "./UpdateForm.css";
import Spinner from "../../Spinner/Spinner";
import { initialState } from "../../../../background/actions/formActions";

const store = new Store({
  portName: "COUNTING"
});

class UpdateIndivForm extends Component {
  state = {
    form: [],
    fields: [],
    fieldOptions: ["Job Title", "Name", "Location", "Skills", "Jobs", "Degrees"]
  };

  componentDidMount() {
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    console.log("url", url_string);
    console.log("url2", url);
    console.log("urlid", id);
    // await this.props.getIndivForm(id);
    // await this.setState({ form: this.props.formToUpdate });
    // console.log("after set state", this.state.form);
    // await this.props.getField(this.props.formToUpdate.id);
    // await this.setState({ fields: this.props.fieldsToUpdate });
    this.props.getIndivForm(id);
    this.props.getField(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fieldsToUpdate !== prevProps.fieldsToUpdate) {
      console.log("it fire");
      this.setState({
        form: this.props.formToUpdate,
        fields: this.props.fieldsToUpdate
      });
    }
  }

  cancel = () => {
    this.props.history.push("/");
  };

  handleChangeForm = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
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
    this.props.initialForm();
    this.props.initialField();
    this.props.history.push("/forms");
  };

  afterFormDelete = () => {
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    if(this.props.forms.isDeleting === false) {
      this.props.getIndivForm(id);
      this.props.getField(id);
    }
  }

  render() {
    console.log(this.state.form);
    let update = (
      <div>
        <Spinner />
      </div>
    );

    if (
      this.props.forms.gettingForm === true &&
      this.props.forms.gettingField === true &&
      this.state.form.length === 0 &&
      this.state.fields.length === 0 &&
      this.props.forms.isDelete === true
    ) {
      update = (
        <div>
          <Spinner />
        </div>
      );
    } else if (
      this.props.forms.gettingForm === false &&
      this.props.forms.gettingField === false &&
      this.state.form.length !== 0 &&
      this.state.fields.length !== 0 &&
      this.props.forms.isDelete === false
    ) {
      update = (
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
                        onClick={e => {
                          if (
                            window.confirm("Are you sure you want to delete this field?")
                          )

                          this.deleteField(e)
                          this.props.initialForm()
                          this.props.initialField()
                          this.afterFormDelete()
                        }}
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
                <button
                  className="SubmitBtnEF"
                  onClick={e => this.updateForm(e)}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return <div>{update}</div>;
  }
}

const mapStateToProps = state => {
  return {
    // getIndivForm: state.formReducer.getIndivForm,
    // updateForm: state.formReducer.updateForm,
    // isUpdating: state.formReducer.isUpdating,
    fieldsToUpdate: state.formReducer.fieldsToUpdate,
    formToUpdate: state.formReducer.formToUpdate,
    forms: state.formReducer
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
      store.dispatch({ type: "alias@DELETE_FIELD", target: target }),
    initialForm: () =>
      store.dispatch({ type: "alias@INITIAL_FORM", none: "none" }),
    initialField: () =>
      store.dispatch({ type: "alias@INITIAL_FIELD", none: "none" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateIndivForm);
