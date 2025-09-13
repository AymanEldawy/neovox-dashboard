import React from 'react'

const NotificationIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8V15H18V8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 19C15 20.1046 14.5523 21.1677 13.6464 21.9106C12.7405 22.6535 11.538 23 10.25 23C9.01199 23 7.83552 22.6849 6.83507 22.0609C5.83462 21.4369 5.08282 20.5523 4.64719 19.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  )
}

export default NotificationIcon