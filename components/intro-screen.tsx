'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from '@/components/site-link';
import './intro.css';

export function IntroScreen({ children }: { children?: ReactNode }) {
  const [opening, setOpening] = useState(false);
  const [short, setShort] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function enter(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    if (opening) return;
    let visited = false;
    try {
      visited = sessionStorage.getItem('blog-intro-seen') === 'yes';
      sessionStorage.setItem('blog-intro-seen', 'yes');
    } catch {
      /* Storage may be unavailable. */
    }
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    setShort(visited || reduced);
    setOpening(true);
    timer.current = setTimeout(
      () => window.location.assign('/blog'),
      reduced ? 180 : visited ? 450 : 1100,
    );
  }

  return (
    <div
      className={`intro-screen ${opening ? 'is-opening' : ''} ${short ? 'short-opening' : ''}`}
    >
      <div
        className="intro-destination"
        inert={!opening}
        aria-hidden={!opening}
      >
        {children}
      </div>
      <div className="intro-curtain intro-white" aria-hidden="true" />
      <div className="intro-curtain intro-black" aria-hidden="true" />
      <section
        className="intro-copy"
        aria-label="欢迎来到我的博客"
        inert={opening}
        aria-hidden={opening}
      >
        <h1>
          我想记录一些
          <br />
          真正值得留下的东西。
        </h1>
        <p>
          关于 AI，
          <br />
          关于选择，
          <br />
          关于我正在经历的世界。
        </p>
        <Link
          className="enter-link"
          href="/blog"
          onClick={enter}
          aria-disabled={opening}
        >
          进入博客 <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
