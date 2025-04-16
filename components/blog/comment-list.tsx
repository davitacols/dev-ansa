"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { CommentForm } from "@/components/blog/comment-form"
import { MessageSquare, X } from "lucide-react"

interface CommentListProps {
  comments: any[]
  postId?: string
}

export function CommentList({ comments, postId }: CommentListProps) {
  return (
    <div className="space-y-8 mt-8">
      {comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment.id} comment={comment} postId={postId} />)
      ) : (
        <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

interface CommentProps {
  comment: any
  postId?: string
}

function Comment({ comment, postId }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false)

  const handleReplySuccess = () => {
    setIsReplying(false)
  }

  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        {comment.author.image ? (
          <Image
            src={comment.author.image || "/placeholder.svg"}
            alt={comment.author.name || "User"}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              {(comment.author.name || "User").charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">{comment.author.name || "User"}</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </div>
          </div>
          <div className="text-zinc-700 dark:text-zinc-300">{comment.content}</div>
          {postId && (
            <div className="mt-2 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {isReplying ? (
                  <>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Reply
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {isReplying && postId && (
          <div className="mt-4 ml-4">
            <CommentForm postId={postId} parentId={comment.id} onSuccess={handleReplySuccess} />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 ml-4 space-y-4">
            {comment.replies.map((reply: any) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
