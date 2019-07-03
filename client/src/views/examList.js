import * as React from 'react'
import { List } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

class ExamList extends React.Component {
  render() {
    return (
      <div>
        <List renderHeader={() => 'Align Vertical Center'}>
          <Item>
            七年级2019春期中考试（4-25）
            <Brief>发布时间：2019年04月30日</Brief>
          </Item>
        </List>
      </div>
    )
  }
}

export default ExamList