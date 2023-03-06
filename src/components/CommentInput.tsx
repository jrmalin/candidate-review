import { TextField } from "@mui/material";

export const CommentInput = ({
  comment,
  setComment,
}: {
  comment: string;
  setComment: (comment: string) => void;
}) => (
  <TextField
    label="Comment"
    multiline
    rows={4}
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    variant="filled"
    sx={{ width: "90%", mt: 2, border: "1px solid white" }}
  />
);
