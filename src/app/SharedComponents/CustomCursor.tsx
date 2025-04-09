"use client";

import classNames from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.scss';

const SIZE = 8;
const SIZE_F = 36;
const FOLLOW_SPEED = .16;

const CustomCursor = () => {
  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const leftF = useMotionValue(0);
  const topF = useMotionValue(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const mousemove = (e: MouseEvent) => {
      left.set(e.clientX - SIZE / 2);
      top.set(e.clientY - SIZE / 2);
      leftF.set(e.clientX - SIZE_F / 2);
      topF.set(e.clientY - SIZE_F / 2);
    };

    const mousedown = (e: MouseEvent & TouchEvent) => {
      setClicked(true);
      // startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
    };

    const touchmove = (e: TouchEvent) => {
      if (clicked) {
        // endY = e.touches[0].clientY || e.targetTouches[0].clientY;
      }
    };

    const mouseup = (e: MouseEvent & TouchEvent) => {
      // endY = e.clientY || endY;
      // if (clicked && startY && Math.abs(startY - endY!) >= 40) {
      setClicked(false);
      //   startY = null;
      //   endY = null;
      // }
    };

    const mouseleave = (e: MouseEvent) => {
      setClicked(false);
    };

    window.addEventListener('mousemove', mousemove as () => any, false);
    window.addEventListener('mousedown', mousedown as () => any, false);
    window.addEventListener('touchstart', mousedown as () => any, false);
    window.addEventListener('touchmove', touchmove as () => any, false);
    window.addEventListener('touchend', mouseup as () => any, false);
    window.addEventListener('mouseup', mouseup as () => any, false);
    window.addEventListener('mouseleave', mouseleave as () => any, false);
  }, []);

  return (
    <>
      <motion.div className={classNames("Cursor", clicked && "Cursor-clicked")} style={{ left, top }} />
      <motion.div className={classNames("Cursor-f", clicked && "Cursor-f-clicked")} style={{ left: leftF, top: topF }} />
    </>
  );
};

export default CustomCursor;






const FOOOO = () => {
  function lerp(start: number, end: number, amount: number) {
    return (1 - amount) * start + amount * end;
  }

  const cursor = document.createElement('div');
  cursor.className = 'cursor';

  const cursorF = document.createElement('div');
  cursorF.className = 'cursor-f';
  let cursorX = 0;
  let cursorY = 0;
  let pageX = 0;
  let pageY = 0;
  let size = 8;
  let sizeF = 36;
  let followSpeed = .16;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorF);

  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorF.style.display = 'none';
  }

  cursor.style.setProperty('--size', size + 'px');
  cursorF.style.setProperty('--size', sizeF + 'px');

  window.addEventListener('mousemove', function (e) {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.left = e.clientX - size / 2 + 'px';
    cursor.style.top = e.clientY - size / 2 + 'px';
  });

  function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed);
    cursorY = lerp(cursorY, pageY, followSpeed);
    cursorF.style.top = cursorY - sizeF / 2 + 'px';
    cursorF.style.left = cursorX - sizeF / 2 + 'px';
    requestAnimationFrame(loop);
  }

  loop();

  let startY: number | null;
  let endY: number | null;
  let clicked = false;

  function mousedown(e: MouseEvent & TouchEvent) {
    cursor.style.transform = "scale(4.5)";
    cursorF.style.transform = "scale(.4)";
    // gsap.to(cursor, {scale: 4.5});
    // gsap.to(cursorF, {scale: .4});

    clicked = true;
    startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
  }

  function mouseup(e: MouseEvent & TouchEvent) {
    cursor.style.transform = "scale(1)";
    cursorF.style.transform = "scale(1)";
    // gsap.to(cursor, {scale: 1});
    // gsap.to(cursorF, {scale: 1});

    endY = e.clientY || endY;
    if (clicked && startY && Math.abs(startY - endY!) >= 40) {
      // go(!Math.min(0, startY - endY)?1:-1);
      clicked = false;
      startY = null;
      endY = null;
    }
  }

  window.addEventListener('mousedown', mousedown as () => void, false);
  window.addEventListener('touchstart', mousedown as () => void, false);
  window.addEventListener('touchmove', function (e) {
    if (clicked) {
      endY = e.touches[0].clientY || e.targetTouches[0].clientY;
    }
  }, false);
  window.addEventListener('touchend', mouseup as () => void, false);
  window.addEventListener('mouseup', mouseup as () => void, false);
  /* End */

};
