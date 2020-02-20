import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'


export default class DetailsTable extends Component {
    constructor(props) {
        super(props);
    }
  state = {
    column: null,
    direction: null,
    }
  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return    
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

    handleDelete(id) {
        console.log(`mil gay id ${id}`,id)
    }

    render() {
        const { customers } = this.props
    return (
      <Table sortable celled striped fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
            >
              Address
            </Table.HeaderCell>
                    <Table.HeaderCell
                    >
                        Action
            </Table.HeaderCell>
                    <Table.HeaderCell
                    >
                        Action
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
            <Table.Body>
                {_.map(customers, ({ id, name, address }) => (
            <Table.Row key={id}>
                  <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{address}</Table.Cell>
                        <Table.Cell>
                            <Button color='yellow' onClick={() => this.handleDelete(id)} ><i aria-hidden="true" className="edit icon"></i>Edit</Button>
                        </Table.Cell>
                        <Table.Cell>
                            <Button color='red' onClick={() => this.handleDelete(id)} ><i aria-hidden="true" className="delete icon"></i>Delete</Button>
                        </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}