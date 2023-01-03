type Props = {
  children: any
  value: number
  index: number
}

function TabPanel({ children, value, index }: Props) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

export default TabPanel
