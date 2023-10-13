import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error tracking service here if needed
    console.error(error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <p className="mb-4 text-xl font-semibold">Oops! Something went wrong.</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 focus:outline-none"
            >
              Refresh the page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
