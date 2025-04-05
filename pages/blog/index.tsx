// /pages/blog/index.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogIndex({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">📝 Thriveomate Blog</h1>
      <p className="mb-6 text-gray-600">Insights, tools, and trends for automated founders and AI-driven businesses.</p>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'data/blog'));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const markdown = fs.readFileSync(path.join(process.cwd(), 'data/blog', filename), 'utf8');
    const { data } = matter(markdown);
    return {
      slug,
      title: data.title,
      date: data.date,
    };
  });
  return { props: { posts } };
}

// /pages/blog/[slug].tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ content, title, date }: { content: string; title: string; date: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-6">{date}</p>
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'data/blog'));
  const paths = files.map((filename) => ({ params: { slug: filename.replace(/\.md$/, '') } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'data/blog', `${slug}.md`);
  const markdown = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(markdown);
  return { props: { content, title: data.title, date: data.date } };
};
