const TotalAmountRow = (props) => {
  return (
    <div className="row">
      <div className="grid-example col s4  light-green lighten-4 flow-text">
        <strong>Total</strong>
      </div>
      <div className="grid-example col s4  light-green lighten-4 flow-text">
        <strong>
          {props.spends.reduce((a, b) => {
            return a + b.amount;
          }, 0)}
        </strong>
      </div>
    </div>
  );
};

export default TotalAmountRow;
