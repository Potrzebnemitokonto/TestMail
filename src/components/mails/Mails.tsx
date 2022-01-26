import React, { Fragment, useState } from 'react'

import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { ParsedMails, MailData } from '../types'
import IndividualMail from './IndividualMail'

import mailsData from './../../mails.json'

const Mails: React.FC = () => {
  const initialMailData = localStorage.getItem('visitedMails') 
  const initialOpenMailData = localStorage.getItem('openedMail')
  const [pageNumber, setPageNumber] = useState<number>(0)

  const mailsPerPage: number = 50
  const pagesDisplayed: number = pageNumber * mailsPerPage
  const [mailsState, setMailsState] = useState<ParsedMails>(
    initialMailData ? JSON.parse(initialMailData) : mailsData
  )
  const [openMail, setOpenMail] = useState<MailData>(initialOpenMailData ? JSON.parse(initialOpenMailData) : '')

  const displayMails: JSX.Element[] = mailsState
    .slice(pagesDisplayed, pagesDisplayed + mailsPerPage)
    .map((mailsState) => {
      return (
        <Fragment key={mailsState.id}>
          <StyledDiv>
            <button onClick={() => handleNavigate(mailsState)}>open</button>
            <input
              key={Math.random()}
              name="is_unread"
              defaultChecked={mailsState.is_unread}
              onChange={(e) =>
                handleMailStorage({
                  ...mailsState,
                  is_unread: e.target.checked,
                })
              }
              type="checkbox"
            />
            <li
              onClick={() =>
                handleMailStorage({ ...mailsState, is_unread: true })
              }
            >
              {mailsState.from}
            </li>
          </StyledDiv>
        </Fragment>
      )
    })
  const handleNavigate = (mailState: MailData) => {
    setOpenMail(mailState)
    localStorage.setItem('openedMail', JSON.stringify(mailState))
  }
  const unreadElements = mailsState.filter((value) => value.is_unread === true)
    .length
  const handleMailStorage = (data: MailData) => {
    setMailsState((prevItems) => {
      const newItems = [data, ...prevItems]
        .filter(
          (value, index, self) =>
            index === self.findIndex((selfValue) => selfValue.id === value.id)
        )
        .map(
          (object) => [data].find((detail) => detail.id === object.id) || object
        )

      localStorage.setItem('visitedMails', JSON.stringify(newItems))
      return newItems
    })
  }
  const pageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected)
  }
  const pagesCount = Math.ceil(mailsState.length / mailsPerPage)
  return (
    <Fragment>
      <h1>
        Aktualnie masz zaznaczonych(nie przeczytanych) elementow:
        {unreadElements}
      </h1>
      <ul>
        {openMail && <IndividualMail snippet={openMail.snippet} subject={openMail.subject} from={openMail.from} sent_date={openMail.sent_date}/>}
        {displayMails}
        <StyledReactPaginate
          previousLabel={'Poprzednia strona'}
          nextLabel={'Następna strona'}
          pageCount={pagesCount}
          onPageChange={pageChange}
        />
      </ul>
    </Fragment>
  )
}

const StyledDiv = styled.div`
  max-width: 30vw;
  padding: 0.5em;
  border: 1px solid gray;
  display: flex;
  justify-content: start;
  list-style-type: none;
  input {
    margin-right: 2em;
  }
`
const StyledReactPaginate = styled(ReactPaginate)`
  max-width: 30vw;
  border: 1px solid gray;
  display: flex;
  padding: 0.5em;
  justify-content: space-between;
  list-style-type: none;
`

export default Mails
