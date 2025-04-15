import React from 'react';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  onClick: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, author, date, onClick }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {author}</span>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default BlogPostCard;