class CurrentTime extends HomemadeComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = { time: Date.now() };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  render() {
    return h("div", {}, [h("span", {}, [`The time is now ${this.state.time}`])]);
  }
}

HomemadeReactDOM.render(CurrentTime, document.getElementById("view"));
