import React from 'react';

interface BlogPostDetailProps {
  title: string;
  content: string;
  author: string;
  date: string;
  featuredImage?: string;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ title, content, author, date, featuredImage }) => {
  return (
    <article className="prose lg:prose-lg mx-auto">
      {featuredImage && <img src={featuredImage} alt={title} className="w-full mb-4 rounded-lg" />}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        <span>By {author} on {new Date(date).toLocaleDateString()}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPostDetail;