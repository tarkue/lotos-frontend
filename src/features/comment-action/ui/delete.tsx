"use client";
import { Button } from "@/src/shared/ui/button";
import { CommentProps } from "../models/props";
import { Icon } from "@/src/shared/ui/icon";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { api } from "@/src/shared/api";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteCommentConfirm: React.FC<CommentProps> = ({ comment }) => {
  const { clear } = useModals();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (commentId: number) =>
      api.student.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comments"] });
      clear();
    },
  });

  const handle = async () => {
    if (comment) {
      try {
        await deleteMutation.mutateAsync(comment.id);
      } catch {
        toast({
          title: "Произошла непредвиденная ошибка!",
          description: "Попробуйте перезагрузить страницу",
          variant: "warning",
        });
      }
    }
  };

  return (
    <Button
      onClick={handle}
      variant="primary"
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? "Удаление..." : "Удалить комментарий"}
    </Button>
  );
};

export const DeleteCommentAction = ({ comment }: CommentProps) => {
  const { addModal } = useModals();
  const { role } = useAuth();
  const handle = () => {
    addModal({
      title: "Удаление комментария",
      description: `Вы действительно хотите удалить комментарий: "${comment?.content}"?`,
      buttons: <DeleteCommentConfirm comment={comment} />,
    });
  };

  if (role === RoleType.ADMIN)
    return (
      <Button size="small" variant="ghost" onClick={handle}>
        <Icon glyph="trash" color="light-gray" />
      </Button>
    );
};
