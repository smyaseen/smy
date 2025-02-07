import { createPostListViewModel, CreatePostListViewModelProps } from "../domain/service/createPostListViewModel";

export type IUsePostList = CreatePostListViewModelProps;

const usePostList = (props: IUsePostList) => {
  return createPostListViewModel(props);
};

export default usePostList;
