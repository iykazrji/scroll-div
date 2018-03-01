import React, { Component } from "react";
import PropTypes from "prop-types";
import './scroll-div.css';

export default class ScrollDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: null,
      initPosition: 0,
      isVisible: false,
      scrollPosition: 0,
      show: false
    };
    this.getItemPosition = this.getItemPosition.bind(this);
    this.checkScrollAction = this.checkScrollAction.bind(this);
    this.initPosition = this.initPosition.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
  }

  componentDidMount() {
    console.log("ScrollDiv Mounted")
    this.setState({
      node: this.node
    });
    //Runs the loop to check if user updates scroll
    window.requestAnimationFrame(this.checkScrollAction)
    window.requestAnimationFrame(this.checkVisibility)

    setTimeout(
      function() {
        this.setState({
          show: true
        });
      }.bind(this),
      parseInt(this.props.fade) * 500
    );
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.visibleCheckInterval)
    cancelAnimationFrame(this.checkScrollActionInterval)
  }

  initPosition() {
    console.log(this.getItemPosition(this.props.speed))
    this.setState({
      scrollPosition: this.getItemPosition(this.props.speed),
      initPosition: this.getItemPosition(this.props.speed)
    });

  }

  getItemPosition(speed) {
    let elemTop = this.node.getBoundingClientRect().top;
    let scrollTop =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement ||
            document.body.parentNode ||
            document.body).scrollTop;
    let position = (elemTop - scrollTop) / (speed*2.5);
    return position;
  }

  checkVisibility() {
    // this.visibleCheckInterval
      let item = this.node
      let itemBoundary = item.getBoundingClientRect();
      let top = itemBoundary.top,
        bottom = itemBoundary.bottom,
        height = itemBoundary.height

      if (top + height >= 0 && height / 1.5 + window.innerHeight >= bottom) {
        if (!this.state.isVisible) {
          this.setState({
            isVisible: true
          });
        }
      } else {
        this.setState({
          isVisible: false
        });
      }

      // This is important so we have something to cancel on unmounting...
      this.visibleCheckInterval = window.requestAnimationFrame(this.checkVisibility)
  }

  checkScrollAction() {
    //This method runs a loop to check if the user updated his scroll
        if (this.props.scrolling) {
          this.setState({
            scrollPosition: this.getItemPosition(this.props.speed)
          });
        }

        // This is important so we can remove the component on unmounting
        this.checkScrollActionInterval = window.requestAnimationFrame(this.checkScrollAction)
  }

  render() {
    let styleClasses = ["scroll-div", "scroll-div--show"];
    let scrollingStyle = {};
    
    // if (this.state.show && this.state.isVisible) {
    //   styleClasses.push("scroll-div--show");
    // }

    styleClasses.push(this.props.transition_style);

    if (this.state.show) {
      scrollingStyle = {
        transform:
          `translate3d(0px, ${Math.floor(this.state.scrollPosition / this.props.speed)}px, 0px)`,
        transition: "opacity 0.8s, transform 0.6s ease-out"
      };
    }

    let followCursorStyle = {
      transform:
        "translate3d(" +
        this.props.pageX +
        "px, " +
        this.props.pageY +
        "px, 0px)",
      position: "absolute",
      transition: "position 0s, transform 0.3s"
    };

    if (this.props.pageX && this.props.pageY) {
      styleClasses.push("absolute");
      return (
        <div
          className={styleClasses.join(" ")}
          style={{ ...this.props.style, ...followCursorStyle }}
          ref={node => {
            this.node = node;
          }}
        >
          {this.props.children}
        </div>
      );
    }
    return (
      <div
        className={styleClasses.join(" ")}
        style={{ ...this.props.style, ...scrollingStyle }}
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

ScrollDiv.propTypes = {
  speed: PropTypes.string,
  scrolling: PropTypes.bool,
  fade: PropTypes.string,
  transition_style: PropTypes.string
};
