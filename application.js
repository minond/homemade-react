class CurrentTime extends HomemadeComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = { time: Date.now() };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, this.props.delay);
  }

  render() {
    return h("div", {}, [h("span", {}, [`The time is now ${this.state.time}`])]);
  }
}

HomemadeReactDOM.render(CurrentTime, { delay: 1 }, document.getElementById("time1"));
HomemadeReactDOM.render(CurrentTime, { delay: 100 }, document.getElementById("time2"));
HomemadeReactDOM.render(CurrentTime, { delay: 1000 }, document.getElementById("time3"));
