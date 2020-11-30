import React from 'react'
import Axios from 'axios'
import {
    Table,
    Form,
    Button
}
    from 'react-bootstrap'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dbUsers: []
        }
    }
    componentDidMount() {
        Axios.get("http://localhost:2000/users")
            .then((res) => {
                console.log(res.data)
                this.setState({ dbUsers: res.data })
            })
            .catch((err) => console.log(err))
    }

    tableHead = () => {
        return (
            <thead>
                <tr>
                    <th>Nu</th>
                    <th>First_Name</th>
                    <th>Last_Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    tableBody = () => {
        let { dbUsers } = this.state
        return (
            <tbody>
                {dbUsers.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <Button onClick={() => this.handleEdit(index)}>Edit</Button>
                                <Button onClick={() => this.handleDel(index)}>DELETE</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    tableInput = () => {
        return (
            <tbody>
                <tr>
                    <td>Add User</td>
                    <td>
                        <Form.Control type="text" placeholder="First name" ref="firstName" />
                    </td>
                    <td>
                        <Form.Control type="text" placeholder="Last name" ref="lastName" />
                    </td>
                    <td>
                        <Form.Control type="text" placeholder="Enter Email" ref="email" />
                    </td>
                    <td>
                        <Button onClick={this.handleAdd}>SUBMIT</Button>
                    </td>
                </tr>
            </tbody>
        )
    }

    table = () => {
        return (
            <Table>
                {this.tableHead()}
                {this.tableBody()}
                {this.tableInput()}
            </Table>
        )
    }

    handleAdd = () => {
        let first_name = this.refs.firstName.value
        let last_name = this.refs.lastName.value
        let email = this.refs.email.value
        console.log(first_name, last_name, email)

        Axios.post('http://localhost:2000/users', {
            first_name,
            last_name,
            email
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/users')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ dbUsers: res.data })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err => console.log(err)))
    }

    handleDel = (index) => {
        let delDbUsers = [...this.state.dbUsers];
        delDbUsers.splice(index, 1)
        this.setState({ dbUsers: delDbUsers })
    }

    handleEdit = (idx) => {
        let { dbUsers } = this.state
        for (let i = 0; i < dbUsers.length; i++) {
            if (idx === i) {
                return (
                    <tbody>
                        {dbUsers.map((item, index) => {
                            return (
                                <tr key={idx}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Form.Control type="text" placeholder={item.first_name} ref="editFirst" />
                                    </td>
                                    <td>
                                        <Form.Control type="text" placeholder={item.last_name} ref="editLast" />
                                    </td>
                                    <td>
                                        <Form.Control type="text" placeholder={item.email} ref="editEmail" />
                                    </td>
                                    <td>
                                        <Button onClick={() => this.handleSavedEdit(index)}>SAVE</Button>
                                        <Button onClick={() => this.table()}>CANCEL</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                )
            }
        }
    }

    handleSavedEdit = (index) => {
        let first_name = this.refs.editFirst.value
        let last_name = this.refs.editLast.value
        let email = this.refs.editEmail.value
        console.log(first_name, last_name, email)

        Axios.post('http://localhost:2000/users', {
            first_name,
            last_name,
            email
        })
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:2000/users')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ dbUsers: res.data })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err => console.log(err)))
    }
    render() {
        return (
            <div>
                <h1>INI TABLE JSON</h1>
                <table>
                    {this.table()}
                    {/* {this.tableInput()} */}
                </table>
            </div>
        )
    }
}

export default App

// bikin function buat edit delete
// delete => Axios.delete
// edit =>1 row berubah, tabel body di otak atik