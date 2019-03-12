SELECT 
	u.username, u.user_id, p.post_title, p.post_id, p.post_image, p.post_body
	FROM users as u 
	JOIN posts as p 
	on u.user_id = p.user_id
WHERE 
    p.post_id = $1