"use client";

import { useEffect, useRef } from "react";
import { CommentCard } from "@/src/entity/comment";
import { CommentListBody } from "@/src/entity/comment/list";
import { api } from "@/src/shared/api/exports";
import { getClientSideCookie } from "@/src/shared/libs/cookie";
import { Loader } from "@/src/shared/ui/loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentSendForm } from "@/src/features/comment-form";
import { CommentAction } from "@/src/features/comment-action";
import { CommentProps } from "@/src/entity/comment/models/props";

const CommentActionGroup: React.FC<CommentProps> = (props) => (
  <div className="flex gap-6 items-center">
    <CommentAction.Evaluate {...props} />
    <CommentAction.Delete {...props} />
  </div>
);

export const CommentList = ({
  courseId,
  moduleId,
  materialId,
}: {
  courseId: number;
  moduleId: number;
  materialId: number;
}) => {
  const accessToken = getClientSideCookie("access_token");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLLIElement | null>(null);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["Comments", courseId, moduleId, materialId],
      queryFn: async ({ pageParam = 1 }) =>
        api.student.getCommentsForMaterial(
          courseId,
          moduleId,
          materialId,
          {
            page: pageParam,
            page_size: 10,
          },
          { accessToken },
        ),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
      initialPageParam: 1,
    });

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader />;
  }

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];
  const totalComments = data?.pages[0]?.total ?? 0;

  return (
    <CommentListBody commentLength={totalComments}>
      <CommentSendForm
        courseId={courseId}
        moduleId={moduleId}
        materialId={materialId}
      />
      {totalComments > 0 && (
        <ul className="flex flex-col gap-5 w-full relative">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard comment={comment} action={CommentActionGroup} />
            </li>
          ))}
          {hasNextPage && (
            <li
              ref={loadMoreRef}
              className="w-full justify-center py-4 unvisible"
            >
              {isFetchingNextPage && <Loader />}
            </li>
          )}
        </ul>
      )}
    </CommentListBody>
  );
};
