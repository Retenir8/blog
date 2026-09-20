export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>个人博客</strong>
        <p>记录方法、实践与长期思考。</p>
      </div>
      <div className="footer-links">
        <a href="/guides">指南</a>
        <a href="/practice">实践</a>
        <a href="/thoughts">思考</a>
        <a href="/map">知识地图</a>
        <a href="/about">关于我</a>
      </div>
      <p className="footer-note">© 2026 · 保持好奇，也保持判断。</p>
    </footer>
  );
}
