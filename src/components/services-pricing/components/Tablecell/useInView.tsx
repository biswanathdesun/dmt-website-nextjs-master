// import { useState, useEffect } from "react";

// interface IntersectionObserverOptions {
//   root?: Element | null;
//   rootMargin?: string;
//   threshold?: number | number[];
// }

// const useInView = (options: IntersectionObserverOptions) => {
//   const [isInView, setIsInView] = useState(false);
//   const [ref, setRef] = useState<Element | null>(null);

//   useEffect(() => {
//     if (!ref) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => setIsInView(entry.isIntersecting),
//       options
//     );

//     observer.observe(ref);

//     return () => observer.unobserve(ref);
//   }, [ref, options]);

//   return [setRef, isInView];
// };

// export default useInView;


import { useState, useEffect, useCallback } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useInView = (options: IntersectionObserverOptions) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<Element | null>(null);

  const callbackRef = useCallback((node: Element | null) => {
    setRef(node);
  }, []);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );

    observer.observe(ref);

    return () => observer.unobserve(ref);
  }, [ref, options]);

  return [callbackRef, isInView] as const;
};

export default useInView;
