'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-provider';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const links = [
  ['blog', '近期发布'],
  ['archive', '归档与搜索'],
  ['thoughts', '思考心得'],
  ['knowledge', '知识图谱'],
  ['about', '关于与合作'],
];
export function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <div className="nav-shell">
        <Link className="site-brand" href="/">
          个人博客<span aria-hidden="true">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="主导航">
          {links.map(([key, label]) => (
            <Link
              key={key}
              className={active === key ? 'active' : ''}
              aria-current={active === key ? 'page' : undefined}
              href={`/${key}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="mobile-menu-button"
                  aria-label="打开导航"
                />
              }
            >
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="mobile-menu-sheet"
              showCloseButton={false}
            >
              <SheetTitle>去哪里看看</SheetTitle>
              <SheetDescription>选择一个栏目，继续阅读。</SheetDescription>
              <SheetClose
                render={
                  <Button
                    className="sheet-close"
                    variant="ghost"
                    size="icon"
                    aria-label="关闭导航"
                  />
                }
              >
                <X size={18} />
              </SheetClose>
              <nav aria-label="移动端导航">
                {links.map(([key, label]) => (
                  <Link
                    key={key}
                    className={active === key ? 'active' : ''}
                    href={`/${key}`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
