SELECT 
   at.arrival_time,
   st.name
FROM 
    stations as st, 
    arrival_times as at
WHERE st.id = at.station_id;