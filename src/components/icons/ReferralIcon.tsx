import React from 'react'

const ReferralIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18 16.08C17.24 16.08 16.5 16.38 15.96 16.85L7.55 19.92C6.45 20.45 5 19.78 5 18.45V13C5 12.45 5.45 12 6 12H8.25C8.9 12 9.5 11.5 9.5 10.75V6C9.5 5.25 10.25 4.5 11 4.5H15C15.75 4.5 16.5 5.25 16.5 6V10.75C16.5 11.5 17.1 12 17.75 12H20C20.55 12 21 12.45 21 13V16.08C21 16.83 20.55 17.38 19.9 17.65L18 16.08Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default ReferralIcon