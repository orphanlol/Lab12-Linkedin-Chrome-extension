import React, { Component } from "react";
import { render } from "react-dom";
import { Store } from "webext-redux";
import { Provider, connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";

const store = new Store({
  portName: "COUNTING"
});

class App extends Component {
  state = {
    iframeOpen: false
  };

  injectOpen = () => {
    const injects = document.getElementsByClassName(
      "display-flex justify-flex-end align-items-center"
    );
    console.log(injects);
    const button = document.createElement("button");
    button.className = "openIframe";
    button.innerText = "Open The extension";
    button.style.transitionTimingFunction = "cubic-bezier(.4, 0, .2, 1)";
    button.style.transitionDuration = "167ms";
    button.style.alignItems = "center";
    button.style.border = "none";
    button.style.borderRadius = "2px";
    button.style.boxSizing = "border-box";
    button.style.cursor = "pointer";
    button.style.fontFamily = "inherit";
    button.style.fontWeight = "600";
    button.style.display = "inline-flex";
    button.style.justifyContent = "center";
    button.style.maxWidth = "480px";
    button.style.overflow = "hidden";
    button.style.outlineWidth = "2px";
    button.style.transitionProperty = "background-color, box-shadow, color";
    button.style.verticalAlign = "middle";
    button.style.backgroundColor = "#0073b1";
    button.style.color = "white";
    button.style.fontSize = "1.6rem";
    button.style.minHeight = "40px";
    button.style.lineHeight = "20px";
    button.style.marginTop = "8px";

    injects[0].appendChild(button);

    button.addEventListener("click", () => {
      this.setState({
        iframeOpen: true
      });

      injects[0].removeChild(button);
    });
  };

  injectClose = () => {
    const injects = document.getElementsByClassName(
      "display-flex justify-flex-end align-items-center"
    );
    console.log(injects);
    const button = document.createElement("button");
    button.className = "openIframe";
    button.innerText = "close The extension";
    button.style.transitionTimingFunction = "cubic-bezier(.4, 0, .2, 1)";
    button.style.transitionDuration = "167ms";
    button.style.alignItems = "center";
    button.style.border = "none";
    button.style.borderRadius = "2px";
    button.style.boxSizing = "border-box";
    button.style.cursor = "pointer";
    button.style.fontFamily = "inherit";
    button.style.fontWeight = "600";
    button.style.display = "inline-flex";
    button.style.justifyContent = "center";
    button.style.maxWidth = "480px";
    button.style.overflow = "hidden";
    button.style.outlineWidth = "2px";
    button.style.transitionProperty = "background-color, box-shadow, color";
    button.style.verticalAlign = "middle";
    button.style.backgroundColor = "#0073b1";
    button.style.color = "white";
    button.style.fontSize = "1.6rem";
    button.style.minHeight = "40px";
    button.style.lineHeight = "20px";
    button.style.marginTop = "8px";

    injects[0].appendChild(button);

    const body = document.querySelector("body");
    console.log("body", body);

    const inject = document.getElementsByClassName("iframe");
    console.log("111", inject[0]);

    button.addEventListener("click", () => {
      this.setState({
        iframeOpen: false
      });

      injects[0].removeChild(button);

      body.removeChild(inject[0]);
    });
  };

  injectIframe = () => {
    const inject = document.querySelector("body");
    const iframe = document.createElement("iframe");
    iframe.className = "iframe";
    iframe.src =
      "chrome-extension://fajgjcfafoeojlbmhknnhonghielcgbp/pages/iframe.html";
    iframe.width = "452px";
    iframe.style.zIndex = "2147483647";
    iframe.style.top = "0px";
    iframe.style.opacity = "1";
    iframe.style.position = "fixed";
    iframe.style.height = "100%";
    iframe.style.display = "block";
    iframe.style.right = "-4px";
    iframe.style.backgroundColor = "white";
    inject.appendChild(iframe);
  };

  sendBackend = () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const id = localStorage.getItem("id");
    console.log("this.props", firstName);

    store.dispatch({
      type: "adias@LOGIN",
      firstName: firstName,
      lastName: lastName,
      id: id
    });
  };

  getLinkiedElemet = () => {
    function scrollMiddle() {
      console.log("scroll middle");

      window.scrollTo(0, document.body.scrollHeight / 2);
    }
    window.setTimeout(scrollMiddle, 1000);

    function scrollTop() {
      console.log("scroll top");

      window.scrollTo(0, 0);
    }
    window.setTimeout(scrollTop, 2000);

    function getFields() {
      console.log("get fields");
      const name = document.getElementsByClassName(
        "inline t-24 t-black t-normal  "
      )[0].innerText;
      console.log(name, "backn");
      const jobTitle = document.getElementsByClassName(
        "mt1 inline-block t-18 t-black t-normal "
      )[0].innerText;
      console.log(jobTitle, "backj");

      const location = document.getElementsByClassName(
        "t-16 t-black t-normal inline-block"
      )[0].innerText;
      console.log(location, "backl");

      let skills = document.getElementsByClassName(
        "pv-skill-category-entity__name-text t-16 t-black t-bold"
      );

      console.log("rawskills", skills);
      let parsedSkills = [];
      for (let i = 0; i < skills.length; i++) {
        console.log("infor", i, parsedSkills);
        parsedSkills[i] = skills[i].innerText;
      }
      const top3skills = parsedSkills.toString();
      console.log(top3skills, "backskills");

      store.dispatch({
        type: "LINK_INFO",
        name: name,
        jobTitle: jobTitle,
        location: location,
        skills: top3skills
      });
    }

    window.setTimeout(getFields, 3000);
  };

  render() {
    let content = null;

    if (window.location.hostname === "linkedinextension.netlify.com") {
      content = (
        <div>
          {console.log("mamamiya")}
          {console.log("fff", this.props)}
          {this.sendBackend()}
        </div>
      );
    } else if (
      window.location.hostname === "www.linkedin.com" &&
      this.state.iframeOpen
    ) {
      content = (
        <div>
          {this.injectIframe()}
          {this.injectClose()}
          {this.getLinkiedElemet()}
        </div>
      );
    } else if (
      window.location.hostname === "www.linkedin.com" &&
      !this.state.iframeOpen
    ) {
      content = (
        <div>
          {console.log("i am open")}
          {this.injectOpen()}
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

export default App;

window.addEventListener("load", () => {
  const injectDOM = document.createElement("div");
  injectDOM.className = "inject-react";
  injectDOM.style.textAlign = "center";
  document.body.appendChild(injectDOM);
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    injectDOM
  );
});
