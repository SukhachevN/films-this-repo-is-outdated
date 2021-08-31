/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

const inputStyles = {
    border: '1px solid #f1f1f4',
    background: '#f1f2f7',
    padding: '8px 12px',
    width:'100%'
  }
  
  const Input = styled.input({borderRadius: '3px'}, inputStyles)
  const Container = styled.div({
      maxWidth:'1200px',
      margin: '0 auto',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column'

  })

  export {Input,Container}