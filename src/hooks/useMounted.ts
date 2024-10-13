import { useEffect, useRef } from "react";

export const useMounted = ( callback: () => void, deeps: any[]) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true
      return
    }
    callback()
  }, [deeps])
  
}
