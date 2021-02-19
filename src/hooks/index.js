import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { isInViewport } from '../utils';

export const useScrollToBottomTrigger = ({
  triggerAtFirst = true,
  triggerFunction = () => {},
  paramForTriggerFunction = {},
  otherTriggerConditions = [],
  forceRetriggerCondition = [],
}) => {
  const [isScrollToBottom, setIsScrollToBottom] = useState(triggerAtFirst);
  const lastItemRef = useRef(null);
  const handleScroll = useCallback(() => {
    const canTrigger = otherTriggerConditions.length > 0 && otherTriggerConditions.every(condition => condition === true);
    if (canTrigger && lastItemRef.current) {
      const isToBottom = isInViewport(lastItemRef.current);
      if (isToBottom) {
        setIsScrollToBottom(true);
      }
    }
  }, [otherTriggerConditions])
  useEffect(() => {
    const canTrigger = forceRetriggerCondition.length > 0 && forceRetriggerCondition.every(condition => condition === true);
    if (canTrigger) {
      setIsScrollToBottom(true);
    }
  }, [forceRetriggerCondition])
  useEffect(() => {
    if (isScrollToBottom) {
      triggerFunction(paramForTriggerFunction ? paramForTriggerFunction : undefined);
      setIsScrollToBottom(false);
    }
  }, [isScrollToBottom, triggerFunction, paramForTriggerFunction]);
  useEffect(() => {
    document.addEventListener('scroll', handleScroll); 
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll])
  return ({
    bottomElementRef: lastItemRef,
  })
}

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}