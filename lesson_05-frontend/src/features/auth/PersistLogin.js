import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUnitialzied,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        
        if(effectRan.current === true || process.env.NODE_ENV !== 'development') {
            //REACT 18 StrictMode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response =
                    await refresh()
                    //const {accessToken} = response.data
                    setTrueSuccess(true)

                } catch(err) {
                    console.error(err)
                }
            }

            if(!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        //eslint-disable-next-line
    }, [])

  return (
    <div>PersistLogin</div>
  )
}

export default PersistLogin