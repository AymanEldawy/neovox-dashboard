import React from 'react'

const PoolIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path d="M12 2V22M2 12H22" stroke="currentColor" stroke-width="2" />
    </svg>
  )
}

export default PoolIcon