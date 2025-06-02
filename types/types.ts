import type { AuthModel, ListResult, RecordModel } from "pocketbase";

export interface USER extends RecordModel {
  email: string;
  id: string;
  name: string;
  username: string;
  verified: boolean;
}
export interface BLOGMODEL extends RecordModel {
  post: string;
  view_id: string;
  cover: string;
  expand: {
    user_id: USER;
  };
}

export interface BlOGlIST extends ListResult<BLOGMODEL> {}
