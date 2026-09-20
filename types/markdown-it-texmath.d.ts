declare module 'markdown-it-texmath' {
  import type MarkdownIt from 'markdown-it';

  type TexmathOptions = {
    delimiters?: string | string[];
    katexOptions?: Record<string, unknown>;
  };

  const texmath: (markdown: MarkdownIt, options?: TexmathOptions) => void;
  export default texmath;
}
