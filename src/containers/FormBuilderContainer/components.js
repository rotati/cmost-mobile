import React  from 'react'
import styled from 'styled-components'
import Card   from '../../components/common/Card'

export const Container = styled.View`
  flex: 1;
`

export const QuestionWrapper = styled.ScrollView`
  flex: 1;
  padding: 10px;
`

export const GroupTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`

export const PageIndicator = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60;
  background-color: #2196F3;
  align-items: center;
  justify-content: center;
  shadow-offset: 3px 3px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  position: absolute;
  bottom: 20;
  elevation: 3;
`

export const NextPageButton = styled(PageIndicator)`
  right: 20;
`
export const PreviousPageButton = styled(PageIndicator)`
  left: 20;
`

export const QuestionPage = ({ isGroup, groupTitle, children }) => (
  <Card>
    { isGroup && groupTitle && <GroupTitle>{ groupTitle }</GroupTitle> }
    { children }
  </Card>
)