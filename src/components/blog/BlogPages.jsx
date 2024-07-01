import React from 'react'
import { GET_BLOG_INFO } from '../../graphql/querys'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
import sanitizeHtml  from 'sanitize-html'
import { Avatar, Box, Container , Grid, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentForm from './comment/CommentForm'
import Comments from './comment/Comments'

function BlogPages() {
  
  const { slug } = useParams();
  const {loading ,  data , error} = useQuery(GET_BLOG_INFO , {
    variables: { slug },
  })
  const navigate = useNavigate();


  if (loading) return <div style={{
    height:"1000px",
    width:"100%",
    display:'flex',
    justifyContent:'center',
    alignItems: 'center'
  }}>
    <Circles  height="100"
  width="100%"
  color="blue" />
  </div>

  if (error) return <h3>Error ...</h3>

  // console.log({loading , data , error})
  const { post } = data;


  return (
    <Container maxWidth='lg' >
      <Grid container>
        <Grid item xs={12} mt={9} display='flex' justifyContent='space-between'>
          <Typography component='h2' variant='h4'color='primary' fontWeight={700}>
            { post.title }
          </Typography>
          <ArrowBackIcon  onClick={() => navigate(-1) }/>
        </Grid>
        <Grid item xs={12} mt={6}></Grid>
          <img src={post.coverPhoto.url} alt={post.slug}
           width='70%' 
           style={{
            borderRadius: 15 ,
          }}/>
          <Grid item xs={12} mt={7} display='flex' alignItems='center'>
            <Avatar src={post.authors.avatar.url} sx={{width: 80,
            height: 80 ,
            marginLeft: 2 }} />
            <Box component='div'>
            <Typography component='p' variant='h5' fontWeight={700}>
              {post.authors.name}
            </Typography>
            <Typography component='p' variant='p' color='text.sacondary'>
              {post.authors.field}
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} mt={5}>
              <div dangerouslySetInnerHTML={{__html : sanitizeHtml(post.content.html)
              }}></div>
          </Grid>
          <Grid item xs={12} >
            <CommentForm slug={slug}/>
          </Grid>
          <Grid item xs={12} >
            <Comments slug={slug} />
          </Grid>
      </Grid>
    </Container>
  )
}

export default BlogPages