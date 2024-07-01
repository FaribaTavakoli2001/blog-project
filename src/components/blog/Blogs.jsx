import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BLOGS_INFO } from '../../graphql/querys'
import { Grid } from '@mui/material'
import CardEL from '../shared/CardEL'
import { Circles } from 'react-loader-spinner'

function Blogs() {

    const {loading , data , error} = useQuery(GET_BLOGS_INFO)
    // console.log({loading , data , error})
    
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

    if(error) return <h4>Error...</h4>

    
    return (
      <> 
       <Grid container spacing={2}>
       {data.posts.map(post => 
         <Grid item xs={12} sm={6} md={4} key={post.id}>
         <CardEL {...post} />
        </Grid>)}
      </Grid>
      </>

)
}

export default Blogs