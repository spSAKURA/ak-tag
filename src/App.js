import React from 'react';
import TagIndex from './TagIndex';
import ResultList from './ResultList';
import char_data from './char-data.json';

const sp_tag = {
    "资深干员":{
        key:"level",
        func:"level5"
    },
    "高级资深干员":{
        key:"level",
        func:"level6"
    },
    "先锋干员":{
        key:"type",
        func:"type"
    },
    "狙击干员":{
        key:"type",
        func:"type"
    },
    "医疗干员":{
        key:"type",
        func:"type"
    },
    "术师干员":{
        key:"type",
        func:"type"
    },
    "重装干员":{
        key:"type",
        func:"type"
    },
    "辅助干员":{
        key:"type",
        func:"type"
    },
    "特种干员":{
        key:"type",
        func:"type"
    },
    "近卫干员":{
        key:"type",
        func:"type"
    },
}
const tagfunc = {
    tags:(content,key,char_info) => char_info[key].indexOf(content) != -1,
    level5:(content,key,char_info) => char_info[key] == 5,
    level6:(content,key,char_info) => char_info[key] == 6,
    type:(content,key,char_info) => char_info[key]+'干员' == content,
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            selected :[],
            result:[],
        };
    }

    /**
     * 
     * @param {array} all 
     * @param {number} size 
     * 按照size 将数组元素进行组合
     */
    combie(all,size){
        let flag = new Array(size)
        let result = new Array();
        let need_move = size-1;
        for(let i=0;i<size;i++){
            flag[i]=i;
        }
        while(need_move>=0){
            if(flag[need_move]+size-need_move > all.length ){
                //needmove移动前一位 并
                flag[--need_move]++;
                for(let i=1;i+need_move<size;i++){
                    flag[need_move+i] = flag[need_move]+i; 
                }
                continue;
            }else{
            	let tmp = new Array();
	            for(let i = 0;i<size;i++){
	                tmp.push(all[flag[i]]);
	            }
	            result.push(tmp);
	            need_move = size-1;
                flag[need_move]++;
            }
            
        }
        return result;

    }

    checkChar(alltag,allchar){
        let res = new Array();
        for(let i=0;i<alltag.length;i++){
            let one_group = new Array();
            for(let j=0;j<allchar.length;j++){
                let skip = false;
                for(let k=0;k<alltag[i].length;k++){
                    if(sp_tag.hasOwnProperty(alltag[i][k])){
                        if(!tagfunc[sp_tag[alltag[i][k]]['func']](alltag[i][k],sp_tag[alltag[i][k]]['key'],allchar[j])){
                            skip = true;
                            break;
                        }
                    }else{
                        if(!tagfunc['tags'](alltag[i][k],'tags',allchar[j])){
                            skip = true;
                            break;
                        }
                    }
                }
                if(skip) continue;
                else one_group.push({
                    group:alltag[i],
                    char:allchar[j],
                });
            }
            if(one_group.length>0) res.push(one_group);
        }
        return res;
    }

    render(){
        let sd = this.state.selected;
        let c1 = this.combie(sd,3);
        let c2 = this.combie(sd,2);
        let c3 = this.combie(sd,1);
        let all_combie = c1.concat(c2,c3);
        this.state.result = this.checkChar(all_combie,char_data);
        return <div>
                <TagIndex app={this}/>
                <ResultList char_list={this.state.result}/>
            </div>;
    }
}

export default App;