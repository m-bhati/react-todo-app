
import React from 'react';
import Description from './Description';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  onClick = (id) => {
    const value = this.state[id] ? !this.state[id]: true;
    this.setState({
      [id]: value
    })
  }
  render() {
    return (
      <ul className="list-group list-items">
        {
          this.props.items.map((item, index) =>
          <React.Fragment key={index}>
            <li className="list-group-item-secondary list-item">
            <span className="clickable-text" onClick={()=>this.onClick(index)}>{index+1}. {item.title}</span>
            <i className="delete fa fa-trash" onClick={()=>this.props.deleteItem(item)}></i>
            <i className="edit fa fa-edit" onClick={()=>this.props.editItem(item)}></i>
            </li>
            {
              this.state[index] ? <Description item={item}/>: null
            }
          </React.Fragment>
          )
        }
      </ul>
    );
  }
}

export default List;