import { Menu, Search } from 'lucide-react';

export type NavigationKey =
  | 'home'
  | 'guides'
  | 'practice'
  | 'thoughts'
  | 'map'
  | 'about'
  | 'collaborate'
  | 'articles';

type SiteHeaderProps = {
  active: NavigationKey;
};

const links = [
  { href: '/', label: '首页', key: 'home' },
  { href: '/guides', label: '指南', key: 'guides' },
  { href: '/practice', label: '实践', key: 'practice' },
  { href: '/thoughts', label: '思考', key: 'thoughts' },
  { href: '/map', label: '知识地图', key: 'map' },
  { href: '/about', label: '关于我', key: 'about' },
] as const;

function NavigationLinks({ active }: { active: NavigationKey }) {
  return (
    <>
      {links.map((link) => (
        <a
          aria-current={active === link.key ? 'page' : undefined}
          className={`nav-link ${active === link.key ? 'active' : ''}`}
          href={link.href}
          key={link.key}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="主导航">
        <a className="site-brand" href="/" aria-label="个人博客首页">
          <span aria-hidden="true" />
          个人博客
        </a>

        <div className="nav-links">
          <NavigationLinks active={active} />
        </div>

        <div className="nav-actions">
          <a className="search-link" href="/articles#search" aria-label="搜索内容">
            <Search size={16} strokeWidth={1.8} />
            <span>搜索</span>
          </a>
          <a className={`collaborate-link ${active === 'collaborate' ? 'active' : ''}`} href="/collaborate">
            合作
          </a>
        </div>

        <details className="mobile-nav">
          <summary aria-label="打开导航菜单">
            <Menu size={19} />
            <span>菜单</span>
          </summary>
          <div className="mobile-nav-panel">
            <NavigationLinks active={active} />
            <a className="nav-link" href="/articles#search">搜索内容</a>
            <a className="nav-link" href="/collaborate">合作</a>
          </div>
        </details>
      </nav>
    </header>
  );
}
