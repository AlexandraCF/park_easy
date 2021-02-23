require 'json'
require 'open-uri'

url = "https://data.iledefrance.fr/api/records/1.0/search/?dataset=stationnement-sur-voie-publique-emplacements&q=&rows=2000&facet=regpri&facet=regpar&facet=typsta&facet=arrond&facet=zoneres&facet=tar&facet=locsta&facet=parite&facet=signhor&facet=signvert&facet=confsign&facet=typemob&facet=zoneasp&facet=stv&facet=prefet&facet=mtlast_edit_date_field&facet=datereleve&refine.arrond=11&refine.regpri=PAYANT+MIXTE"
url_serialized = open(url).read
lots = JSON.parse(url_serialized)


puts "Cleaning database..."

User.destroy_all
ParkingSpot.destroy_all



puts "Creating users..."

User.create(username: "AlexandraC",
						first_name: "Alexandra",
						last_name: "Canuel",
						email: "alexandra@parkeasy.fr",
						password: "alexandra@parkeasy.fr",
						address: "128 Boulevard Voltaire, 75011 Paris")

User.create(username: "JavierC",
						first_name: "Javier",
						last_name: "Cuadrado",
						email: "javier@parkeasy.fr",
						password: "javier@parkeasy.fr",
						address: "8 Allée Verte, 75011 Paris")

User.create(username: "EdouardB",
						first_name: "Edouard",
						last_name: "Belfond",
						email: "edouard@parkeasy.fr",
						password: "edouard@parkeasy.fr",
						address: "13 Rue Oberkampf, 75011 Paris")

User.create(username: "YoannN",
						first_name: "Yoann",
						last_name: "Nomo",
						email: "yoann@parkeasy.fr",
						password: "yoann@parkeasy.fr",
						address: "18 Boulevard du Temple, 75003 Paris")


puts "Creating parking spots..."

lots["records"].each do |lot|
	places = lot["fields"]["plarel"]
  print "."
	spot = ParkingSpot.new(address: "#{lot["fields"]["typevoie"]} #{lot["fields"]["nomvoie"]}",
										 latitude: lot["fields"]["geo_shape"]["coordinates"][1],
										 longitude: lot["fields"]["geo_shape"]["coordinates"][0],
										 total_places: lot["fields"]["plarel"],
										 available_places: (0..places).to_a.sample
										 )
  spot.save(validate: false)
end
puts
puts "Finished!"


