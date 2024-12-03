import ErrorBoundaryPage from "app/components/widgets/errorBoundaryPage";
import React, { Suspense } from "react";
// import { withTranslation } from "react-i18next";

interface ErrorBoundaryProps {
   children: React.ReactNode;
}
interface ErrorBoundaryState {
   hasError: boolean;
}

export class ErrorBoundary extends React.Component<
   ErrorBoundaryProps,
   ErrorBoundaryState
> {
   constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
   }

   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
   }

   render() {
      const { hasError } = this.state;
      const { children } = this.props;
      if (hasError) {
         // You can render any custom fallback UI
         //  return <h1>Something went wrong.</h1>;
         return (
            <Suspense fallback="">
               <ErrorBoundaryPage />
            </Suspense>
         );
      }

      return children;
   }
}

// export default withTranslation()(ErrorBoundary)
export default ErrorBoundary;
