import React ,{ Component } from 'react';
import tagArr from './tag-data.json';
import './css/tag.css';

class TagIndex extends Component {
    constructor(props){
        super(props);
        this.tag_group = new Array();
        for(let i = 0;i<tagArr.length;i++){
            if(this.tag_group[tagArr[i].type] === undefined){
                this.tag_group[tagArr[i].type] = new Array();
            }
            this.tag_group[tagArr[i].type].push(tagArr[i].content);
        };
    }

    render(){
        let tag = new Array();
        for(let type in this.tag_group){
            tag.push(<TagGroup group_name={type} tag_list={this.tag_group[type]} app={this.props.app} key={type}/>)
        }
        return <div className='tag-index'>{tag}</div>;
    }
}


class TagGroup extends Component{
    render(){
        let tl = new Array();
        for (let i=0;i<this.props.tag_list.length;i++) {
            tl.push(<Tag content={this.props.tag_list[i]} app={this.props.app} key={i}/>);
        }
        return  <div className='tag-group'>
                    <div className='title'>{this.props.group_name}</div>
                    <div className='list'>{tl}</div>
                </div>;
    }
}



class Tag extends Component{
    render(){
        return <div 
            className={this.props.app.state.selected.indexOf(this.props.content)==-1?'tag':'tag selected'}
            onClick={()=>{
                let app = this.props.app;
                let selected = app.state.selected;
                let indexof = selected.indexOf(this.props.content);
                let max_tag = 6;
                if(indexof == -1){
                    if(selected.length>=max_tag){
                        alert('最多选择 '+ max_tag + ' 个标签');
                        return;
                    }
                    selected.push(this.props.content);
                }else{
                    selected.splice(indexof,1);
                }
                app.setState({selected:selected});
            }}>
                {this.props.content}
            </div>
    }
}
export default TagIndex;