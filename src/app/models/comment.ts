import { Photo } from './photo';
import { User } from './user';

export class Comment {
  commentId: number;
  photo: Photo;
  username: string;
  content: string;
  photoId: number;
}
