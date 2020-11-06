import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false} className={"footer-bg"}>
      <div >
        <a className={"footer-link"} href="https://ceyentra.com/" target="_blank" rel="noopener noreferrer">Ceyentra Technologies </a>
        <span className={"footer-text"}>&copy; 2020 All Right Reserved</span>
      </div>
      
    </CFooter>
  )
}

export default React.memo(TheFooter)
