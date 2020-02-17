import React from 'react'

export default class ClothInList extends React.PureComponent {
  render() {
    const { record, property } = this.props
    const value = record.params[property.name]

    return (
      <span>
        {value ? (
          <i className="far fa-thumbs-up" />
        ) : (
          <i className="far fa-thumbs-down" />
        )}
      </span>
    )
  }
}
