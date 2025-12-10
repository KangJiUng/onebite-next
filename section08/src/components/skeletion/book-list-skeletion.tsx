import BookItemSkeletion from "./book-item-skeletion";

export default function BookListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeletion key={`book-item-skeletion-${idx}`} />);
}
