import * as Styled from './styles'

type Props = {
  children: any
  value: number
  index: number
}

function TabPanel({ children, value, index }: Props) {
  return (
    <Styled.TabPanel
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </Styled.TabPanel>
  )
}

export default TabPanel
