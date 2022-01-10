import React, {Component} from "react"

import HistoryTableRow from "./HistoryTableRow"

export default class HistoryTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Price</th>
                        {/* <th>Photos</th> */}
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.transactions.map((transaction) => <HistoryTableRow key={transaction._id} transaction={transaction}/>)}
                </tbody>
            </table>      
        )
    }
}