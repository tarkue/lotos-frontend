"use client";
import { Icon } from "@/src/shared/ui/icon";
import { CommentProps } from "../models/props";
import { useState } from "react";
import { api } from "@/src/shared/api";
import { toast } from "@/src/shared/ui/toast";
import { Button } from "@/src/shared/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "@/src/shared/ui/typography";

export const EvaluateCommentAction = ({ comment }: CommentProps) => {
  const queryClient = useQueryClient();

  const [myReaction, setMyReaction] = useState<"like" | "dislike" | null>(
    comment?.my_reaction ?? null,
  );
  const [likesCount, setLikesCount] = useState(comment?.likes_count ?? 0);
  const [dislikesCount, setDislikesCount] = useState(
    comment?.dislikes_count ?? 0,
  );

  const reactMutation = useMutation({
    mutationFn: async ({
      commentId,
      isLike,
    }: {
      commentId: number;
      isLike: boolean;
    }) => api.student.reactToComment(commentId, { is_like: isLike }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comments"] });
    },
  });

  const evaluate = async (reaction: "like" | "dislike") => {
    const isLike = reaction === "like";

    // Оптимистичное обновление счётчиков
    if (reaction === "like") {
      if (myReaction === "like") {
        // Снимаем лайк
        setLikesCount((c) => c - 1);
        setMyReaction(null);
      } else {
        // Ставим лайк (если был дизлайк — снимаем его)
        setLikesCount((c) => c + 1);
        if (myReaction === "dislike") {
          setDislikesCount((c) => c - 1);
        }
        setMyReaction("like");
      }
    } else {
      if (myReaction === "dislike") {
        // Снимаем дизлайк
        setDislikesCount((c) => c - 1);
        setMyReaction(null);
      } else {
        // Ставим дизлайк (если был лайк — снимаем его)
        setDislikesCount((c) => c + 1);
        if (myReaction === "like") {
          setLikesCount((c) => c - 1);
        }
        setMyReaction("dislike");
      }
    }

    try {
      if (comment?.id) {
        await reactMutation.mutateAsync({ commentId: comment.id, isLike });
      }
    } catch {
      // Откат при ошибке
      setMyReaction(comment?.my_reaction ?? null);
      setLikesCount(comment?.likes_count ?? 0);
      setDislikesCount(comment?.dislikes_count ?? 0);
      toast({
        title: "Произошла ошибка, попробуйте перезагрузить страницу.",
        variant: "error",
      });
    }
  };

  if (!comment) {
    return undefined;
  }

  const isLiked = myReaction === "like";
  const isDisliked = myReaction === "dislike";

  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => evaluate("like")}
          variant="ghost"
          size="none"
          className="p-0!"
          disabled={reactMutation.isPending}
        >
          <Icon
            className="cursor-pointer"
            glyph={isLiked ? "like-filled" : "like-outline"}
            size="20"
            color="dark-gray"
          />
        </Button>
        <Typography.Caption bold className="text-dark-gray">
          {likesCount}
        </Typography.Caption>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => evaluate("dislike")}
          variant="ghost"
          size="none"
          className="px-0"
          disabled={reactMutation.isPending}
        >
          <Icon
            className="cursor-pointer"
            glyph={isDisliked ? "dislike-filled" : "dislike-outline"}
            size="20"
            color="dark-gray"
          />
        </Button>
        <Typography.Caption bold className="text-dark-gray">
          {dislikesCount}
        </Typography.Caption>
      </div>
    </div>
  );
};
