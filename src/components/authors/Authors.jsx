import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_AUTHORS_INFO } from '../../graphql/querys'
import { Avatar, Divider, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'


function Authors() {
  const {loading , data , error} = useQuery(GET_AUTHORS_INFO)
  
  if(loading) return <div style={{
    height:"1000px",
    width:"100%",
    display:'flex',
    justifyContent:'center',
  }}>
    <Circles  height="80"
  width="100%"
  color="blue" />
  </div>

  if(error) return <h4>Error...</h4>

  // console.log(data)
  
  const {authors} = data;

  return (

    <Grid container
    sx={{
      boxShadow: 'rgba(0,0,0,0.1) 0px 4px 12px',
      borderRadius: 4 ,
    }}>
      {authors.map((author, index) => (
            <React.Fragment key={author.id}>
        <Grid item 
        padding={2}
        xs={12} 
        >
          <Link to={`/authors/${author.slug}`}
          style={{
            display:'flex',
            alignItems:'center',
            textDecoration:'none',
          }}
          >
          <Avatar src={author.avatar.url}
          sx={{
            marginLeft:2
          }}
          />
          <Typography 
          component='p' 
          variant='p' 
          color='text.primary' >{author.name}</Typography>
        </Link>
        </Grid>
        {
          index !== authors.length - 1 && (
            <Grid item xs={12}>
            <Divider variant='middle'/>
              </Grid>
          )
        }
          </React.Fragment>
      ))}
    </Grid>
 )
}

export default Authors