"use client";

import { useMotionValue } from "framer-motion";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import UserCard, { type UserCardProps } from "./UserCard";

type UserCardModalProps = {
  userId: number | null;
  parentRef?: RefObject<HTMLDivElement | null>;
  scrollableContainer?: HTMLElement | null | undefined;
} & Omit<UserCardProps, "userId">;

const UserCardModal = ({ parentRef, scrollableContainer, userId, ...props }: UserCardModalProps) => {
  const top = useMotionValue(0);
  const left = useMotionValue(0);
  const originX = useMotionValue(0);
  const originY = useMotionValue(0);

  const [savedUserId, setSavedUserId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const updatePosition = useCallback(() => {
    if (parentRef?.current && cardRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const topValue = Math.min(
        window.innerHeight - cardRef.current.clientHeight - 16, // Check bottom position
        Math.max(90, rect.top - 20) // Check top position
      );
      const leftValue = Math.max(
        rect.left + 10, // Check left position
        Math.min(window.innerWidth - cardRef.current.clientWidth - 16, rect.right + 10) // Check right position
      );
      const originXValue = (rect.left + rect.width - leftValue) / cardRef.current.clientWidth;
      const originYValue = (rect.top + rect.height / 2 - topValue) / cardRef.current.clientHeight;
      top.set(topValue);
      left.set(leftValue);
      originX.set(originXValue);
      originY.set(originYValue);
    }
  }, []);

  useEffect(() => {
    if (!scrollableContainer) return;

    let timeout = undefined;
    if (userId !== null) {
      timeout = setTimeout(() => {
        resizeObserverRef.current = new ResizeObserver(updatePosition);
        resizeObserverRef.current.observe(scrollableContainer);
        scrollableContainer.addEventListener('scroll', updatePosition);
      }, 250);
    }

    return () => {
      clearTimeout(timeout);
      resizeObserverRef.current?.disconnect();
      scrollableContainer.removeEventListener('scroll', updatePosition);
    };
  }, [scrollableContainer, userId, updatePosition]);

  useEffect(() => {
    setShow(false);
    if (userId !== null) {
      setTimeout(() => {
        setSavedUserId(userId);
        setShow(true);
      }, 250);
    }
  }, [parentRef, userId]);

  if (!savedUserId && !userId) return null;

  return ReactDOM.createPortal(
    <UserCard {...props} ref={cardRef} userId={savedUserId || userId!}
      className={'UserCardMainContainerModal'}
      style={{ top, left, originX, originY }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0 }}
    />,
    document.body
  );
};

export default UserCardModal;
