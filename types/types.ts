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
export interface POSTMODEL {
  id: string;
  collectionId: string;
  collectionName: string; // "posts"
  title: string;
  post: string;
  cover: string;
  created: string; // ISO date string
  updated: string; // ISO date string
  user_id: string;
  view_id: string;
  expand: {
    user_id: {
      id: string;
      collectionId: string; // "_pb_users_auth_"
      collectionName: string; // "users"
      created: string;
      updated: string;
      avatar: string;
      emailVisibility: boolean;
      name: string;
      profile_id: string;
      username: string;
      verified: boolean;
    };
  };
}

export interface BlOGlIST extends ListResult<BLOGMODEL> {}
