class BankLocator extends React.Component {
  state = {
    banks: [],
    lat: 0,
    lng: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let lng = this.state.lng;
    let lat = this.state.lat;

    fetch("/api/banks?lng=" + lng + "&lat=" + lat)
      .then((banks) => {
        return banks.json();
      })
      .then((data) => {
        console.log("json response: ", data);
        this.setState({ banks: data });
      });
  };

  render() {
    return (
      <div id="container">
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
          <input type="submit" value="Find banks" />
        </form>

        <ul>
          {this.state.banks &&
            this.state.banks.map((bank, index) => {
              return (
                <li key={index}>
                  <span className="font-awesome"></span>
                  <span className={bank.available}></span>
                  <span className="name">{bank.name}</span>
                  <span className="rank">{bank.rank}</span>
                  <span className="dist">
                    {Math.floor(parseInt(bank.dist.calculated) / 1609.34)} miles
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
ReactDOM.render(
  <BankLocator />,
  document.getElementById("banks")
);
