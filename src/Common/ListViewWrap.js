import React from 'react';
import {ListView} from 'thanos';

export class ListViewWrap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            datalist: this.wrapDataList(props)
        }
    }

    wrapDataList(props) {
        let res = [];
        if(props.renderHeader) {
            res.push(props.headerKey);
        }
        if(props.dataSource) {
            res = res.concat(props.dataSource);
        }
        if(props.renderFooter){
            res.push(props.footerKey);
        }
        return res;
    }
    
    componentWillUpdate(props, nextState) {
        if(props.dataSource !== this.props.dataSource) {
            nextState.datalist = this.wrapDataList(props)
        }
    }

    renderRow= (index,data)=>{
        const {renderRow,renderHeader,renderFooter} = this.props;
        if(index === 0 && renderHeader) {
            return renderHeader();
        } else if(index === this.state.datalist.length - 1 && renderFooter) {
            return renderFooter();
        } else {
            return renderRow(index,data);
        }
    }

    render() {
        const {renderHeader,renderFooter,dataSource,renderRow,onRef,headerKey,footerKey,...extra} = this.props;
        return <ListView
            ref={onRef}
            dataSource={this.state.datalist}
            renderRow={this.renderRow}
            {...extra} 
        />
    }
}