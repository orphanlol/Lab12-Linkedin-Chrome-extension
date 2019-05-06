import React, { Component } from 'react'
import { render} from 'react-dom';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'

const store = new Store({
    portName: 'COUNTING'
})

class Inject extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                
            </div>
        ) 
    }
}


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(Inject)