'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { thoughts } from '@/lib/blog-content';

export function RandomThought() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(Math.floor(Math.random() * thoughts.length));
  }, []);
  return (
    <section className="sidebar-block framed random-thought">
      <h3>随手记</h3>
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <p>{thoughts[index].content}</p>
      <Link className="text-link" href="/thoughts">
        更多思考 <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
