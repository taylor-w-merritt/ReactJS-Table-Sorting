var data = [
  {name: "Debt #1"},
  {name: "Debt #2"}
];

var DebtsBox = React.createClass({
  handleCommentSubmit: function(debt) {
    data.push(debt);
  },
  render: function() {
    return (
      <div className="debtBox">
        <DebtForm onCommentSubmit={this.handleCommentSubmit} />
        
        <DebtsList data={this.props.data} />
      </div>
    );
  }
});

var DebtsList = React.createClass({
  render: function() {
    var debtNodes = this.props.data.map(function(debt) {
      return (
        <Debt name={debt.name} balance={debt.balance}>
          {debt.minPayment}
        </Debt>
      );
    });
    return (
      <div className="commentList">
        {debtNodes}
      </div>
    );
  }
});

var DebtForm = React.createClass({
  getInitialState: function() {
    return {name: "", balance: 0, minPayment: 0, interest: 0.00, dayOfMonthDue: 0};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name) {
      return;
    }
    var newDebts = this.state.data.slice();
    newDebts.push({name: name});
    this.setState({name: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Debt Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input type="submit" />
      </form>
    );
  }
});

var Debt = React.createClass({
  render: function() {
    return (
      <div>
        Name: {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <DebtsBox data={data} />,
  document.getElementById('content')
);