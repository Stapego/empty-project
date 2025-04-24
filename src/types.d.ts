// src/types.d.ts
declare module '*.md' {
    import { type MarkdownInstance } from 'astro';
    
    export const frontmatter: {
      title: string;
      date?: string;
      description?: string;
      // добавьте другие поля, которые есть в ваших .md-файлах
    };
    
    export const url: string | undefined;
    
    const content: MarkdownInstance<typeof frontmatter>;
    export default content;
  }