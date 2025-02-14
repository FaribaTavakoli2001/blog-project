import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_AUTHOR_INFO } from '../../graphql/querys'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Container, Grid, Typography } from '@mui/material'
import sanitizeHtml  from 'sanitize-html'
import CardEL from '../shared/CardEL'
import { Circles } from 'react-loader-spinner'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AuthorPages() {
  const { slug } = useParams()
  const {loading ,  data , error} = useQuery(GET_AUTHOR_INFO , {
    variables: { slug },
  })
  const navigate = useNavigate();

  if (loading) return <div style={{
    height:"1000px",
    width:"100%",
    display:'flex',
    justifyContent:'center',
  }}>
    <Circles  height="80"
  width="100%"
  color="blue" />
  </div>

  if (error) return <h3>Error ...</h3>

  console.log({loading , data , error})

  const {author} = data;
  return (

    <>
    <Container maxWidth='lg'>
      <Grid item xs={12} >

      </Grid>
      
      <Grid container mt={10}>
        <Grid item xs={12} display='flex' flexDirection='column' alignItems='center'>
          <Avatar src={author.avatar.url}
          sx={{
            width:250,
            height:250
          }}
          />
          <Typography component='h3' 
          variant='h5'
          color='text.secondary'
          mt={2}
          >
            {author.name}
          </Typography>
          <Typography component='p' variant='h5'>
            {author.field}
          </Typography>
        </Grid>
        <div dangerouslySetInnerHTML={{__html: sanitizeHtml(author.description.html)}}>
        </div>
      </Grid>
      <Grid item xs={12} mt={6}>
        <Typography component='h3' variant='h5' fontWeight={700}>
          مقالات {author.name}
        </Typography>
        <Grid container spacing={2} mt={2}>
          {
            author.posts.map( post => (
              <Grid item  xs={12} sm={6} md={4} key={post.id}>
                <CardEL title={post.title} slug={post.slug} coverPhoto={post.coverPhoto} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Container>
    
    </>
  )
}

export default AuthorPages