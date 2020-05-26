import React,{Component} from 'react';
import './css/result-list.css';

class ResultList extends Component {
    render(){
        let oneRow = new Array();
        let i=0;
        for(let e in this.props.char_list){
            oneRow.push(<TableRow key={i++} data={this.props.char_list[e]}/>);
        };
    return <div>{oneRow}</div>
    }
}
class TableRow extends Component{
    render(){
        let char = new Array();
        for(let e in this.props.data){
            char.push(<OneChar data={this.props.data[e].char}/>);
        };
    return <div className='res-row'><div className='title'>{this.props.data[0].group.toString()}</div><div>{char}</div></div>;
    }
}

class OneChar extends Component{
    render(){
        return <div className='char'>{this.props.data.name}</div>;
    }
}

export default ResultList;