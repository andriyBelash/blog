import * as React from "react"

function SvgLink(props: any) {
  return (
    <svg
      width={24}
      height={28}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 21l10-10m0 0H7m10 0v10"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgLink
