export type MailData = {
    id: number,
    from: string,
    sent_date: string,
    is_unread: boolean,
    subject: string,
    snippet: string
  }
  
export type ParsedMails = Array<{
    id: number,
    from: string,
    sent_date: string,
    is_unread: boolean,
    subject: string,
    snippet: string
  }>