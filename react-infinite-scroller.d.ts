declare module 'react-infinite-scroller' {
  import { ReactNode } from 'react';

  interface InfiniteScrollProps {
    pageStart?: number;
    loadMore: (page: number) => void;
    hasMore: boolean;
    loader?: ReactNode;
    threshold?: number;
    children?: ReactNode;
  }

  export default function InfiniteScroll(props: InfiniteScrollProps): JSX.Element;
}
