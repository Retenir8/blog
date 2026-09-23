import Link from '@/components/site-link';
import { thoughts } from '@/lib/blog-content';

export function RandomThought() {
  return (
    <section className="sidebar-block framed random-thought">
      <h3>随手记</h3>
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <p>{thoughts[0].content}</p>
      <Link className="text-link" href="/thoughts">
        更多思考 <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
