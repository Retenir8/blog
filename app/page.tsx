import { IntroScreen } from '@/components/intro-screen';
import { BlogLayout, RecentContent } from '@/components/blog-layout';

export default function Home() {
  return (
    <IntroScreen>
      <BlogLayout active="blog">
        <RecentContent />
      </BlogLayout>
    </IntroScreen>
  );
}
