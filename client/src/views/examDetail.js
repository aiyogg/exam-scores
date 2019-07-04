import * as React from 'react'
import ReactTable from 'react-table'
import connect from 'react-redux'
import PropTypes from 'prop-types'
import { getExamInfo } from '@/utils/api'
import 'react-table/react-table.css'

class ExamDetail extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        examid: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    tableData: {}
  }

  async componentDidMount () {
    const { token, match } = this.props
    const scores = await getExamInfo({ticket: token, examGuid: match.params.examid})
    this.setState({tableData: scores})
  }

  render () {
    return (
      <div>
        <ReactTable
          data={this.state.tableData}
          columns={}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token
  }
}

export default connect(mapStateToProps)(ExamDetail)
