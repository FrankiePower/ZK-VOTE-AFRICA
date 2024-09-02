import React from 'react'

const Wrapper = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='min-h-screen max-w-[480px] mx-auto bg-white'>
        {children}
    </div>
  )
}

export default Wrapper