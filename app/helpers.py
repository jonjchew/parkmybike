import math

def find_spots(origin, all_spots):
	max_distance = 70 #km. Change here to increase radius
	close_spots = filter_spots(origin, all_spots, max_distance)
	close_spots = sort_by_distance(close_spots)
	close_spots = uniqify(close_spots)
	return close_spots

def filter_spots(origin, all_spots, max_distance):
	close_spots = []
	for parking_spot in all_spots:
		latitude = float(parking_spot['coordinates']['latitude'])
		longitude = float(parking_spot['coordinates']['longitude'])
		potential_spot = [latitude, longitude]
		distance = get_distance(origin, potential_spot)
		if valid_spot(parking_spot, distance, max_distance):
			close_spots.append(
				{
					'name': parking_spot['location_name'],
					'address': parking_spot['yr_inst'],
					'distance': distance,
					'latitude': latitude,
					'longitude': longitude
					})
	return close_spots

def valid_spot(parking_spot, distance, max_distance):
	if distance < max_distance and int(parking_spot['spaces']) > 0 and int(parking_spot['racks_installed']) > 0:
		return True

def get_distance(origin, destination):
    lat1, lon1 = origin
    lat2, lon2 = destination
    radius = 6371 # km

    dlat = math.radians(lat2-lat1)
    dlon = math.radians(lon2-lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = radius * c
    return d

def sort_by_distance(close_spots):
	sorted(close_spots, key=lambda k: k['distance'])
	return close_spots

def uniqify(array): 
   checked = []
   for value in array:
       if value not in checked:
           checked.append(value)
   return checked