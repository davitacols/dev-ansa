import React, { useState } from 'react';

interface CommentSectionProps {
  postId: string;
  comments: { id: string; content: string; author: string; date: string }[];
  onAddComment: (content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <p className="text-gray-800">{comment.content}</p>
          <div className="text-xs text-gray-500 mt-1">
            <span>By {comment.author} on {new Date(comment.date).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          className="resize-none w-full border p-2 rounded-lg"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;