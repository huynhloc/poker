### Problem 1:
```
SELECT t.id, t.friendly_name, t.scientific_name, t.owner_name, count(likes_table.user_id) as num_of_likes
FROM (SELECT tree_table.id as id, tree_table.friendly_name as friendly_name, tree_table.scientific_name as scientific_name, user_table.name as owner_name
    FROM user_table
    INNER JOIN tree_table ON tree_table.owner_id=user_table.id AND user_table.email = "adam@versett.com" ) t
INNER JOIN likes_table ON t.id=likes_table.tree_id
GROUP BY t.id;
```

### Problem 2:

```
cd pocker
yarn
yarn start
```

 Nguồn tham khảo:

 https://dev.to/miketalbot/real-world-javascript-map-reduce-solving-the-poker-hand-problem-3eie
