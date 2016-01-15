var data = [
  { name: "Blue-Eyes White Dragon" },
  { name: "Dark Magician" },
  { name: "Buster Blader" },
  { name: "Exodia" },
];

var YugiohCardsBox = React.createClass({
  render: function() {
    return (
      <div className="yugiohCardsBox">
        <YugiohCardsList data={this.props.data} />
      </div>
    );
  }
});

function sortYugiohCards(direction, yugiohCards) {
  var sortedYugiohCards = yugiohCards.slice();

  if (direction == 'asc') {
    sortedYugiohCards.sort(compareYugiohCardsAsc);
  } else {
    sortedYugiohCards.sort(compareYugiohCardsDesc);
  }

  return sortedYugiohCards;
}

function compareYugiohCardsAsc(cardA, cardB) {
  var nameA = cardA.name.toUpperCase();
  var nameB = cardB.name.toUpperCase();

  if (nameA == nameB) {
    return 0;
  } else if (nameA < nameB) {
    return -1;
  } else {
    return 1;
  }
}

function compareYugiohCardsDesc(cardA, cardB) {
  var nameA = cardA.name.toUpperCase();
  var nameB = cardB.name.toUpperCase();

  if (nameA == nameB) {
    return 0;
  } else if (nameA < nameB) {
    return 1;
  } else {
    return -1;
  }
}

var YugiohCardsList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
      columnName: 'name',
      direction: 'asc'
    };
  },
  handleSort: function(name) {
    var newDirection = null;
    var newData = null;

    if (this.state.direction == 'asc') {
      newDirection = 'desc';
      newData = sortYugiohCards('desc', this.state.data)
    } else {
      newDirection = 'asc',
      newData = sortYugiohCards('asc', this.state.data)
    }

    this.setState({
      direction: newDirection,
      data: newData
    })
  },
  render: function() {
    var yugiohNodes = sortYugiohCards(this.state.direction, this.state.data).map(function(yugiohCard) {
      return (
        <YugiohCard name={yugiohCard.name} />
      )
    });
    return (
      <table className="yugiohCardsList">
        <thead>
          <tr>
            <th onClick={this.handleSort.bind(this, 'name')}>Name</th>
          </tr>
        </thead>
        <tbody>
          {yugiohNodes}
        </tbody>
      </table>
    );
  }
});

var YugiohCard = React.createClass({
  render: function() {
    return (
      <tr>
        <td>
          {this.props.name}
        </td>
      </tr>
    );
  }
});

ReactDOM.render(
  <YugiohCardsBox data={data} />,
  document.getElementById('content')
);
