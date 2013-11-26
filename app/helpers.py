import math

def find_spots(origin, all_spots):
	close_spots = []
	for parking_spot in all_spots:
		longitude = float(parking_spot['coordinates']['latitude'])
		latitude = float(parking_spot['coordinates']['longitude'])
		potential_spot = [longitude, latitude]
		distance = get_distance(origin, potential_spot)
		if distance < 0.8:
			close_spots.append(
				{
					'name': parking_spot['location_name'],
					'address': parking_spot['yr_inst'],
					'distance': distance,
					'latitude': latitude,
					'longitude': longitude
					})
	close_spots = sort_by_distance(close_spots)
	return close_spots

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

