SELECT 
	u.username, u.user_id, p.post_title, p.post_id 
	FROM users as u 
	JOIN posts as p 
	on u.user_id = p.user_id
WHERE 
    p.post_body LIKE '%' || $3 || '%'