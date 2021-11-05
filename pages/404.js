import { useRouter } from "next/dist/client/router";
import { useEffect } from "react/cjs/react.development";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  });
  return null;
};

export default Custom404;
