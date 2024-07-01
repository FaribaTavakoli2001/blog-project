import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Grid , Container} from '@mui/material'
import { useMutation } from '@apollo/client'
import { SEND_POST } from '../../../graphql/mutation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom'


function CommentForm({ slug }) {

    
    const [name , setName] = useState('')
    const [email , setEmail ] = useState('')
    const [text , setText] = useState('')

    const [sendComment , { loading , data , error}] = useMutation( SEND_POST , {
        variables: { name , email , text , slug },
    })

    const sendHandler = () => {
        if (name && email && text) {
            sendComment();
        } else {
            toast.warn('!فیلد هارا کامل کنید' , {
                position: 'top-center'
            })
        }
    }
    if (data) {
        toast.success('کامنت ارسال شده و منتظر تایید می باشد')
    }

  return (
        
            <Grid container sx={{
        boxShadow: 'rgba(0,0,0,0.1) 0px 4px 12px',
        borderRadius: 4 ,
        py: 1,
        mt: 5,
    }}
    >
        <Grid item
        xs={12} m={2}>
            <Typography component='p' variant='h6' fontWeight={700} color='primary'>
                ارسال کامنت
            </Typography>
            <Grid item xs={12} m={2}>
            <TextField  label="نام کاربری" variant="outlined" sx={{
                width: '100%' ,
                // '& label': { right: 0, left: 'auto',  transformOrigin: 'top right'  }, // راست‌چین کردن برچسب
                // '& legend': { textAlign: 'right' },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}       
            />
            </Grid>
            <Grid item xs={12} m={2}>
            <TextField  label="ایمیل" variant="outlined" sx={{
                width: '100%' ,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            </Grid> <Grid item xs={12} m={2}>
            <div dir='rtl'>
            <TextField  label=" متن کامنت" variant="outlined" sx={{
                width: '100%' ,
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            />
            </div>
            </Grid>
            <Grid item xs={12} m={2}>
                { 
                loading ? (
                    <Button variant='contained' disabled> ...درحال ارسال</Button>
                ) : (
                    <Button variant='contained' 
                onClick={sendHandler}
                > ارسال</Button>
                )
                }
                
            </Grid>
        </Grid>
        <ToastContainer />
    </Grid>

    
    )
}

export default CommentForm