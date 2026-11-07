export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  date: string;
  category: string;
  commentCount: number;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  email: string;
  content: string;
  date: string;
}

export interface AddCommentRequest {
  author: string;
  email: string;
  content: string;
}