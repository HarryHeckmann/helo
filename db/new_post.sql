INSERT INTO posts(user_id, post_title, post_image, post_body)
VALUES
 ($4, $1, $3, $2)
returning *
