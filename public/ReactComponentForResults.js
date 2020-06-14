class ReactComponentForResults extends React.Component {
  state = {
    workers: [],
    lat: 0,
    lng: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let lng = this.state.lng;
    let lat = this.state.lat;

    fetch("/api/workers?lng=" + lng + "&lat=" + lat)
      .then((workers) => {
        return workers.json();
      })
      .then((data) => {
        console.log("json response: ", data);
        this.setState({ workers: data });
      });
  };

  render() {
    return (
      <div id="workers-container">
        <form id="search" onSubmit={this.handleSubmit}>
          <label htmlFor="latitude">Enter your latitude</label>
          <input
            onChange={(e) => {
              this.setState({ lat: parseInt(e.target.value) });
            }}
            type="text"
            ref="lat"
            name="latitude"
            placeholder="Latitude"
            required
          />
          <label htmlFor="longitude">Enter your longitude</label>
          <input
            onChange={(e) => {
              this.setState({ lng: parseInt(e.target.value) });
            }}
            type="text"
            ref="lng"
            name="latitude"
            placeholder="Latitude"
            required
          />
          <input type="submit" value="Find Workers" />
        </form>

        <ul>
          {this.state.workers &&
            this.state.workers.map((worker, index) => {
              return (
                <li key={index}>
                  <span className={worker.available}></span>
                  <span className="name">{worker.name}</span>
                  <span className="rank">{worker.rank}</span>
                  <span className="dist">
                    {Math.floor(parseInt(worker.dist.calculated) / 1609.34)}{" "}
                    miles away
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
ReactDOM.render(<ReactComponentForResults />, document.getElementById("workers"));
