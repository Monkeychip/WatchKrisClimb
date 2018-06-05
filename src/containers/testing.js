import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';

class CreateItemModal extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        let apiName = 'sampleCloudApi';
        let path = '/items';
        let newItem = {
            body: {
                "ID": "testing_id"
            }
        }
        /*API.post(apiName, path, newItem).then(response => {
            console.log(response,"within API call");
        }).catch(error => {
            console.log(error.response)
        });
        event.preventDefault();*/
        API.post(apiName, path,newItem).then(response => {
            console.log(response,"from within API call")
        }).catch(error => {
            console.log(error.response,"SOMETHINGS NOT RIGHT?!")
        });
        event.preventDefault();
    }



    render () {
        return (
            <form onSubmit={this.handleSubmit} size='large' key='large'>
                <button type="submit" id="submit-button" className="ui inverted blue button ">TESTING</button>
            </form>

        );
    }
}

export default CreateItemModal;
