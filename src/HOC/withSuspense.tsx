import { Suspense } from "react";
import Loader from "../components/UI/Loader/Loader";

// create hoc withSuspense that will wrap any component with Suspense and Loader
const withSuspense = (Component: any) => {
  return (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default withSuspense;
