SELECT DISTINCT
   at.arrival_time,
   st.name
FROM 
    trains as st, 
    arrival_times as at
WHERE st.id = at.train_id 
AND st.name = $1
order by at.arrival_time asc;