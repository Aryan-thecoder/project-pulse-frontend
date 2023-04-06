import React from 'react'
// import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    // const error = useRouteError()
  return (
    <div className='text-center'>
        {/* <h2 className='text-danger'>Error {error.status}</h2>
        <h2 className='text-primary'>Page {error.statusText}</h2> */}
        <img src='https://media4.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=ecf05e47s9lm7kne0ezeqffy542ku1qjxj1kl5bf84j9ntm5&rid=giphy.gif&ct=g' alt='no'/>
        {/* <h2 className='text-warning'>{error.data}</h2> */}
    </div>
  )
}

export default ErrorPage