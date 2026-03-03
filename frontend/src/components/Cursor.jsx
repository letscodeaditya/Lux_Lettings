import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-ring');

    document.addEventListener('mousemove', (e) => {
      cursor.style.top = e.clientY + 'px';
      cursor.style.left = e.clientX + 'px';

      ring.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
    });
  }, []);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-ring"></div>
    </>
  );
}
