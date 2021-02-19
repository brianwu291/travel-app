import React, { memo } from 'react';
import { List, Divider } from 'semantic-ui-react'

const Spot = ({
  refsForLastItem,
  Name,
  Description,
  DescriptionDetail,
}) => {
  return (
    <div
      ref={refsForLastItem}
      role="listitem"
      className="item"
    >
      <List.Icon name='marker' />
      <List.Content>
        <List.Header as='a'>
          {Name}
        </List.Header>
        <List.Description>
          {Description || DescriptionDetail}
        </List.Description>
      </List.Content>
      <Divider />
    </div>
  )
}

export default memo(Spot);
