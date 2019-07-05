import * as React from 'react'
import { List } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getExamList } from '@/store/actions/exam'

const Item = List.Item
const Brief = Item.Brief

class ExamList extends React.Component {
  static propTypes = {
    dispatchGetExamList: PropTypes.func.isRequired,
    token: PropTypes.string,
    examList: PropTypes.arrayOf(PropTypes.shape({
      examName: PropTypes.string,
      userExamGuid: PropTypes.string,
      examTime: PropTypes.string,
    })).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }

  static defaultProps = {
    token: null
  }

  componentDidMount () {
    const { dispatchGetExamList, token } = this.props
    if (token) {
      dispatchGetExamList({ticket: token})
    }
  }

  componentDidUpdate () {
    if (!this.props.token) {
      this.history.push('/login')
    }
  }

  render() {
    const { examList = [] } = this.props
    return (
      <div>
        <List renderHeader={() => '历次考试'}>
          {
            examList.map((exam) => (
              <Item 
                key={exam.examPlanGuid}
                onClick={() => {this.props.history.push(`/exam/detail/${exam.examPlanGuid}`) }}
              >
                {exam.examName}
                <Brief>{exam.examTime}</Brief>
              </Item>
            ))
          }
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    examList: state.exam.examList,
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) =>  ({
  dispatchGetExamList: params => dispatch(getExamList(params))
})


export default connect(mapStateToProps, mapDispatchToProps)(ExamList)
