const OneSpendRow = (props) => {
  return (
    <div className="row" key={props.spend.category}>
      <div className="grid-example col s4  light-green lighten-4 flow-text">
        {props.spend.category}
      </div>
      <div className="grid-example col s4  light-green lighten-4 flow-text">
        {" "}
        {props.editModeSpend && props.spend.category === props.updateSpend.category ? (
          <input
           
            autoFocus={true}
            onFocus={(e) => e.target.select()}
            onChange={props.updateSpendAmountHandler}
            value={props.updateSpend.amount}
            type="text"
          />
        ) : (
          props.spend.amount
        )}
      </div>
      <div className="grid-example col s1   flow-text">
        {" "}
        <button
          
          onClick={() => {
            props.delSpend(props.spend);
          }}>
          del
        </button>
      </div>
      <div className="grid-example col s3   flow-text">
        {props.editModeSpend && props.spend.category === props.updateSpend.category ? (
          <>
            <button
              
              onClick={() => props.setUpdateCategoryhadler(props.spend)}>
              Save
            </button>
            <button
              
              onClick={() => props.setEditModeSpend(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button
            
            onClick={() => {
              console.log(props.spend);
              props.editSpendHandler(props.spend);
            }}>
            edit
          </button>
        )}
      </div>
    </div>
  );
};

export default OneSpendRow;
