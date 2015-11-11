import React from 'react';

export default React.createClass({
    render() {
        return <div className = 'panel panel-group module-container col-sm-12'>
            <div className='text-center'>
                <h4> {this.props.heading} </h4>
            </div>
            {this.getAllInputElements()}
            {this.getBtnPanel()}
        </div>
    },
    getBtnPanel() {
        var that = this;
        if (this.props.btns) {
            return <div className='panel panel-btn pull-right'>
                {this.props.btns.map(btn => <button
                        ref={btn.refName}
                        onClick={btn.btnClickHandler.bind(this.props.inputComp, that)}
                        className={btn.primary ? 'btn btn-primary' : 'btn btn-default'}
                        key={btn.label}>{btn.label}</button>)
                }
            </div>
        } else {
            return null;
        }
    },
    getAllInputElements() {
        return this.props.eleList.map(ele => this.getElement(ele))
    },
    getElement(eleProps) {
        return <div className='row panel' key={eleProps.label}>
            <div className='col-sm-4'>
                <span className='form-label pull-right'>{eleProps.label}: </span>
            </div>
            <div className=' col-sm-8 form-control-container'>
                {this.getInput(eleProps)}
            </div>
        </div>
    },
    getInput(eleProps) {
        var template;
        if (eleProps.eleType === 'select') {
            template = <select ref={eleProps.refName}>
                {eleProps.getOptionsList()}
            </select>
        } else {
            template = <input type='text' ref={eleProps.refName} placeholder={eleProps.refName}
                          defaultValue={eleProps.defaultValue || 1} />
        }
        return template;
    }

});