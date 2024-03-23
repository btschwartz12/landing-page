// AnimationContext.js
import { createContext } from 'react';

const AnimationContext = createContext({
    hasAnimated: false,
    setHasAnimated: () => {},
  });

export default AnimationContext;
