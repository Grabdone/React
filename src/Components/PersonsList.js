import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component{
    state ={
        persons : []
    };


    componentDidMount(){
        axios.get('https://7cg8uz8p69.execute-api.us-east-1.amazonaws.com/test/people/?period=day')
            .then(response =>{
                this.setState({persons : response.data.people}); 
            });
    }

    ChangePeriodHandler = (event,period) =>{
        const btns = document.getElementsByClassName('button');
        for(let i=0;i<btns.length;i++){
            btns[i].classList.remove('active');
        }
        axios.get('https://7cg8uz8p69.execute-api.us-east-1.amazonaws.com/test/people/?period=' + period)
            .then(response =>{
                this.setState({persons : response.data.people}); 
            });
    }    
    render(){
        return(
            <div>
                <div className="Headings">Activity</div>
                <button className="button active" onClick= {(event) => this.ChangePeriodHandler(event,'day')}>Today</button>
                <button className="button" onClick= {(event) => this.ChangePeriodHandler(event,'week')}>This week</button>
                <button className="button" onClick= {(event) => this.ChangePeriodHandler(event,'month')}>This month</button>
                <table>
                    <tr>
                        <th>Client</th>
                        <th>Matter</th>
                        <th>Discription</th>
                        <th className="Type">Type</th>
                        <th>Time</th>
                    </tr>
                    {this.state.persons.map(person => 
                    
                        <tr>
                            <td>{person.client}</td>
                            <td>{person.matter}</td>
                            <td>{person.description}</td>
                            <td className="Type">{person.type}</td>
                            <td>{person.time}</td>
                        </tr>
                    
                    )}
                </table >
            </div>

        )    
    }
}