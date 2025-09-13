import React from 'react'

const MissionIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path d="M12 8L12 16M8 12L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  )
}

export default MissionIcon