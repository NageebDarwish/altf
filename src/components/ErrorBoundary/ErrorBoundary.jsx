import React, {Component} from "react";
import ErrorPage from './components/ErrorPage'
import { Box } from "@mui/material";


class ErrorBoundary extends Component {
    constructor(props)
     {
        super(props)
        this.state ={
            hasError : false
        }
     }
     static getDerivedStateFromError(error)
     {
        return{hasError: true}
     }
     componentDidCatch(error, info) {
        // Log error to external service in production
        if (process.env.NODE_ENV === 'production') {
          // TODO: Send to error reporting service
        }
     }
    render()
    {
        return (
            <Box
            >
                {this.state.hasError ? <>"<ErrorPage /> </> : this.props.children}
                
            </Box>
        )
    }
}
export default ErrorBoundary