/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import * as colors from '../styles/colors'

const inputStyles = {
    border: `1px solid ${colors.gray10}`,
    background: colors.gray,
    padding: '8px 12px',
    width:'90%',
  }
  
  const Input = styled.input({borderRadius: '3px 0 0 3px'}, inputStyles)
  const Container = styled.div({
      maxWidth:'1200px',
      margin: '0 auto',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column'

  })

  export {Input,Container}