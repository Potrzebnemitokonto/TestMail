import React from 'react';
import styled from 'styled-components'


type Props = {
    id?: number,
    from?: string,
    sent_date?: string,
    is_unread?: boolean,
    subject?: string,
    snippet?: string
}

const IndividualMail: React.FC<Props> = ({
    id,
    from,
    sent_date,
    is_unread,
    subject,
    snippet,
  }) => {

    return (
    <StyledDiv>
        <h1>{from}</h1>
        <h2>{sent_date}</h2>
        <p>{subject}</p>
        <p>{snippet}</p>
    </StyledDiv>
    );
}

export default IndividualMail;



const StyledDiv = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border: 1px solid gray;
    padding: 0.5em;
    max-width: 30vw;
}
`