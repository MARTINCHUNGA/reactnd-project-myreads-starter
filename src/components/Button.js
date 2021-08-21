
import React,{Component} from 'react'


class Button extends Component{
    render(){
        return(
            <div className="open-search">
            <button onClick={() => this.props.searchPage(false)}>Add a book</button>
          </div>
        )
    }
}

export default Button