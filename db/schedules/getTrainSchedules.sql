SELECT 
   *
FROM 
    stations as st, 
    arrival_times as at
WHERE st.id = at.station_id;