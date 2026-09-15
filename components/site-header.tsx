import { Search } from 'lucide-react';

type SiteHeaderProps = {
  active: 'home' | 'articles' | 'about';
  variant?: 'overlay' | 'solid';
};

const links = [
  { href: '/', label: '首页', key: 'home' },
  { href: '/articles', label: '文章', key: 'articles' },
  { href: '/about', label: '关于', key: 'about' },
] as const;

export function SiteHeader({ active, variant = 'solid' }: SiteHeaderProps) {
  return (
    <header className={`site-header ${variant === 'solid' ? 'inner-header' : ''}`}>
      <nav className="nav-shell" aria-label="主导航">
        <div className="nav-spacer" aria-hidden="true" />
        <div className="nav-links">
          {links.map((link) => (
            <a
              className={`nav-link ${active === link.key ? 'active' : ''}`}
              href={link.href}
              key={link.key}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a className="search-link" href="/articles#search" aria-label="搜索文章">
          <Search size={16} strokeWidth={1.8} />
          <span>搜索文章</span>
        </a>
      </nav>
    </header>
  );
}
