import React, { Component } from 'react';

class CreateItemModal extends Component {

    constructor(props) {
        super(props)
        this.state = { accessToken: '' }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async handleSubmit(event){
        let parameter = {'queryStringParameters':'testing arg'};
        event.preventDefault();
        let GATEWAY_URL= ['https://pwgoqx1296.execute-api.us-east-1.amazonaws.com/beta/activities'];

        fetch(GATEWAY_URL, {
            method: 'GET',
            mode: 'cors', //important here
            body: { "name":"John", "age":30, "car":null },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            crossDomain: true
        }).then((response)=> {
            return response.json(); //puts into json object
        }).then((json) => {
            console.log(json,"json");
            console.log(json.done.json,"success")

           // console.log(bodyObject.done.json,"yeah");
           // return bodyObject.done.json; //here you would set state.
        })

    };

    render () {
        return (
            <form onSubmit={this.handleSubmit} size='large' key='large'>
                <button type="submit" id="submit-button" className="ui inverted blue button ">TESTING</button>
            </form>
        );
    }
}

export default CreateItemModal;


///{this.foo.bind(this, 23)}

//event["queryStringParameters"]['queryparam1']